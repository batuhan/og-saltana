import test from 'blue-tape'

import { getSpyableSaltana } from '../../testUtils'

const saltana = getSpyableSaltana()

test('list: sends the correct request', (t) => {
  return saltana.assetTypes.list()
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/asset-types',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('read: sends the correct request', (t) => {
  return saltana.assetTypes.read('assetType_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/asset-types/assetType_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('create: sends the correct request', (t) => {
  return saltana.assetTypes.create({ name: 'New asset type' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/asset-types',
        data: { name: 'New asset type' },
        queryParams: {},
        headers: {}
      })
    })
})

test('update: sends the correct request', (t) => {
  return saltana.assetTypes.update('assetType_1', { name: 'Updated asset type' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'PATCH',
        path: '/asset-types/assetType_1',
        data: { name: 'Updated asset type' },
        queryParams: {},
        headers: {}
      })
    })
})

test('remove: sends the correct request', (t) => {
  return saltana.assetTypes.remove('assetType_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'DELETE',
        path: '/asset-types/assetType_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})
