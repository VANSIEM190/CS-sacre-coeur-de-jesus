import React from 'react'
import { Home } from 'lucide-react'
import { Link } from 'react-router-dom'

const NavbarRetourHome = () => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-13 h-13  rounded-full flex items-center justify-center">
                <img src="/imgAcc.png" alt="" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  C.S sacré coeur de jésus
                </h1>
                <p className="text-xs text-gray-500">
                  Votre Avenir, Notre Mission
                </p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors"
              >
                <Home className="w-5 h-5 mr-2" />
                Accueil
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}

export default NavbarRetourHome
