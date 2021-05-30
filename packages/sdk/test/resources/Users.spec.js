import test from 'blue-tape'

import { getSpyableSaltana } from '../../testUtils'

const saltana = getSpyableSaltana()

test('checkAvailability: sends the correct request', (t) => {
  return saltana.users.checkAvailability({ username: 'foo@bar.com' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/users/check-availability',
        data: {},
        queryParams: { username: 'foo@bar.com' },
        headers: {}
      })
    })
})

test('list: sends the correct request', (t) => {
  return saltana.users.list({ page: 2, nbResultsPerPage: 10 })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/users',
        data: {},
        queryParams: { page: 2, nbResultsPerPage: 10 },
        headers: {}
      })
    })
})

test('read: sends the correct request', (t) => {
  return saltana.users.read('user_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/users/user_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('create: sends the correct request', (t) => {
  return saltana.users.create({ username: 'Foo', password: 'secretPassword' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/users',
        data: { username: 'Foo', password: 'secretPassword' },
        queryParams: {},
        headers: {}
      })
    })
})

test('update: sends the correct request', (t) => {
  return saltana.users.update('user_1', { displayName: 'FooBar' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'PATCH',
        path: '/users/user_1',
        data: { displayName: 'FooBar' },
        queryParams: {},
        headers: {}
      })
    })
})

test('remove: sends the correct request', (t) => {
  return saltana.users.remove('user_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'DELETE',
        path: '/users/user_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

// DEPRECATED
test('updateOrganization: sends the correct request', (t) => {
  return saltana.users.updateOrganization('user_1', 'organization_1', { roles: ['user'] })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'PUT',
        path: '/users/user_1/organizations/organization_1',
        data: { roles: ['user'] },
        queryParams: {},
        headers: {}
      })
    })
})
// DEPRECATED:END
test('joinOrganizationOrUpdateRights: sends the correct request', (t) => {
  return saltana.users.joinOrganizationOrUpdateRights('user_1', 'organization_1', { roles: ['user'] })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'PUT',
        path: '/users/user_1/organizations/organization_1',
        data: { roles: ['user'] },
        queryParams: {},
        headers: {}
      })
    })
})

test('removeFromOrganization: sends the correct request', (t) => {
  return saltana.users.removeFromOrganization('user_1', 'organization_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'DELETE',
        path: '/users/user_1/organizations/organization_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})
