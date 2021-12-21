const _ = require('lodash')
const config = require('config')

const instanceEnv = config.get("InstanceEnv")

let environments

/**
 * Parse INSTANCE_ENV from .env file and convert it into array of environments
 * (environments can be comma separated)
 * e.g. INSTANCE_ENV=test,live => environments = ['test', 'live']
 *      INSTANCE_ENV=staging => environments = ['staging']
 */
function loadEnvironments () {
  if (environments) return

  if (!instanceEnv || typeof instanceEnv !== 'string') {
    environments = []
  } else {
    environments = _.uniq(_.compact(process.env.INSTANCE_ENV.split(',')))
  }
}

function getDefaultEnvironment () {
  loadEnvironments()

  if (environments.length !== 1) return null
  return environments[0]
}

function isValidEnvironment (env) {
  loadEnvironments()
  return environments.includes(env)
}

function getEnvironments () {
  loadEnvironments()
  return environments
}

module.exports = {
  getDefaultEnvironment,
  isValidEnvironment,
  getEnvironments
}
