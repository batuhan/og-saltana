import test from 'blue-tape'

import { getSpyableSaltana } from '../../testUtils'

const saltana = getSpyableSaltana()

test('list: sends the correct request', (t) => {
  return saltana.links.list({ page: 2, nbResultsPerPage: 10 })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/links',
        data: {},
        queryParams: { page: 2, nbResultsPerPage: 10 },
        headers: {}
      })
    })
})

test('read: sends the correct request', (t) => {
  return saltana.links.read('rating_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/links/rating_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('create: sends the correct request', (t) => {
  const data = {
    score: 80,
    targetId: 'user_2'
  }

  return saltana.links.create(data)
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/links',
        data,
        queryParams: {},
        headers: {}
      })
    })
})

test('update: sends the correct request', (t) => {
  return saltana.links.update('rating_1', { score: 70 })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'PATCH',
        path: '/links/rating_1',
        data: { score: 70 },
        queryParams: {},
        headers: {}
      })
    })
})

test('remove: sends the correct request', (t) => {
  return saltana.links.remove('rating_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'DELETE',
        path: '/links/rating_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})
