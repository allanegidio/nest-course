// module.exports = {
//   type: 'mysql',
//   host: process.env.HOST_DB,
//   port: process.env.PORT_DB,
//   username: process.env.USER_DB,
//   password: process.env.PASS_DB,
//   database: process.env.NAME_DB,
//   synchronize: false,
//   entities: ["dist/**/*.entity{.ts,.js}"],
//   migrations: ['src/database/migrations/*.{js,ts}'],
//   cli: {
//      migrationsDir: './src/database/migrations',
//   },
// };


let dbConfig = {
  synchronize: false,
  migrations: ['migrations/*.{js,ts}'],
  cli: {
    migrationsDir: 'migrations'
  }
}

switch(process.env.NODE_ENV) {
  case 'dev':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'data/db.sqlite',
      entities: ['dist/**/*.entity{.ts,.js}']
    })
    break

  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'data/test.sqlite',
      entities: ['**/*.entity.ts'],
      migrationsRun: true
    })
    break

  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      migrationsRun: true,
      entities: ['**/*.entity.js'],
      ssl: {
        rejectUnauthorized: false
      }
    })
    break

  default:
    throw new Error('Unknow environment')
}

module.exports = dbConfig