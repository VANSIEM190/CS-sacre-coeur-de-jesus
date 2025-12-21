import React from 'react'
import { Download, ChevronRight } from 'lucide-react'

const classes = [
  {
    classe: '5ème A',
    enseignant: 'Mme Bernard',
    total: 32,
    presents: 30,
    absents: 1,
    retards: 1,
    taux: 93.8,
  },
  {
    classe: '4ème A',
    enseignant: 'Mme Robert',
    total: 31,
    presents: 29,
    absents: 2,
    retards: 0,
    taux: 93.5,
  },
  {
    classe: '3ème A',
    enseignant: 'Mme Durand',
    total: 30,
    presents: 28,
    absents: 1,
    retards: 1,
    taux: 93.3,
  },
]

const ResumeParClasse = () => {
  return (
    <div className="backdrop-blur-xl bg-white/80 shadow-2xl border border-white/40 rounded-3xl p-8 transition hover:shadow-3xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold bg-linear-to-r from-blue-700 to-blue-400 bg-clip-text text-transparent">
          Résumé par classe
        </h2>
        <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-white shadow-md border hover:bg-gray-50 hover:shadow-lg transition">
          <Download size={19} /> Exporter
        </button>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-md">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-gray-700 text-left">
              <th className="py-3 px-4 font-semibold">Classe</th>
              <th className="py-3 px-4 font-semibold">Enseignant</th>
              <th className="py-3 px-4 text-center font-semibold">Total</th>
              <th className="py-3 px-4 text-center font-semibold">Présents</th>
              <th className="py-3 px-4 text-center font-semibold">Absents</th>
              <th className="py-3 px-4 text-center font-semibold">Retards</th>
              <th className="py-3 px-4 text-center font-semibold">Taux</th>
              <th className="py-3 px-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="backdrop-blur-sm">
            {classes.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-white/60 transition-all"
              >
                <td className="py-4 px-4 font-medium">{item.classe}</td>
                <td className="py-4 px-4">{item.enseignant}</td>
                <td className="py-4 px-4 text-center">{item.total}</td>
                <td className="py-4 px-4 text-center text-green-600 font-semibold">
                  {item.presents}
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-xl text-xs">
                    {item.absents}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-xl text-xs">
                    {item.retards}
                  </span>
                </td>
                <td className="py-4 px-4 text-center font-bold text-blue-600">
                  {item.taux}%
                </td>
                <td className="py-4 px-4 text-center">
                  <button className="flex items-center justify-center gap-1 text-blue-600 hover:text-blue-800 transition">
                    Voir <ChevronRight size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm mt-4 text-gray-600">
        Affichage de {classes.length} classes
      </p>
    </div>
  )
}

export default ResumeParClasse
