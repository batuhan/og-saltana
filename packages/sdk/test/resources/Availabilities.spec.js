import test from 'blue-tape'

import { getSpyableSaltana } from '../../testUtils'

const saltana = getSpyableSaltana()

test('getGraph: sends the correct request', (t) => {
  return saltana.availabilities.getGraph({ assetId: 'asset_1' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/availabilities/graph',
        data: {},
        queryParams: {
          assetId: 'asset_1'
        },
        headers: {}
      })
    })
})

test('list: sends the correct request', (t) => {
  return saltana.availabilities.list({ assetId: 'asset_1' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/availabilities',
        data: {},
        queryParams: {
          assetId: 'asset_1'
        },
        headers: {}
      })
    })
})

test('create: sends the correct request', (t) => {
  const data = {
    assetId: 'asset_1',
    startDate: '2018-01-01T00:00:00.000Z',
    endDate: '2018-01-10T00:00:00.000Z',
    quantity: 1
  }

  return saltana.availabilities.create(data)
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/availabilities',
        data,
        queryParams: {},
        headers: {}
      })
    })
})

test('update: sends the correct request', (t) => {
  const data = {
    startDate: '2018-01-01T00:00:00.000Z',
    endDate: '2018-01-10T00:00:00.000Z',
    quantity: 2
  }

  return saltana.availabilities.update('availability_1', data)
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'PATCH',
        path: '/availabilities/availability_1',
        data,
        queryParams: {},
        headers: {}
      })
    })
})

test('remove: sends the correct request', (t) => {
  return saltana.availabilities.remove('availability_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'DELETE',
        path: '/availabilities/availability_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})
