const config = require('config')

const storeRoute = require('./store')
const batchRoute = require('./batch')

const apiKeyRoute = require('./apiKey')
const assessmentRoute = require('./assessment')
const assetRoute = require('./asset')
const assetTypeRoute = require('./assetType')
const authenticationRoute = require('./authentication')
const authorizationRoute = require('./authorization')
const availabilityRoute = require('./availability')
const categoryRoute = require('./category')
const configRoute = require('./config')
const customAttributeRoute = require('./customAttribute')
const documentRoute = require('./document')
const entryRoute = require('./entry')
const eventRoute = require('./event')
const messageRoute = require('./message')
const orderRoute = require('./order')
const roleRoute = require('./role')
const searchRoute = require('./search')
const signalRoute = require('./signal')
const taskRoute = require('./task')
const transactionRoute = require('./transaction')
const userRoute = require('./user')
const webhookRoute = require('./webhook')
const workflowRoute = require('./workflow')

const coreRoutes = {
  store: { route: storeRoute, enabled: true },
  batch: { route: batchRoute, enabled: true },
  apiKey: { route: apiKeyRoute, enabled: true },
  assessment: { route: assessmentRoute, enabled: true },
  asset: { route: assetRoute, enabled: true },
  assetType: { route: assetTypeRoute, enabled: true },
  authentication: { route: authenticationRoute, enabled: true },
  authorization: { route: authorizationRoute, enabled: true },
  availability: { route: availabilityRoute, enabled: true },
  category: { route: categoryRoute, enabled: true },
  config: { route: configRoute, enabled: true },
  customAttribute: { route: customAttributeRoute, enabled: true },
  document: { route: documentRoute, enabled: true },
  entry: { route: entryRoute, enabled: true },
  event: { route: eventRoute, enabled: true },
  message: { route: messageRoute, enabled: true },
  order: { route: orderRoute, enabled: true },
  role: { route: roleRoute, enabled: true },
  search: { route: searchRoute, enabled: true },
  signal: {
    route: signalRoute,
    enabled: config.get('Features.Signal.enabled') !== false,
  },
  task: { route: taskRoute, enabled: true },
  transaction: { route: transactionRoute, enabled: true },
  user: { route: userRoute, enabled: true },
  webhook: { route: webhookRoute, enabled: true },
  workflow: { route: workflowRoute, enabled: true },
}
const customRoutes = {}

function getRoutes() {
  const filteredCoreRoutes = {}
  Object.keys(coreRoutes).forEach((routeName) => {
    const { route, enabled } = coreRoutes[routeName]
    if (enabled === false) {
      return
    }
    filteredCoreRoutes[routeName] = route
  })
  return { ...filteredCoreRoutes, ...customRoutes }
}

function init(...args) {
  const routesObj = getRoutes()

  Object.keys(routesObj).forEach((key) => {
    const route = routesObj[key]
    route.init(...args)
  })
}

function start(...args) {
  const routesObj = getRoutes()

  Object.keys(routesObj).forEach((key) => {
    const route = routesObj[key]
    route.start(...args)
  })
}

function stop(...args) {
  const routesObj = getRoutes()

  Object.keys(routesObj).forEach((key) => {
    const route = routesObj[key]
    route.stop(...args)
  })
}

function registerRoutes(name, routesConfig) {
  Object.keys(routesConfig).forEach((routeKey) => {
    const routeConfig = routesConfig[routeKey]
    const routeName = `${name}.${routeKey}`

    if (typeof routeConfig.init !== 'function') {
      throw new Error(
        `Route registration: missing init function for route "${routeName}"`,
      )
    }
    if (typeof routeConfig.start !== 'function') {
      throw new Error(
        `Route registration: missing start function for route "${routeName}"`,
      )
    }
    if (typeof routeConfig.stop !== 'function') {
      throw new Error(
        `Route registration: missing stop function for route "${routeName}"`,
      )
    }

    customRoutes[routeName] = routeConfig
  })
}

module.exports = {
  init,
  start,
  stop,

  registerRoutes,
}
