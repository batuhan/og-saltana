const { createInstance } = require('@saltana/sdk')
const config = require('config')

const apiHost = config.get('Public.api.host')

const apiKey = config.get('ApiSecretKey')
const admin = createInstance({ apiHost, apiKey })

const categories = require('./data/categories')

async function init() {
  const existingCategories = await admin.categories.list();

  if (existingCategories.length > 0) {
    console.error("There are existing categories")
    return
  }
  const promises = Object.keys(categories).map((key) => {
    return admin.categories.create(categories[key])
  })

  await Promise.all(promises)
  console.log(`${promises.length} imports are done`)
}

init().then(() => console.log('Done'))
