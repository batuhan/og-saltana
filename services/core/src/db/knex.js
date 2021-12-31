const Knex = require('knex')
const fs = require('fs')
const path = require('path')
const pgConfig = require('config').get('ExternalServices.pgsql')

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

const getKnexCacheKey = ({
  host,
  user,
  password,
  database,
  port,
  schema = 'public',
  ssl,
}) =>
  JSON.stringify({
    host,
    user,
    password,
    database,
    port,
    schema,
    ssl,
  })

function getKnex(
  { host, user, password, database, port, url, ssl } = {},
  options = {},
) {
  // const key = getKnexCacheKey(connection)
  // if (knexInstances[key]) {
  //   return knexInstances[key]
  // }

  const {
    pool = {
      min: 2,
      max: 10,
    },
  } = options

  const knex = Knex({
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host,
      user,
      password,
      database,
      port,
      ssl,
    },
    pool,
  })

  // knexInstances[key] = knex

  return knex
}

const knex = getKnex(connectionOpts)

module.exports = {
  knex,
  defaultSchema: connectionOpts.schema,
}
