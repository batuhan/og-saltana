const Stripe = require('stripe')
const debug = require('debug')('saltana:integrations:stripe')
const _ = require('lodash')
const { parsePublicPlatformId } = require('@saltana/util-keys')


async function getStripe(req, configRequester) {
  const privateConfig = await configRequester.communicate(req)({
    type: '_getConfig',
    access: 'private'
  })

  const { secretApiKey } = _.get(privateConfig, 'saltana.integrations.stripe', {})
  if (!secretApiKey) throw createError(403, 'Stripe secret API key not configured')

  const stripe = Stripe(secretApiKey)

  if (typeof _.get(stripe, method) !== 'function') {
    throw createError(400, 'Stripe method not found', { public: { method } })
  }

  return stripe
}


module.exports = function createService (deps) {
  const {
    createError,
    communication: { saltanaApiRequest },

    configRequester,
  } = deps

  return {
    sendRequest,
    webhook
  }

  // @Todo: this function is currently handled by the web app but it should move here so we don't have to share secrets to the web app
  async function _createPaymentIntent(req) {}

  // takes a payment intent id of an already captured payment (payment is handled by the web app)
  // firsst check if we have the user in our database
  // - if we have the user:
  //    - check if has stripe customer id, if not create it and update the user
  // - if we don't have the user:
  //    - create a stripe customer first (purely as an optimization), create a saltana user with the stripe customer id
  // attaches the payment intent to the customer
  // returns the user id so we can create the transaction and the order in a workflow

  async function _finalizeCapturedPaymentIntent(req) {
    const stripe = await getStripe(req, configRequester)

    const platformId = req.platformId
    const paymentIntentId = req.paymentIntentId
    const env = req.env
    const { User } = await getModels({ platformId, env })


    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId
    );
    if (!paymentIntent) throw createError(400, 'Payment intent not found')
    if (paymentIntent.status !== 'succeeded') throw createError(400, 'Payment intent not succeeded (yet?)')

    const customerId = paymentIntent.customer
    const user = await User.query()
    .where('id', userId)
    .orWhere('username', userId)
    .orWhere('email', userId) // @TODO: this is ugly
    .first()
  }

  async function sendRequest (req) {
    const { env, method, args = [{}] } = req

    const stripe = await getStripe(req, configRequester)

    try {
      // awaiting to handle error in catch block
      return await _.invoke(stripe, method, ...args) // promise
    } catch (err) {
      const errorMessage = 'Stripe error'
      const errObject = { expose: true }

      const reveal = !(process.env.NODE_ENV === 'production' && env === 'live')
      const errDetails = {
        stripeMethod: method,
        stripeError: err
      }
      if (reveal) _.set(errObject, 'public', errDetails)

      throw createError(err.http_status_code, errorMessage, errObject)
    }
  }

  async function webhook ({ _requestId, stripeSignature, rawBody, publicPlatformId }) {
    debug('Stripe integration: webhook event %O', rawBody)

    const { hasValidFormat, platformId, env } = parsePublicPlatformId(publicPlatformId)
    if (!hasValidFormat) throw createError(403)

    if (_.isEmpty(rawBody)) throw createError(400, 'Event object body expected')

    const req = {
      _requestId,
      platformId,
      env
    }

    const privateConfig = await configRequester.communicate(req)({
      type: '_getConfig',
      access: 'private'
    })

    const { secretApiKey, webhookSecret } = _.get(privateConfig, 'saltana.integrations.stripe', {})
    if (!secretApiKey) throw createError(403, 'Stripe API key not configured')
    if (!webhookSecret) throw createError(403, 'Stripe Webhook secret not configured')

    const stripe = Stripe(secretApiKey)

    let event

    // Verify Stripe webhook signature
    // https://stripe.com/docs/webhooks/signatures
    try {
      event = stripe.webhooks.constructEvent(rawBody, stripeSignature, webhookSecret)
    } catch (err) {
      throw createError(403)
    }

    // prefix prevents overlapping with other event types
    const type = `stripe_${event.type}`
    const params = {
      type,
      orderBy: 'createdDate',
      order: 'desc',
      page: 1
    }

    const { results: sameEvents } = await saltanaApiRequest('/events', {
      platformId,
      env,
      payload: {
        objectId: event.id,
        nbResultsPerPage: 1,
        ...params
      }
    })

    // Stripe webhooks may send same events multiple times
    // https://stripe.com/docs/webhooks/best-practices#duplicate-events
    if (sameEvents.length) {
      debug('Stripe integration: idempotency check with event id: %O', sameEvents)
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
        metadata: event
      }
    })

    return { success: true }
  }



}
responder.on('_finalizeCapturedPaymentIntent', async (req) => {
  const { platformId, env, paymentIntentId, organizationId } = req

  const stripe 
  const platformId = req.platformId
  const env = req.env
  const { User } = await getModels({ platformId, env })

  const userId = req.userId

  const user = await User.query()
    .where('id', userId)
    .orWhere('username', userId)
    .orWhere('email', userId) // @TODO: this is ugly
    .first()

  if (!user) {
    throw createError(404)
  }

  // first check if we have the user in our database
  // - if we have the user:
  //    - check if has stripe customer id, if not create it and update the user
  // - if we don't have the user:
  //    - create a stripe customer first (purely as an optimization), create a saltana user with the stripe customer id
  // attach the payment intent to the customer
  
  const result = await isOrganizationMember({
    platformId,
    env,
    userId,
    organizationId,
  })
  return result
})