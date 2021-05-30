import test from 'blue-tape'

import { getSpyableSaltana } from '../../testUtils'

const saltana = getSpyableSaltana()

test('list: sends the correct request', (t) => {
  return saltana.workflows.list()
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/workflows',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('read: sends the correct request', (t) => {
  return saltana.workflows.read('workflow_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/workflows/workflow_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('create: sends the correct request', (t) => {
  const now = new Date().toISOString()

  const data = {
    name: 'Test workflow',
    event: 'asset__created',
    notifyUrl: 'https://example.com',
    computed: {
      assetTypeId: 'S.get("assetType", "id")',
      someString: "'wrapped in simple quotes'",
      startDate: `'${now}'`,
      endDate: `new Date(new Date('${now}').getTime() + (14 * 24 * 60 * 60 * 1000)).toISOString()`
    },
    run: {
      action: 'PATCH',
      endpointPath: '/asset-types/${computed.assetTypeId}', // eslint-disable-line no-template-curly-in-string
      endpointPayload: {
        metadata: {
          date1: 'computed.startDate',
          date2: 'computed.endDate',
          someString: 'computed.someString',
          otherString: "'works too'",
          assetId: 'computed.assetId',
          someResponse: 'S.get("endpointResponses", "id")'
        }
      }
    }
  }

  return saltana.workflows.create(data)
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/workflows',
        data,
        queryParams: {},
        headers: {}
      })
    })
})

test('update: sends the correct request', (t) => {
  return saltana.workflows.update('workflow_1', { name: 'Updated workflow' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'PATCH',
        path: '/workflows/workflow_1',
        data: { name: 'Updated workflow' },
        queryParams: {},
        headers: {}
      })
    })
})

test('remove: sends the correct request', (t) => {
  return saltana.workflows.remove('workflow_1')
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'DELETE',
        path: '/workflows/workflow_1',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})
