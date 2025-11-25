import React, { useMemo, useState } from 'react'
import { ClassFilter, StudentsList } from '@/components/common'

const StudentsManagement = () => {
  const [query, setQuery] = useState('')
  const [selectedClass, setSelectedClass] = useState('Tous')

  const students = useMemo(
    () => [
      { id: 1, name: 'Alice Dupont', classe: '6ème A', age: 11 },
      { id: 2, name: 'Mohamed Diallo', classe: '6ème A', age: 12 },
      { id: 3, name: 'Sophie Martin', classe: '5ème B', age: 12 },
      { id: 4, name: 'Ibrahim Sow', classe: '5ème B', age: 13 },
      { id: 5, name: 'Emma Leroy', classe: '4ème C', age: 13 },
      { id: 6, name: 'Lucas Moreau', classe: '4ème C', age: 14 },
    ],
    []
  )

  const classes = useMemo(() => {
    const set = new Set(students.map(s => s.classe))
    return ['Tous', ...Array.from(set)]
  }, [students])

  const filtered = students.filter(s => {
    const matchesClass = selectedClass === 'Tous' || s.classe === selectedClass
    const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase())
    return matchesClass && matchesQuery
  })

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Gestion des élèves
            </h2>
            <p className="text-sm text-gray-500">Liste des élèves par classe</p>
          </div>
          <div className="flex items-center space-x-3">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Rechercher un élève..."
              className="px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button className="px-4 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:opacity-95">
              Nouvel élève
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Classes</h3>
              <ClassFilter
                classes={classes}
                selected={selectedClass}
                onSelect={setSelectedClass}
              />
            </div>
          </aside>

          <main className="md:col-span-3">
            <div className="bg-white p-4 rounded-lg shadow">
              <StudentsList students={filtered} />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default StudentsManagement
