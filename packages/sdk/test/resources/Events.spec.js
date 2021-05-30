import test from 'blue-tape'

import { getSpyableSaltana } from '../../testUtils'

const saltana = getSpyableSaltana()

test('getStats: sends the correct request', (t) => {
  return saltana.events.getStats({ orderBy: 'count', page: 2, nbResultsPerPage: 10, groupBy: 'objectId' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/events/stats',
        data: {},
        queryParams: { orderBy: 'count', page: 2, nbResultsPerPage: 10, groupBy: 'objectId' },
        headers: {}
      })
    })
})

test('list: sends the correct request', (t) => {
  return saltana.events.list({ page: 2, nbResultsPerPage: 10 })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/events',
        data: {},
        queryParams: { page: 2, nbResultsPerPage: 10 },
        headers: {}
      })
    })
})

test('read: sends the correct request', (t) => {
  return saltana.events.read('event_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/events/event_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('create: sends the correct request', (t) => {
  const data = {
    type: 'custom_event',
    metadata: {
      test: true
    }
  }

  return saltana.events.create(data)
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/events',
        data,
        queryParams: {},
        headers: {}
      })
    })
})
