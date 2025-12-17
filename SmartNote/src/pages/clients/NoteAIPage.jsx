import { useRef, useState, useEffect } from 'react'
import Typed from 'typed.js'
import ReactMarkdown from 'react-markdown'
import { NavbarRetourHome } from '@/components/layout'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

// Composant pour l'animation Markdown
function AnimatedMarkdown({ text }) {
  const typedRef = useRef(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [text],
      typeSpeed: 18,
      showCursor: true,
      onComplete: () => {
        setDone(true)
        typed.cursor.remove()
      },
    })

    return () => typed.destroy()
  }, [text])

  return (
    <div className="max-w-full prose prose-neutral text-gray-100">
      {done ? (
        <ReactMarkdown>{text}</ReactMarkdown>
      ) : (
        <span ref={typedRef}></span>
      )}
    </div>
  )
}

export default function ChatAI() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedPrompt, setSelectedPrompt] = useState('')
  const textTypedRef = useRef(null)
  const [isVisible, setIsVisible] = useState(true)

  const prompts = {
    analyse: `
Tu es un assistant pédagogique expert en éducation. Quand je te fournis des notes, idées ou un texte confus :
1. Fais un **résumé clair et concis** de ce que j’ai voulu dire.
2. Organise les idées en sections logiques et structurées.
3. Fournis une **explication détaillée**, étape par étape, avec des **exemples concrets et analogies simples** pour faciliter la compréhension.
4. Identifie les points manquants, ambiguïtés ou imprécisions, et propose des compléments.
5. Améliore la formulation et la clarté sans modifier le sens.

⚠️ Important : Ne réponds pas seulement par quelques phrases. Fournis une explication complète et riche.

Ensuite, génère **10 questions d’évaluation avec 3 options chacune**, et marque la bonne réponse.

Retourne STRICTEMENT un JSON valide au format suivant :

{
  "lesson": {
    "title": "Titre de la leçon",
    "explanation": "Explication détaillée complète avec exemples et analogies."
  },
  "quiz": [
    {
      "id": 1,
      "question": "Texte de la question 1",
      "options": ["Option 1", "Option 2", "Option 3"],
      "correctAnswer": "Option 2"
    }
  ]
}
`,
    professeur: `
Tu es un professeur particulier très patient et clair. Quand je te fournis des notes ou un sujet :
1. Reformule d'abord pour vérifier que tu as bien compris.
2. Explique **étape par étape**, de manière détaillée, avec des exemples concrets et analogies simples.
3. Ajoute des notes supplémentaires pour mieux clarifier les concepts.
4. Propose ensuite 10 questions d’évaluation avec 3 options chacune et indique la bonne réponse.

⚠️ Ne fais jamais une réponse trop brève. Sois exhaustif et structuré.

Retourne STRICTEMENT un JSON valide au format suivant :

{
  "lesson": {
    "title": "Titre de la leçon",
    "explanation": "Explication détaillée complète, claire et pédagogique."
  },
  "quiz": [
    {
      "id": 1,
      "question": "Texte de la question",
      "options": ["Option 1", "Option 2", "Option 3"],
      "correctAnswer": "Option 1"
    }
  ]
}
`,
    revision: `
Tu es un assistant IA spécialisé en mémorisation et fiches de révision. Quand je te partage des notes :
1. Identifie les **concepts clés**.
2. Propose une explication courte pour révision rapide.
3. Fournis une **explication détaillée complète**, avec exemples et analogies pour bien comprendre.
4. Crée 10 questions d’évaluation avec 3 options chacune pour tester la compréhension.
5. Donne une version optimisée des notes sous forme de fiche claire et structurée.

⚠️ Ne fais pas de réponses courtes. Sois structuré, pédagogique et complet.

Retourne STRICTEMENT un JSON valide au format suivant :

{
  "lesson": {
    "title": "Titre de la leçon",
    "explanation": "Explication complète et détaillée pour révision."
  },
  "quiz": [
    {
      "id": 1,
      "question": "Texte de la question",
      "options": ["Option 1", "Option 2", "Option 3"],
      "correctAnswer": "Option 2"
    }
  ]
}
`,
  }

  const fullPrompt = `${selectedPrompt}\n\nVoici mes notes :\n${input}`

  const askQuestion = async e => {
    e.preventDefault()
    if (!input.trim()) return

    setLoading(true)
    setInput('')
    setIsVisible(false)
    try {
      const res = await fetch('http://localhost:3000/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullPrompt }),
      })
      const data = await res.json()
      if (data.success && data.quiz && data.quiz.lesson) {
        const explanation = data.quiz.lesson.explanation
        setMessages(prev => [
          ...prev,
          { id: Date.now(), text: explanation, from: 'ai' },
        ])
      }
    } catch (error) {
      toast.error('erreur veillez ressayer', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const typed = new Typed(textTypedRef.current, {
      strings: [
        'Infogenuis est disponible. Que puis-je faire pour vous ?',
        'Travaillez plus intelligemment avec InfoGenius.',
        'Boostez votre productivité avec InfoGenius.',
      ],
      typeSpeed: 18,
      showCursor: true,
      loop: true,
    })

    return () => typed.destroy()
  }, [])

  return (
    <>
      <NavbarRetourHome />
      <ToastContainer position="top-right" />
      <div className="p-5 h-screen bg-gray-900 flex flex-col justify-center items-center">
        {/* Chat Box */}
        <div className="bg-gray-900 rounded-xl p-4 shadow-lg w-full h-full  mt-20 overflow-auto mb-6">
          {isVisible ? (
            <div className="flex justify-center flex-col items-center gap-4">
              <img
                src="/aiImage.jpeg"
                alt="image de IA"
                className="rounded-full size-22 object-cover"
              />
              <div className="flex justify-center text-white space-x-2">
                <p ref={textTypedRef} className="text-white"></p>
              </div>
            </div>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className="my-4 flex justify-start">
                <div className="p-4 rounded-xl w-full bg-gray-800 shadow-sm">
                  <AnimatedMarkdown text={msg.text} />
                  <hr className="my-2 border-gray-600" />
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="text-gray-400 text-center mt-5 animate-pulse">
              L'IA réfléchit...
            </div>
          )}
        </div>

        {/* Prompt Selection */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {Object.entries(prompts).map(([key, promptText]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedPrompt(promptText)}
              className={`p-3 rounded-xl border border-gray-100 text-gray-100 hover:bg-purple-600 hover:text-white font-medium shadow-sm transition hover:shadow-md ${
                selectedPrompt === promptText
                  ? 'bg-purple-600 text-white'
                  : 'bg-transparent text-gray-100'
              }`}
            >
              {key === 'analyse'
                ? '🔍 Analyse intelligente'
                : key === 'professeur'
                ? '👨‍🏫 Mode Professeur'
                : '📚 Fiche de Révision'}
            </button>
          ))}
        </div>

        {/* Input Form */}
        {messages.length === 0 ? (
          <form onSubmit={askQuestion} className="flex gap-2 w-full">
            <input
              type="text"
              name="question"
              className="w-full flex-1 p-3 rounded-xl border border-gray-500 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Écris ton message..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition disabled:cursor-not-allowed disabled:bg-purple-300 "
            >
              Envoyer
            </button>
          </form>
        ) : (
          <Link to="/quiz" className="text-white">
            Teste Ta Comprehension avec Infogenuis-Quiz
          </Link>
        )}
      </div>
    </>
  )
}
