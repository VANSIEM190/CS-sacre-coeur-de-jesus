import React, { useMemo, useState } from 'react'
import { PersonnelList } from '@/components/common'

const PersonnelManagement = () => {
  const [query, setQuery] = useState('')

  const staff = useMemo(
    () => [
      {
        id: 1,
        name: 'M. Jean-Pierre Durand',
        role: 'Directeur',
        email: 'jp.durand@ecole.fr',
        phone: '06 12 34 56 78',
      },
      {
        id: 2,
        name: 'Mme. Amélie Bernard',
        role: 'Prof. Mathématiques',
        email: 'a.bernard@ecole.fr',
        phone: '06 23 45 67 89',
      },
      {
        id: 3,
        name: 'M. Paul Ndiaye',
        role: 'Prof. Français',
        email: 'p.ndiaye@ecole.fr',
        phone: '06 98 76 54 32',
      },
      {
        id: 4,
        name: 'Mme. Claire Petit',
        role: 'Infirmière',
        email: 'c.petit@ecole.fr',
        phone: '06 87 65 43 21',
      },
    ],
    []
  )

  const filtered = staff.filter(
    s =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.role.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Gestion du personnel
            </h2>
            <p className="text-sm text-gray-500">
              Liste du personnel et actions
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Rechercher un membre..."
              className="px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button className="px-4 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:opacity-95">
              Nouveau membre
            </button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <PersonnelList staff={filtered} />
        </div>
      </div>
    </div>
  )
}

export default PersonnelManagement
