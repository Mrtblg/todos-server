import { DATABASE, DATABASE_PORT, DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD } from "babel-dotenv";

/**
 * Create a knex connector based on env credentials to link the DB
 * this is a connexion pool
 */
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    database: DATABASE,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
  },
  pool: { min: 0, max: 7 },
})

export default knex;
