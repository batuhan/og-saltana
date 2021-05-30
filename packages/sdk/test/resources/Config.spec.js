import test from 'blue-tape'

import { getSpyableSaltana } from '../../testUtils'

const saltana = getSpyableSaltana()

test('read: sends the correct request', (t) => {
  return saltana.config.read()
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/config',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('update: sends the correct request', (t) => {
  return saltana.config.update({ assetsValidationAutomatic: true })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'PATCH',
        path: '/config',
        data: { assetsValidationAutomatic: true },
        queryParams: {},
        headers: {}
      })
    })
})

test('readPrivate: sends the correct request', (t) => {
  return saltana.config.readPrivate()
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/config/private',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('updatePrivate: sends the correct request', (t) => {
  const payload = {
    saltana: {
      someProtectedValue: true
    }
  }

  return saltana.config.updatePrivate(payload)
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'PATCH',
        path: '/config/private',
        data: payload,
        queryParams: {},
        headers: {}
      })
    })
})
