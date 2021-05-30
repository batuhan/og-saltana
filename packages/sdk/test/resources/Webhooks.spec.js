import test from 'blue-tape'

import { getSpyableSaltana } from '../../testUtils'

const saltana = getSpyableSaltana()

test('list: sends the correct request', (t) => {
  return saltana.webhooks.list()
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/webhooks',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('read: sends the correct request', (t) => {
  return saltana.webhooks.read('webhook_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/webhooks/webhook_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('create: sends the correct request', (t) => {
  const data = {
    name: 'Test webhook',
    targetUrl: 'https://example.com',
    event: 'asset__created',
    active: true
  }

  return saltana.webhooks.create(data)
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/webhooks',
        data,
        queryParams: {},
        headers: {}
      })
    })
})

test('update: sends the correct request', (t) => {
  return saltana.webhooks.update('webhook_1', { name: 'Updated webhook' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'PATCH',
        path: '/webhooks/webhook_1',
        data: { name: 'Updated webhook' },
        queryParams: {},
        headers: {}
      })
    })
})

test('remove: sends the correct request', (t) => {
  return saltana.webhooks.remove('webhook_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'DELETE',
        path: '/webhooks/webhook_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})
