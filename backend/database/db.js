const express = require('express')
const app = express()
const mysql2 = require('mysql2')
const myConnection = require('express-myconnection')
require('dotenv').config()

const db = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
}

app.use(myConnection(mysql2, db, 'pool'))

module.exports = db
