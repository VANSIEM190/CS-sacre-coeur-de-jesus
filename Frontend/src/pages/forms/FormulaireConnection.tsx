import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Footer, Navbar } from '@/components/layout'
import { auth } from '@/services/firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { toast, ToastContainer } from 'react-toastify'
import { Button, Input, Label } from '../../components/ui'
import {
  UserIcon,
  LockIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeOffIcon,
} from 'lucide-react'

const FormulaireConnection = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const userSignIn = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

      if (!userSignIn) return toast.error('erreur lors de la connection')

      toast.success('connection reussie !!')
      setIsLoading(false)
      setLoggedIn(true)
    } catch (error) {
      toast.error('une erreur est survenue', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 ">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center ">
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
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 cursor-pointer"
          >
            Retour
          </button>
        </div>
      </div>
    )
  }
  return (
    <>
      <ToastContainer position="top-right" />
      <div className="min-h-screen flex items-center justify-center p-4 mt-20">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <Navbar />
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
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon size={20} className="text-gray-400" />
                  </div>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="pl-10 pr-4 py-3"
                    placeholder="exemple@email.com"
                  />
                </div>
              </div>
              {/* Password */}
              <div className="mb-6">
                <Label htmlFor="password">Mot de passe *</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon size={20} className="text-gray-400" />
                  </div>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className=" pl-10 pr-12 py-3"
                    required
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
                    className="w-4 h-4  border-gray-300 rounded focus:ring-indigo-500"
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
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mb-6"
              >
                {isLoading ? 'connexion...' : 'Se Connecter'}
              </Button>
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
                  <Link
                    to="/inscription"
                    className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-300"
                  >
                    Inscrivez-vous ici
                  </Link>
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
