import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Users, User, Briefcase, Mail } from 'lucide-react'
import { Footer, NavbarRetourHome } from '@/components/layout'
import STAFF from '@/utils/staff'

// Sample data — replace with real data or fetch from API

export default function PersonnelManagement() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const departments = [
    'All',
    ...Array.from(new Set(STAFF.map(s => s.department))),
  ]

  const filtered = STAFF.filter(s => {
    const matchesQuery =
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.role.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === 'All' ? true : s.department === filter
    return matchesQuery && matchesFilter
  })
  console.log(window.innerWidth)

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
            <div className="mt-4 md:hidden flex gap-2">
              <div className="flex items-center bg-white border border-slate-200 rounded-lg shadow-sm px-3 py-1 w-full">
                <Search size={16} className="text-slate-400" />
                <input
                  aria-label="Recherche mobile"
                  className="ml-2 outline-none w-full text-sm"
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

          <main className="max-w-[90%] grid grid-cols-1 lg:grid-cols-4 px-5 gap-8">
            {/* Left: summary / quick access */}
            <aside className="lg:col-span-1 bg-white rounded-2xl p-6 shadow">
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
            <section className="lg:col-span-3 ">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-max gap-y-4 ">
                {filtered.length === 0 && (
                  <div className="col-span-full text-center py-12 bg-white rounded-2xl shadow">
                    <p className="text-slate-500">
                      Aucun personnel correspondant. Essayez une autre
                      recherche.
                    </p>
                  </div>
                )}

                {filtered.map((member, id) => (
                  <motion.article
                    key={id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white w-sm rounded-3xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer  mx-2"
                    onClick={() => setSelected(member)}
                  >
                    {/* Header : photo + nom + rôle */}
                    <div className="flex items-start gap-5">
                      <img
                        src={member.img}
                        alt={`Photo de ${member.name}`}
                        className="w-20 h-20 rounded-full object-cover border-2 border-slate-200"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900">
                          {member.name}
                        </h3>
                        <div className="text-sm text-slate-500 mt-1">
                          {member.role}
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {member.department}
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="mt-4 text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>

                    {/* Séparateur */}
                    <div className="border-t border-slate-200 mt-5 pt-4 flex items-center justify-between">
                      {/* Email */}
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Mail size={16} />
                        <span>{member.email}</span>
                      </div>

                      {/* Voir la fiche */}
                      <div className="text-xs text-slate-400 font-medium hover:text-blue-500 transition-colors">
                        Voir la fiche
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          </main>

          {/* Modal / fiche detail */}
          <AnimatePresence>
            {selected && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6"
                  initial={{ scale: 0.98, y: 8 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.98, y: 8 }}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={selected.img}
                      alt={`Photo de ${selected.name}`}
                      className="w-24 h-24 rounded-full object-cover border"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{selected.name}</h3>
                      <div className="text-sm text-slate-500">
                        {selected.role} — {selected.department}
                      </div>
                      <p className="mt-3 text-sm text-slate-600">
                        {selected.bio}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <a
                          href={`mailto:${selected.email}`}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm hover:bg-slate-50"
                        >
                          <Mail size={14} />
                          Contacter
                        </a>
                        <button
                          onClick={() => setSelected(null)}
                          className="ml-auto text-sm text-slate-500"
                        >
                          Fermer
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div
                  className="fixed inset-0 bg-black/30"
                  onClick={() => setSelected(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  )
}
