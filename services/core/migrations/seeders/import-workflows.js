const { createInstance } = require('@saltana/sdk')
const config = require('config')

const apiHost = config.get('Public.api.host')

const apiKey = config.get('ApiSecretKey')
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
