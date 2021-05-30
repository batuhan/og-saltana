import test from 'blue-tape'

import { getSpyableSaltana } from '../../testUtils'

const saltana = getSpyableSaltana()

test('list: sends the correct request', (t) => {
  return saltana.messages.list({ page: 2, nbResultsPerPage: 10 })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/messages',
        data: {},
        queryParams: { page: 2, nbResultsPerPage: 10 },
        headers: {}
      })
    })
})

test('read: sends the correct request', (t) => {
  return saltana.messages.read('message_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/messages/message_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('create: sends the correct request', (t) => {
  const data = {
    topicId: 'asset_1',
    receiverId: 'user_2',
    content: 'Hello world'
  }

  return saltana.messages.create(data)
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/messages',
        data,
        queryParams: {},
        headers: {}
      })
    })
})

test('update: sends the correct request', (t) => {
  return saltana.messages.update('message_1', { read: true })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'PATCH',
        path: '/messages/message_1',
        data: { read: true },
        queryParams: {},
        headers: {}
      })
    })
})

test('remove: sends the correct request', (t) => {
  return saltana.messages.remove('message_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'DELETE',
        path: '/messages/message_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})
