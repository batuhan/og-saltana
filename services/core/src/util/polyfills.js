/* eslint-disable */

const config = require('config')
const { serializeError } = require('serialize-error')

const PROD = config.get('Env') === 'production'

function initErrors() {
  if (!('toJSON' in Error.prototype)) {
    Object.defineProperty(Error.prototype, 'toJSON', {
      value: function() {
        const alt = serializeError(this)

        alt.name = alt.name || 'Internal Server Error'
        alt.expose = this.expose
        alt.statusCode = this.statusCode

        return alt
      },
      configurable: true,
      writable: true
    })
  }
}

module.exports = {
  initErrors
}
