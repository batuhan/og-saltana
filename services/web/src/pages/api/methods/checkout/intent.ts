import { getOrCreateUserFromEmail, adminApi, stripe } from '@/server/apis'

interface TransactionPreview {
  assetId: string
  currency: string
  takerAmount: number
}

export default async function CheckoutIntent(req, res) {
  if (req.method !== 'POST') {
    throw new Error('INVALID_METHOD')
  }

  const { assets } = req.body

  // get the preview transaction for all assets
  const transactions: TransactionPreview[] = await Promise.all(
    assets.map(
      ({ id: assetId, quantity }): TransactionPreview =>
        adminApi.transactions.preview({
          assetId,
          quantity,
        }),
    ),
  )

  // takerAmount is what the end user needs to pay
  // It is based on the transaction value plus takerFeesPercent defined in asset typ
  const amount: number = transactions.reduce(
    (sum: number, tx) => sum + tx?.takerAmount,
    0,
  )

  // currently we only plan to allow USD payments, even if we do other currencies, the end user will have to pay in USD converted to their currency. I (@b) don't want to hardcode this in the frontend so we pick the first currency in the list
  const currency = transactions[0].currency
  const assetIds = transactions.map((tx) => tx.assetId)

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    payment_method_types: ['card'],
    setup_future_usage: 'on_session',
    statement_descriptor: 'SALTANACREATOR',
    metadata: {
      asset_ids: JSON.stringify(assetIds),
      origin: process.env.computedBaseDomain,
    },
  })

  return res.status(200).json({ paymentIntent })
}
