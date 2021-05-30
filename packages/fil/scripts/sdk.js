const { createInstance } = require('saltana')

const apiVersion = '2019-05-20'

function initSaltanaSdk ({ apiBaseURL, apiKey }) {
  const saltana = createInstance({ apiKey, apiVersion })

  if (apiBaseURL) {
    const parsedUrl = new URL(apiBaseURL)

    const host = parsedUrl.hostname
    const port = parsedUrl.port
    const protocol = parsedUrl.protocol.slice(0, -1)

    saltana.setHost(host, port, protocol)
  }

  return saltana
}

module.exports = {
  initSaltanaSdk
}
