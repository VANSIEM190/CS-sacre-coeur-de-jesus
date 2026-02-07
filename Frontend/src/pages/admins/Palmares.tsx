import React, { useMemo, useState } from 'react'
import { PalmaresList } from '@/components/common'

const Palmares = () => {
  const [query, setQuery] = useState('')

  const results = useMemo(
    () => [
      {
        id: 1,
        student: 'Alice Dupont',
        classe: '6ème A',
        average: 15.2,
        subjects: [
          { name: 'Maths', grade: 16 },
          { name: 'Français', grade: 14 },
          { name: 'Histoire', grade: 15 },
        ],
      },
      {
        id: 2,
        student: 'Mohamed Diallo',
        classe: '6ème A',
        average: 12.4,
        subjects: [
          { name: 'Maths', grade: 10 },
          { name: 'Français', grade: 13 },
          { name: 'Histoire', grade: 14 },
        ],
      },
      {
        id: 3,
        student: 'Sophie Martin',
        classe: '5ème B',
        average: 17.1,
        subjects: [
          { name: 'Maths', grade: 18 },
          { name: 'Français', grade: 16 },
          { name: 'Anglais', grade: 17 },
        ],
      },
    ],
    []
  )

  const filtered = results.filter(
    r =>
      r.student.toLowerCase().includes(query.toLowerCase()) ||
      r.classe.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Palmarès</h2>
            <p className="text-sm text-gray-500">
              Publier et consulter les résultats des élèves
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Rechercher un élève ou une classe..."
              className="px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button className="px-4 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:opacity-95">
              Publier résultat
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <PalmaresList results={filtered} />
        </div>
      </div>
    </div>
  )
}

export default Palmares
