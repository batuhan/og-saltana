const env = process.env.NODE_ENV === 'production' ? 'production' : 'development'

require('@saltana/common').load()

const { initSaltanaSdk } = require('./sdk')

const apiBaseURL = process.env.SALTANA_CORE_API_URL

// This secret key should be used to initialize/update data and content in API.
// Please use it only in secure environments.
const apiKey = process.env.SALTANA_SECRET_API_KEY

const saltana = initSaltanaSdk({ apiBaseURL, apiKey })

module.exports = saltana
