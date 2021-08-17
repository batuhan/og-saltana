const debug = require('debug')('saltana:api')

function testMiddleware (req, res, next) {
  if (process.env.NODE_ENV === 'test') {
    req.workingTestMiddleware = true
    debug('Link plugin test middleware is working fine')
  }
  next()
}

module.exports = {
  testMiddleware
}
