const pg = require('pg')

const { models } = require('./models')
const { getModels, getModelInfo } = require('./utils')

function loadTypeParser() {
  // https://github.com/tgriesser/knex/issues/387
  // converts PostgreSQL `bigint` into Javascript integers
  pg.types.setTypeParser(20, 'text', (value) => {
    if (Number.MAX_SAFE_INTEGER < value) {
      throw new Error(
        `The value ${value} exceeds the JS max integer value ${Number.MAX_SAFE_INTEGER}`
      )
    }

    return parseInt(value, 10)
  })
}

// must run before establishing any Knex connections
loadTypeParser()

module.exports = {
  getModels,
  getModelInfo,
  models,
}
