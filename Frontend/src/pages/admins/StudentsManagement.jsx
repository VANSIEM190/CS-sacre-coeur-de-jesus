import React, { useState, useEffect, useMemo } from 'react'
import { StudentsList } from '@/components/common'
import { db } from '@/services/firebaseConfig'
import { getDocs, orderBy, query, collection } from 'firebase/firestore'
import { NavbarRetourHome, Footer } from '@/components/layout'
import { toast } from 'react-toastify'
import ListeParClasse from '@/utils/ListeParClasse'
import { Loader, ChevronUp, ChevronDown, Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectIcon,
  SelectItem,
  SelectTrigger,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectValue,
  Button,
  Input,
} from '@/components/ui'
import createFilter from '@/utils/filtered'

const StudentsManagement = () => {
  const [value, setValue] = useState('')
  const [selectedClasse, setSelectedClasse] = useState('Tous')
  const [eleves, setEleves] = useState([])
  const [filteredEleves, setFilteredEleves] = useState(eleves)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsQuery = query(
          collection(db, 'students'),
          orderBy('nom', 'asc')
        )
        const querySnapshot = await getDocs(studentsQuery)
        const studentsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        setEleves(studentsList)
        setLoading(false)
      } catch (error) {
        toast.error('Erreur lors du fetch des élèves : ' + error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [])

  useMemo(() => {
    const filter = createFilter({
      query: value,
      category: selectedClasse,
      categoryKey: 'optioneleve',
      searchKeys: ['nom', 'email', 'optioneleve', 'postnom'],
    })
    setFilteredEleves(eleves.filter(filter))
  }, [value, eleves, selectedClasse])

  return (
    <>
      <NavbarRetourHome />
      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6 max-sm:flex-col max-sm:gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Gestion des élèves
              </h2>
              <p className="text-sm text-gray-500">
                Liste des élèves par classe
              </p>
            </div>
            <div className="flex items-center justify-center space-x-3 gap-2 w-full ">
              <Input
                type="search"
                value={value}
                onKeyUp={() => {
                  const filter = createFilter({
                    query: value,
                    category: selectedClasse,
                    categoryKey: 'optioneleve',
                    searchKeys: ['nom', 'email', 'optioneleve', 'postnom'],
                  })
                  setFilteredEleves(eleves.filter(filter))
                }}
                onChange={e => setValue(e.target.value)}
                placeholder="Rechercher un élève..."
                className="w-2/4 max-sm:w-3/4"
              />

              <Button
                className="p-2.5 hover:scale-100 max-sm:flex max-sm:justify-center max-sm:items-center max-sm:p-2"
                variant="primary"
                onClick={() => {
                  if (!value) return
                  const filter = createFilter({
                    query: value,
                    category: selectedClasse,
                    categoryKey: 'optioneleve',
                    searchKeys: ['nom', 'email', 'optioneleve', 'postnom'],
                  })
                  setFilteredEleves(eleves.filter(filter))
                }}
              >
                <Search className="hidden size-5 ml-2 max-sm:block" />
                <span className="max-sm:hidden">Chercher un élève</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <aside className="md:col-span-1">
              <div className="bg-white p-4 rounded-lg shadow hidden max-sm:block">
                <Select onValueChange={setValue} value={value}>
                  <SelectTrigger className="w-full flex justify-between items-center px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300">
                    <SelectValue placeholder="Sélectionnez une classe" />
                    <SelectIcon>
                      <ChevronDown className="size-4" />
                    </SelectIcon>
                    <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-lg h-2/4 inset-0 fixed">
                      <SelectScrollUpButton>
                        <ChevronUp className="size-4" />
                      </SelectScrollUpButton>
                      <SelectGroup>
                        {ListeParClasse.map(classe => (
                          <SelectItem
                            key={classe.classe}
                            value={classe.fillierCode}
                          >
                            {classe.classe}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectScrollDownButton>
                        <ChevronDown className="size-4" />
                      </SelectScrollDownButton>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
              </div>
              <div className="bg-white shadow grid grid-cols-1 rounded-lg overflow-y-auto mb-2 max-sm:hidden">
                {ListeParClasse.map(classe => (
                  <button
                    key={classe.classe}
                    onClick={() => setSelectedClasse(classe.fillierCode)}
                  >
                    <p className="px-4 py-2 border-b border-gray-200 hover:bg-gray-100 w-full text-left">
                      {classe.classe}
                    </p>
                  </button>
                ))}
              </div>
            </aside>

            <main className="md:col-span-3">
              <div className="bg-white p-4 rounded-lg shadow">
                {loading ? (
                  <div className="flex justify-center items-center">
                    <Loader />
                  </div>
                ) : (
                  <StudentsList students={filteredEleves} />
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default StudentsManagement
