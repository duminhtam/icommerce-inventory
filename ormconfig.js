require("dotenv").config();

// This is used for seeding data
module.exports = [
  {
    name: 'default',
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    type: 'postgres',
    database: process.env.POSTGRES_DB,
    entities: ['src/user/entities/**/*{.ts,.js}'],
    factories: ['migrations/factories/**/*{.ts,.js}'],
    seeds: ['migrations/seeds/**/*{.ts,.js}'],
  }
]
