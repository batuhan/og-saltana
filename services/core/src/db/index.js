const { getModels, models } = require('@saltana/db')
const { knex, defaultSchema } = require('./knex')

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
