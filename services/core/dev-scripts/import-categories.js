const { createInstance } = require('@saltana/sdk/dist/saltana.node')

const apiHost = process.env.SALTANA_CORE_API_HOST || "dev.saltana.com"

const apiKey = process.env.SALTANA_SECRET_API_KEY || "seck_test_wakWA41rBTUXs1Y5oNRjeY5o"

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
