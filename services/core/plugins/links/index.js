module.exports = {
  name: 'links',
  version: '0.1.0',

  // semver range expected (https://github.com/npm/node-semver)
  supportedServerVersions: '>=1.0.0-beta.0',

  routes: require('./routes'),
  versions: require('./versions'),
  middlewares: require('./middlewares'),

  permissions: [
    'link:stats:all',
    'link:list',
    'link:list:all',
    'link:read',
    'link:read:all',
    'link:create',
    'link:create:all',
    'link:edit',
    'link:edit:all',
    'link:remove',
    'link:remove:all',
  ],

  // fixtures: require('./test/fixtures')
}
