import test from 'blue-tape'

import { getSpyableSaltana } from '../../testUtils'

const saltana = getSpyableSaltana()

test('preview: sends the correct request', (t) => {
  const data = { transactionIds: ['transaction_1', 'transaction_2'] }

  return saltana.orders.preview(data)
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/orders/preview',
        data,
        queryParams: {},
        headers: {}
      })
    })
})

test('list: sends the correct request', (t) => {
  return saltana.orders.list({ page: 2, nbResultsPerPage: 10 })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/orders',
        data: {},
        queryParams: { page: 2, nbResultsPerPage: 10 },
        headers: {}
      })
    })
})

test('read: sends the correct request', (t) => {
  return saltana.orders.read('order_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/orders/order_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('create: sends the correct request', (t) => {
  const data = { transactionIds: ['transaction_1', 'transaction_2'] }

  return saltana.orders.create(data)
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/orders',
        data,
        queryParams: {},
        headers: {}
      })
    })
})

test('update: sends the correct request', (t) => {
  const data = { metadata: { someVar: true } }

  return saltana.orders.update('order_1', data)
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'PATCH',
        path: '/orders/order_1',
        data: data,
        queryParams: {},
        headers: {}
      })
    })
})
