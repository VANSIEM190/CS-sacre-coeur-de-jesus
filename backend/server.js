import express from 'express'
import fs from 'fs'
import fetch from 'node-fetch'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

app.use(express.json())
app.use(express.static('public'))

app.post('/generate-quiz', async (req, res) => {
  const { fullPrompt } = req.body

  const response = await fetch(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Tu es un professeur qui génère des quiz.',
          },
          { role: 'user', content: fullPrompt },
        ],
      }),
    }
  )

  if (!response.ok) {
    // Si la requête a échoué, on renvoie l’erreur
    const text = await response.text()
    return res.status(response.status).json({ success: false, error: text })
  }

  const data = await response.json()

  // Vérification sécurisée
  if (
    !data.choices ||
    !data.choices[0] ||
    !data.choices[0].message ||
    !data.choices[0].message.content
  ) {
    console.error("Réponse inattendue de l'API :", data)
    return res.status(500).send("Réponse inattendue de l'API OpenRouter")
  }

  const quizJSON = data.choices[0].message.content

  let quizObject
  try {
    quizObject = JSON.parse(quizJSON)
  } catch (err) {
    return res.status(500).send("Le JSON renvoyé par l'IA est invalide")
  }

  // Écriture du fichier
  fs.writeFileSync('public/data/quiz.json', JSON.stringify(quizObject, null, 2))

  res.json({ success: true, quiz: quizObject })
})

app.get('/api/quiz', (req, res) => {
  res.sendFile(path.resolve('public/data/quiz.json'))
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log('Backend lancé sur port ' + PORT))
