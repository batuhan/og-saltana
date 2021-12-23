const debug = require('debug')('saltana:api')
const config = require('config')

function testMiddleware(req, res, next) {
  if (config.get('Env') === 'test') {
    req.workingTestMiddleware = true
    debug('Link plugin test middleware is working fine')
  }
  next()
}

module.exports = {
  testMiddleware,
}
