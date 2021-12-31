const fs = require('fs')
const path = require('path')
const { getModels, getKnex } = require('@saltana/db/utils')

const cachedCAs = {}
function getCA(fileName) {
  if (cachedCAs[fileName]) {
    return cachedCAs[fileName]
  }

  const ca = fs.readFileSync(
    path.resolve(__dirname, '../..', 'trusted-certs', fileName),
  )
  cachedCAs[fileName] = ca
  return ca
}

const pgConfig = require('config').get('ExternalServices.pgsql')

function getConnectionOpts() {
  const connectionOpts = {
    host: pgConfig.get('host'),
    user: pgConfig.get('user'),
    password: pgConfig.get('password'),
    database: pgConfig.get('database'),
    port: pgConfig.get('port'),
    schema: 'public',
  }

  if (pgConfig.has('ssl.ca')) {
    const ca = getCA(pgConfig.get('ssl.ca'))
    connectionOpts.ssl = { ca }
  } else {
    connectionOpts.ssl = !!pgConfig.get('ssl.enabled')
  }

  return {
    ...connectionOpts,
  }
}

const connectionOpts = getConnectionOpts()

function getModelsWithKnex({ platformId, env }) {
  if (!platformId) {
    throw new Error('Missing platformId when retrieving PostgreSQL connection')
  }
  if (!env) {
    throw new Error('Missing environment when retrieving PostgreSQL connection')
  }
  const knex = getKnex(connectionOpts)
  return getModels({
    platformId,
    env,
    knex,
    defaultSchema: connectionOpts.schema,
  })
}

module.exports = {
  getModels: getModelsWithKnex,
}
