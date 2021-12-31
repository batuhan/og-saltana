const config = require('config')

const storeService = require('./store')
const batchService = require('./batch')

const apiKeyService = require('./apiKey')
const assessmentService = require('./assessment')
const assetService = require('./asset')
const assetTypeService = require('./assetType')
const authenticationService = require('./authentication')
const authorizationService = require('./authorization')
const availabilityService = require('./availability')
const categoryService = require('./category')
const configService = require('./config')
const customAttributeService = require('./customAttribute')
const documentService = require('./document')
const entryService = require('./entry')
const eventService = require('./event')
const messageService = require('./message')
const namespaceService = require('./namespace')
const orderService = require('./order')
const roleService = require('./role')
const searchService = require('./search')
const signalService = require('./signal')
const taskService = require('./task')
const transactionService = require('./transaction')
const userService = require('./user')
const webhookService = require('./webhook')
const workflowService = require('./workflow')

const services = {
  store: { service: storeService, enabled: true },
  batch: { service: batchService, enabled: true },
  apiKey: { service: apiKeyService, enabled: true },
  assessment: { service: assessmentService, enabled: true },
  asset: { service: assetService, enabled: true },
  assetType: { service: assetTypeService, enabled: true },
  authentication: { service: authenticationService, enabled: true },
  authorization: { service: authorizationService, enabled: true },
  availability: { service: availabilityService, enabled: true },
  category: { service: categoryService, enabled: true },
  config: { service: configService, enabled: true },
  customAttribute: { service: customAttributeService, enabled: true },
  document: { service: documentService, enabled: true },
  entry: { service: entryService, enabled: true },
  event: { service: eventService, enabled: true },
  message: { service: messageService, enabled: true },
  namespace: { service: namespaceService, enabled: true },
  order: { service: orderService, enabled: true },
  role: { service: roleService, enabled: true },
  search: { service: searchService, enabled: true },
  signal: {
    service: signalService,
    enabled: config.get('Features.Signal.enabled') !== false,
  },
  task: { service: taskService, enabled: true },
  transaction: { service: transactionService, enabled: true },
  user: { service: userService, enabled: true },
  webhook: { service: webhookService, enabled: true },
  workflow: { service: workflowService, enabled: true },
}

const getServices = () =>
  Object.keys(services).filter((key) => services[key].enabled)

function init(...args) {
  getServices().forEach((key) => {
    const { service } = services[key]
    service.init(...args)
  })
}

function start(...args) {
  getServices().forEach((key) => {
    const { service } = services[key]
    service.start(...args)
  })
}

function stop(...args) {
  getServices().forEach((key) => {
    const { service } = services[key]
    service.stop(...args)
  })
}

module.exports = {
  init,
  start,
  stop,

  services,
}
