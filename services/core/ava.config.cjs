const config = require('config')

const ignoredLocalPlugins = config.get('Plugins.ignored')
const pluginsPaths = config.get('Plugins.paths')
const instantData = config.get('LocalEnv.instantData')
const testsFromConfig = config.get('TestEnv.tests')

const fromEnvVar = (v = '') =>
  v
    .split(',')
    .filter(Boolean)
    .map((s) => s.trim())

const pluginTestsToIgnore = fromEnvVar(ignoredLocalPlugins).map(
  (p) => `!plugins/${p}/**/*`,
)
const cliLoadedPluginTests = fromEnvVar(pluginsPaths).map(
  (p) => `${p}/**/*.spec.js`,
)

let tests = []
const seedTests = ['scripts/instantData.js']
const integrationTests = [
  'test/integration/**/*.spec.js',
  'plugins/**/*.spec.js',
  ...cliLoadedPluginTests,
]
const unitTests = ['test/unit/**/*.spec.js']

let files = []

if (instantData === 'true') files = [...seedTests]
else {
  if (testsFromConfig === 'integration') tests.push(...integrationTests)
  else if (testsFromConfig === 'unit') tests.push(...unitTests)
  else tests = [...unitTests, ...integrationTests]

  files = [...tests, ...pluginTestsToIgnore]
}

module.exports = () => ({
  files,
  serial: false,
  cache: false,
  timeout: '30s',
})
