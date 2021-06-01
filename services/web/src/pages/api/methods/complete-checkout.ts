import Stripe from 'stripe'
import { createInstance } from '@saltana/sdk'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {})

const adminApi = createInstance({
  apiKey: process.env.SALTANA_CORE_SECRET_API_KEY,

})

export async function checkout({ assetId, stripeId }) {
  const asset = adminApi.assets.read(assetId)

  const transaction = adminApi.transactions.create({})

  //const customer =
}
