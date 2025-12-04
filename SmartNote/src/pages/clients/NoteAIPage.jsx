import { useRef, useState, useEffect } from 'react'
import Typed from 'typed.js'
import ReactMarkdown from 'react-markdown'
import { NavbarRetourHome } from '@/components/layout'

// 🔥 Composant qui anime d'abord, puis affiche proprement en Markdown
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
    <div className="max-w-full prose prose-neutral">
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

  const sendMessage = async e => {
    e.preventDefault()
    if (!input.trim()) return
    setLoading(true)

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
                  'Tu donnes des réponses structurées, en Markdown, claires et agréables à lire comme ChatGPT.',
              },
              { role: 'user', content: input },
            ],
          }),
        }
      )

      const data = await response.json()
      const aiText = data.choices[0].message.content

      const newMsg = {
        id: Date.now(),
        text: aiText,
        from: 'ai',
      }

      setMessages(prev => [...prev, newMsg])
      setLoading(false)
    } catch (err) {
      console.error(err)
      setLoading(false)
    }

    setInput('')
  }

  return (
    <>
      <NavbarRetourHome />
      <div className="p-5 bg-gray-100 min-h-screen ">
        <div className="bg-white rounded-xl p-4 shadow-lg h-[73vh] overflow-auto mt-19">
          {/* Affichage des messages */}
          {messages.map(msg => (
            <div key={msg.id} className="my-4 flex justify-start">
              <div className=" p-3 rounded-xl w-full">
                <AnimatedMarkdown text={msg.text} />
                <hr className="my-2" />
              </div>
            </div>
          ))}

          {/* Chargement */}
          {loading && (
            <div className="text-gray-500 text-center mt-5">
              L'IA réfléchit...
            </div>
          )}
        </div>

        {/* Formulaire */}
        <form onSubmit={sendMessage} className="mt-3 flex gap-2">
          <input
            type="text"
            className="flex-1 p-3 rounded-xl border"
            placeholder="Écris ton message..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button className="px-4 py-3 bg-purple-600 text-white rounded-xl">
            Envoyer
          </button>
        </form>
      </div>
    </>
  )
}
