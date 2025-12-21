import React from 'react'

const SectionHystorique = () => {
  return (
    <section id="history" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Notre Historique
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-indigo-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Une tradition d'excellence depuis des décennies
            </p>
          </div>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="shrink-0 w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                1999
              </div>
              <div className="flex-1 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Fondation de l'École
                </h3>
                <p className="text-gray-600">
                  Notre institution a été fondée avec la vision de fournir une
                  éducation de qualité accessible à tous les élèves de la
                  communauté.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="shrink-0 w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                2005
              </div>
              <div className="flex-1 bg-linear-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Expansion des Programmes
                </h3>
                <p className="text-gray-600">
                  Introduction de nouvelles filières professionnelles et
                  techniques pour répondre aux besoins du marché du travail.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="shrink-0 w-16 h-16 bg-linear-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                2015
              </div>
              <div className="flex-1 bg-linear-to-r from-green-50 to-teal-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Modernisation des Infrastructures
                </h3>
                <p className="text-gray-600">
                  Rénovation complète de nos installations et intégration des
                  technologies éducatives modernes dans tous nos programmes.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="shrink-0 w-16 h-16 bg-linear-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                2024
              </div>
              <div className="flex-1 bg-linear-to-r from-orange-50 to-red-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Excellence Reconnue
                </h3>
                <p className="text-gray-600">
                  Plus de 2000 diplômés et un taux de réussite de 95%, faisant
                  de nous l'une des meilleures institutions de la région.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionHystorique
