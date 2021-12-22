const fs = require('fs')
const path = require('path')
const config = require('config')
const esConfig = config.get('ExternalServices.elasticsearch')
const pgConfig = config.get('ExternalServices.pgsql')

let pgSSLServerCertificate
let pgSSLCACertificate

const _cachedCAs = {}

function getCA(fileName) {
  if (_cachedCAs[fileName]) {
    return _cachedCAs[fileName]
  }

  const ca = fs.readFileSync(
    path.resolve(__dirname, '..', 'trusted-certs', fileName),
  )
  _cachedCAs[fileName] = ca
  return ca
}

function getPgSSLServerCertificate() {
  if (pgSSLServerCertificate) return pgSSLServerCertificate

  pgSSLServerCertificate = fs.readFileSync(
    path.join(__dirname, 'ssl/server.crt'),
    'utf8',
  )
  return pgSSLServerCertificate
}

function getPgSSLCACertificate() {
  if (pgSSLCACertificate) return pgSSLCACertificate

  pgSSLCACertificate = fs.readFileSync(
    path.join(__dirname, 'ssl/rootCA.crt'),
    'utf8',
  )
  return pgSSLCACertificate
}

function getPostgresqlConnection({
  platformId,
  env,

  ssl,
  sslcert,
  sslkey,
  sslca,
}) {
  const connection = {
    host: pgConfig.get('host'),
    user: pgConfig.get('user'),
    password: pgConfig.get('password'),
    database: pgConfig.get('database'),
    port: pgConfig.get('port'),
    schema: `s${platformId}_${env}`,
  }

  if (pgConfig.has('ssl.ca')) {
    const ca = getCA(pgConfig.get('ssl.ca'))
    connection.ssl = { ca }
  } else {
    connection.ssl = !!pgConfig.get('ssl.enabled')
  }

  return connection
}

function getElasticsearchConnection() {
  if (esConfig.get('enabled') !== true) {
    throw Error('Elasticsearch is not enabled')
  }

  return {
    host: process.env.ELASTIC_SEARCH_HOST,
    protocol: process.env.ELASTIC_SEARCH_PROTOCOL,
    user: process.env.ELASTIC_SEARCH_USER,
    password: process.env.ELASTIC_SEARCH_PASSWORD,
    port: process.env.ELASTIC_SEARCH_PORT,
  }
}

function getAuthenticationSettings() {
  return {
    secret: 'secret',
  }
}

module.exports = {
  getPgSSLServerCertificate,
  getPgSSLCACertificate,

  getPostgresqlConnection,
  getElasticsearchConnection,
  getAuthenticationSettings,
}
