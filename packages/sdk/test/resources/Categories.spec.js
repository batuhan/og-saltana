import test from 'blue-tape'

import { getSpyableSaltana } from '../../testUtils'

const saltana = getSpyableSaltana()

test('list: sends the correct request', (t) => {
  return saltana.categories.list()
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/categories',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('read: sends the correct request', (t) => {
  return saltana.categories.read('category_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/categories/category_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('create: sends the correct request', (t) => {
  return saltana.categories.create({ name: 'Test category' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/categories',
        data: { name: 'Test category' },
        queryParams: {},
        headers: {}
      })
    })
})

test('update: sends the correct request', (t) => {
  return saltana.categories.update('category_1', { name: 'Test category' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'PATCH',
        path: '/categories/category_1',
        data: { name: 'Test category' },
        queryParams: {},
        headers: {}
      })
    })
})

test('remove: sends the correct request', (t) => {
  return saltana.categories.remove('category_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'DELETE',
        path: '/categories/category_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})
