require('../src/secure-env').config()
const config = require('config')

const { start: startApm } = require('./apm')
// start the APM service before Restify server so it can monitor all application lifecycle
startApm()
const { start, stop } = require('./index')
const { onClose } = require('./close')

start({
  enableSignal: config.get('Features.Signal.enabled') !== false,
})

onClose(async (signal, value) => {
  await stop()

  process.exit(128 + value)
})
