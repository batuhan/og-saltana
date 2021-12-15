const { createInstance } = require('@saltana/sdk/dist/saltana.node')

const apiHost = process.env.SALTANA_CORE_API_HOST || 'dev.saltana.com'

const apiKey =
  process.env.SALTANA_SECRET_API_KEY || 'seck_test_wakWA41rBTUXs1Y5oNRjeY5o'

const admin = createInstance({ apiHost, apiKey })

const assetTypes = require('./data/assetTypes')

async function init() {
  const existingAssetTypes = await admin.assetTypes.list()

  if (existingAssetTypes.length > 0) {
    console.error('There are existing assetTypes')
    return
  }
  const promises = Object.keys(assetTypes).map((key) => {
    return admin.assetTypes.create(assetTypes[key])
  })

  await Promise.all(promises)
  console.log(`${promises.length} imports are done`)
}

init().then(() => console.log('Done'))
