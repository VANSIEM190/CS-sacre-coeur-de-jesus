const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
const app = express()
const register = require('./router/userRoute')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/', register)

app.listen(3001, err => {
  if (err) {
    console.log("une erreur s'est produite")
  }
  console.log('runing server 3001........')
})
