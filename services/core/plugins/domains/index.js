module.exports = {
  name: 'domains',
  version: '0.1.0',

  // semver range expected (https://github.com/npm/node-semver)
  supportedServerVersions: '>=1.0.0-beta.0',

  routes: require('./routes'),
  versions: require('./versions'),
  middlewares: require('./middlewares'),

  permissions: [
    'domain:stats:all',
    'domain:list',
    'domain:list:all',
    'domain:read',
    'domain:read:all',
    'domain:create',
    'domain:create:all',
    'domain:edit',
    'domain:edit:all',
    'domain:remove',
    'domain:remove:all',
  ],

  fixtures: require('./test/fixtures'),
}
