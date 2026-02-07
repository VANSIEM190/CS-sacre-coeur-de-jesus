import express from 'express'
import cors from 'cors'
import { routes } from './router/routes'
const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  })
)

app.use('/api/v1', routes)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.listen(300, error => {
  if (error) {
    console.log('il y a erreur lors du démararge')
  }
  console.log('le serveur est demarré')
})
