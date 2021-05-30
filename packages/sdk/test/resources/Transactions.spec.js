import test from 'blue-tape'

import { getSpyableSaltana } from '../../testUtils'

const saltana = getSpyableSaltana()

test('list: sends the correct request', (t) => {
  return saltana.transactions.list({ page: 2, nbResultsPerPage: 10 })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/transactions',
        data: {},
        queryParams: { page: 2, nbResultsPerPage: 10 },
        headers: {}
      })
    })
})

test('read: sends the correct request', (t) => {
  return saltana.transactions.read('transaction_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/transactions/transaction_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('preview: sends the correct request', (t) => {
  return saltana.transactions.preview({ assetId: 'asset_1', quantity: 2 })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/transactions/preview',
        data: { assetId: 'asset_1', quantity: 2 },
        queryParams: {},
        headers: {}
      })
    })
})

test('create: sends the correct request', (t) => {
  return saltana.transactions.create({ assetId: 'asset_1', quantity: 2 })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/transactions',
        data: { assetId: 'asset_1', quantity: 2 },
        queryParams: {},
        headers: {}
      })
    })
})

test('update: sends the correct request', (t) => {
  return saltana.transactions.update('transaction_1', { status: 'customStatus' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'PATCH',
        path: '/transactions/transaction_1',
        data: { status: 'customStatus' },
        queryParams: {},
        headers: {}
      })
    })
})

test('process: sends the correct request', (t) => {
  return saltana.transactions.createTransition('transaction_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/transactions/transaction_1/transitions',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})
