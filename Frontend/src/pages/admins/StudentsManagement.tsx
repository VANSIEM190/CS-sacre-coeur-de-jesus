import { useState, useEffect, useMemo } from 'react'
import { StudentsList } from '@/components/common'
import { db } from '@/services/firebaseConfig'
import { getDocs, orderBy, query, collection } from 'firebase/firestore'
import { Footer, Navbar } from '@/components/layout'
import { toast } from 'react-toastify'
import ListeParClasse from '@/utils/ListeParClasse'
import { Loader, ChevronUp, ChevronDown } from 'lucide-react'
import { propsTypeDataUser } from '@/@types/PropsTypeDataUser'
import { ClassStudentList } from '@/components/common'
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
  Input,
} from '@/components/ui'
import createFilter from '@/utils/filtered'

const StudentsManagement = () => {
  const [valueSearch, setValueSearch] = useState('')
  const [selectedClasse, setSelectedClasse] = useState('Tous')
  const [eleves, setEleves] = useState<propsTypeDataUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsQuery = query(
          collection(db, 'students'),
          orderBy('nom', 'asc')
        )
        const querySnapshot = await getDocs(studentsQuery)
        const studentsList: propsTypeDataUser[] = querySnapshot.docs.map(
          doc => ({
            id: doc.id,
            ...(doc.data() as Omit<propsTypeDataUser, 'id'>),
          })
        )
        console.log(studentsList)
        setEleves(studentsList)
      } catch (error) {
        toast.error('Erreur lors du fetch des élèves : ' + error)
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [])

  const filteredStudents = useMemo(() => {
    const filter = createFilter({
      query: valueSearch,
      category: selectedClasse,
      categoryKey: 'optioneleve',
      searchKeys: ['nom', 'email', 'optioneleve', 'postnom'],
    })

    return eleves.filter(filter)
  }, [valueSearch, eleves, selectedClasse])

  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6 max-sm:flex-col max-sm:gap-4">
            <div>
              <h2 className="text-2xl max-md:text-xl font-bold text-gray-800">
                Gestion des élèves
              </h2>
              <p className="text-sm text-gray-500">
                Liste des élèves par classe
              </p>
            </div>
            <div className="flex items-center justify-center space-x-3 gap-2 w-full ">
              <Input
                type="search"
                value={valueSearch}
                placeholder="Rechercher un élève par son Nom classe email..."
                className="w-2/4 max-md:w-3/4"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValueSearch(e.target.value)
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="md:col-span-1">
              <div className="bg-white p-4 rounded-lg shadow hidden max-lg:block">
                <Select onValueChange={setValueSearch}>
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
              <ClassStudentList
                setSelectedClasse={setSelectedClasse}
                selectedClasse={selectedClasse}
              />
            </aside>

            <main className="md:col-span-3">
              <div className="bg-white p-4 rounded-lg shadow">
                {loading ? (
                  <div className="flex justify-center items-center">
                    <Loader />
                  </div>
                ) : (
                  <StudentsList students={filteredStudents} />
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
