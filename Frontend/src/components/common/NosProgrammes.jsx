import React from 'react'
import { ChevronRightIcon } from 'lucide-react'

const programs = [
  {
    title: 'Maternelle',
    description:
      'Éveil et développement des tout-petits dans un environnement stimulant',
    icon: '🎨',
    color: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Primaire',
    description: 'Formation de base solide pour les jeunes apprenants',
    icon: '📚',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Secondaire',
    description: "Préparation complète pour l'enseignement supérieur",
    icon: '🎓',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    title: 'Commercial et Gestion',
    description: 'Formation pratique en commerce et administration',
    icon: '💼',
    color: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Coupe et Couture',
    description: 'Maîtrise des techniques de confection et design textile',
    icon: '✂️',
    color: 'from-orange-500 to-amber-500',
  },
  {
    title: 'Littéraire',
    description: 'Exploration approfondie des lettres et sciences humaines',
    icon: '📖',
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Pédagogie Générale',
    description: 'Formation des futurs enseignants et éducateurs',
    icon: '👨‍🏫',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    title: 'Scientifique',
    description: 'Excellence dans les sciences et technologies',
    icon: '🔬',
    color: 'from-blue-600 to-indigo-600',
  },
]

const NosProgrammes = () => {
  return (
    <section id="programs" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nos Programmes
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-indigo-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600">
            Une diversité de formations pour tous les talents service_sn2ne8j
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {programs.map((program, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-indigo-200"
            >
              <div
                className={`w-16 h-16 bg-linear-to-br ${program.color} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {program.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {program.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {program.description}
              </p>
              <button className="text-indigo-600 font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300">
                En savoir plus
                <ChevronRightIcon size={16} className="ml-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NosProgrammes
