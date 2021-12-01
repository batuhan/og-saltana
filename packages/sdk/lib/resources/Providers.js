import Resource from '../Resource'

const method = Resource.method

export default class Providers extends Resource {}

Providers.prototype.stripeRequest = method({
  path: '/integrations/stripe/request',
  method: 'POST',
})

Providers.prototype.stripeProcessPaymentIntent = method({
  path: '/integrations/stripe/process-payment-intent',
  method: 'POST',
})
