import express from 'express'
import cors from 'cors'
import { routes } from './router/routes.js'
import cookieParser from 'cookie-parser'
const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static('public'))

app.use('/api/v1', routes)

app.listen(3000, error => {
  if (error) {
    console.log('il y a erreur lors du démararge')
  }
  console.log('le serveur est demarré')
})
