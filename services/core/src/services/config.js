const createError = require('http-errors')
const _ = require('lodash')
const { getObjectId } = require('@saltana/util-keys')
const { getModels } = require('../db')

const { apiVersions } = require('../versions')
const { setPlatformEnvData } = require('../redis')
const { builtInSSOProviders } = require('@saltana/utils').authentication

let responder
let roleRequester

function start({ communication, isSystem }) {
  const { getResponder, getRequester } = communication

  responder = getResponder({
    name: 'Config Responder',
    key: 'config',
  })

  roleRequester = getRequester({
    name: 'Config service > Role Requester',
    key: 'role',
  })

  responder.on('read', async (req) => {
    const { access } = req

    if (!isAccessGranted({ access, req })) throw createError(403)

    return readConfig({ req, access })
  })

  responder.on('update', async (req) => {
    const { access } = req

    if (!isAccessGranted({ access, req })) throw createError(403)

    return updateConfig({ req, access })
  })

  responder.on('readPrivate', async (req) => {
    return readConfig({ req, access: 'private' })
  })

  responder.on('updatePrivate', async (req) => {
    const { saltana } = req

    if (saltana) {
      const { ssoConnections } = saltana

      if (ssoConnections) {
        const connectionNames = Object.keys(ssoConnections)
        const customProviders = _.difference(
          connectionNames,
          builtInSSOProviders,
        )

        connectionNames.forEach((p) => {
          const isCustom = _.get(ssoConnections[p], 'isCustom')
          const customProviderOnly = [
            'authorizationUrl',
            'tokenUrl',
            'userInfoUrl',
          ]
          const forbiddenWithBuiltIn = customProviderOnly.filter((k) =>
            _.has(ssoConnections[p], k),
          )

          if (
            !isCustom &&
            builtInSSOProviders.includes(p) &&
            forbiddenWithBuiltIn.length
          ) {
            throw createError(
              400,
              `Bad Request: ${forbiddenWithBuiltIn.join(
                ',',
              )} cannot be set with ${p} built-in connection.`,
            )
          } else if (customProviders.includes(p)) {
            _.set(ssoConnections[p], 'isCustom', true)
          }
        })
      }
    }

    return updateConfig({ req, access: 'private' })
  })

  // INTERNAL

  responder.on('_getConfig', async (req) => {
    const { platformId, env, access = 'default' } = req

    const { Config } = await getModels({ platformId, env })

    const config = await Config.query().findOne({ access })

    if (!config) {
      return {
        saltana: {},
        custom: {},
        theme: {},
      }
    }

    return config
  })

  function isAccessGranted({ access, req }) {
    const protectedAccesses = ['private', 'system']
    const canAccessProtected = isSystem(req._systemHash)

    if (!protectedAccesses.includes(access)) return true

    return canAccessProtected
  }
}

async function readConfig({ req, access }) {
  const { platformId } = req
  const { env } = req
  const { Config } = await getModels({ platformId, env })

  const config = await Config.query().findOne({ access })

  return exposeConfig({ req, config, access })
}

async function updateConfig({ req, access }) {
  const { platformId } = req
  const { env } = req
  const { Config } = await getModels({ platformId, env })
  let apiVersion

  if (access === 'default') {
    if (req.saltana) {
      const whitelistRoles = _.get(req.saltana, 'roles.whitelist')
      const defaultRoles = _.get(req.saltana, 'roles.default')

      if (whitelistRoles && whitelistRoles.includes('dev')) {
        throw createError(422, 'Cannot whitelist the role "dev"')
      }
      if (defaultRoles && defaultRoles.includes('dev')) {
        throw createError(
          422,
          'Cannot include the role "dev" into default roles',
        )
      }

      if (whitelistRoles) {
        const { valid, invalidRoles } = await roleRequester.send({
          type: '_isValidRoles',
          platformId,
          env,
          roles: whitelistRoles,
        })
        if (!valid) {
          throw createError(
            422,
            `Invalid whitelist roles: ${invalidRoles.join(', ')}`,
          )
        }
      }
      if (defaultRoles) {
        const { valid, invalidRoles } = await roleRequester.send({
          type: '_isValidRoles',
          platformId,
          env,
          roles: defaultRoles,
        })
        if (!valid) {
          throw createError(
            422,
            `Invalid default roles: ${invalidRoles.join(', ')}`,
          )
        }
      }
    }
  } else if (access === 'system') {
    if (req.saltana) {
      if (req.saltana.saltanaVersion) {
        if (!apiVersions.includes(req.saltana.saltanaVersion)) {
          throw createError(422, 'Invalid Saltana version')
        }
        apiVersion = req.saltana.saltanaVersion
      }
    }
  }

  let config = await Config.query().findOne({ access })

  if (!config) {
    config = await Config.query().insert({
      id: await getObjectId({ prefix: Config.idPrefix, platformId, env }),
      access,
      saltana: req.saltana || {},
      custom: req.custom || {},
      theme: req.theme || {},
    })
  } else {
    const updateAttrs = {}

    if (req.saltana) {
      const TOKEN_EXP = 'saltanaAuthRefreshTokenExpiration'
      updateAttrs.saltana = Config.rawJsonbMerge(
        'saltana',
        _.omit(req.saltana, TOKEN_EXP),
      )

      if (access === 'private') {
        if (req.saltana[TOKEN_EXP]) {
          // override the whole duration object, we don't want multiple time units
          // Objection.js syntax to update JSONB columns: jsonbColumn:nested.fields
          // https://vincit.github.io/objection.js/recipes/json-queries.html#json-queries
          await Config.query()
            .patch({
              [`saltana:${TOKEN_EXP}`]: req.saltana[TOKEN_EXP],
            })
            .where({ id: config.id })
        }
      }
    }
    if (req.custom)
      updateAttrs.custom = Config.rawJsonbMerge('custom', req.custom)
    if (req.theme) updateAttrs.theme = Config.rawJsonbMerge('theme', req.theme)

    config = await Config.query().patchAndFetchById(config.id, updateAttrs)
  }

  if (apiVersion) {
    await setPlatformEnvData(platformId, env, 'version', apiVersion)
  }

  return exposeConfig({ req, config, access })
}

function exposeConfig({ req, config, access }) {
  const exposedConfig = {
    saltana: config ? config.saltana : {},
  }

  if (access === 'default') {
    exposedConfig.custom = config ? config.custom : {}
    exposedConfig.theme = config ? config.theme : {}
  } else if (access === 'system') {
    exposedConfig.custom = config ? config.custom : {}
  }

  return exposedConfig
}

function stop() {
  responder.close()
  responder = null

  roleRequester.close()
  roleRequester = null
}

module.exports = {
  start,
  stop,
}
