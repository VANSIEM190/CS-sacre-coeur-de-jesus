import { env } from './env.config'
import dotenv from 'dotenv'
import mysql from 'mysql2'
dotenv.config()

export const sacreCoeurDB = mysql.createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
})
