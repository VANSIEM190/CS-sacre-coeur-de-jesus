import { useMemo, useState } from 'react'
import { Users } from 'lucide-react'
import { Footer, Navbar } from '@/components/layout'
import { PersonnelManagementCard } from '@/components/common'

import STAFF from '@/utils/staff'
import ModalDetailPersonel from '@/components/common/ModalDetailPersonel'
import { Input } from '@/components/ui'
import { propTypeFilteredPersonnel } from '@/@types/PropsTypeFilteredPersonnel'

export default function PersonnelManagement() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<propTypeFilteredPersonnel | null>(
    null
  )

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
      <Navbar />
      <div className=" w-screen  bg-linear-to-b from-neutral-50 to-white overflow-hidden ">
        <div className="mt-20 min-h-screen  p-6 md:p-8 font-sans text-slate-900">
          <header className="max-w-6xl mb-8">
            <div className="flex justify-around items-center w-screen">
              <div className="flex items-center gap-4 ">
                <div className="bg-indigo-600 text-white p-3 rounded-lg shadow-md">
                  <Users size={20} />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold">
                    Gouvernance & Personnel
                  </h1>
                  <p className="text-sm text-slate-600 ">
                    Présentation de l’équipe de l’école — direction,
                    <br />
                    administration, enseignants et personnel technique.
                  </p>
                </div>
              </div>
              <div>
                <div className="hidden lg:flex items-center gap-3 ">
                  <Input
                    type="search"
                    placeholder="Rechercher par nom ou rôle..."
                    value={query}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setQuery(e.target.value)
                    }
                    className="p-3 w-sm"
                  />

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
            </div>

            {/* mobile search */}
            <div className="mt-4 lg:hidden flex gap-2 ">
              <Input
                placeholder="Rechercher le personnel..."
                value={query}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuery(e.target.value)
                }
              />

              <select
                className="px-3 py-2 border rounded-lg text-sm max-sm:hidden"
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

          <main className="grid grid-cols-1 md:grid-cols-2 place-items-center px-5 gap-8">
            {/* Left: summary / quick access */}

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
