import React from 'react'
import ListeParClasse from '@/utils/ListeParClasse'

const ClassList = React.memo(({ onClick }) => {
  console.log('rederChild')
  return (
    <div className="backdrop-blur-xl bg-white/80 shadow-2xl border border-white/40 rounded-3xl p-8 transition hover:shadow-3xl">
      <h2 className="text-3xl font-bold mb-8 bg-linear-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
        Liste Des Classes
      </h2>

      <div className="space-y-4 max-h-96 overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {ListeParClasse.map((promotion, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl bg-white/80 shadow-sm hover:shadow-lg hover:bg-white transition-all"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 bg-linear-to-br ${promotion.color} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {promotion.icon}
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-lg">
                  {promotion.name}
                </p>
                <p className="text-sm text-gray-500">{promotion.classe}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button
                type="button"
                className="px-4 py-2 rounded-xl border bg-gray-100 hover:bg-gray-200 transition shadow-sm"
              >
                Notifier
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition shadow"
                onClick={() => onClick(promotion)}
              >
                Marquer présent
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-8 w-full py-3 rounded-2xl bg-blue-600 text-white text-lg shadow hover:bg-blue-700 transition">
        Notifier tous les parents
      </button>
    </div>
  )
})

export default ClassList
