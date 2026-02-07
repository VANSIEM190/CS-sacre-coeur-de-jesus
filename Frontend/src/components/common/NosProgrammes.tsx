import { ChevronRightIcon } from 'lucide-react'
import { programs } from '@/data'
import { CardContainer, CardContent, CardFooter, CardHeader } from '../ui'

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
            Une diversité de formations pour tous les talents
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {programs.map((program, index) => (
            <CardContainer
              key={index}
              className="group bg-white  rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-indigo-200"
            >
              <CardContent>
                <div
                  className={`w-16 h-16 bg-linear-to-br ${program.color} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {program.icon}
                </div>
                <CardHeader className="text-xl font-bold text-gray-900 mb-3">
                  <h3>{program.title}</h3>
                </CardHeader>
                <p className="text-gray-600 text-sm mb-4">
                  {program.description}
                </p>
                <CardFooter>
                  <button className="text-indigo-600 font-medium flex items-center group-hover:translate-x-2 transition-transform duration-300">
                    En savoir plus
                    <ChevronRightIcon size={16} className="ml-1" />
                  </button>
                </CardFooter>
              </CardContent>
            </CardContainer>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NosProgrammes
