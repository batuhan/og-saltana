const path = require('path')
const createError = require('http-errors')
const { serializeError } = require('serialize-error')
const _ = require('lodash')
const bluebird = require('bluebird')
const config = require('config')
const { getModels, models, getSchemaName } = require('@saltana/db')

const { getKnexForSchema } = require('../db/knex')
const { createSchema, dropSchema, dropSchemaViews } = require('../database')

const {
  addPlatform,
  getPlatforms,
  hasPlatform,
  removePlatform,

  getPlatformEnvData,
  setPlatformEnvData,
  removePlatformEnvData,

  getAllSaltanaTasks,
  setSaltanaTask,
  removeSaltanaTask,
  removeSaltanaTaskExecutionDates,
} = require('../redis')

const {
  getClient,
  isIndexExisting,
  createIndex,
  getIndex,
} = require('../elasticsearch')

const { syncAssetsWithElasticsearch } = require('../elasticsearch-sync')

const { removeReindexingTask } = require('../elasticsearch-reindex')

const { logError } = require('../../server/logger')
const { getEnvironments } = require('../util/environment')

function getTools({ platformId, env }) {
  const schema = getSchemaName(platformId, env)
  const knex = getKnexForSchema(schema)
  return { knex, schema }
}

async function migrateDatabase({ platformId, env }) {
  if (!platformId) {
    throw new Error('Missing platformId when migrating database')
  }
  if (!env) {
    throw new Error('Missing environment when migrating database')
  }

  const { knex, schema } = getTools({ platformId, env })
  // debugger
  await createSchema({ knex, schema })

  const useCustomSchema = schema !== 'public'

  const options = { directory: path.join(__dirname, '../../migrations/knex') }

  if (useCustomSchema) {
    options.schemaName = schema
  }

  await knex.migrate.latest(options)
  await knex.destroy()
}

async function dropDatabase({ platformId, env }) {
  try {
    if (!platformId) {
      throw new Error('Missing platformId when migrating database')
    }
    if (!env) {
      throw new Error('Missing environment when migrating database')
    }

    const { knex, schema } = getTools({ platformId, env })

    // Must drop views (that can be TimescaleDB continuous aggregates) before dropping schema
    // because it seems that the drop schema cascade option doesn't propagate well
    // (at least for TimescaleDB continuous aggregates)
    // If continuous aggregates aren't dropped first, schema won't be dropped.
    const internalKnex = await dropSchemaViews({ knex, schema })
    await dropSchema({ internalKnex, schema, cascade: true, returnKnex: true })
  } catch (err) {
    logError(err, {
      // should mostly affect tests, we’re logging this just in case
      platformId,
      env,
      message: `Could not drop database ${platformId}_${env}, probably already dropped.`,
    })
  }
}

async function migrateDatabaseVersion({ platformId, env, version }) {
  let migrationFile

  try {
    migrationFile = require(`../../migrations/data/${version}.js`)
  } catch (err) {
    throw createError(404, 'The migration file does not exist')
  }

  await migrationFile.run({ platformId, env })
}

async function initElasticsearch({ platformId, env }) {
  const exists = await isIndexExisting({ platformId, env })
  if (exists) return

  const { CustomAttribute } = await getModels({ platformId, env })

  const customAttributes = await CustomAttribute.query()

  await createIndex({ platformId, env, useAlias: true, customAttributes })
}

function omitTaskMetadata(task) {
  return _.omit(task, ['metadata', 'platformData'])
}

function computeCacheDifference({ tasks, cachedTasks }) {
  const tasksById = _.keyBy(tasks, 'id')
  const cachedTasksById = _.keyBy(cachedTasks, 'id')

  const allIds = _.uniqBy(
    tasks.map((t) => t.id).concat(cachedTasks.map((t) => t.id)),
  )

  const tasksToAdd = []
  const taskIdsToRemove = []
  const tasksUpdated = []

  allIds.forEach((id) => {
    const task = tasksById[id]
    const cachedTask = cachedTasksById[id]

    if (task && !cachedTask) {
      tasksToAdd.push(task)
    } else if (!task && cachedTask) {
      taskIdsToRemove.push(cachedTask.id)
    } else if (
      !_.isEqual(omitTaskMetadata(task), omitTaskMetadata(cachedTask))
    ) {
      tasksUpdated.push(task)
    }
  })

  const needSync = !!(
    tasksToAdd.length ||
    taskIdsToRemove.length ||
    tasksUpdated.length
  )

  return {
    tasksToAdd,
    taskIdsToRemove,
    tasksUpdated,
    needSync,
  }
}

async function syncCache({
  platformId,
  env,
  tasksToAdd,
  taskIdsToRemove,
  tasksUpdated,
}) {
  await removeSaltanaTask({ platformId, env, taskId: taskIdsToRemove })
  await removeSaltanaTaskExecutionDates({ taskId: taskIdsToRemove })

  await bluebird.map(
    tasksToAdd.concat(tasksUpdated),
    (task) => {
      return setSaltanaTask({ platformId, env, task: omitTaskMetadata(task) })
    },
    { concurrency: 10 },
  )
}

let responder
let subscriber
let roleRequester
let configRequester
let authorizationRequester

function start({ communication }) {
  const { getResponder, getSubscriber, getRequester, COMMUNICATION_ID } =
    communication

  responder = getResponder({
    name: 'Store Responder',
    key: 'store',
  })

  subscriber = getSubscriber({
    name: 'Store subscriber',
    key: 'store',
    namespace: COMMUNICATION_ID,
  })

  roleRequester = getRequester({
    name: 'Store service > Role Requester',
    key: 'role',
  })

  configRequester = getRequester({
    name: 'Store service > Config Requester',
    key: 'config',
  })

  authorizationRequester = getRequester({
    name: 'Store service > Authorization Requester',
    key: 'authorization',
  })

  // ///////// //
  // PLATFORMS //
  // ///////// //

  responder.on('listPlatforms', async (req) => {
    return getPlatforms()
  })

  responder.on('createPlatform', async (req) => {
    const { platformId } = req

    if (platformId) {
      const exists = await hasPlatform(platformId)
      if (exists) throw createError(422, 'Platform already exists.')
    }

    const { id } = await addPlatform(platformId)
    return { id }
  })

  responder.on('removePlatform', async (req) => {
    const { platformId } = req
    await removePlatform(platformId)

    return { id: platformId }
  })

  // //////// //
  // ENV DATA //
  // //////// //

  responder.on('getPlatformEnvData', async (req) => {
    const { platformId, env } = req

    const exists = await hasPlatform(platformId)
    if (!exists) throw createError(404, 'Platform does not exist')

    const result = await getPlatformEnvData(platformId, env, '*')
    return result
  })

  responder.on('setPlatformEnvData', async (req) => {
    const { platformId, env, data } = req

    const exists = await hasPlatform(platformId)
    if (!exists) throw createError(404, 'Platform does not exist')

    await setPlatformEnvData(platformId, env, Object.keys(data), data)
    return data
  })

  responder.on('removePlatformEnvData', async (req) => {
    const { platformId, env } = req

    const exists = await hasPlatform(platformId)
    if (!exists) throw createError(404, 'Platform does not exist')

    await removePlatformEnvData(platformId, env, '*')

    return { success: true }
  })

  responder.on('getPlatformEnvDataByKey', async (req) => {
    const { platformId, env, key } = req

    const exists = await hasPlatform(platformId)
    if (!exists) throw createError(404, 'Platform does not exist')

    const result = await getPlatformEnvData(platformId, env, key)
    return result
  })

  responder.on('setPlatformEnvDataByKey', async (req) => {
    const { platformId, env, key, data } = req

    const exists = await hasPlatform(platformId)
    if (!exists) throw createError(404, 'Platform does not exist')

    await setPlatformEnvData(platformId, env, key, data)
    return data
  })

  responder.on('removePlatformEnvDataByKey', async (req) => {
    const { platformId, env, key } = req

    const exists = await hasPlatform(platformId)
    if (!exists) throw createError(404, 'Platform does not exist')

    await removePlatformEnvData(platformId, env, key)

    return { success: true }
  })

  // ////////// //
  // MIGRATIONS //
  // ////////// //

  responder.on('initPlatform', async (req) => {
    const { platformId } = req

    const exists = await hasPlatform(platformId)
    if (!exists) throw createError(404, 'Platform does not exist')

    const result = {
      database: {
        ok: true,
        envErrors: {},
      },
      elasticsearch: {
        ok: true,
        envErrors: {},
      },
    }

    const environments = getEnvironments()

    for (const env of environments) {
      try {
        await migrateDatabase({ platformId, env })
      } catch (err) {
        result.database.ok = false
        result.database.envErrors[env] = serializeError(err)
      }
    }

    for (const env of environments) {
      try {
        await initElasticsearch({ platformId, env })
      } catch (err) {
        result.elasticsearch.ok = false
        result.elasticsearch.envErrors[env] = serializeError(err)
      }
    }

    return result
  })

  responder.on('checkPlatform', async (req) => {
    const { platformId } = req

    const exists = await hasPlatform(platformId)
    if (!exists) throw createError(404, 'Platform does not exist')

    const result = {
      database: {
        ok: true,
        envErrors: {},
      },
      elasticsearch: {
        ok: true,
        envErrors: {},
      },
      cache: {
        ok: true,
        envErrors: {},
      },
    }

    const environments = getEnvironments()

    for (const env of environments) {
      try {
        const { Category } = await getModels({ platformId, env })
        // perform a database query to check if a connection can be established
        await Category.query().count()
      } catch (err) {
        result.database.ok = false
        result.database.envErrors[env] = serializeError(err)
      }
    }

    for (const env of environments) {
      try {
        const indexExists = await isIndexExisting({ platformId, env })
        if (!indexExists) throw new Error('Elasticsearch index does not exist')
      } catch (err) {
        result.elasticsearch.ok = false
        result.elasticsearch.envErrors[env] = serializeError(err)
      }
    }

    for (const env of environments) {
      try {
        const { Task } = await getModels({ platformId, env })

        const cachedTasks = await getAllSaltanaTasks({ platformId, env })
        const tasks = await Task.query().where({ active: true })

        const { needSync } = computeCacheDifference({
          tasks,
          cachedTasks: cachedTasks.map((t) => t.task),
        })
        result.cache.ok = !needSync
      } catch (err) {
        result.cache.ok = false
        result.cache.envErrors[env] = serializeError(err)
      }
    }

    return result
  })

  responder.on('migrateDatabase', async (req) => {
    const { platformId, env, dataVersion } = req

    const exists = await hasPlatform(platformId)
    if (!exists) throw createError(404, 'Platform does not exist')

    await migrateDatabase({ platformId, env })

    if (dataVersion) {
      await migrateDatabaseVersion({ platformId, env, version: dataVersion })
    }

    return { success: true }
  })

  responder.on('dropDatabase', async (req) => {
    const { platformId, env } = req

    const exists = await hasPlatform(platformId)
    if (!exists) throw createError(404, 'Platform does not exist')

    await dropDatabase({ platformId, env })

    return { success: true }
  })

  if (config.get('ExternalServices.elasticsearch.enabled') !== false) {
    responder.on('initElasticsearch', async (req) => {
      const { platformId, env } = req

      const exists = await hasPlatform(platformId)
      if (!exists) throw createError(404, 'Platform does not exist')

      await initElasticsearch({ platformId, env })

      return { success: true }
    })

    responder.on('syncElasticsearch', async (req) => {
      const { platformId, env } = req

      const exists = await hasPlatform(platformId)
      if (!exists) throw createError(404, 'Platform does not exist')

      const { Asset } = await getModels({ platformId, env })

      const [{ count: nbAssets }] = await Asset.query().count()

      const nbAssetsPerChunk = 500

      const times = Math.ceil(nbAssets / nbAssetsPerChunk)

      let page = 1

      for (let i = 0; i < times; i++) {
        const limit = nbAssetsPerChunk

        const assets = await Asset.query()
          .offset((page - 1) * limit)
          .limit(limit)

        assets.forEach((asset) => {
          syncAssetsWithElasticsearch({
            assetId: asset.id,
            asset,
            action: 'update',
            platformId,
            env,
          })
        })

        page++
      }

      return { success: true }
    })

    responder.on('dropElasticsearch', async (req) => {
      const { platformId, env } = req

      const exists = await hasPlatform(platformId)
      if (!exists) throw createError(404, 'Platform does not exist')

      // use pattern to drop all indices (reindexing, alias indices)
      const indexPattern = `${getIndex({ platformId, env })}*`

      let client
      try {
        client = await getClient({ platformId, env })
      } catch (err) {
        logError(err, {
          // should mostly affect tests, we’re logging this just in case
          platformId,
          env,
          message:
            'Could not getClient to drop ElasticSearch index, probably already dropped.',
        })
      }

      if (client) await client.indices.delete({ index: indexPattern })

      await removeReindexingTask({ platformId, env })

      return { success: true }
    })
  }
  responder.on('syncCache', async (req) => {
    const { platformId, env } = req

    const exists = await hasPlatform(platformId)
    if (!exists) throw createError(404, 'Platform does not exist')

    const { Task } = await getModels({ platformId, env })

    const cachedTasks = await getAllSaltanaTasks({ platformId, env })
    const tasks = await Task.query().where({ active: true })

    const cacheDifference = computeCacheDifference({
      tasks,
      cachedTasks: cachedTasks.map((t) => t.task),
    })
    await syncCache({ ...cacheDifference, platformId, env })

    return { success: true }
  })

  responder.on('deleteCache', async (req) => {
    const { platformId, env } = req

    const exists = await hasPlatform(platformId)
    if (!exists) throw createError(404, 'Platform does not exist')

    const removedTaskIds = await removeSaltanaTask({
      platformId,
      env,
      taskId: '*',
    })
    await removeSaltanaTaskExecutionDates({ taskId: removedTaskIds })

    return { success: true }
  })
}

function stop() {
  responder.close()
  responder = null

  subscriber.close()
  subscriber = null

  roleRequester.close()
  roleRequester = null

  configRequester.close()
  configRequester = null

  authorizationRequester.close()
  authorizationRequester = null
}

module.exports = {
  start,
  stop,
}
