import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, Footer } from '@/components/layout'
import {
  SectionAprpos,
  SectionContact,
  SectionHystorique,
  NosProgrammes,
} from '@/components/common'
import { ChevronRightIcon, StarIcon } from 'lucide-react'
import { supabase } from '@/supabase/supabaseConfig'

const stats = [
  { number: '8+', label: "Années d'Excellence" },
  { number: '200+', label: 'Élèves Diplômés' },
  { number: '50+', label: 'Enseignants Qualifiés' },
  { number: '95%', label: 'Taux de Réussite' },
]

const LandingPage = () => {
  const navigate = useNavigate()

  const onNavigateToRegister = () => {
    navigate('/inscription')
  }

  console.log(supabase)

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header Navigation */}
      <Navbar />
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
                🎓 Année Scolaire {new Date().getFullYear()} -{' '}
                {new Date().getFullYear() + 1}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Construisez Votre
                <span className="block bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Avenir Brillant
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Une éducation de qualité pour façonner les leaders de demain.
                Rejoignez notre communauté d'excellence académique.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onNavigateToRegister}
                  className="px-8 py-4 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  S'inscrire Maintenant
                  <ChevronRightIcon size={20} className="ml-2" />
                </button>
                <a
                  href="#programs"
                  className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 text-lg font-semibold rounded-xl hover:bg-indigo-600 hover:text-white transition-all duration-300 flex items-center justify-center"
                >
                  Nos Programmes
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
                alt="Students"
                className="relative rounded-3xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-500"></div>
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500"></div>
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-500 to-teal-500"></div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      2000+ Élèves
                    </p>
                    <p className="text-xs text-gray-500">Rejoignez-nous!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg text-center transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* History Section */}
      <SectionHystorique />
      {/* About Section */}
      <SectionAprpos />
      {/* Programs Section */}
      <NosProgrammes />
      {/* Contact Section */}
      <SectionContact />
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default LandingPage
