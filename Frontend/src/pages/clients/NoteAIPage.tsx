import { useRef, useState, useEffect } from 'react'
import Typed from 'typed.js'
import ReactMarkdown from 'react-markdown'
import { Navbar } from '@/components/layout'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { Button, Textarea } from '@/components/ui'
import { SendHorizontal } from 'lucide-react'
import { cn } from '@/lib/cn'
import prompts from '@/utils/prompting'
import { GoogleGenAI } from '@google/genai'

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
    <div className="max-w-full prose prose-neutral text-gray-900">
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

  const fullPrompt = `${selectedPrompt}\n\nVoici mes notes :\n${input}`

  const askQuestion = async e => {
    e.preventDefault()

    try {
      if (!input.trim()) return

      setLoading(true)
      setInput('')
      setIsVisible(false)

      await fetch('http://localhost:3000/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullPrompt }),
      })

      // const data = await res.json()

      // if (data.success && data.quiz && data.quiz.lesson) {
      //   const explanation = data.quiz.lesson.explanation
      //   setMessages(prev => [
      //     ...prev,
      //     { id: Date.now(), text: explanation, from: 'ai' },
      //   ])
      // }

      // const ai = new GoogleGenAI({
      //   apiKey: 'AIzaSyBMZYsNqPK9tGWbek9e5uqoJsQPRnOX43I',
      // })

      // async function main() {
      //   const response = await ai.models.generateContent({
      //     model: 'gemini-3-flash-preview',
      //     contents: fullPrompt,
      //   })
      //   console.log(response.text)
      // }
    } catch (error) {
      toast.error('erreur veillez ressayer', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const typed = new Typed(textTypedRef.current, {
      strings: [
        'Sacré Coeur AI  est disponible. Que puis-je faire pour vous ?',
        'Travaillez plus intelligemment avec Sacré Coeur AI !',
      ],
      typeSpeed: 18,
      showCursor: true,
      loop: true,
    })

    return () => typed.destroy()
  }, [])

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" />
      <div className="p-5 h-screen bg-white flex flex-col justify-center items-center">
        {/* Chat Box */}
        <div className=" rounded-xl p-4  w-full h-full  mt-20 overflow-auto mb-6">
          {isVisible ? (
            <div className="flex justify-center h-[60%] items-center gap-4">
              <div className="flex justify-center text-white space-x-2">
                <p
                  ref={textTypedRef}
                  className="text-gray-900 text-3xl font-mono font-semibold max-sm:text-lg "
                ></p>
              </div>
            </div>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className="my-4 flex justify-start">
                <div className="p-4 rounded-xl w-full ">
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
        <div
          className={cn(
            'w-2/4 grid grid-cols-1 md:grid-cols-3 gap-3 mb-4',
            messages.length === 0 ? '' : 'max-sm:hidden'
          )}
        >
          {Object.entries(prompts).map(([key, promptText]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedPrompt(promptText)}
              className={cn(
                'w-full px-4 py-3 rounded-full border  font-medium hover:ring-2 hover:ring-purple-400 transition ',
                selectedPrompt === promptText
                  ? 'bg-purple-600 text-gray-100'
                  : 'bg-transparent text-gray-900'
              )}
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
          <form
            onSubmit={askQuestion}
            className={cn(
              'flex items-center gap-2 w-2/4 max-sm:w-full',
              messages.length === 0 ? '' : 'max-sm:hidden'
            )}
          >
            <Textarea
              name="question"
              className="w-full flex-1 p-3 rounded-3xl border border-gray-500 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Écris ton message..."
              value={input}
              rows={3}
              onChange={e => setInput(e.target.value)}
            />
            {selectedPrompt && (
              <Button
                type="submit"
                disabled={loading}
                className="px-4 py-3 size-12 rounded-full bg-purple-600 text-white font-semibold hover:bg-purple-700 transition disabled:cursor-not-allowed disabled:bg-purple-300 "
              >
                <SendHorizontal />
              </Button>
            )}
          </form>
        ) : (
          <Link to="/quiz" className="text-gray-700 underline mt-4">
            Teste Ta Comprehension avec Sacré Coeur Quiz
          </Link>
        )}
      </div>
    </>
  )
}
