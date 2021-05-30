import test from 'blue-tape'

import { getSpyableSaltana } from '../../testUtils'

const saltana = getSpyableSaltana()

test('change: sends the correct request', (t) => {
  return saltana.password.change({ currentPassword: 'secretPassword', newPassword: 'newSecretPassword' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/password/change',
        data: { currentPassword: 'secretPassword', newPassword: 'newSecretPassword' },
        queryParams: {},
        headers: {}
      })
    })
})

test('resetRequest: sends the correct request', (t) => {
  return saltana.password.resetRequest({ username: 'foo' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/password/reset/request',
        data: { username: 'foo' },
        queryParams: {},
        headers: {}
      })
    })
})

test('resetConfirm: sends the correct request', (t) => {
  return saltana.password.resetConfirm({ resetToken: 'resetTokenExample', newPassword: 'newSecretPassword' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/password/reset/confirm',
        data: { resetToken: 'resetTokenExample', newPassword: 'newSecretPassword' },
        queryParams: {},
        headers: {}
      })
    })
})
