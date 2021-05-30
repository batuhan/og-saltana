import test from 'blue-tape'

import { getSpyableSaltana } from '../../testUtils'

const saltana = getSpyableSaltana()

test('list: sends the correct request', (t) => {
  return saltana.savedSearch.list()
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/search',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('read: sends the correct request', (t) => {
  return saltana.savedSearch.read('savedSearch_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/search/savedSearch_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('create: sends the correct request with save option automatically set to true', (t) => {
  const data = {
    name: 'My search query',
    query: 'some value'
  }

  return saltana.savedSearch.create(data)
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/search',
        data: Object.assign({}, data, { save: true }), // automatically set `save` to true
        queryParams: {},
        headers: {}
      })
    })
})

test('update: sends the correct request', (t) => {
  return saltana.savedSearch.update('savedSearch_1', { name: 'Custom query' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'PATCH',
        path: '/search/savedSearch_1',
        data: { name: 'Custom query' },
        queryParams: {},
        headers: {}
      })
    })
})

test('remove: sends the correct request', (t) => {
  return saltana.savedSearch.remove('savedSearch_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'DELETE',
        path: '/search/savedSearch_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})
