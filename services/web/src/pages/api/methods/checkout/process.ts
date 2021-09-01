import { getOrCreateUserFromEmail, adminApi, stripe } from '@/server/apis'

export default async function CheckoutIntentConfirm(req, res) {
  if (req.method !== 'POST') {
    throw new Error('INVALID_METHOD')
  }

  //@TODO: form validation

  const { paymentIntentId, email, assets } = req.body

  const result = await adminApi.providers.stripeProcessPaymentIntent({
    paymentIntentId,
    email,
    assets,
  })

  return res.status(200).json({ ...result })
}
