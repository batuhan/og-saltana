import { createDefaultTokenStore } from './tokenStore'
import { errorTypes } from './errors'

import ApiKeys from './resources/ApiKeys'
import Assets from './resources/Assets'
import AssetTypes from './resources/AssetTypes'
import Auth from './resources/Auth'
import Availabilities from './resources/Availabilities'
import Categories from './resources/Categories'
import Config from './resources/Config'
import CustomAttributes from './resources/CustomAttributes'
import Documents from './resources/Documents'
import Entries from './resources/Entries'
import Events from './resources/Events'
import Forward from './resources/Forward'
import Messages from './resources/Messages'
import OrderLines from './resources/OrderLines'
import OrderMoves from './resources/OrderMoves'
import Orders from './resources/Orders'
import Password from './resources/Password'
import Permissions from './resources/Permissions'
import Providers from './resources/Providers'
import Ratings from './resources/Ratings'
import Roles from './resources/Roles'
import SavedSearch from './resources/SavedSearch'
import Search from './resources/Search'
import Tasks from './resources/Tasks'
import Tokens from './resources/Tokens'
import Transactions from './resources/Transactions'
import Users from './resources/Users'
import Webhooks from './resources/Webhooks'
import Links from './resources/Links'
import Workflows from './resources/Workflows'

const resources = {
  ApiKeys,
  Assets,
  AssetTypes,
  Auth,
  Availabilities,
  Categories,
  Config,
  CustomAttributes,
  Documents,
  Entries,
  Events,
  Forward,
  Messages,
  OrderLines,
  OrderMoves,
  Orders,
  Password,
  Permissions,
  Providers,
  Ratings,
  Roles,
  SavedSearch,
  Search,
  Tasks,
  Tokens,
  Transactions,
  Users,
  Webhooks,
  Links,
  Workflows,
}

// export Saltana for tests
export class Saltana {
  /**
   * @param {Object} params
   * @param {String} [params.apiKey]
   * @param {String} [params.apiVersion]
   * @param {Object} [params.tokenStore]
   * @param {Function} [params.beforeRefreshToken]
   */
  constructor(params) {
    if (!params || typeof params !== 'object') {
      throw new Error(
        'A configuration object is expected to initialize Saltana SDK'
      )
    }

    const {
      apiKey,
      apiVersion,
      tokenStore,
      beforeRefreshToken,
      apiHost = Saltana.DEFAULT_HOST,
      apiProtocol = Saltana.DEFAULT_PROTOCOL,
      apiPort = Saltana.DEFAULT_PORT,
      apiPath = Saltana.DEFAULT_PATH
    } = params

    this._api = {
      key: null,
      host: apiHost,
      protocol: apiProtocol,
      port: apiPort,
      path: apiPath,
      version: Saltana.DEFAULT_API_VERSION,
      timeout: Saltana.DEFAULT_TIMEOUT,
      tokenStore: null,
      beforeRefreshToken: null,
      organizationId: null,
      errorListeners: {},
    }

    this._initResources()
    this.setApiKey(apiKey)
    this.setApiVersion(apiVersion)

    this.setTokenStore(tokenStore || createDefaultTokenStore())

    this.setBeforeRefreshToken(beforeRefreshToken)
  }

  setHost(host, port, protocol) {
    this._setApiField('host', host)
    if (port) {
      this.setPort(port)
    }
    if (protocol) {
      this.setProtocol(protocol)
    }
  }

  setProtocol(protocol) {
    this._setApiField('protocol', protocol.toLowerCase())
  }

  setPort(port) {
    this._setApiField('port', port)
  }

  setPath(path) {
    this._setApiField('path', path)
  }

  setApiVersion(key) {
    if (key) {
      this._setApiField('version', key)
    }
  }

  setApiKey(key) {
    if (key) {
      this._setApiField('key', key)
    }
  }

  setTimeout(timeout) {
    this._setApiField(
      'timeout',
      typeof timeout === 'number' ? timeout : Saltana.DEFAULT_TIMEOUT
    )
  }

  getTokenStore() {
    return this.getApiField('tokenStore') || null
  }

  setTokenStore(tokenStore) {
    const validTokenStore = this.isValidTokenStore(tokenStore)

    if (validTokenStore) {
      this._setApiField('tokenStore', tokenStore)
    }
  }

  isValidTokenStore(tokenStore) {
    return (
      tokenStore &&
      typeof tokenStore === 'object' &&
      typeof tokenStore.getTokens === 'function' &&
      typeof tokenStore.setTokens === 'function' &&
      typeof tokenStore.removeTokens === 'function'
    )
  }

  setBeforeRefreshToken(beforeRefreshToken) {
    if (typeof beforeRefreshToken !== 'function') return

    this._setApiField('beforeRefreshToken', beforeRefreshToken)
  }

  setOrganizationId(organizationId) {
    this._setApiField('organizationId', organizationId)
  }

  getApiField(key) {
    return this._api[key]
  }

  _setApiField(key, value) {
    this._api[key] = value
  }

  getConstant(c) {
    return Saltana[c]
  }

  getUserAgent() {
    let browserUserAgent
    if (typeof window !== 'undefined') {
      browserUserAgent = window.navigator && window.navigator.userAgent
    }

    return (
      Saltana.USER_AGENT_STRING +
      (browserUserAgent ? ' ' + browserUserAgent : '')
    )
  }

  _initResources() {
    for (const name in resources) {
      const key = name[0].toLowerCase() + name.substring(1)
      this[key] = new resources[name](this)
    }
  }

  onError(type, callback) {
    if (!errorTypes.includes(type)) {
      throw new Error(`Invalid error type: ${type}`)
    }

    const allListeners = this.getApiField('errorListeners')
    allListeners[type] = allListeners[type] || []
    allListeners[type].push(callback)

    return function unsubscribe() {
      allListeners[type] = allListeners[type].filter((cb) => cb !== callback)
    }
  }

  _emitError(type, error) {
    const allListeners = this.getApiField('errorListeners')

    const typeListeners = allListeners[type] || []
    typeListeners.forEach((listener) => {
      listener(error)
    })
  }
}

Saltana.DEFAULT_HOST = 'saltana.com'
Saltana.DEFAULT_PROTOCOL = 'https'
Saltana.DEFAULT_PORT = 80
Saltana.DEFAULT_PATH = '/api/v1'
Saltana.DEFAULT_API_VERSION = null
Saltana.DEFAULT_TIMEOUT = 30 * 1000 // 30s
Saltana.PACKAGE_VERSION = '1.0'
Saltana.USER_AGENT_STRING = `Saltana/${Saltana.PACKAGE_VERSION}`

export const createInstance = (...args) => {
  return new Saltana(...args)
}
