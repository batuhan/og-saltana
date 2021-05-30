import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { capitalize } from 'lodash'
import jwt from 'jsonwebtoken'

import { createInstance } from '../lib/saltana'

export function getApiKey ({ type = 'seck' } = {}) {
  const secretKey = 'seck_test_wakWA41rBTUXs1Y5oNRjeY5o'
  const publishableKey = 'pubk_test_wakWA41rBTUXs1Y5oNRjeY5o'

  switch (type) {
    case 'seck':
      return secretKey
    case 'pubk':
      return publishableKey
    default:
      return secretKey
  }
}

export function getSpyableSaltana ({ keyType } = {}) {
  const key = getApiKey({ type: keyType })

  const saltana = createInstance({ apiKey: key })

  cleanSaltana(saltana)

  saltana.REQUESTS = []

  for (const i in saltana) {
    makeInstanceSpyable(saltana, saltana[i])
  }

  function makeInstanceSpyable (saltana, thisInstance) {
    patchRequest(saltana, thisInstance)
  }

  function patchRequest (saltana, instance) {
    instance._request = function ({ path, method, data, queryParams, options = {} }) {
      saltana.LAST_REQUEST = {
        path,
        method,
        data,
        queryParams,
        headers: options.headers || {}
      }

      saltana.REQUESTS.push(saltana.LAST_REQUEST)

      return Promise.resolve({})
    }
  }

  return saltana
}

export function getSaltanaStub ({ keyType, noKey } = {}) {
  const key = getApiKey({ type: keyType })

  const saltana = noKey ? createInstance({}) : createInstance({ apiKey: key })

  saltana._lastRequest = {}

  saltana.getLastRequest = () => saltana._lastRequest

  saltana.startStub = () => {
    const mock = new MockAdapter(axios)
    saltana._mock = mock
  }

  saltana.stopStub = () => {
    if (!saltana._mock) return
    saltana._mock.restore()
  }

  saltana.stubRequest = (url, { method, data, status, headers, response }) => {
    if (!saltana._mock) return

    const getMockingFnKey = `on${capitalize(method)}`
    saltana._mock[getMockingFnKey](url, data).reply(status, response, headers)
  }

  // to be able to get the last sent request config
  axios.interceptors.request.use(
    config => {
      saltana._lastRequest = { config }
      return config
    },
    Promise.reject
  )

  cleanSaltana(saltana)

  return saltana
}

export function encodeJwtToken (data, { secret = 'secret', expiresIn }) {
  const token = jwt.sign(data, secret, { expiresIn })
  return token
}

function cleanSaltana (saltana) {
  const tokenStore = saltana.getApiField('tokenStore')
  if (tokenStore) {
    tokenStore.removeTokens()
  }
}
