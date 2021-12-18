const {
  mergeFunction,
  mergeFunctionName,
} = require('../util/stl_jsonb_deep_merge')


exports.up = async (knex) => {
  const { schema } = knex.client.connectionSettings || {}
  // We need to inject schema name in function body for recursion
  if (!schema) {
    throw new Error(
      `Schema name required to create ${mergeFunctionName} function`
    )
  }

  await knex.schema.createTable('domains', (table) => {
    table.string('id').primary()
    table.string('createdDate', 24)
    table.string('updatedDate', 24)
    table.string('authorId')
    table.string('targetId')
    table.string('type')
    table.string('label')
    table.jsonb('data')
    table.jsonb('metadata')
    table.jsonb('platformData')

    table.index(['createdDate', 'id'], 'domain__createdDate_id_index')
    table.index(['updatedDate', 'id'], 'domain__updatedDate_id_index')
    table.index('type', 'domain__type_index')
    table.index('authorId', 'domain__authorId_index')
    table.index('targetId', 'domain__targetId_index')
    table.index('data', 'domain__data_gin_index', 'GIN')
  })

}

exports.down = async (knex) => {
  const { schema } = knex.client.connectionSettings || {}

  if (!schema) {
    throw new Error('Schema name required to remove continuous aggregates')
  }

  await knex.schema.dropTableIfExists('domains')

}
