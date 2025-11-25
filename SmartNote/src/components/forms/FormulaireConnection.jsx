import React, { useState } from 'react'
import {
  UserIcon,
  LockIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeOffIcon,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { NavbarRetourHome, Footer } from '@/components/layout'
const FormulaireConnection = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate()

  const onSwitchToRegister = () => {
    navigate('/inscription')
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleSubmit = e => {
    e.preventDefault()
    setLoggedIn(true)
    console.log('Login Data:', formData)
  }
  if (loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon size={48} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Connexion Réussie!
          </h2>
          <p className="text-gray-600 mb-6">
            Vous êtes maintenant connecté à votre compte.
          </p>
          <button
            onClick={() => setLoggedIn(false)}
            className="px-6 py-3 bg-liear-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
          >
            Retour
          </button>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <NavbarRetourHome />
            <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <UserIcon size={32} />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-center mb-2">Connexion</h1>
              <p className="text-center text-blue-100">
                Accédez à votre compte
              </p>
            </div>
            <form onSubmit={handleSubmit} className="p-8">
              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    placeholder="exemple@email.com"
                  />
                </div>
              </div>
              {/* Password */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon size={20} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOffIcon
                        size={20}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    ) : (
                      <EyeIcon
                        size={20}
                        className="text-gray-400 hover:text-gray-600"
                      />
                    )}
                  </button>
                </div>
              </div>
              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Se souvenir de moi
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-indigo-600 hover:text-indigo-700 transition-colors duration-300"
                >
                  Mot de passe oublié?
                </a>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl mb-6"
              >
                Se Connecter
              </button>
              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">OU</span>
                </div>
              </div>
              {/* Register Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  Vous n'avez pas de compte?{' '}
                  <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-300"
                  >
                    Inscrivez-vous ici
                  </button>
                </p>
              </div>
            </form>
          </div>
          {/* Footer */}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default FormulaireConnection
