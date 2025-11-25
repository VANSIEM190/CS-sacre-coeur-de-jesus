import React from 'react'
import { BookOpenIcon, UsersIcon, AwardIcon, StarIcon } from 'lucide-react'

const SectionAprpos = () => {
  return (
    <section
      id="about"
      className="py-20 bg-linear-to-br from-blue-50 to-indigo-50"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              À Propos de Notre École
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-indigo-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Notre mission, notre vision, nos valeurs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <BookOpenIcon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Notre Mission
              </h3>
              <p className="text-gray-600 text-center">
                Fournir une éducation de qualité qui prépare nos élèves à
                devenir des citoyens responsables et des leaders de demain.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <AwardIcon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Notre Vision
              </h3>
              <p className="text-gray-600 text-center">
                Être l'institution de référence en matière d'excellence
                académique et de développement personnel des jeunes.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-linear-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                <UsersIcon size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                Nos Valeurs
              </h3>
              <p className="text-gray-600 text-center">
                Excellence, intégrité, respect, innovation et engagement envers
                la réussite de chaque élève.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Pourquoi Nous Choisir?
                </h3>
                <ul className="space-y-4">
                  {[
                    'Enseignants qualifiés et expérimentés',
                    'Programmes adaptés aux besoins modernes',
                    'Infrastructures modernes et équipées',
                    'Suivi personnalisé de chaque élève',
                    'Taux de réussite exceptionnel',
                    'Activités parascolaires variées',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <StarIcon
                        size={20}
                        className="text-yellow-500 shrink-0 mt-1"
                      />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80"
                  alt="School"
                  className="rounded-2xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionAprpos
