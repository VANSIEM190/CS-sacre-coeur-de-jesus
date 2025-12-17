import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavbarRetourHome } from '@/components/layout'

export default function QuizPage() {
  const [data, setData] = useState(null)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [seconds, setSeconds] = useState(30)
  const navigate = useNavigate()

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Load JSON
  useEffect(() => {
    fetch('http://localhost:3000/api/quiz')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err))
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Chargement du contenu...
      </div>
    )
  }

  const quiz = data.quiz
  const question = quiz[current]
  const progress = ((current + 1) / quiz.length) * 100

  const handleNext = () => {
    if (question.options[selected] === question.correctAnswer) {
      setScore(s => s + 1)
    }
    setSelected(null)
    setSeconds(30)
    setCurrent(c => c + 1)
  }

  // End screen
  if (current >= quiz.length) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 ">
        <div className="bg-slate-900  p-8 rounded-2xl border border-slate-800 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Quiz terminé 🎉</h2>
          <p className="text-slate-400">
            Score :{' '}
            <span className="text-violet-400 font-semibold">{score}</span> /{' '}
            {quiz.length}
          </p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-white"
          >
            Retour
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <NavbarRetourHome />
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900 ">
        <div className="w-full max-w-4xl bg-slate-100 rounded-2xl shadow-2xl p-8 space-y-8 border border-slate-800 mt-20 ">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-black max-sm:text-xl">
                {data.lesson.title}
              </h1>
              <p className="text-slate-400 mt-1">Quiz de compréhension</p>
            </div>

            <div className="flex items-center gap-2 bg-violet-600/10 text-violet-400 px-4 py-2 rounded-xl text-sm font-medium border border-violet-600/30">
              ⏱ {seconds}s
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-slate-400">
              <span>Progression</span>
              <span className="text-violet-400 font-medium">
                {current + 1} / {quiz.length}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-violet-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="bg-gray-900/10 rounded-2xl p-6 space-y-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white max-sm:text-lg">
              {question.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, i) => (
                <label
                  key={i}
                  className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer border transition \
                  ${
                    selected === i
                      ? 'border-violet-500 bg-slate-800'
                      : 'border-slate-700 bg-slate-900 hover:border-violet-500'
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    className="accent-violet-500"
                    checked={selected === i}
                    onChange={() => setSelected(i)}
                  />
                  <span className="text-slate-200 max-sm:text-sm">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end">
            <button
              disabled={selected === null}
              onClick={handleNext}
              className="px-6 py-2 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 disabled:opacity-40"
            >
              Question suivante →
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
