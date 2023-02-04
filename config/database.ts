import { createPool } from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const pool = createPool({
  port: parseInt(process.env.DB_PORT as string),
  host: process.env.DB_HOSTNAME as string,
  user: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_DATABASE as string,
})

export default pool