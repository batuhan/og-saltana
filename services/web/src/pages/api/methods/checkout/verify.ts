import { getOrCreateUserFromEmail, adminApi, stripe } from '@/server/apis'

export default async function CheckoutIntentConfirm(req, res) {
  if (req.method !== 'POST') {
    throw new Error('INVALID_METHOD')
  }

  const { paymentIntentId } = req.body

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

  paymentIntent.
  const order = await adminApi.orders.update(
    paymentIntent.metadata.order_id,
    {},
  )

  return res.status(200).json({ paymentIntent, order })
}
