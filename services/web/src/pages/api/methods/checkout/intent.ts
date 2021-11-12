import { adminApi } from '@/server/apis'

interface TransactionPreview {
  assetId: string
  currency: string
  takerAmount: number
}

export default async function CheckoutIntent(req, res) {
  if (req.method !== 'POST') {
    throw new Error('INVALID_METHOD')
  }
  //@TODO: form validation

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

  try {
    const paymentIntent = await adminApi.providers.stripeRequest({
      method: 'paymentIntents.create',
      args: [
        {
          amount,
          currency,
          payment_method_types: [
            'acss_debit',
            'alipay',
            // 'au_becs_debit',
            //'bancontact',
            'card',
            'card_present',
            //'eps',
            // 'giropay',
            // 'ideal',
            // 'interac_present',
            'klarna',
            //'p24',
            //'sepa_debit',
            //'sofor',
          ],
          //setup_future_usage: 'on_session',
          statement_descriptor: 'SALTANACREATOR',
          metadata: {
            assets: JSON.stringify(assets),
            origin: process.env.computedBaseDomain,
          },
        },
      ],
    })

    return res.status(200).json({
      paymentIntentId: paymentIntent.id,
      paymentIntentClientSecret: paymentIntent.client_secret,
      transactions,
      totalAmount: amount,
      currency,
    })
  } catch (e) {
    console.error('Error when creating the intent', e)
    return res.status(500).json({
      error: e.message,
    })
  }
}
