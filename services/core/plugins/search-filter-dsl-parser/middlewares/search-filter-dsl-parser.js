const path = require('path')
const fs = require('fs')
const _ = require('lodash')

const debug = require('debug')('stelace:api:search')
const log = console.log

const peg = require('pegjs')
const grammarPath = '../util/search-filter-dsl-grammar.pegjs'
let searchFilterDSLGrammar
let searchFilterDSLParser
try {
  searchFilterDSLGrammar = fs.readFileSync(path.join(__dirname, grammarPath), 'utf8')
  searchFilterDSLParser = peg.generate(searchFilterDSLGrammar)
} catch (err) {
  log('Could not generate search filter grammar (peg.js)')
  throw err
}

let deps
let enabled = false
let middleware = async (req, res, next) => { next() }

const filterDSLParserMiddleware = async (...args) => {
  const next = _.last(args)
  if (enabled) await middleware(...args)
  else if (typeof next === 'function') next()
}

module.exports = {
  filterDSLParserMiddleware,

  beforeRoutes,
  start,
  stop
}

function getFilterDSLMiddleware () {
  return async (req, res, next) => {
    try {
      const parsedFilter = await parse(req)
      if (parsedFilter) req._stlParsedSearchFilter = parsedFilter
      next()
    } catch (err) {
      next(err)
    }
  }
}

async function parse (req) {
  const { body, platformId, env } = req
  const { communication, createError, apm } = deps
  if (_.isEmpty(body) || !communication) return ''

  const { filter } = body
  const { stelaceApiRequest } = communication
  if (!filter) return ''

  const apmSpans = {}
  const m = apm && apm.currentTransaction
  if (m) apmSpans.middleware = apm.startSpan('Parsing Search filter DSL')

  try {
    if (m) apmSpans.customAttributes = apm.startSpan('Fetch Custom Attributes before parsing')
    const { results: customAttributes } = await stelaceApiRequest('/custom-attributes', {
      leafThroughResults: 10000,
      platformId,
      env
    })
    if (apmSpans.customAttributes) apmSpans.customAttributes.end()
    debug('Parsing filter DSL %s', filter)

    const getParsingContext = () => {
      const booleanBuiltIns = ['validated', 'active']
      const numberBuiltIns = ['price']
      const selectBuiltIns = ['id', 'categoryId', 'assetTypeId', 'ownerId']
      const tagsBuiltIns = []
      const textBuiltIns = ['name'] // name saved as short text if length < 256 chars
      const keepBuiltInEscapeFor = ['_id'] // Keep '_' for ElasticSearch built-in '_id'

      const builtIns = _.uniq([]
        .concat(booleanBuiltIns)
        .concat(numberBuiltIns)
        .concat(selectBuiltIns)
        .concat(tagsBuiltIns)
        .concat(textBuiltIns)
      )

      const inject = (typeBuiltIns, type) => {
        return typeBuiltIns.map(b => `_${b}`).concat(
          customAttributes.filter(ca => ca.type === type).map(ca => ca.name)
        )
      }

      const booleanAttributes = inject(booleanBuiltIns, 'boolean')
      const numberAttributes = inject(numberBuiltIns, 'number')
      const selectAttributes = inject(selectBuiltIns, 'select')
      const textListAttributes = inject(tagsBuiltIns, 'tags')
      const shortTextAttributes = inject(textBuiltIns, 'text')

      return {
        booleanAttributes,
        numberAttributes,
        selectAttributes,
        textListAttributes,
        shortTextAttributes,
        builtIns: builtIns.map(b => `_${b}`),
        keepBuiltInEscapeFor
      }
    }

    if (m) apmSpans.peg = apm.startSpan('PEG.js parsing')
    const parsedFilter = searchFilterDSLParser.parse(filter.trim(), getParsingContext())
    if (apmSpans.peg) apmSpans.peg.end()

    debug('Filter DSL parsing done')

    return parsedFilter
  } catch (err) {
    // First attempt to differentiate between 4XX and 5XX errors:
    // Just checking if the parser throws a SyntaxError (generated manually or by PEG.js)
    if (err.name === 'SyntaxError') {
      const details = _.pick(err, ['location']) // can help user to debug

      throw createError(400, err, {
        public: {
          filter,
          ...details
        }
      })
    } else {
      throw createError(err, 'Failed to parse Search filter DSL.', {
        public: { filter }
      })
    }
  } finally {
    if (apmSpans.middleware) apmSpans.middleware.end()
  }
}

function beforeRoutes (server, startParams) {
  server.use(async (req, res, next) => {
    const url = req.path()
    if (req.method !== 'POST' || !url.startsWith('/search')) return next()
    else await filterDSLParserMiddleware(req, res, next)
  })
}

function start (startParams) {
  deps = Object.assign({}, startParams)

  middleware = getFilterDSLMiddleware()
  enabled = true
}

function stop () {
}
