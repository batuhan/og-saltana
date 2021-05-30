import test from 'blue-tape'

import { getSpyableSaltana } from '../../testUtils'

const saltana = getSpyableSaltana()

test('stripeRequest: sends the correct request', (t) => {
  const data = {
    method: 'GET',
    url: '/v1/charges',
    body: {
      amount: 2000,
      currency: 'usd',
      source: 'tok_mastercard',
      description: 'Charge example'
    }
  }

  return saltana.providers.stripeRequest(data)
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/providers/stripe/request',
        data,
        queryParams: {},
        headers: {}
      })
    })
})
