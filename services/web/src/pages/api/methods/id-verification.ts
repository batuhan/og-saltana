const verificationSession = await stripe.identity.verificationSessions.create({
  type: 'document',
  metadata: {
    user_id: '{{USER_ID}}',
  },
})

// Return only the session URL to the frontend.
const url = verificationSession.url

import { adminApi } from '@/server/apis'

export default async function CheckoutIntentConfirm(req, res) {
  if (req.method !== 'POST') {
    throw new Error('INVALID_METHOD')
  }

  //@TODO: form validation

  const { paymentIntentId, email, assets } = req.body

  try {
    const result = await adminApi.providers.stripeProcessPaymentIntent({
      paymentIntentId,
      email,
      assets,
    })

    return res.status(200).json({ ...result })
  } catch (error) {
    return res.status(500).json({ error })
  }
}
