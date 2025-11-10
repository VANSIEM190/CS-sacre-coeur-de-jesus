import React ,{useState} from 'react'
import { Link } from 'react-router-dom';
import {Navbar , Footer} from '../layout'
const FormulaireConnection = () => {
  const [values, setValues] = useState({email:'', password:''});

  const handleChange =(event)=>{
    setValues({...values , [event.target.name] : event.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

  };
  return (
    <>
        <Navbar/>
        <div className="flex items-center justify-center min-h-4/5 ">
      <div className="dark:bg-gray-800 dark:shadow backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-[90%] max-w-md transition-all">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Connexion</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block dark:text-gray-100 text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              name='email'
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-gray-100 dark:placeholder:text-gray-100"
              placeholder="vansiem@gmail.com"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block dark:text-gray-100 text-gray-700 mb-1 font-medium">Mot de passe</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-gray-100  dark:placeholder:text-gray-100"
              placeholder="••••••••"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition cursor-pointer"
          >
            Se connecter
          </button>

          <p className="text-sm text-center text-gray-600 mt-3">
            Pas encore de compte ?{" "}
            <Link 
              to='/inscription'
              className="text-indigo-600 font-medium hover:underline cursor-pointer"
            >
              S'inscrire
            </Link>
          </p>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default FormulaireConnection