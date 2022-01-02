const jwt = require('jsonwebtoken')
const createError = require('http-errors')
const _ = require('lodash')
const apm = require('elastic-apm-node')
const crypto = require('crypto')

const config = require('config')

const { parseKey } = require('@saltana/util-keys')

const Uuid = require('uuid')
const { Base } = require('@saltana/db')
const {
  encoding: { decodeBase64 },
} = require('@saltana/utils')
const { systemNamespaces, protectedNamespaces } = require('@saltana/utils')
const { logError, log } = require('../server/logger')

const {
  clerk,
  verifyToken: verifyClerkToken,
} = require('./external-services/clerk')

const { parsePermission } = require('./permissions')

let localInstanceKey

// default system hash variables
let systemKeyHashFunction = defaultSystemKeyHashFunction
let systemHash = systemKeyHashFunction(config.get('SystemKey'))

let systemHashPassphrase

let apiKeyRequester
let authorizationRequester
let authenticationRequester
let configRequester
let userRequester
let roleRequester

function start({ communication }) {
  const { getRequester } = communication

  localInstanceKey = Uuid.v4().replace(/-/g, 'S')

  apiKeyRequester = getRequester({
    name: 'Auth > Api key Requester',
    key: 'api-key',
  })

  authorizationRequester = getRequester({
    name: 'Auth > Authorization Requester',
    key: 'authorization',
  })

  authenticationRequester = getRequester({
    name: 'Auth > Authentication Requester',
    key: 'authentication',
  })

  configRequester = getRequester({
    name: 'Auth > Config Requester',
    key: 'config',
  })

  roleRequester = getRequester({
    name: 'Auth > Role Requester',
    key: 'role',
  })

  userRequester = getRequester({
    name: 'Auth | User Requester',
    key: 'user',
  })
}

function stop() {
  apiKeyRequester.close()
  apiKeyRequester = null

  authorizationRequester.close()
  authorizationRequester = null

  authenticationRequester.close()
  authenticationRequester = null

  configRequester.close()
  configRequester = null

  roleRequester.close()
  roleRequester = null

  userRequester.close()
  userRequester = null
}

/**
 * Check if the passed JWT auth token is valid and not expired
 * @param {Object} authToken
 * @param {String} platformId
 * @param {String} env
 * @param {String} [apmLabel = 'Authentication token'] - APM span label for performance monitoring
 */
async function checkClerkAuthToken({
  authToken,
  platformId,
  env,
  apmLabel = 'Authentication token (Clerk)',
}) {
  const apmSpan = apm.startSpan(apmLabel)

  try {
    // verify & decode the token
    const decodedToken = await verifyClerkToken(authToken)
    const clerkUserId = decodedToken.sub

    if (!clerkUserId) {
      throw Error('No provider user ID in the given token')
    }

    const { user, isNew, updateAttrs } = await authenticationRequester.send({
      type: 'ssoLoginWithClerk',
      platformId,
      env,
      identifier: clerkUserId,
      provider: 'clerk',
    })

    // We'll have a way to cache the user's data in the future so
    // it's good not to depend on the full user object.

    return {
      user: {
        id: user.id,
        roles: user.roles,
      },
      providerId: clerkUserId,
    }
  } catch (err) {
    logError(err)
    throw err
    // if (err && config.get('Env') === 'test') {
    //   logError(err)
    // }
  } finally {
    apmSpan && apmSpan.end()
  }
}

/**
 * Check if the passed JWT auth token is valid and not expired
 * @param {Object} authToken
 * @param {String} platformId
 * @param {String} env
 * @param {String} [apmLabel = 'Authentication token'] - APM span label for performance monitoring
 */
async function checkAuthToken({
  authToken,
  platformId,
  env,
  apmLabel = 'Authentication token (V1)',
}) {
  const apmSpan = apm.startSpan(apmLabel)

  const data = {}

  const options = {}

  try {
    // const options = { algorithms: ['HS256'] }

    const secret = await authenticationRequester.send({
      type: '_getAuthSecret',
      platformId,
      env,
    })

    const decodedToken = await new Promise((resolve, reject) => {
      jwt.verify(authToken, secret, options, (err, decoded) => {
        if (err) {
          return reject(err)
        }
        resolve(decoded)
      })
    })

    data.user = {
      ...decodedToken,
    }
  } catch (err) {
    if (err && config.get('Env') === 'test') {
      logError(err)
    }
  } finally {
    apmSpan && apmSpan.end()
  }

  return {
    ...data,
  }
}

const TOKEN_VALIDATORS = {
  clerk: checkClerkAuthToken,
  legacy: checkAuthToken,
}

/**
 * Check if the passed JWT auth token is valid and not expired
 * @param {String} token
 * @param {String} tokenType
 * @param {String} platformId
 * @param {String} env
 */
async function tokenValidator({
  token,
  tokenType = 'legacy',
  platformId,
  env,
}) {
  const validator = TOKEN_VALIDATORS[tokenType]
  if (!validator) {
    throw Error(`Invalid token type: ${tokenType}`)
  }
  const validationResult = await validator({
    authToken: token,
    platformId,
    env,
  })

  // debugger
  return validationResult
}

function loadStrategies(server) {
  // Saltana Core v2 (supports Clerk)
  server.use(async (req, res, next) => {
    const bypassAuthTokenCheck =
      req._allowMissingPlatformId && (!req.platformId || !req.env)
    const hasToken = !!req.authorization.token

    if (bypassAuthTokenCheck || !hasToken) {
      return next()
    }

    const tokenType = _.get(req, 'authorization.tokenType', 'legacy')

    try {
      const validatorResult = await tokenValidator({
        tokenType,
        token: req.authorization.token,
        platformId: req.platformId,
        env: req.env,
      })

      if (!validatorResult.user) {
        // debugger
      }

      req.auth = {
        sub: validatorResult.user.id,
        ...validatorResult.user,
      }

      req._saltanaAuthToken = true

      next()
    } catch (err) {
      logError(err)
      req._saltanaAuthToken = false
      next(err)
    }
  })
}

function checkPermissions(
  permissions = [],
  {
    requestProperty = 'auth',
    apiKeyProperty = 'apiKey',
    permissionsProperty = 'matchedPermissions',
    rolesProperty = 'roles',
    readNamespacesProperty = 'readNamespaces',
    editNamespacesProperty = 'editNamespaces',
    targetUserIdProperty = 'targetUserId',
    organizationIdProperty = 'organizationId',
    realOrganizationIdProperty = 'realOrganizationId',
    getOrganizationIdFn,
    editProtectedNamespaces = false,
    optionalPermissions = [], // additional permissions to check, but won't trigger an error if missing
    optionalCheck = false, // if true, do not throw even if there is no matched permissions
    checkData = false, // if true, will check if the provided metadata/platformData can be edited with the provided namespaces
  } = {},
) {
  const publicRole = 'public'
  const addPublicRole = (roles) => _.uniq((roles || []).concat([publicRole]))

  const middleware = async (req, res, next) => {
    const apmSpan = apm.startSpan('Check permissions')

    const permissionsToCheck = permissions.slice(0)

    // Always check, in case platformData is edited via current endpoint
    if (!permissionsToCheck.includes('platformData:edit:all')) {
      permissionsToCheck.push('platformData:edit:all')
    }

    optionalPermissions.forEach((p) => permissionsToCheck.push(p))

    try {
      const token = req[requestProperty]
      const rawApiKey =
        _.get(req.authorization, 'apiKey') || req.headers['x-api-key'] // legacy x-api-key, convenient during development
      const saltanaWorkflowKey = req.headers['x-saltana-workflow-key']
      const targetUserId = req.headers['x-saltana-user-id']
      const userId = token && (token.sub || token.userId)
      let organizationId
      let realOrganizationId

      let accessInfo = {
        hashPermissions: {},
        arrayPermissions: [],
        readNamespaces: [],
        editNamespaces: [],
        roles: [],
      }

      const sources = []

      const { platformId } = req
      const { env } = req
      const plan = req._plan // can be set by some plugin
      const computeAccessParams = { platformId, env, plan, permissionsToCheck }

      const isSystemRequest = isSystem(req._systemHash)

      // do not duplicate permissions check in system
      // add behaviour of system like expose system namespace or do not obfuscate api keys
      const checkPermissionsFromSystem =
        isSystemRequest &&
        req.headers['x-saltana-system-permissions'] === 'check'

      let isPublishableApiKey = false

      if (rawApiKey) {
        sources.push('apiKey')

        if (typeof rawApiKey !== 'string') throw createError(401)

        const apiKey = await apiKeyRequester.send({
          type: '_getApiKey',
          key: rawApiKey,
          platformId,
          env,
        })

        if (!apiKey) throw createError(401)

        const parsedKey = parseKey(rawApiKey)
        isPublishableApiKey = parsedKey && parsedKey.type === 'pubk'

        req[apiKeyProperty] = apiKey
      }

      if (isSystemRequest && !checkPermissionsFromSystem) {
        sources.push('system')

        accessInfo.arrayPermissions = permissionsToCheck
        accessInfo.readNamespaces = ['*']
        accessInfo.editNamespaces = ['*']
      } else if (saltanaWorkflowKey) {
        sources.push('saltanaWorkflow')

        if (saltanaWorkflowKey !== localInstanceKey) throw createError(400)

        accessInfo.arrayPermissions = permissionsToCheck
        accessInfo.readNamespaces = ['*']
        accessInfo.editNamespaces = ['*']
      } else if (rawApiKey && !isPublishableApiKey) {
        sources.push('apiKey')

        const apiKey = req[apiKeyProperty]

        const apmSpan = apm.startSpan('Get access info for API key')

        accessInfo = await computeAccessInfo({
          roles: apiKey.roles,
          permissions: apiKey.permissions,
          readNamespaces: apiKey.readNamespaces,
          editNamespaces: apiKey.editNamespaces,
          ...computeAccessParams,
        })

        apmSpan && apmSpan.end()
      } else if (token && typeof token === 'object') {
        sources.push('token')

        const apmSpan = apm.startSpan('Get access info for token')

        // the header x-saltana-organization-id is only useful for authentication by token
        organizationId = _.get(req.headers, 'x-saltana-organization-id')

        const tokenPermissions = token.permissions || []

        let scopePermissions = []
        if (token.scope && typeof token.scope === 'string') {
          scopePermissions = token.scope.split(' ')
        }

        // debugger
        // routes/services can override the `organizationId` (like in user.joinOrganizationOrUpdateRights)
        if (typeof getOrganizationIdFn === 'function') {
          organizationId = getOrganizationIdFn(req)
        }

        // debugger

        if (organizationId !== null && organizationId !== undefined) {
          if (!userId) {
            throw createError(
              403,
              'Cannot provide the header x-saltana-organization-id if there is no sub or userId in the token',
            )
          } else {
            const {
              roles: userRoles,
              organization,
              realOrganization,
              isOrgMember,
              errors,
            } = await userRequester.send({
              type: '_isOrganizationMember',
              platformId,
              env,
              userId,
              organizationId,
            })

            if (errors.userNotFound) {
              throw createError(
                403,
                'User not found to check organization membership',
                {
                  public: { userId, organizationId },
                },
              )
            }
            if (errors.organizationNotFound) {
              throw createError(403, 'This organization does not exist', {
                public: { organizationId },
              })
            }
            if (!isOrgMember) {
              throw createError(
                403,
                'User does not belong to this organization',
                {
                  public: { userId, organizationId },
                },
              )
            }

            accessInfo = await computeAccessInfo({
              roles: addPublicRole(userRoles),
              restrictedRoles: organization.roles,
              ...computeAccessParams,
            })

            realOrganizationId = realOrganization.id
          }
        } else {
          accessInfo = await computeAccessInfo({
            roles: addPublicRole(token.roles),
            permissions: tokenPermissions.concat(scopePermissions),
            readNamespaces: token.readNamespaces,
            editNamespaces: token.editNamespaces,
            ...computeAccessParams,
          })
        }

        apmSpan && apmSpan.end()
      } else {
        sources.push('public')

        accessInfo = await computeAccessInfo({
          roles: [publicRole],
          ...computeAccessParams,
        })
      }

      // debugger
      const {
        roles,
        arrayPermissions,
        hashPermissions,
        readNamespaces,
        editNamespaces,
        missingPlanPermissions,
      } = accessInfo

      // will throw if not enough permissions
      const { matchedPermissions } = checkEnoughPermissions({
        permissions,
        permissionsToCheck,
        arrayPermissions,
        hashPermissions,
        sources,
        optionalCheck,
      })

      // check if platformData or namespaces can be edited
      if (checkData && req.body) {
        // will throw if data is invalid
        checkRequestData({
          metadata: req.body.metadata,
          platformData: req.body.platformData,
          isSystemRequest,
          matchedPermissions,
          sources,
          editProtectedNamespaces,
          editNamespaces,
        })
      }

      req[permissionsProperty] = matchedPermissions
      req[rolesProperty] = roles
      req[readNamespacesProperty] = _.uniq(readNamespaces)
      req[editNamespacesProperty] = _.uniq(editNamespaces)
      req.missingPlanPermissions = _.uniq(missingPlanPermissions)

      if (organizationId) {
        req[organizationIdProperty] = organizationId
        req[realOrganizationIdProperty] = realOrganizationId
      }

      if (
        targetUserId &&
        allowSpecifyTargetUserId(permissions, matchedPermissions)
      ) {
        req[targetUserIdProperty] = targetUserId
      }

      next()
    } catch (err) {
      // debugger
      next(err)
    } finally {
      apmSpan && apmSpan.end()
    }
  }

  return middleware
}

function defaultSystemKeyHashFunction(key) {
  return crypto.createHash('sha256').update(key).digest('base64') // sha256 hashing
}

/**
 * This passphrase is set by server on startup,
 * and removed from process.env to secure custom hashing algorithm.
 */
function setSystemKeyHashPassphrase(passphrase) {
  if (!passphrase) return // skip if passphrase is falsy
  if (systemHashPassphrase) return // only set once

  systemHashPassphrase = passphrase
}

function setSystemKeyHashWithFunction(fn, { passphrase } = {}) {
  // skip if the passphrase isn't correct
  if (passphrase !== systemHashPassphrase) return
  if (typeof fn !== 'function')
    throw new Error('Function expected for system hash function')

  systemKeyHashFunction = fn
  systemHash = fn(config.get('SystemKey'))
}

function getSystemKeyHashFunction(passphrase) {
  if (passphrase !== systemHashPassphrase)
    throw new Error('Incorrect passphrase to get system key hash function')

  return systemKeyHashFunction
}

function isSystem(hash) {
  return hash === systemHash
}

function allowSystem(req, res, next) {
  const hash = req._systemHash

  if (!hash || !isSystem(hash)) {
    return next(createError(403))
  }

  next()
}

function getLocalInstanceKey() {
  return localInstanceKey
}

async function computeAccessInfo({
  platformId,
  env,
  permissionsToCheck,
  plan,

  roles = [],
  permissions = [],
  readNamespaces: inputReadNamespaces = [],
  editNamespaces: inputEditNamespaces = [],

  restrictedRoles = [],
} = {}) {
  const apmSpan = apm.startSpan('Compute access info')

  const useRoles = roles && Array.isArray(roles) && roles.length
  const usePermissions =
    permissions && Array.isArray(permissions) && permissions.length
  const useRestrictedRoles =
    restrictedRoles && Array.isArray(restrictedRoles) && restrictedRoles.length

  const [
    {
      grantedPermissions,
      missingPlanPermissions: missingRolePermissionsInPlan,
    },
    roleNamespaces,
    filteredPermissionsByPlan,

    { grantedPermissions: restrictedRolePermissions },
    restrictedRoleNamespaces,
  ] = await Promise.all([
    useRoles
      ? authorizationRequester.send({
          type: '_getGrantedPermissions',
          roles,
          permissionsToCheck,
          plan,
          platformId,
          env,
        })
      : { grantedPermissions: {}, missingPlanPermissions: {} },
    useRoles
      ? roleRequester.send({
          type: '_getNamespaces',
          values: roles,
          platformId,
          env,
        })
      : {
          readNamespaces: [],
          editNamespaces: [],
        },
    usePermissions
      ? authorizationRequester.send({
          type: '_filterPermissionsByPlan',
          permissions,
          plan,
          platformId,
          env,
        })
      : [],

    useRestrictedRoles
      ? authorizationRequester.send({
          type: '_getGrantedPermissions',
          roles: restrictedRoles,
          permissionsToCheck,
          plan,
          platformId,
          env,
        })
      : { grantedPermissions: {} },
    useRestrictedRoles
      ? roleRequester.send({
          type: '_getNamespaces',
          values: restrictedRoles,
          platformId,
          env,
        })
      : {
          readNamespaces: [],
          editNamespaces: [],
        },
  ])

  let newReadNamespaces = []
  let newEditNamespaces = []

  newReadNamespaces = newReadNamespaces
    .concat(roleNamespaces.readNamespaces)
    .concat(inputReadNamespaces)
  newReadNamespaces = _.uniq(newReadNamespaces)

  newEditNamespaces = newEditNamespaces
    .concat(roleNamespaces.editNamespaces)
    .concat(inputEditNamespaces)
  newEditNamespaces = _.uniq(newEditNamespaces)

  let readNamespaces = newReadNamespaces
  let editNamespaces = newEditNamespaces
  let hashPermissions = grantedPermissions
  const arrayPermissions = filteredPermissionsByPlan

  if (useRestrictedRoles) {
    const newHashPermissions = {}
    Object.keys(hashPermissions).forEach((key) => {
      if (restrictedRolePermissions[key]) {
        newHashPermissions[key] = hashPermissions[key]
      }
    })

    hashPermissions = newHashPermissions

    readNamespaces = _.intersection(
      readNamespaces,
      restrictedRoleNamespaces.readNamespaces,
    )
    editNamespaces = _.intersection(
      editNamespaces,
      restrictedRoleNamespaces.editNamespaces,
    )
  }

  apmSpan && apmSpan.end()

  return {
    roles,
    readNamespaces,
    editNamespaces,
    hashPermissions,
    arrayPermissions,
    missingPlanPermissions: _.union(
      missingRolePermissionsInPlan,
      _.difference(permissions, filteredPermissionsByPlan),
    ),
  }
}

function checkEnoughPermissions({
  permissions, // original permissions

  permissionsToCheck, // optional permissions are added to permissions
  arrayPermissions,
  hashPermissions,
  sources,
  optionalCheck,
}) {
  const matchedPermissions = {}

  // Side-effect: merge permissions from different source
  arrayPermissions.forEach((p) => {
    hashPermissions[p] = true
  })

  permissionsToCheck.forEach((p) => {
    if (hashPermissions[p]) matchedPermissions[p] = true
  })

  const hasMatchedPermission = permissions.some((p) => matchedPermissions[p])

  // check if there is at least one matched permission.
  // It’s up to the downstream service
  // to decide whether a specific combination (or all) of permissions are required.
  if (permissions.length && !hasMatchedPermission && !optionalCheck) {
    throw createError(403, 'No appropriate permission', {
      expose: false,
      sources,
      permissions,
      matchedPermissions,
    })
  }

  return {
    matchedPermissions,
  }
}

function checkRequestData({
  metadata,
  platformData,
  isSystemRequest,
  matchedPermissions,
  sources,
  editProtectedNamespaces,
  editNamespaces,
}) {
  debugger
  if (platformData && !matchedPermissions['platformData:edit:all']) {
    throw createError(403, 'Forbidden platformData edition', {
      expose: false,
      sources,
    })
  }

  const dataNamespaces = Base.getDataNamespaces({ metadata, platformData })

  const systemNamespacesToEdit = _.intersection(
    dataNamespaces,
    systemNamespaces,
  )
  if (!isSystemRequest && systemNamespacesToEdit.length) {
    throw createError(403, 'Can’t edit Saltana reserved namespace', {
      public: {
        forbiddenNamespaces: systemNamespacesToEdit,
      },
    })
  }
  const protectedNamespacesToEdit = _.intersection(
    dataNamespaces,
    protectedNamespaces,
  )
  if (!editProtectedNamespaces && protectedNamespacesToEdit.length) {
    throw createError(403, 'Can’t edit reserved namespace on this resource', {
      public: {
        forbiddenNamespaces: protectedNamespacesToEdit,
      },
    })
  }

  const allowedNamespaces = editNamespaces.concat(protectedNamespaces)

  const validNamespaces = Base.checkDataNamespaces(
    { metadata, platformData },
    allowedNamespaces,
  )
  if (!validNamespaces) {
    throw createError(403, 'Forbidden namespaces edition', {
      expose: false,
      sources,
      editNamespaces,
    })
  }
}

function allowSpecifyTargetUserId(permissions, matchedPermissions) {
  return permissions.reduce((memo, permission) => {
    const parsedPermission = parsePermission(permission, { readScope: true })

    if (parsedPermission.scope !== 'all') {
      return memo
    }

    return memo && matchedPermissions[permission]
  })
}

function parseAuthorizationHeader(req, { noThrowIfError = false } = {}) {
  req.authorization = {}
  if (!req.headers.authorization) return

  const authHeader = req.headers.authorization
  const credentialsIndex = authHeader.indexOf(' ')
  if (credentialsIndex <= 0) throwInvalid()

  const scheme = authHeader.slice(0, credentialsIndex)
  const credentials = authHeader
    .slice(credentialsIndex + 1)
    .split(',')
    .map((c) => c.trim())

  // Authorization header with multiple params looks like:
  // 'SaltanaCore-v1 apiKey="pubk_live_xxx", token=abc.ijk.xyz'
  // 'SaltanaCore-v2 apiKey="pubk_live_xxx", tokenType=clerk, token=abc.ijk.xyz'
  // https://tools.ietf.org/html/draft-ietf-httpbis-p7-auth-19#appendix-B
  const extractFromCredentials = (key) => {
    return (
      credentials.find((c) =>
        c.toLowerCase().startsWith(`${key.toLowerCase()}=`),
      ) || '='
    )
      .replace(/([^\\])(")/g, '$1') // values can be in double quotes according to spec, which can be escaped with '\'
      .split('=')[1] // Defaults to empty string
      .trim()
  }

  let apiKey
  let validApiKeyFormat = true
  let token
  let validTokenFormat = true
  let tokenType = 'legacy'
  let validTokenTypeFormat = true

  if (!scheme || !credentials.length) throwInvalid()

  switch (scheme.toLowerCase()) {
    case 'basic':
      apiKey = decodeBase64(credentials[0])
      // remove the colon if it's the last character
      if (apiKey.charAt(apiKey.length - 1) === ':') apiKey = apiKey.slice(0, -1)
      break

    case 'bearer':
      token = credentials[0]
      break

    case 'saltana-v1': // legacy
      apiKey = extractFromCredentials('apiKey')
      token = extractFromCredentials('token')
      break

    case 'saltanacore-v1':
      apiKey = extractFromCredentials('apiKey')
      token = extractFromCredentials('token')
      break

    case 'saltanacore-v2':
      apiKey = extractFromCredentials('apiKey')
      tokenType = extractFromCredentials('tokenType')
      token = extractFromCredentials('token')
      break

    default:
      if (noThrowIfError) return
      throwInvalid()
  }

  if (apiKey) validApiKeyFormat = _.get(parseKey(apiKey), 'hasValidFormat')

  let _decodedToken
  if (token) {
    _decodedToken = jwt.decode(token)
    validTokenFormat = !_.isEmpty(_decodedToken)
  }
  if (tokenType) validTokenTypeFormat = !_.isEmpty(tokenType)

  if (
    [validApiKeyFormat, validTokenFormat, validTokenTypeFormat].some((v) => !v)
  ) {
    console.log('Decoded token', jwt.decode(token))
    if (noThrowIfError) return
    throw createError(401)
  }

  if (apiKey) {
    req.authorization.apiKey = apiKey
  }
  if (token) {
    req.authorization.token = token
  }
  if (tokenType) {
    req.authorization.tokenType = tokenType
  }
  if (_decodedToken) {
    req.authorization.__decodedToken = _decodedToken
  }

  // Convert custom SaltanaCore-v1 scheme to Bearer scheme for jwt middleware
  if (apiKey && token) {
    req.headers.authorization = `Bearer ${token}`
  }

  function throwInvalid() {
    throw createError(401, 'Invalid Authorization Header format')
  }
}

module.exports = {
  start,
  stop,

  loadStrategies,
  checkAuthToken,
  checkPermissions,
  allowSystem,
  parseAuthorizationHeader,

  getLocalInstanceKey,

  isSystem,
  defaultSystemKeyHashFunction,
  setSystemKeyHashPassphrase,
  getSystemKeyHashFunction,
  setSystemKeyHashWithFunction,

  protectedNamespaces,
  systemNamespaces,
}
