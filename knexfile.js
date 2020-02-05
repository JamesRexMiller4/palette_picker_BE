// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/palette_picker',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/palette_picker_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './seeds/test'
    },
    useNullAsDefault: true,
  }

};
