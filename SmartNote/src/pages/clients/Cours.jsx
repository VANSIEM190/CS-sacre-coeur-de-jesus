import React, { useState, useEffect, useMemo } from 'react'
import { NavbarRetourHome, Footer } from '@/components/layout'
import { CourseCard } from '@/components/common'
import {
  SearchIcon,
  FilterIcon,
  BookOpenIcon,
  FileTextIcon,
  Loader,
} from 'lucide-react'
import { db } from '@/services/firebaseConfig'
import { collection, getDocs, query, orderBy, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'

const subjects = [
  'Tous',
  'Mathématiques',
  'Français',
  'Histoire-Géographie',
  'Chimie',
  'Anglais',
]

export const Cours = () => {
  const [selectedSubject, setSelectedSubject] = useState('Tous')
  const [coursData, setCoursData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const fetchCours = async () => {
      try {
        const coursQuery = query(
          collection(db, 'course'),
          orderBy('title', 'asc')
        )
        const CoursQuerySnapshop = await getDocs(coursQuery)
        const allCours = CoursQuerySnapshop.docs.map(cour => ({
          id: doc.id,
          ...cour.data(),
        }))
        setCoursData(allCours)
      } catch (error) {
        toast.error(
          'un problème est survenue lors de la récupèration des cours',
          error.message
        )
      } finally {
        setIsLoading(false)
      }
    }
    fetchCours()
  }, [])

  const filterCourse = (course, subject, query) => {
    const lowerQuery = query.toLowerCase()
    const matchesSubject = subject === 'Tous' || course.subject === subject
    const matchesQuery =
      course.title.toLowerCase().includes(lowerQuery) ||
      course.subject.toLowerCase().includes(lowerQuery)

    return matchesSubject && matchesQuery
  }

  const filteredCourses = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase() // calcul une seule fois
    return coursData.filter(course =>
      filterCourse(course, selectedSubject, lowerQuery)
    )
  }, [coursData, selectedSubject, searchQuery])

  return (
    <>
      <NavbarRetourHome />
      <div className="min-h-screen flex flex-col mt-19">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="inline-flex items-center bg-[#E8EFFD] text-[#4361EE] px-4 py-1 rounded-full text-sm font-medium mb-4">
              <BookOpenIcon className="w-4 h-4 mr-2" />
              Bibliothèque de Cours
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Cours en PDF</h1>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Accédez à tous les supports de cours en format PDF. Téléchargez et
              consultez vos documents à tout moment.
            </p>
          </div>
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher un cours..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4361EE] focus:border-transparent"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <FilterIcon className="w-5 h-5 mr-2" />
                Filtres
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-2 overflow-x-auto">
              <div className="flex space-x-2">
                {subjects.map((subject, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      selectedSubject === subject
                        ? 'bg-[#4361EE] text-white font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedSubject(subject)}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              {`${filteredCourses.length} cours trouvé (s)`}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center">
              <Loader />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course, index) => (
                  <CourseCard
                    key={index}
                    title={course.title}
                    subject={course.subject}
                    teacher={course.teacher}
                    date={course.date}
                    fileSize={course.fileSize}
                    pdfUrl={course.file_path}
                  />
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                    <FileTextIcon className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucun cours trouvé
                  </h3>
                  <p className="text-gray-600">
                    Essayez de modifier vos filtres ou votre recherche
                  </p>
                </div>
              )}
            </>
          )}
        </main>
        <Footer />
      </div>
    </>
  )
}
