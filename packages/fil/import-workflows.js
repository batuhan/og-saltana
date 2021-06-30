const { createInstance } = require('@saltana/sdk/dist/saltana.node')

const apiHost = process.env.SALTANA_CORE_API_HOST || "dev.saltana.com"

const apiKey = process.env.SALTANA_SECRET_API_KEY || "seck_test_wakWA41rBTUXs1Y5oNRjeY5o"

const admin = createInstance({ apiHost, apiKey })

const workflows = require('./data/workflows')

async function init() {
  const existingWorkflows = await admin.workflows.list();

  if (existingWorkflows.length > 0) {
    console.error("There are existing workflows")
    return
  }
  const promises = Object.keys(workflows).map((key) => {
    return admin.workflows.create(workflows[key])
  })

  await Promise.all(promises)
  console.log(`${promises.length} imports are done`)
}

init().then(() => console.log('Done'))
