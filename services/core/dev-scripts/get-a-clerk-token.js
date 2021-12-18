const { createInstance } = require('@saltana/sdk')
// eslint-disable-next-line import/no-extraneous-dependencies
const config = require('config')

const apiHost = config.get('Public.api.host')

const apiKey = config.get('ApiSecretKey')

const admin = createInstance({ apiHost, apiKey })

const assetTypes = require('./data/assetTypes')

async function init() {
  const existingAssetTypes = await admin.assetTypes.list()

  if (existingAssetTypes.length > 0) {
    // eslint-disable-next-line no-console
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
