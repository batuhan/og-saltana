const _ = require('lodash')
const bluebird = require('bluebird')
const request = require('superagent')
const config = require('config')

let apiBase

let responder

function start({ communication, serverPort }) {
  const { getResponder } = communication

  responder = getResponder({
    name: 'Batch Responder',
    key: 'batch',
  })

  const isTestEnv = config.get('Env') === 'test'
  const apiUrl = config.get('Cote.baseUrl')

  // in test environment, all batch steps are sent to the same server than the one receiving the batch request
  // that's because in parallel testing, hosts are dynamic
  if (isTestEnv || !apiUrl) {
    apiBase = `http://localhost:${serverPort}`
  } else {
    apiBase = apiUrl
  }

  responder.on('create', async (req) => {
    const {
      objectType,
      method,
      objects,

      rawHeaders,
    } = req

    // cannot reuse directly rawHeaders
    // because headers 'host', 'content-type', 'content-length' may interfere with the batch requests
    // causing everlasting requests
    const allowedHeaders = [
      'user-agent',
      'authorization',
      'x-saltana-user-id',
      'x-saltana-organization-id',

      // internal
      'x-saltana-system-key',
      'x-saltana-workflow-key',

      // used for test
      'x-platform-id',
      'x-saltana-env',
    ]

    const batchHeaders = _.pick(rawHeaders, allowedHeaders)

    const startDate = new Date()

    let completed = []
    let errors = []
    let statusCode
    let errorIndex

    // batch steps order isn't guaranteed because we're using `.map()` to have the smallest execution duration
    // (instead of `.mapSeries()`)
    await bluebird.map(
      objects,
      async (obj, index) => {
        let endpointUri
        if (objectType === 'asset') {
          endpointUri = `/assets/${obj.objectId}`
        } else if (objectType === 'user') {
          endpointUri = `/users/${obj.objectId}`
        }
        const endpointUrl = `${apiBase}${endpointUri}`
        try {
          await request[method.toLowerCase()](endpointUrl)
            .send(obj.payload)
            .set(batchHeaders)

          // preserve initial order and use _.compact below
          completed[index] = obj.objectId
        } catch (err) {
          errors[index] = {
            objectId: obj.objectId,
            error: err.response.body,
          }

          // the error status code is the first error status code
          if (!statusCode || index < errorIndex) {
            statusCode = err.status
            errorIndex = index
          }
        }
      },
      { concurrency: 4 },
    )

    if (!statusCode) {
      statusCode = 200
    }

    const processingTime = new Date() - startDate

    completed = _.compact(completed)
    errors = _.compact(errors)

    const exposedResult = {
      processingTime,
      success: !errors.length,
      completed,
      errors,
    }

    // use this return format to set the status code
    return {
      _rawResponse: {
        statusCode,
        content: exposedResult,
      },
    }
  })
}

function stop() {
  responder.close()
  responder = null
}

module.exports = {
  start,
  stop,
}
