import test from 'blue-tape'

import { getSpyableSaltana } from '../../testUtils'

const saltana = getSpyableSaltana()

test('read: sends the correct request', (t) => {
  return saltana.orderMoves.read('orderMove_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/order-moves/orderMove_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('create: sends the correct request', (t) => {
  const data = {
    orderId: 'order_1',
    transactionId: 'transaction_1',
    payerId: 'user_1',
    payerAmount: 10000,
    currency: 'USD'
  }

  return saltana.orderMoves.create(data)
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/order-moves',
        data,
        queryParams: {},
        headers: {}
      })
    })
})

test('update: sends the correct request', (t) => {
  const data = { metadata: { someVar: true } }

  return saltana.orderMoves.update('orderMove_1', data)
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'PATCH',
        path: '/order-moves/orderMove_1',
        data: data,
        queryParams: {},
        headers: {}
      })
    })
})
