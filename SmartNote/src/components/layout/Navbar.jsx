import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuIcon, XIcon } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const onNavigateToConnetion = () => {
    navigate('/connexion')
  }

  return (
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
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Accueil
            </a>
            <a
              href="#history"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Historique
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              À Propos
            </a>
            <a
              href="#programs"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Programmes
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Contact
            </a>
            <button
              onClick={onNavigateToConnetion}
              className="px-4 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              Connexion
            </button>
          </nav>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-3">
            <a
              href="#home"
              className="block text-gray-700 hover:text-indigo-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </a>
            <a
              href="#history"
              className="block text-gray-700 hover:text-indigo-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Historique
            </a>
            <a
              href="#about"
              className="block text-gray-700 hover:text-indigo-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              À Propos
            </a>
            <a
              href="#programs"
              className="block text-gray-700 hover:text-indigo-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Programmes
            </a>
            <a
              href="#contact"
              className="block text-gray-700 hover:text-indigo-600 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <button
              onClick={() => {
                onNavigateToConnetion()
                setIsMenuOpen(false)
              }}
              className="w-full px-4 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg"
            >
              Connexion
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Navbar
