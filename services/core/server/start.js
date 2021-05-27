require('@saltana/env').load()
require('../src/secure-env').config()
console.log(1)
const { start: startApm } = require('./apm')
console.log(2)
// start the APM service before Restify server so it can monitor all application lifecycle
startApm()
console.log(3)
const { start, stop } = require('./index')
console.log(3, 1)
const { onClose } = require('./close')
console.log(4)
start()
console.log(5)
onClose(async (signal, value) => {
  await stop()

  process.exit(128 + value)
})
