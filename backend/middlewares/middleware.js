const express = require('express')
const mysql2 = require('mysql2')
const myConnection = require('express-myconnection')
const app = express()
const db = require('../database/db')

app.use(myconnection(mysql2 ,db , 'pool' ))