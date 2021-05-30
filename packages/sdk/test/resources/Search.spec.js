import test from 'blue-tape'

import { getSpyableSaltana } from '../../testUtils'

const saltana = getSpyableSaltana()

test('results: sends the correct request', (t) => {
  const data = {
    query: 'Toyota',
    page: 2,
    nbResultsPerPage: 10,
    location: {
      latitude: 22,
      longitude: 10
    }
  }

  return saltana.search.results(data)
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/search',
        data,
        queryParams: {},
        headers: {}
      })
    })
})

test('results: automatically set save to false if it is true', (t) => {
  const data = {
    query: 'Toyota',
    page: 2,
    nbResultsPerPage: 10,
    location: {
      latitude: 22,
      longitude: 10
    },
    save: true
  }

  return saltana.search.results(data)
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/search',
        data: Object.assign({}, data, { save: false }), // automatically set `save` to false
        queryParams: {},
        headers: {}
      })
    })
})

test('[DEPRECATED] list (alias of results): sends the correct request', (t) => {
  const data = {
    query: 'Toyota',
    page: 2,
    nbResultsPerPage: 10,
    location: {
      latitude: 22,
      longitude: 10
    }
  }

  return saltana.search.list(data)
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/search',
        data,
        queryParams: {},
        headers: {}
      })
    })
})
