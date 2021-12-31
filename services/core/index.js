const communication = require('./src/communication')
const permissions = require('./src/permissions')
const redis = require('./src/redis')
const roles = require('./src/roles')
const versions = require('./src/versions')

const logger = require('./server/logger')
const testTools = require('./test')

const {
  authentication,
  availability,
  currency,
  encoding,
  environment,
  list,
  listQueryBuilder,
  locale,
  pagination,
  pricing,
  time,
  transaction,
  transition,
  user,
  validation,
} = require('./src/util')

const utils = {
  authentication,
  availability,
  currency,
  encoding,
  environment,
  list,
  listQueryBuilder,
  locale,
  pagination,
  pricing,
  time,
  transaction,
  transition,
  user,
  validation,
}

module.exports = {
  communication,
  permissions,
  redis,
  roles,
  versions,

  logger,
  testTools,
  utils,
}
