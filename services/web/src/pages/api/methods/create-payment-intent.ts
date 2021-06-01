import Stripe from 'stripe'
import { createInstance } from '@saltana/sdk'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {})

const adminApi = createInstance({
  apiKey: process.env.SALTANA_CORE_SECRET_API_KEY,

})
export default async function createIntent({ assets }) {
  // TODO: cache this - @b

  const assetData = Promise.all(
    assets.map((asset) => adminApi.assets.read(asset.id))
  )
  // TODO: support multiple assets with multiple quantity
  const [asset] = assetData

  if (!asset) {
    throw new Error('NOT_FOUND')
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: asset.price,
    currency: 'usd',
    payment_method_types: ['card'],
    setup_future_usage: 'on_session',
    statement_descriptor: 'SALTANACREATOR',
    metadata: {
      asset_id: asset.id,
      origin: 'saltana.com',
    },
  })

  return { paymentIntent }
}

export async function checkout({ assetId, stripeId }) {
  const asset = adminApi.assets.read(assetId)

  const transaction = adminApi.transactions.create({})

  //const customer =
}
