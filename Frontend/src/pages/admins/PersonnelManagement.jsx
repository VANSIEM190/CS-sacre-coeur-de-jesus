import React, { useMemo, useState } from 'react'
import { Search, Users, User, Briefcase, Mail } from 'lucide-react'
import { Footer, NavbarRetourHome } from '@/components/layout'
import { PersonnelManagementCard } from '@/components/common'

import STAFF from '@/utils/staff'
import ModalDetailPersonel from '@/components/common/ModalDetailPersonel'

export default function PersonnelManagement() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const departments = [
    'All',
    ...Array.from(new Set(STAFF.map(s => s.department))),
  ]

  const filteredPersonnel = useMemo(
    () =>
      STAFF.filter(staffPersonnel => {
        const allCategory = 'All'
        const matchesQuery =
          staffPersonnel.name.toLowerCase().includes(query.toLowerCase()) ||
          staffPersonnel.role.toLowerCase().includes(query.toLowerCase())
        const matchesFilter =
          filter === allCategory || staffPersonnel.department === filter
        return matchesQuery && matchesFilter
      }),
    [filter, query]
  )

  return (
    <>
      <NavbarRetourHome />
      <div className=" w-screen  flex justify-center  items-center  bg-linear-to-b from-neutral-50 to-white ">
        <div className=" mt-20 min-h-screen p-6 md:p-8 font-sans text-slate-900">
          <header className="max-w-6xl mb-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-indigo-600 text-white p-3 rounded-lg shadow-md">
                  <Users size={20} />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold">
                    Gouvernance & Personnel
                  </h1>
                  <p className="text-sm text-slate-600">
                    Présentation de l’équipe de l’école — direction,
                    administration, enseignants et personnel technique.
                  </p>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center bg-white border border-slate-200 rounded-lg shadow-sm px-3 py-1 w-80">
                  <Search size={16} className="text-slate-400" />
                  <input
                    aria-label="Recherche du personnel"
                    className="ml-2 outline-none w-full text-sm"
                    placeholder="Rechercher par nom ou rôle..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                  />
                </div>
                <select
                  className="px-3 py-2 border rounded-lg text-sm"
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                >
                  {departments.map(d => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* mobile search */}
            <div className="mt-4 md:hidden flex gap-2 max-md:hidden">
              <div className="flex items-center bg-white border border-slate-200 rounded-lg shadow-sm px-3 py-1 w-full">
                <Search size={16} className="text-slate-400" />
                <input
                  aria-label="Recherche mobile"
                  className=" ml-2 outline-none w-full text-sm"
                  placeholder="Rechercher le personnel..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-2 border rounded-lg text-sm"
                value={filter}
                onChange={e => setFilter(e.target.value)}
              >
                {departments.map(d => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </header>

          <main className="max-md:flex max-md:flex-col max-md:items-center max-md:justify-center  grid grid-cols-1 lg:grid-cols-4 px-5 gap-8">
            {/* Left: summary / quick access */}
            <aside className="max-md:w-60 lg:col-span-1 bg-white rounded-2xl p-6 shadow">
              <h2 className="text-lg font-medium mb-4">Vue d’ensemble</h2>
              <p className="text-sm text-slate-600 mb-4">
                Nombre total de membres :{' '}
                <span className="font-semibold">{STAFF.length}</span>
              </p>

              <div className="space-y-3">
                {departments.slice(1).map(dep => (
                  <div key={dep} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Briefcase size={16} className="text-slate-500" />
                      <div>
                        <div className="text-sm font-medium">{dep}</div>
                        <div className="text-xs text-slate-500">
                          {STAFF.filter(s => s.department === dep).length}{' '}
                          membres
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setFilter(dep)}
                      className="text-indigo-600 text-sm"
                    >
                      Voir
                    </button>
                  </div>
                ))}
              </div>

              <hr className="my-4" />
              <div className="text-sm text-slate-600">
                Conseil : ajoute une courte biographie et un email professionnel
                pour chaque fiche afin de faciliter la communication.
              </div>
            </aside>

            {/* Right: grid of staff */}
            <PersonnelManagementCard
              filteredPersonnel={filteredPersonnel}
              setSelected={setSelected}
            />
          </main>

          {/* Modal / fiche detail */}

          <ModalDetailPersonel selected={selected} setSelected={setSelected} />
        </div>
      </div>
      <Footer />
    </>
  )
}
