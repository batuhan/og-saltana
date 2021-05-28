require('@saltana/common').load()

module.exports = {

  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    ssl: { rejectUnauthorized: false },
    schema: 'public'
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations/knex'
  }

}
