import React, { useState, useEffect } from 'react'
import { StudentsList } from '@/components/common'
import { db } from '@/services/firebaseConfig'
import { getDocs, orderBy, query, collection } from 'firebase/firestore'
import { NavbarRetourHome, Footer } from '@/components/layout'
import { toast } from 'react-toastify'
import { Loader } from 'lucide-react'
import ListeParClasse from '@/utils/ListeParClasse'

const StudentsManagement = () => {
  const [value, setValue] = useState('')
  const [eleves, setEleves] = useState([])
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

  const filteredClassStudents = ListeParClasse.filter(student => student.classe)

  return (
    <>
      <NavbarRetourHome />
      <div className="pt-24 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Gestion des élèves
              </h2>
              <p className="text-sm text-gray-500">
                Liste des élèves par classe
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <input
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder="Rechercher un élève..."
                className="px-4 py-2 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button className="px-4 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:opacity-95">
                Chercher un élève
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <aside className="md:col-span-1">
              <div className="bg-white p-4 rounded-lg shadow fixed">
                <select name="classe" id="classe">
                  <option value="">Toutes les classes</option>
                  {filteredClassStudents.map(classe => (
                    <option key={classe.classe} value={classe.classe}>
                      {classe.classe}
                    </option>
                  ))}
                </select>
              </div>
            </aside>

            <main className="md:col-span-3">
              <div className="bg-white p-4 rounded-lg shadow">
                {loading ? (
                  <div className="flex justify-center items-center">
                    <Loader />
                  </div>
                ) : (
                  <StudentsList students={eleves} />
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
