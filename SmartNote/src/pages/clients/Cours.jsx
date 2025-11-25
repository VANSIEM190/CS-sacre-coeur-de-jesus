import React, { useState } from 'react'
import { Navbar, Footer } from '@/components/layout'
import { CourseCard } from '@/components/common'
import { SearchIcon, FilterIcon, BookOpenIcon } from 'lucide-react'
import NavbarRetourHome from '@/components/layout/NavbarRetourHome'
const subjects = [
  'Tous',
  'Mathématiques',
  'Français',
  'Histoire-Géographie',
  'Sciences',
  'Anglais',
  'Arts',
]
const coursesData = [
  {
    title: 'Introduction aux équations du second degré',
    subject: 'Mathématiques',
    teacher: 'Prof. Martin',
    date: '15 Jan 2024',
    fileSize: '2.4 MB',
    color: '#4361EE',
  },
  {
    title: 'La révolution française - Chapitre 3',
    subject: 'Histoire-Géographie',
    teacher: 'Prof. Dubois',
    date: '12 Jan 2024',
    fileSize: '3.1 MB',
    color: '#E74694',
  },
  {
    title: 'Les figures de style en poésie',
    subject: 'Français',
    teacher: 'Prof. Bernard',
    date: '10 Jan 2024',
    fileSize: '1.8 MB',
    color: '#10B981',
  },
  {
    title: 'Le système solaire et les planètes',
    subject: 'Sciences',
    teacher: 'Prof. Leroy',
    date: '08 Jan 2024',
    fileSize: '4.2 MB',
    color: '#4361EE',
  },
  {
    title: 'Present Perfect vs Past Simple',
    subject: 'Anglais',
    teacher: 'Prof. Wilson',
    date: '05 Jan 2024',
    fileSize: '1.5 MB',
    color: '#E74694',
  },
  {
    title: "Géométrie dans l'espace",
    subject: 'Mathématiques',
    teacher: 'Prof. Martin',
    date: '03 Jan 2024',
    fileSize: '2.9 MB',
    color: '#4361EE',
  },
  {
    title: 'Les mouvements artistiques du XXe siècle',
    subject: 'Arts',
    teacher: 'Prof. Moreau',
    date: '29 Déc 2023',
    fileSize: '5.6 MB',
    color: '#10B981',
  },
  {
    title: 'La photosynthèse et la respiration',
    subject: 'Sciences',
    teacher: 'Prof. Roux',
    date: '27 Déc 2023',
    fileSize: '2.2 MB',
    color: '#E74694',
  },
]
export function Cours() {
  const [selectedSubject, setSelectedSubject] = useState('Tous')
  const [searchQuery, setSearchQuery] = useState('')
  const filteredCourses = coursesData.filter(course => {
    const matchesSubject =
      selectedSubject === 'Tous' || course.subject === selectedSubject
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subject.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSubject && matchesSearch
  })
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
                {subjects.map(subject => (
                  <button
                    key={subject}
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
          </div>
          <div className="mb-4 text-sm text-gray-600">
            {filteredCourses.length} cours trouvé
            {filteredCourses.length > 1 ? 's' : ''}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard
                key={index}
                title={course.title}
                subject={course.subject}
                teacher={course.teacher}
                date={course.date}
                fileSize={course.fileSize}
                color={course.color}
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
        </main>
        <Footer />
      </div>
    </>
  )
}
