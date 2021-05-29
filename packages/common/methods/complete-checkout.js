

export async function createIntent({ assetId }) {
  // TODO: cache this - @b

  const asset = adminApi.assets.read(assetId)

 const paymentIntent = await stripe.paymentIntents.create({
  amount: 1099,
  currency: 'usd',
  payment_method_types: ['card'],
  setup_future_usage: 'on_session',
  statement_descriptor: 'SALTANACREATOR',
  metadata: {
    asset_id: Model,
    origin: 'saltana.com'
  }
});
}
