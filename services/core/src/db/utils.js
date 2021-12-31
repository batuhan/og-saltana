const knex = require('./knex')

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
    defaultSchema: connectionOpts.schema,
  })
}

module.exports = {
  getModels: getModelsWithKnex,
}
