const config = require('config').get('ExternalServices')

module.exports = {
  client: 'pg',
  connection: {
    host: config.get('pgsql.host'),
    database: config.get('pgsql.database'),
    user: config.get('pgsql.user'),
    password: config.get('pgsql.password'),
    port: config.get('pgsql.port'),
    ssl: { rejectUnauthorized: false },
    schema: 'public',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations/knex',
  },
}
