import { useRef, useState, useEffect } from 'react'
import Typed from 'typed.js'
import ReactMarkdown from 'react-markdown'
import { NavbarRetourHome } from '@/components/layout'

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

  const prompts = {
    analyse: `
Tu es un assistant pédagogique avancé. Quand je te fournis des notes, des idées ou un texte confus, tu dois :
1. Résumer clairement ce que j’ai voulu dire.
2. Organiser toutes les idées de façon logique et structurée.
3. Expliquer les concepts difficiles avec des exemples simples.
4. Identifier les points manquants ou imprécis.
5. Améliorer la qualité de mes notes sans changer leur sens.
Réponds toujours de manière claire, pédagogique et concise.
`,
    professeur: `
Tu es mon professeur particulier d’intelligence artificielle. Lorsque je te donne mes notes ou un sujet que je ne comprends pas :
1. Reformule pour vérifier si tu as bien compris.
2. Explique-moi étape par étape comme si j’étais débutant.
3. Donne des analogies simples pour que je comprenne facilement.
4. Pose-moi une petite question pour vérifier ma compréhension.
5. Propose une version améliorée de mes notes à la fin.
Sois patient, clair et très pédagogique.
`,
    revision: `
Tu es un assistant IA spécialisé en mémorisation. Quand je te partage des notes, tu dois :
1. Repérer les concepts-clés.
2. Créer une explication courte + une explication détaillée.
3. Générer des exemples réels pour m’aider à retenir.
4. Produire un mini quiz de 3 questions pour tester ma compréhension.
5. Me proposer une version optimisée de mes notes sous forme de fiche de révision.
Réponds de manière structurée, claire et très pratique.
`,
  }

  const fullPrompt = `${selectedPrompt}\n\nVoici mes notes :\n${input}`

  const sendMessage = async e => {
    e.preventDefault()
    if (!input.trim()) return

    setLoading(true)
    setInput('')

    try {
      const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization:
              'Bearer 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',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content:
                  'Réponds de manière structurée et agréable à lire, en Markdown.',
              },
              { role: 'user', content: fullPrompt },
            ],
          }),
        }
      )

      const data = await response.json()
      const aiText = data.choices[0].message.content

      setMessages(prev => [
        ...prev,
        { id: Date.now(), text: aiText, from: 'ai' },
      ])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <NavbarRetourHome />
      <div className="p-5 min-h-screen bg-gray-100">
        {/* Chat Box */}
        <div className="bg-gray-50 rounded-xl p-4 shadow-lg h-[62vh] mt-20 overflow-auto mb-6">
          {messages.map(msg => (
            <div key={msg.id} className="my-4 flex justify-start">
              <div className="p-4 rounded-xl w-full bg-gray-800 shadow-sm">
                <AnimatedMarkdown text={msg.text} />
                <hr className="my-2 border-gray-600" />
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-gray-900 text-center mt-5 animate-pulse">
              L'IA réfléchit...
            </div>
          )}
        </div>

        {/* Prompt Selection */}
        <div className=" grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {Object.entries(prompts).map(([key, promptText]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedPrompt(promptText)}
              className={`p-3 rounded-xl border font-medium shadow-sm transition text-gray-100 hover:bg-purple-600 hover:shadow-md ${
                selectedPrompt === promptText
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-900'
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
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-3 rounded-xl border border-gray-500 text-gray-900 placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Écris ton message..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
          >
            Envoyer
          </button>
        </form>
      </div>
    </>
  )
}
