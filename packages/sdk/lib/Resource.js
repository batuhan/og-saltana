import axios from 'axios'
import method from './method'
import getBasicMethods from './method.basic'
import {
  addReadOnlyProperty,
  clone,
  isBrowser,
  pickBy,
  encodeBase64,
} from './utils'

export default class Resource {
  constructor (saltana) {
    this._saltana = saltana
  }

  _request ({ path, method, data, queryParams, options = {} }) {
    const requestParams = {
      url: path,
      method,
      baseURL: this.getBaseURL(),
      headers: this._prepareHeaders(options),
      timeout: this._saltana.getApiField('timeout'),
    }

    console.log({requestParams})

    if (queryParams && Object.keys(queryParams).length) {
      requestParams.params = queryParams
    }
    if (data && Object.keys(data).length) {
      requestParams.data = data
    }

    console.log({requestParams2: requestParams})

    return axios(requestParams)
      .then(this._responseHandler)
      .catch(this._errorHandler)
  }

  _responseHandler (res) {
    console.log({res})
    const response = clone(res.data)
    const headers = res.headers || {}

    const lastResponse = {
      requestId: headers['x-request-id'],
      statusCode: res.status,
    }

    addReadOnlyProperty(response, 'lastResponse', lastResponse)

    return response
  }

  _errorHandler (err) {
    if (!err.response) throw err

    console.log({err})
    const rawResponse = Object.assign({}, err.response)
    const error = Object.assign({}, rawResponse.data) // useful for tests (cannot add multiple times `lastResponse`)
    const headers = rawResponse.headers || {}

    const lastResponse = {
      requestId: headers['x-request-id'],
      statusCode: rawResponse.status,
    }

    console.error(lastResponse, err)
    addReadOnlyProperty(error, 'lastResponse', lastResponse)

    throw error
  }

  _prepareHeaders (options) {
    const apiKey = this._saltana.getApiField('key')
    const headers = {}

    // Migrating to 'Authorization: Basic|Bearer|SaltanaCore-V1' header
    const authorization = options.headers && options.headers.authorization // can only be Bearer token
    let token = authorization && /Bearer\s+([^\s]*)/i.exec(authorization)
    token = token && token[1]
    // Transforming to custom Authorization scheme
    // https://tools.ietf.org/html/draft-ietf-httpbis-p7-auth-19#appendix-B
    // Note that Saltana API header content parsing is case-insensitive
    // But we use casing for clarity here, as in 'apiKey'
    if (token) { headers.authorization = `SaltanaCore-V1 apiKey=${apiKey}, token=${token}` } else if (apiKey) { headers.authorization = `Basic ${encodeBase64(apiKey + ':')}` }

    // cannot set the user agent in browser environment for security reasons
    // https://github.com/axios/axios/issues/1231
    if (!isBrowser()) headers['user-agent'] = this._saltana.getUserAgent()

    const apiVersion = this._saltana.getApiField('version')
    if (apiVersion) headers['x-saltana-version'] = apiVersion

    const organizationId = this._saltana.getApiField('organizationId')
    if (organizationId) headers['x-saltana-organization-id'] = organizationId

    if (options.headers) {
      Object.assign(
        headers,
        pickBy(options.headers, (v, k) => k.toLowerCase() !== 'authorization')
      )
    }

    return pickBy(headers)
  }

  getBaseURL () {
    const protocol = this._saltana.getApiField('protocol')
    const host = this._saltana.getApiField('host')
    const port = this._saltana.getApiField('port')
    const path = this._saltana.getApiField('path')

    const baseURL = protocol + '://' + host + ([80, 443].includes(port) ? '' : `:${port}`) + path
    console.error(baseURL)
    return baseURL
  }

  static addBasicMethods (resource, { path, includeBasic = [] }) {
    const basicMethods = getBasicMethods(path, method)

    includeBasic.forEach(name => {
      resource.prototype[name] = basicMethods[name]
    })
  }
}

Resource.method = method
