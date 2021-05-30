import test from 'blue-tape'
import sinon from 'sinon'

import { getSpyableSaltana, getSaltanaStub, encodeJwtToken } from '../../testUtils'

const saltana = getSpyableSaltana()

test('login: sends the correct request', (t) => {
  return saltana.auth.login({ username: 'foo', password: 'secretPassword' })
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/auth/login',
        data: { username: 'foo', password: 'secretPassword' },
        queryParams: {},
        headers: {}
      })
    })
})

test('logout: sends the correct request', (t) => {
  return saltana.auth.logout()
    .then(() => {
      t.deepEqual(saltana.LAST_REQUEST, {
        method: 'POST',
        path: '/auth/logout',
        data: {},
        queryParams: {},
        headers: {}
      })
    })
})

test('Stores authentication tokens after login', (t) => {
  const saltana = getSaltanaStub({ keyType: 'pubk' })

  saltana.startStub()

  const response = {
    tokenType: 'Bearer',
    userId: 'user_1',
    accessToken: encodeJwtToken({ userId: 'user_1' }, { expiresIn: '1h' }),
    refreshToken: '39ac0373-e457-4f7a-970f-20dc7d97e0d4'
  }

  const baseURL = saltana.auth.getBaseURL()
  saltana.stubRequest(`${baseURL}/auth/login`, {
    status: 200,
    method: 'post',
    headers: {
      'x-request-id': 'f1f25173-32a5-48da-aa2f-0079568abea0'
    },
    response
  })

  const tokenStore = saltana.getApiField('tokenStore')

  t.notOk(tokenStore.getTokens())

  return saltana.auth.login({ username: 'foo', password: 'secretPassword' })
    .then(() => {
      const tokens = tokenStore.getTokens()
      t.is(tokens.accessToken, response.accessToken)
      t.is(tokens.refreshToken, response.refreshToken)
    })
    .then(() => saltana.stopStub())
    .catch(err => {
      saltana.stopStub()
      throw err
    })
})

test('Removes authentication tokens after logout', (t) => {
  const saltana = getSaltanaStub({ keyType: 'pubk' })

  saltana.startStub()

  const response = {
    tokenType: 'Bearer',
    userId: 'user_1',
    accessToken: encodeJwtToken({ userId: 'user_1' }, { expiresIn: '1h' }),
    refreshToken: '39ac0373-e457-4f7a-970f-20dc7d97e0d4'
  }

  const baseURL = saltana.auth.getBaseURL()
  saltana.stubRequest(`${baseURL}/auth/login`, {
    status: 200,
    method: 'post',
    headers: {
      'x-request-id': 'f1f25173-32a5-48da-aa2f-0079568abea0'
    },
    response
  })
  saltana.stubRequest(`${baseURL}/auth/logout`, {
    status: 200,
    method: 'post',
    headers: {
      'x-request-id': 'e79a0f16-ebd1-468a-b35d-9ea9f6bcff0d'
    },
    response: { success: true }
  })

  const tokenStore = saltana.getApiField('tokenStore')

  t.notOk(tokenStore.getTokens())

  return saltana.auth.login({ username: 'foo', password: 'secretPassword' })
    .then(() => {
      const tokens = tokenStore.getTokens()
      t.is(tokens.accessToken, response.accessToken)
      t.is(tokens.refreshToken, response.refreshToken)

      return saltana.auth.logout()
    })
    .then(() => {
      const tokens = tokenStore.getTokens()
      t.notOk(tokens)
    })
    .then(() => saltana.stopStub())
    .catch(err => {
      saltana.stopStub()
      throw err
    })
})

test('Refreshes authentication tokens when access token is expired', (t) => {
  const clock = sinon.useFakeTimers()

  const saltana = getSaltanaStub({ keyType: 'pubk' })

  const loginResponse = {
    tokenType: 'Bearer',
    userId: 'user_1',
    accessToken: encodeJwtToken({ userId: 'user_1' }, { expiresIn: '1h' }),
    refreshToken: '39ac0373-e457-4f7a-970f-20dc7d97e0d4'
  }
  const refreshTokenResponse = {
    tokenType: 'Bearer',
    // add num in JWT token to differentiate from the first one
    accessToken: encodeJwtToken({ userId: 'user_1', num: 2 }, { expiresIn: '1h' })
  }

  saltana.startStub()

  const baseURL = saltana.auth.getBaseURL()
  saltana.stubRequest(`${baseURL}/auth/login`, {
    status: 200,
    method: 'post',
    headers: {
      'x-request-id': 'f1f25173-32a5-48da-aa2f-0079568abea0'
    },
    response: loginResponse
  })
  saltana.stubRequest(`${baseURL}/auth/token`, {
    status: 200,
    method: 'post',
    headers: {
      'x-request-id': '9a0419b6-8d67-4584-b9bd-8ccb32a95248'
    },
    response: refreshTokenResponse
  })
  saltana.stubRequest(`${baseURL}/assets/asset_1`, {
    status: 200,
    method: 'get',
    headers: {
      'x-request-id': 'ca4b0b1f-2c0b-4eed-858e-d76d097615ae'
    },
    response: {
      id: 'asset_id',
      name: 'Asset example'
    }
  })

  const tokenStore = saltana.getApiField('tokenStore')

  t.notOk(tokenStore.getTokens())

  const isTokenRefreshed = (refreshed) => {
    return saltana.assets.read('asset_1')
      .then(() => {
        const tokens = tokenStore.getTokens()
        t.is(tokens.refreshToken, loginResponse.refreshToken)

        if (refreshed) {
          t.is(tokens.accessToken, refreshTokenResponse.accessToken)
        } else {
          t.is(tokens.accessToken, loginResponse.accessToken)
        }
      })
  }

  return saltana.auth.login({ username: 'foo', password: 'secretPassword' })
    .then(() => {
      const tokens = tokenStore.getTokens()
      t.is(tokens.accessToken, loginResponse.accessToken)
      t.is(tokens.refreshToken, loginResponse.refreshToken)
    })
    .then(() => isTokenRefreshed(false))
    .then(() => {
      clock.tick(3600 * 1000)
      return isTokenRefreshed(false)
    })
    .then(() => {
      clock.tick(1 * 1000)
      return isTokenRefreshed(true)
    })
    .then(() => {
      saltana.stopStub()
      clock.restore()
    })
    .catch(err => {
      saltana.stopStub()
      clock.restore()
      throw err
    })
})

test('Do not need to refresh authentication token if using secret API key', (t) => {
  const clock = sinon.useFakeTimers()

  const saltana = getSaltanaStub({ keyType: 'seck' })

  saltana.startStub()

  const tokensToStore = {
    accessToken: encodeJwtToken({ userId: 'user_1' }, { expiresIn: '1h' }),
    refreshToken: '39ac0373-e457-4f7a-970f-20dc7d97e0d4'
  }

  const baseURL = saltana.auth.getBaseURL()
  saltana.stubRequest(`${baseURL}/assets/asset_1`, {
    status: 200,
    method: 'get',
    headers: {
      'x-request-id': 'ca4b0b1f-2c0b-4eed-858e-d76d097615ae'
    },
    response: {
      id: 'asset_id',
      name: 'Asset example'
    }
  })

  const tokenStore = saltana.getApiField('tokenStore')
  tokenStore.setTokens(tokensToStore)

  t.deepEqual(tokenStore.getTokens(), tokensToStore)

  const checkTokenNotRefreshed = () => {
    return saltana.assets.read('asset_1')
      .then(() => {
        const tokens = tokenStore.getTokens()
        t.is(tokens.refreshToken, tokensToStore.refreshToken)
        t.is(tokens.accessToken, tokensToStore.accessToken)
      })
  }

  return Promise.resolve()
    .then(() => checkTokenNotRefreshed())
    .then(() => {
      clock.tick(3600 * 1000)
      return checkTokenNotRefreshed()
    })
    .then(() => {
      clock.tick(1 * 1000)
      return checkTokenNotRefreshed()
    })
    .then(() => {
      saltana.stopStub()
      clock.restore()
    })
    .catch(err => {
      saltana.stopStub()
      clock.restore()
      throw err
    })
})

test('Calls the callback function `beforeRefreshToken` before token expiration', (t) => {
  const clock = sinon.useFakeTimers()

  const saltana = getSaltanaStub({ keyType: 'pubk' })

  let beforeRefreshTokenCalled = false

  const beforeRefreshToken = (tokens, cb) => {
    beforeRefreshTokenCalled = true

    t.is(typeof tokens, 'object')
    t.is(tokens.accessToken, loginResponse.accessToken)
    t.is(tokens.refreshToken, loginResponse.refreshToken)
    cb(null, tokens)
  }

  saltana.setBeforeRefreshToken(beforeRefreshToken)

  const loginResponse = {
    tokenType: 'Bearer',
    userId: 'user_1',
    accessToken: encodeJwtToken({ userId: 'user_1' }, { expiresIn: '1h' }),
    refreshToken: '39ac0373-e457-4f7a-970f-20dc7d97e0d4'
  }

  saltana.startStub()

  const baseURL = saltana.auth.getBaseURL()
  saltana.stubRequest(`${baseURL}/auth/login`, {
    status: 200,
    method: 'post',
    headers: {
      'x-request-id': 'f1f25173-32a5-48da-aa2f-0079568abea0'
    },
    response: loginResponse
  })
  saltana.stubRequest(`${baseURL}/assets/asset_1`, {
    status: 200,
    method: 'get',
    headers: {
      'x-request-id': 'ca4b0b1f-2c0b-4eed-858e-d76d097615ae'
    },
    response: {
      id: 'asset_id',
      name: 'Asset example'
    }
  })

  const tokenStore = saltana.getApiField('tokenStore')

  const isBeforeRefreshTokenCalled = (called) => {
    return saltana.assets.read('asset_1')
      .then(() => {
        t.is(called, beforeRefreshTokenCalled)
      })
  }

  return saltana.auth.login({ username: 'foo', password: 'secretPassword' })
    .then(() => {
      const tokens = tokenStore.getTokens()
      t.is(tokens.accessToken, loginResponse.accessToken)
      t.is(tokens.refreshToken, loginResponse.refreshToken)
    })
    .then(() => {
      return isBeforeRefreshTokenCalled(false)
    })
    .then(() => {
      clock.tick(3600 * 1000)
      return isBeforeRefreshTokenCalled(false)
    })
    .then(() => {
      clock.tick(1 * 1000)
      return isBeforeRefreshTokenCalled(true)
    })
    .then(() => {
      saltana.stopStub()
      clock.restore()
    })
    .catch(err => {
      saltana.stopStub()
      clock.restore()
      throw err
    })
})

test('Calls the promise `beforeRefreshToken` before token expiration', (t) => {
  const clock = sinon.useFakeTimers()

  const saltana = getSaltanaStub({ keyType: 'pubk' })

  let beforeRefreshTokenCalled = false

  const beforeRefreshToken = (tokens) => {
    return Promise.resolve()
      .then(() => {
        beforeRefreshTokenCalled = true

        t.is(typeof tokens, 'object')
        t.is(tokens.accessToken, loginResponse.accessToken)
        t.is(tokens.refreshToken, loginResponse.refreshToken)
        return tokens
      })
  }

  saltana.setBeforeRefreshToken(beforeRefreshToken)

  const loginResponse = {
    tokenType: 'Bearer',
    userId: 'user_1',
    accessToken: encodeJwtToken({ userId: 'user_1' }, { expiresIn: '1h' }),
    refreshToken: '39ac0373-e457-4f7a-970f-20dc7d97e0d4'
  }

  saltana.startStub()

  const baseURL = saltana.auth.getBaseURL()
  saltana.stubRequest(`${baseURL}/auth/login`, {
    status: 200,
    method: 'post',
    headers: {
      'x-request-id': 'f1f25173-32a5-48da-aa2f-0079568abea0'
    },
    response: loginResponse
  })
  saltana.stubRequest(`${baseURL}/assets/asset_1`, {
    status: 200,
    method: 'get',
    headers: {
      'x-request-id': 'ca4b0b1f-2c0b-4eed-858e-d76d097615ae'
    },
    response: {
      id: 'asset_id',
      name: 'Asset example'
    }
  })

  const tokenStore = saltana.getApiField('tokenStore')

  const isBeforeRefreshTokenCalled = (called) => {
    return saltana.assets.read('asset_1')
      .then(() => {
        t.is(called, beforeRefreshTokenCalled)
      })
  }

  return saltana.auth.login({ username: 'foo', password: 'secretPassword' })
    .then(() => {
      const tokens = tokenStore.getTokens()
      t.is(tokens.accessToken, loginResponse.accessToken)
      t.is(tokens.refreshToken, loginResponse.refreshToken)
    })
    .then(() => {
      return isBeforeRefreshTokenCalled(false)
    })
    .then(() => {
      clock.tick(3600 * 1000)
      return isBeforeRefreshTokenCalled(false)
    })
    .then(() => {
      clock.tick(1 * 1000)
      return isBeforeRefreshTokenCalled(true)
    })
    .then(() => {
      saltana.stopStub()
      clock.restore()
    })
    .catch(err => {
      saltana.stopStub()
      clock.restore()
      throw err
    })
})

test('Stores authentication tokens after getting token', (t) => {
  const saltana = getSaltanaStub({ keyType: 'pubk' })

  saltana.startStub()

  const response = {
    tokenType: 'Bearer',
    userId: 'user_1',
    accessToken: encodeJwtToken({ userId: 'user_1' }, { expiresIn: '1h' }),
    refreshToken: '39ac0373-e457-4f7a-970f-20dc7d97e0d4'
  }

  const baseURL = saltana.auth.getBaseURL()
  saltana.stubRequest(`${baseURL}/auth/token`, {
    status: 200,
    method: 'post',
    headers: {
      'x-request-id': 'f1f25173-32a5-48da-aa2f-0079568abea0'
    },
    response
  })

  const tokenStore = saltana.getApiField('tokenStore')

  t.notOk(tokenStore.getTokens())

  return saltana.auth.getTokens({ grantType: 'authorizationCode', code: 'some_code' })
    .then(() => {
      const tokens = tokenStore.getTokens()
      t.is(tokens.accessToken, response.accessToken)
      t.is(tokens.refreshToken, response.refreshToken)
    })
    .then(() => saltana.stopStub())
    .catch(err => {
      saltana.stopStub()
      throw err
    })
})

test('check: sends the correct request', (t) => {
  const saltana = getSaltanaStub({ keyType: 'pubk' })

  saltana.startStub()

  const baseURL = saltana.auth.getBaseURL()
  saltana.stubRequest(`${baseURL}/auth/check`, {
    status: 200,
    method: 'post',
    headers: {
      'x-request-id': 'f1f25173-32a5-48da-aa2f-0079568abea0'
    },
    response: {
      valid: false,
      apiKey: null,
      user: null,
      tokenExpired: null
    }
  })

  const apiKey = 'apiKey_1'
  const authorization = 'some_authorization'

  return saltana.auth.check()
    .then(() => {
      const request = saltana.getLastRequest()
      const headers = request.config.headers
      const data = request.config.data

      t.true(headers.authorization.startsWith('Basic'))
      t.is(typeof data, 'undefined')

      return saltana.auth.check({ apiKey })
    })
    .then(() => {
      const request = saltana.getLastRequest()
      const headers = request.config.headers
      const data = JSON.parse(request.config.data)

      t.true(headers.authorization.startsWith('Basic'))
      t.is(data.apiKey, apiKey)
      t.is(typeof data.authorization, 'undefined')

      return saltana.auth.check({ authorization })
    })
    .then(() => {
      const request = saltana.getLastRequest()
      const headers = request.config.headers
      const data = JSON.parse(request.config.data)

      t.true(headers.authorization.startsWith('Basic'))
      t.is(typeof data.apiKey, 'undefined')
      t.is(data.authorization, authorization)

      return saltana.auth.check({ apiKey, authorization })
    })
    .then(() => {
      const request = saltana.getLastRequest()
      const headers = request.config.headers
      const data = JSON.parse(request.config.data)

      t.true(headers.authorization.startsWith('Basic'))
      t.is(data.apiKey, apiKey)
      t.is(data.authorization, authorization)
    })
    .then(() => saltana.stopStub())
    .catch(err => {
      saltana.stopStub()
      throw err
    })
})
