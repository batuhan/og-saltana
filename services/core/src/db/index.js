const { getModels, models: commonModels } = require('@saltana/db')
const { knex, defaultSchema } = require('./knex')
const Event = require('../models/Event')

const models = { ...commonModels, Event }

function getModelsWithKnex({ platformId, env }) {
  if (!platformId) {
    throw new Error('Missing platformId when retrieving PostgreSQL connection')
  }
  if (!env) {
    throw new Error('Missing environment when retrieving PostgreSQL connection')
  }

  return getModels({
    platformId,
    env,
    knex,
    models,
    defaultSchema,
  })
}

module.exports = {
  getModels: getModelsWithKnex,
  models,
  knex,
  defaultSchema,
}
