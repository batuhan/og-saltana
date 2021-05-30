import test from 'blue-tape'

import { getSpyableSaltana } from '../../testUtils'

const saltana = getSpyableSaltana()

test('check: sends the correct request', (t) => {
  const data = {
    permissions: [
      'asset:create:all',
      'category:read:all'
    ]
  }

  return saltana.permissions.check(data)
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/permissions/check',
        data,
        queryParams: {},
        headers: {}
      })
    })
})
