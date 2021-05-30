import test from 'blue-tape'

import { getSpyableSaltana } from '../../testUtils'

const saltana = getSpyableSaltana()

test('list: sends the correct request', (t) => {
  return saltana.roles.list()
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/roles',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('read: sends the correct request', (t) => {
  return saltana.roles.read('role_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/roles/role_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('create: sends the correct request', (t) => {
  return saltana.roles.create({ name: 'Developer', value: 'dev' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/roles',
        data: { name: 'Developer', value: 'dev' },
        queryParams: {},
        headers: {}
      })
    })
})

test('update: sends the correct request', (t) => {
  return saltana.roles.update('role_1', { name: 'Custom developer' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'PATCH',
        path: '/roles/role_1',
        data: { name: 'Custom developer' },
        queryParams: {},
        headers: {}
      })
    })
})

test('remove: sends the correct request', (t) => {
  return saltana.roles.remove('role_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'DELETE',
        path: '/roles/role_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})
