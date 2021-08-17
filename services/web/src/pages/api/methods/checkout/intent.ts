import Stripe from 'stripe'
import { createInstance } from '@saltana/sdk'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {})

const adminApi = createInstance({
  apiKey: process.env.SALTANA_CORE_SECRET_API_KEY,
  apiHost: process.env.NEXT_PUBLIC_CORE_API_HOST,
})

async function getOrCreateUserFromEmail(
  email: string,
  data: { displayName: string },
): Promise<string> {
  try {
    const user = await adminApi.users.read(email)
    if (user) {
      return user.id
    }
  } catch (error) {
    // TODO: do different things depending on the error
    const newUser = await adminApi.users.create({
      type: 'user',
      username: email,
      email,
      password:
        'F)bqjH<h+deMk>UPr$d%6OPq@+S>(,K_nr+&z8y/3SXrP7-=tk[J2@2YZT^|@>Hb',
      displayName: data.displayName,
    })
    return newUser.id
  }
}

export default async function CheckoutIntent(req, res) {
  if (req.method !== 'POST') {
    throw new Error('INVALID_METHOD')
  }

  const { assets, email, cardholderName } = req.body
  const takerId = await getOrCreateUserFromEmail(email, {
    displayName: cardholderName,
  })

  const transactions = await Promise.all(
    assets.map(({ id: assetId, quantity }) =>
      adminApi.transactions.create({
        assetId,
        quantity,
        takerId,
      }),
    ),
  )

  const transactionIds = transactions.map(({ id }) => id)
  const order = await adminApi.orders.create({
    transactionIds,
  })

  const paymentIntent = await stripe.paymentIntents.create({
    amount: order.amountDue,
    currency: 'usd',
    payment_method_types: ['card'],
    setup_future_usage: 'on_session',
    statement_descriptor: 'SALTANACREATOR',
    metadata: {
      order_id: order.id,
      origin: 'saltana.com',
    },
  })

  return res.status(200).json({ paymentIntent, order })
}
