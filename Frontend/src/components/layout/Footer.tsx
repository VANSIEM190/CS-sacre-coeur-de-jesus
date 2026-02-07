import { Settings2Icon, UserIcon, Book, FileText } from 'lucide-react'
import {
  RiFacebookLine,
  RiInstagramLine,
  RiTwitterXLine,
  RiLinkedinLine,
} from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className=" bg-linear-to-r from-gray-900 to-indigo-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white size-12 max-sm:size-8 flex justify-center items-center rounded-full">
                <img
                  src="/imgAcc.png"
                  alt="cs sacre coeur de jesus image"
                  className=" object-contain"
                />
              </div>

              <div>
                <h3 className="text-xl font-bold max-sm:text-sm">
                  C.S Sacré Coeur De Jésus
                </h3>
                <p className="text-sm text-gray-400 ">
                  Votre Avenir, Notre Mission
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Une institution dédiée à l'excellence scolaire et au développement
              personnel de chaque élève.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 max-sm:text-sm">
              Notre Ecole
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <Settings2Icon size={16} />
                <Link
                  to="/galerie-ecole"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Visitez l'école
                </Link>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <UserIcon size={16} />
                <Link
                  to="/mon-profil"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Mon Profil
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 max-sm:text-sm">
              Aide & blog
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <Book size={16} />
                <Link
                  to="/galerie-ecole"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Notre Guide d'utilisation
                </Link>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <FileText size={16} />
                <Link
                  to="/mon-profil"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Être informer de nos nouvelles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 max-sm:text-sm">
              Nos Reseaux
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <RiFacebookLine size={16} />
                <span className="text-sm">
                  CS Sacré coeur de Jésus De Mikonga
                </span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <RiInstagramLine size={16} />
                <span className="text-sm break-all">
                  CsSacrécoeurDeJésusDeMikonga2017
                </span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <RiTwitterXLine size={16} />
                <span className="text-sm">
                  CsSacrécoeurDeJésusDeMikonga2017
                </span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <RiLinkedinLine size={16} />
                <span className="text-sm">
                  CS Sacré coeur de Jésus De Mikonga
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} C.S sacré coeur de jésus. Tous
            droits réservés. <br /> Created By Van'siem
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
