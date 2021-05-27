
saltana.com/

- email
- country
- zipcode
- asset-> name, currency, creator name
- cc name, cvc, exp

- checkout,

```js
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
```

- create payment intent via Core SDK in edge
-

- check link & get asset id
- create payment intent
- after form is filled, use the email and
- - create user
- - create stripe user
- - save payment method
- - create transaction
- - charge user
- - on transaction complete, create order
- - on transaction complete, allow access to page
- - on transaction complete, trigger n8n



- routes
/:organization/:linkSlug


link slug types:
- asset
- redirection
- page


type: asset|redirect-302|redirect-301|page
data: json
