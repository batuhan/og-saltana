const _ = require('lodash')
const { raw } = require('@saltana/objection')
const { extractDataFromObjectId } = require('@saltana/util-keys')
const { mergeFunctionName } = require('@saltana/utils/src/stl_jsonb_deep_merge')
const cacheModels = {}

const getObjectTypeFromModelName = (modelName) => {
  return _.camelCase(modelName)
}

const getModelNameFromObjectType = (objectType) => {
  return objectType.charAt(0).toUpperCase() + objectType.slice(1)
}

function getSchemaName(platformId, env) {
  if (!platformId) {
    throw new Error('Missing platformId when getting models')
  }
  if (!env) {
    throw new Error('Missing environment when getting models')
  }

  return `s${platformId}_${env}`
}

async function getModels({
  platformId,
  env,
  knex,
  defaultSchema = 'public',
  models,
} = {}) {
  if (!platformId) {
    throw new Error('Missing platformId when getting models')
  }
  if (!env) {
    throw new Error('Missing environment when getting models')
  }

  const cacheKey = `${platformId}_${env}`

  if (cacheModels[cacheKey]) {
    return cacheModels[cacheKey]
  }

  const isPlatformEnv = platformId && env
  // eslint-disable-next-line no-underscore-dangle
  const _schema = isPlatformEnv
    ? getSchemaName(platformId, env)
    : defaultSchema || 'public'

  const customModels = {}

  Object.keys(models).forEach((modelName) => {
    const Model = models[modelName]
    // Set the schema automatically
    // https://github.com/Vincit/objection.js/issues/85
    class SchemaModel extends Model {
      static get defaultSchema() {
        return _schema
      }

      /**
       * Returns raw PostgreSQL JSONB merge custom function call.
       * Algorithm is similar to a recursive Object.assign(base, changes).
       * This ensures we only update appropriate fields,
       * rather than passing whole object as in Base.getCustomData,
       * which used to break even simple concurrency: concurrent updates of different JSON fields.
       * @param {String} baseObjectName - same as column name such as "metadata"
       * @param {Object} changesObject - values (incl. `null`) overwrite any baseObject value with same key
       * @param {Object} [options]
       * @param {String} [options.jsonbAccessor] - using native Postgres operator like `->'field'`
       * @return {Object} knex `raw` query object
       */
      static rawJsonbMerge(
        baseObjectName,
        changesObject,
        { jsonbAccessor } = {}
      ) {
        if (typeof baseObjectName !== 'string')
          throw new Error('String column name expected')
        if (!_.isObjectLike(changesObject))
          throw new Error('changesObject expected as second argument')

        return raw(
          `${this.defaultSchema}.${mergeFunctionName}(${
            jsonbAccessor ? '(' : ''
          }"${
            baseObjectName // We need double quotes for column names with caps like 'platformData'
          }"${jsonbAccessor ? `${jsonbAccessor})::jsonb` : ''}, ?::jsonb)`,
          JSON.stringify(changesObject)
        )
      }

      /**
       * Returns the updated model after updating a JSONB column (can replace a property instead of merging)
       *
       * WARNING: should only be used in specific locations as future implementation of advanced update will
       * be implemented in the future via JSON Patch (https://erosb.github.io/post/json-patch-vs-merge-patch/)
       * @param {Object} params
       * @param {String} params.modelId - model ID to update
       * @param {String} params.baseObjectName - same as column name such as "metadata"
       * @param {Object} params.changesObject - values (incl. `null`) overwrite any baseObject value with same key
       * @param {String[]} params.replacingProperties - array of `changesObject` property names that needs to be replaced
       *   instead of being merged with previous value
       * @param {Object} [params.trx] - Knex transaction object
       * @return {Object} updated model
       */
      static async updateJsonb({
        modelId,
        baseObjectName,
        changesObject,
        replacingProperties,
        trx,
      }) {
        if (!modelId) throw new Error('modelId expected')
        if (typeof baseObjectName !== 'string')
          throw new Error('String column name expected')
        if (!_.isObjectLike(changesObject))
          throw new Error('changesObject expected as second argument')
        if (!trx) throw new Error('Transaction object trx expected')

        const beforeReplaceChanges = { ...changesObject }
        const afterReplaceChanges = {}

        if (replacingProperties && Array.isArray(replacingProperties)) {
          replacingProperties.forEach((prop) => {
            if (!_.isUndefined(changesObject[prop])) {
              beforeReplaceChanges[prop] = null
              afterReplaceChanges[prop] = changesObject[prop]
            }
          })
        }

        let updatedModel = await this.query(trx).patchAndFetchById(modelId, {
          [baseObjectName]: this.rawJsonbMerge(
            baseObjectName,
            beforeReplaceChanges
          ),
        })
        if (!_.isEmpty(afterReplaceChanges)) {
          updatedModel = await this.query(trx).patchAndFetchById(modelId, {
            [baseObjectName]: this.rawJsonbMerge(
              baseObjectName,
              afterReplaceChanges
            ),
          })
        }

        return updatedModel
      }
    }

    customModels[modelName] = SchemaModel.bindKnex(knex)
  })

  cacheModels[cacheKey] = customModels

  return customModels
}

// we should probably map only models that can be exposed via event

function generateIdPrefixToModelNamesMap(models) {
  const idPrefixToModelNames = {}
  Object.keys(models).forEach((modelName) => {
    const model = models[modelName]
    const idPrefix = model.idPrefix
    if (idPrefix) {
      idPrefixToModelNames[idPrefix] = modelName
    }

    const organizationIdPrefix = model.organizationIdPrefix

    if (organizationIdPrefix) {
      idPrefixToModelNames[organizationIdPrefix] = modelName
    }
  })
  return idPrefixToModelNames
}

/**
 * Pass an ID or a prefix ID and retrieve
 * @param {Object} params
 * @param {String} [params.objectId]
 * @param {String} [params.idPrefix]
 * @param {String} [params.objectType]
 * @param {String} [params.Models] - models from `getModels({ platformId, env })`
 *   or defaults to models without attached platform DB.
 *   Passing models from getModels is useful to query database afterwards.
 * @return {Object} info
 * @return {String} info.idPrefix - can be null if no match
 * @return {String} info.objectType - can be null if no match
 * @return {Object} info.Model - can be null if no match, return the Objection.js model
 *                               useful to access model class methods or to query database
 */
function getModelInfo({ objectId, objectType, idPrefix, Models }) {
  const mapIdPrefixToModelNames = generateIdPrefixToModelNamesMap(Models)

  const info = {
    idPrefix: null,
    objectType: null,
    Model: null,
  }

  let modelName

  if (objectId) {
    try {
      const { object: prefix } = extractDataFromObjectId(objectId) // can throw

      const modelName = mapIdPrefixToModelNames[prefix]
      if (modelName) {
        info.idPrefix = prefix
      }
    } catch (err) {}
  } else if (idPrefix) {
    info.idPrefix = idPrefix
  }

  if (info.idPrefix) {
    modelName = mapIdPrefixToModelNames[info.idPrefix]
    if (modelName) {
      info.objectType = getObjectTypeFromModelName(modelName)
    }
  } else if (objectType) {
    info.objectType = objectType
  }

  if (info.objectType) {
    if (!modelName) {
      modelName = getModelNameFromObjectType(info.objectType)
    }

    if (Models) {
      info.Model = Models[modelName]
    }
  }

  return info
}

module.exports = {
  getModels,
  getModelInfo,
  getSchemaName,
}
