import test from 'blue-tape'
import sinon from 'sinon'

import {
  getApiKey,
  getSpyableSaltana,
  getSaltanaStub,
  encodeJwtToken,
} from '../testUtils'

import { decodeBase64 } from '../lib/utils'

import { Saltana, createInstance } from '../lib/saltana'

test('Sets the API key', t => {
  const saltana = createInstance({
    apiKey: 'seck_test_example1',
  })
  t.is(saltana.getApiField('key'), 'seck_test_example1')

  saltana.setApiKey('seck_test_example2')
  t.is(saltana.getApiField('key'), 'seck_test_example2')

  t.end()
})

test('Set a custom timeout', t => {
  const saltana = getSpyableSaltana()

  t.is(saltana.getApiField('timeout'), Saltana.DEFAULT_TIMEOUT)

  saltana.setTimeout(100)
  t.is(saltana.getApiField('timeout'), 100)

  saltana.setTimeout(null)
  t.is(saltana.getApiField('timeout'), Saltana.DEFAULT_TIMEOUT)

  t.end()
})

test('Methods work with callback', t => {
  const saltana = getSpyableSaltana()

  t.plan(2)

  saltana.categories.list((err, categories) => {
    t.notOk(err)
    t.ok(categories)
    t.end()
  })
})

test('Methods return a promise', t => {
  const saltana = getSpyableSaltana()

  return saltana.categories
    .list()
    .then(categories => t.ok(categories))
    .catch(err => t.notOk(err))
})

test('Sets Authorization header with token and apiKey', t => {
  const saltana = getSaltanaStub({ keyType: 'pubk' })
  saltana.startStub()
  const baseURL = saltana.auth.getBaseURL()
  const accessToken = encodeJwtToken({ userId: 'user_1' }, { expiresIn: '1h' })
  const testApiKey = getApiKey({ type: 'pubk' })

  const basicAuthorizationRegex = /Basic\s(.*)/i
  // Saltana custom Authorization scheme params
  // https://tools.ietf.org/html/draft-ietf-httpbis-p7-auth-19#appendix-B
  const saltanaSchemeParamRegex = /(apiKey|token)\s?=\s?([^,\s]*)/gi
  const expectedParams = {
    apiKey: testApiKey,
    token: accessToken,
  }
  // Expects RegExp exec object
  const validateSchemeParam = exec =>
    exec && exec[2] === expectedParams[exec[1]]

  saltana.stubRequest(`${baseURL}/auth/login`, {
    status: 200,
    method: 'post',
    headers: { 'x-request-id': 'f1f25173-32a5-48da-aa2f-0079568abea0' },
    response: {
      tokenType: 'Bearer',
      userId: 'user_1',
      accessToken,
      refreshToken: '39ac0373-e457-4f7a-970f-20dc7d97e0d4',
    },
  })

  saltana.stubRequest(`${baseURL}/users/user_1`, {
    status: 200,
    method: 'get',
    headers: { 'x-request-id': 'ca4b0b1f-2c0b-4eed-858e-d76d097615ae' },
    response: {
      id: 'user_1',
      username: 'foo',
      firstname: 'Foo',
      lastname: 'Bar',
    },
  })

  saltana.stubRequest(`${baseURL}/auth/logout`, {
    status: 200,
    method: 'post',
    headers: { 'x-request-id': 'e79a0f16-ebd1-468a-b35d-9ea9f6bcff0d' },
    response: { success: true },
  })

  return saltana.users
    .read('user_1')
    .then(() => {
      const request = saltana.getLastRequest()
      const headers = request.config.headers
      const basic = headers.authorization.match(basicAuthorizationRegex)

      t.true(decodeBase64(basic[1]) === `${testApiKey}:`)

      return saltana.auth.login({ username: 'foo', password: 'secretPassword' })
    })
    .then(() => {
      const request = saltana.getLastRequest()
      const headers = request.config.headers
      const basic = headers.authorization.match(basicAuthorizationRegex)

      t.true(decodeBase64(basic[1]) === `${testApiKey}:`)

      return saltana.users.read('user_1')
    })
    .then(() => {
      const request = saltana.getLastRequest()
      const headers = request.config.headers

      const saltanaSchemeParam1 = saltanaSchemeParamRegex.exec(
        headers.authorization
      )
      const saltanaSchemeParam2 = saltanaSchemeParamRegex.exec(
        headers.authorization
      )
      // Should reset RexExp lastIndex
      const saltanaSchemeParam3 = saltanaSchemeParamRegex.exec(
        headers.authorization
      )

      t.true(headers.authorization.startsWith('SaltanaCore-V1 '))
      t.true(headers.authorization.includes(',')) // 2 auth-params
      // Checking we have both apiKey and token
      t.not(saltanaSchemeParam1[1], saltanaSchemeParam2[1])
      t.not(saltanaSchemeParam1[2], saltanaSchemeParam2[2])
      t.true(saltanaSchemeParam3 === null)
      t.true(validateSchemeParam(saltanaSchemeParam1))
      t.true(validateSchemeParam(saltanaSchemeParam2))

      return saltana.auth.logout()
    })
    .then(() => {
      const request = saltana.getLastRequest()
      const headers = request.config.headers

      const saltanaSchemeParam1 = saltanaSchemeParamRegex.exec(
        headers.authorization
      )
      const saltanaSchemeParam2 = saltanaSchemeParamRegex.exec(
        headers.authorization
      )
      const saltanaSchemeParam3 = saltanaSchemeParamRegex.exec(
        headers.authorization
      )

      t.true(headers.authorization.startsWith('SaltanaCore-V1 '))
      t.true(headers.authorization.includes(',')) // 2 auth-params
      // Checking we have both apiKey and token
      t.not(saltanaSchemeParam1[1], saltanaSchemeParam2[1])
      t.not(saltanaSchemeParam1[2], saltanaSchemeParam2[2])
      t.true(saltanaSchemeParam3 === null)
      t.true(validateSchemeParam(saltanaSchemeParam1))
      t.true(validateSchemeParam(saltanaSchemeParam2))

      return saltana.users.read('user_1')
    })
    .then(() => {
      const request = saltana.getLastRequest()
      const headers = request.config.headers
      const basic = headers.authorization.match(basicAuthorizationRegex)

      t.true(decodeBase64(basic[1]) === `${testApiKey}:`)
    })
    .then(() => saltana.stopStub())
    .catch(err => {
      saltana.stopStub()
      throw err
    })
})

test('Does not set Basic Authorization header when apiKey is missing', t => {
  const saltana = getSaltanaStub({ noKey: true })
  saltana.startStub()
  const baseURL = saltana.auth.getBaseURL()

  saltana.stubRequest(`${baseURL}/search`, {
    status: 200,
    method: 'post',
    headers: { 'x-request-id': 'ca4b0b1f-2c0b-4eed-858e-d76d097615ae' },
    response: {
      page: 1,
      nbResults: 0,
      results: [],
    },
  })

  return saltana.search
    .list({ query: 'test' })
    .then(() => {
      const request = saltana.getLastRequest()
      const headers = request.config.headers

      t.notOk(headers.authorization)
    })
    .then(saltana.stopStub)
    .catch(err => {
      saltana.stopStub()
      throw err
    })
})

test('Set the API version for a specific request', t => {
  const saltana = getSpyableSaltana()

  return saltana.categories
    .list()
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/categories',
        data: {},
        queryParams: {},
        headers: {},
      })
    })
    .then(() => {
      return saltana.categories.list({ saltanaVersion: '2018-07-30' })
    })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/categories',
        data: {},
        queryParams: {},
        headers: {
          'x-saltana-version': '2018-07-30',
        },
      })
    })
})

test('Set the target user for a specific request', t => {
  const saltana = getSpyableSaltana()

  return saltana.categories
    .list()
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/categories',
        data: {},
        queryParams: {},
        headers: {},
      })
    })
    .then(() => {
      return saltana.categories.list({ saltanaUserId: 'user_1' })
    })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/categories',
        data: {},
        queryParams: {},
        headers: {
          'x-saltana-user-id': 'user_1',
        },
      })
    })
})

test('Set the target organization for a specific request', t => {
  const saltana = getSpyableSaltana()

  return saltana.users
    .list()
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/users',
        data: {},
        queryParams: {},
        headers: {},
      })
    })
    .then(() => {
      return saltana.users.list({ saltanaOrganizationId: 'organization_1' })
    })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/users',
        data: {},
        queryParams: {},
        headers: {
          'x-saltana-organization-id': 'organization_1',
        },
      })
    })
})

test('Override the global target organization for a specific request', t => {
  const saltana = getSpyableSaltana()

  saltana.setOrganizationId('organization_1')

  return saltana.users
    .list()
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/users',
        data: {},
        queryParams: {},
        headers: {}, // global headers don't display here
      })
    })
    .then(() => {
      return saltana.users.list({ saltanaOrganizationId: 'organization_2' })
    })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/users',
        data: {},
        queryParams: {},
        headers: {
          'x-saltana-organization-id': 'organization_2',
        },
      })
    })
})

test('Remove the target organization for a specific request', t => {
  const saltana = getSpyableSaltana()

  saltana.setOrganizationId('organization_1')

  return saltana.users
    .list()
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/users',
        data: {},
        queryParams: {},
        headers: {}, // global headers don't display here
      })
    })
    .then(() => {
      return saltana.users.list({ saltanaOrganizationId: null })
    })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'GET',
        path: '/users',
        data: {},
        queryParams: {},
        headers: {
          'x-saltana-organization-id': null, // null value will be removed when sending the requets
        },
      })
    })
})

test('Sets the token store', t => {
  const saltana = getSpyableSaltana()

  const tokenStore = {
    getTokens: function () {},
    setTokens: function () {},
    removeTokens: function () {},
  }

  saltana.setTokenStore(tokenStore)
  t.is(saltana.getApiField('tokenStore'), tokenStore)
  t.end()
})

test('Methods return lastResponse', t => {
  const saltana = getSaltanaStub()

  saltana.startStub()

  const baseURL = saltana.assets.getBaseURL()
  saltana.stubRequest(`${baseURL}/assets/asset_1`, {
    status: 200,
    method: 'get',
    headers: {
      'x-request-id': 'f1f25173-32a5-48da-aa2f-0079568abea0',
    },
    response: { id: 'asset_1', name: 'Asset 1' },
  })

  return saltana.assets
    .read('asset_1')
    .then(asset => {
      t.deepEqual(asset, { id: 'asset_1', name: 'Asset 1' })
      t.deepEqual(asset.lastResponse, {
        statusCode: 200,
        requestId: 'f1f25173-32a5-48da-aa2f-0079568abea0',
      })
    })
    .then(() => saltana.stopStub())
    .catch(err => {
      saltana.stopStub()
      throw err
    })
})

test('Methods return paginationMeta for list endpoints', t => {
  const saltana = getSaltanaStub()

  saltana.startStub()

  const baseURL = saltana.assets.getBaseURL()
  saltana.stubRequest(`${baseURL}/assets`, {
    status: 200,
    method: 'get',
    headers: {
      'x-request-id': 'f1f25173-32a5-48da-aa2f-0079568abea0',
    },
    response: {
      nbResults: 2,
      nbPages: 1,
      page: 1,
      nbResultsPerPage: 10,
      results: [
        { id: 'asset_1', name: 'Asset 1' },
        { id: 'asset_2', name: 'Asset 2' },
      ],
    },
  })
  saltana.stubRequest(`${baseURL}/users`, {
    status: 200,
    method: 'get',
    headers: {
      'x-request-id': 'b8eb517d-5f2e-4a49-83f2-321e66a980fb',
    },
    response: {
      hasPreviousPage: false,
      hasNextPage: false,
      startCursor: 'startCursor',
      endCursor: 'endCursor',
      nbResultsPerPage: 10,
      results: [
        { id: 'user_1', displayName: 'User 1' },
        { id: 'User_2', displayName: 'user 2' },
      ],
    },
  })

  return saltana.assets
    .list()
    .then(assets => {
      // offset pagination
      t.deepEqual(assets, [
        { id: 'asset_1', name: 'Asset 1' },
        { id: 'asset_2', name: 'Asset 2' },
      ])
      t.deepEqual(assets.lastResponse, {
        statusCode: 200,
        requestId: 'f1f25173-32a5-48da-aa2f-0079568abea0',
      })
      t.deepEqual(assets.paginationMeta, {
        nbResults: 2,
        nbPages: 1,
        page: 1,
        nbResultsPerPage: 10,
      })

      return saltana.users.list()
    })
    .then(users => {
      // cursor pagination
      t.deepEqual(users, [
        { id: 'user_1', displayName: 'User 1' },
        { id: 'User_2', displayName: 'user 2' },
      ])
      t.deepEqual(users.lastResponse, {
        statusCode: 200,
        requestId: 'b8eb517d-5f2e-4a49-83f2-321e66a980fb',
      })
      t.deepEqual(users.paginationMeta, {
        hasPreviousPage: false,
        hasNextPage: false,
        startCursor: 'startCursor',
        endCursor: 'endCursor',
        nbResultsPerPage: 10,
      })
    })
    .then(() => saltana.stopStub())
    .catch(err => {
      saltana.stopStub()
      throw err
    })
})

test('Methods return array from list endpoints without pagination', t => {
  const saltana = getSaltanaStub()

  saltana.startStub()

  const baseURL = saltana.workflows.getBaseURL()
  saltana.stubRequest(`${baseURL}/workflows`, {
    status: 200,
    method: 'get',
    headers: {
      'x-request-id': 'f1f25173-32a5-48da-aa2f-0079568abea0',
    },
    response: [],
  })
  saltana.stubRequest(`${baseURL}/webhooks`, {
    status: 200,
    method: 'get',
    headers: {
      'x-request-id': 'ca4b0b1f-2c0b-4eed-858e-d76d097615ae',
    },
    response: [
      { id: 'webhook_1', name: 'Webhook 1' },
      { id: 'webhook_2', name: 'Webhook 2' },
    ],
  })

  return saltana.workflows
    .list()
    .then(workflows => {
      t.true(Array.isArray(workflows))
      t.is(workflows.length, 0)
      t.deepEqual(workflows.lastResponse, {
        statusCode: 200,
        requestId: 'f1f25173-32a5-48da-aa2f-0079568abea0',
      })

      return saltana.webhooks.list()
    })
    .then(webhooks => {
      t.true(Array.isArray(webhooks))
      t.deepEqual(webhooks, [
        { id: 'webhook_1', name: 'Webhook 1' },
        { id: 'webhook_2', name: 'Webhook 2' },
      ])
      t.deepEqual(webhooks.lastResponse, {
        statusCode: 200,
        requestId: 'ca4b0b1f-2c0b-4eed-858e-d76d097615ae',
      })
    })
    .then(() => saltana.stopStub())
    .catch(err => {
      saltana.stopStub()
      throw err
    })
})

test('Emits an event when the user session has expired', t => {
  const saltana = getSaltanaStub({ keyType: 'pubk' })

  saltana.startStub()

  const clock = sinon.useFakeTimers()

  const baseURL = saltana.auth.getBaseURL()
  const accessToken = encodeJwtToken({ userId: 'user_1' }, { expiresIn: '1h' })

  let called1 = 0
  let called2 = 0

  let firstError
  let secondError

  const unsubscribe1 = saltana.onError('userSessionExpired', () => {
    called1 += 1
  })
  saltana.onError('userSessionExpired', () => {
    called2 += 1
  })

  saltana.stubRequest(`${baseURL}/auth/token`, {
    status: 403,
    method: 'post',
    headers: {
      'x-request-id': 'f1f25173-32a5-48da-aa2f-0079568abea0',
    },
    response: {
      message: 'Refresh token expired',
    },
  })

  saltana.stubRequest(`${baseURL}/auth/login`, {
    status: 200,
    method: 'post',
    headers: { 'x-request-id': 'f1f25173-32a5-48da-aa2f-0079568abea0' },
    response: {
      tokenType: 'Bearer',
      userId: 'user_1',
      accessToken,
      refreshToken: '39ac0373-e457-4f7a-970f-20dc7d97e0d4',
    },
  })

  saltana.stubRequest(`${baseURL}/assets`, {
    status: 200,
    method: 'get',
    headers: { 'x-request-id': 'ca4b0b1f-2c0b-4eed-858e-d76d097615ae' },
    response: {
      nbResults: 0,
      nbPages: 0,
      page: 1,
      nbResultsPerPage: 20,
      results: [],
    },
  })

  return saltana.auth
    .login({ username: 'foo', password: 'secretPassword' })
    .then(() => {
      clock.tick(1000)
      return saltana.assets.list()
    })
    .then(() => {
      clock.tick(3600 * 1000)
      return saltana.assets.list().catch(err => {
        firstError = err
      })
    })
    .then(() => {
      unsubscribe1()

      // recreate the authentication tokens
      return saltana.auth.login({ username: 'foo', password: 'secretPassword' })
    })
    .then(() => {
      return saltana.assets.list().catch(err => {
        secondError = err
      })
    })
    .then(() => {
      t.ok(firstError)
      t.ok(secondError)

      t.is(called1, 1)
      t.is(called2, 2)

      saltana.stopStub()
      clock.restore()

      const tokenStore = saltana.getTokenStore()
      tokenStore.removeTokens() // clear tokens for other tests
    })
})
