const Stripe = require('stripe')
const debug = require('debug')('saltana:integrations:stripe')
const _ = require('lodash')
const { parsePublicPlatformId } = require('@saltana/util-keys')

async function getStripe(req, configRequester) {
  const privateConfig = await configRequester.communicate(req)({
    type: '_getConfig',
    access: 'private',
  })

  const { secretApiKey } = _.get(
    privateConfig,
    'saltana.integrations.stripe',
    {},
  )
  if (!secretApiKey) {
    throw createError(403, 'Stripe secret API key not configured')
  }

  const stripe = Stripe(secretApiKey)

  return stripe
}

module.exports = function createService(deps) {
  const {
    createError,
    communication: { saltanaApiRequest },

    configRequester,
    userRequester,

    transactionRequester,
    orderRequester,
  } = deps

  async function fetchStripeCustomerWithSaltanaUserFromEmail({
    userService,
    email,
    stripe,
  }) {
    const [internalUser, stripeCustomer] = await Promise.all([
      (async () => {
        try {
          const user = await userService({ type: 'read', userId: email })
          return user
        } catch (err) {
          console.log('userservice', 'got an error from the user service', err)

          const newUser = await userService({
            type: 'create',
            email,
          })

          return newUser
        }
      })(),
      (async () => {
        const foundCustomers = await stripe.customers.list({ email })
        if (foundCustomers.data.length === 0) {
          return await stripe.customers.create({ email }) // @TODO: update other info as they come
        }
        const [customer] = foundCustomers.data
        return customer
      })(),
    ])

    // check if the user has a stripe customer id
    const stripeCustomerIdInInternalUser = _.get(
      internalUser,
      'providerData.stripeCustomerId',
    )

    const stripeCustomerId = _.get(stripeCustomer, 'id')
    const promises = []

    if (!stripeCustomerIdInInternalUser) {
      // update the internal user with the stripe customer id

      promises.push(
        userService({
          type: 'update',
          userId: internalUser.id,
          platformData: { stripeCustomerId },
        }),
      )
    }

    // check if stripe customer metadata has a saltana user id
    const internalUserIdInStripeCustomer = _.get(
      stripeCustomer,
      'metadata.saltanaUserId',
    )

    if (!internalUserIdInStripeCustomer) {
      promises.push(
        stripe.customers.update(stripeCustomer.id, {
          metadata: { saltanaUserId: internalUser.id },
        }),
      )
    }

    await Promise.all(promises)

    return {
      internalUserId: internalUser.id,
      stripeCustomerId,
    }
  }

  // takes a payment intent id of an already captured payment (payment is handled by the web app)
  // firsst check if we have the user in our database
  // - if we have the user:
  //    - check if has stripe customer id, if not create it and update the user
  // - if we don't have the user:
  //    - create a stripe customer first (purely as an optimization), create a saltana user with the stripe customer id
  // attaches the payment intent to the customer
  // returns the user id so we can create the transaction and the order in a workflow

  async function processPaymentIntent(req) {
    const {
      body: { paymentIntentId, email, assets },
      platformId,
      env,
    } = req
    const stripe = await getStripe(req, configRequester)

    const { id, metadata } = await stripe.paymentIntents.retrieve(
      paymentIntentId,
    )
    const userService = userRequester.communicate(req)
    const transactionService = transactionRequester.communicate(req)
    const orderService = orderRequester.communicate(req)

    const { internalUserId, stripeCustomerId } =
      await fetchStripeCustomerWithSaltanaUserFromEmail({
        userService,
        email,
        stripe,
      })

    // attach payment intent to customer
    /*
    await stripe.paymentIntents.attach(id, {
      customer: stripeCustomerId,
    })
    */

    if (assets.length === 0) {
      throw createError(400, 'No asset ids found')
    }

    const commonPayload = {
      takerId: internalUserId,
      metadata: {
        origin: metadata.origin, // metadata from the payment intent
      },
      platformData: {
        stripeIntentId: id,
      },
    }

    const transactions = await Promise.all(
      assets.map((asset) =>
        transactionService({
          type: 'create',
          assetId: asset.id,
          quantity: asset.quantity,
          ...commonPayload,
        }),
      ),
    )

    const transactionIds = transactions.map((transaction) => transaction.id)

    const order = await orderService({
      type: 'create',
      transactionIds,
      ...commonPayload,
    })

    return {
      internalUserId,
      stripeCustomerId,
      orderId: order.id,
    }
  }

  async function sendRequest(req) {
    const { env, method, args = [{}] } = req

    const stripe = await getStripe(req, configRequester)

    if (typeof _.get(stripe, method) !== 'function') {
      throw createError(400, 'Stripe method not found', { public: { method } })
    }

    try {
      // awaiting to handle error in catch block
      return await _.invoke(stripe, method, ...args) // promise
    } catch (err) {
      const errorMessage = 'Stripe error'
      const errObject = { expose: true }

      const reveal = !(process.env.NODE_ENV === 'production' && env === 'live')
      const errDetails = {
        stripeMethod: method,
        stripeError: err,
      }
      if (reveal) _.set(errObject, 'public', errDetails)

      throw createError(err.http_status_code, errorMessage, errObject)
    }
  }

  async function webhook({
    _requestId,
    stripeSignature,
    rawBody,
    publicPlatformId,
  }) {
    debug('Stripe integration: webhook event %O', rawBody)

    const { hasValidFormat, platformId, env } =
      parsePublicPlatformId(publicPlatformId)
    if (!hasValidFormat) throw createError(403)

    if (_.isEmpty(rawBody)) throw createError(400, 'Event object body expected')

    const req = {
      _requestId,
      platformId,
      env,
    }

    const privateConfig = await configRequester.communicate(req)({
      type: '_getConfig',
      access: 'private',
    })

    const { secretApiKey, webhookSecret } = _.get(
      privateConfig,
      'saltana.integrations.stripe',
      {},
    )
    if (!secretApiKey) throw createError(403, 'Stripe API key not configured')
    if (!webhookSecret)
      throw createError(403, 'Stripe Webhook secret not configured')

    const stripe = Stripe(secretApiKey)

    let event

    // Verify Stripe webhook signature
    // https://stripe.com/docs/webhooks/signatures
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        stripeSignature,
        webhookSecret,
      )
    } catch (err) {
      throw createError(403)
    }

    // prefix prevents overlapping with other event types
    const type = `stripe_${event.type}`
    const params = {
      type,
      orderBy: 'createdDate',
      order: 'desc',
      page: 1,
    }

    const { results: sameEvents } = await saltanaApiRequest('/events', {
      platformId,
      env,
      payload: {
        objectId: event.id,
        nbResultsPerPage: 1,
        ...params,
      },
    })

    // Stripe webhooks may send same events multiple times
    // https://stripe.com/docs/webhooks/best-practices#duplicate-events
    if (sameEvents.length) {
      debug(
        'Stripe integration: idempotency check with event id: %O',
        sameEvents,
      )
    }

    await saltanaApiRequest('/events', {
      platformId,
      env,
      method: 'POST',
      payload: {
        // https://stripe.com/docs/api/events/types
        // No Stripe event name currently has two underscores '__', which would cause an error
        type,
        objectId: event.id, // just a convention to easily retrieve events, objectId being indexed
        emitterId: 'stripe',
        metadata: event,
      },
    })

    return { success: true }
  }

  return {
    fetchStripeCustomerWithSaltanaUserFromEmail,
    processPaymentIntent,
    sendRequest,
    webhook,
  }
}
