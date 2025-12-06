import React from 'react'
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  Settings2Icon,
  UserIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAdminContext } from '@/contexts/AdminContext'

const ElevesLinks = [
  { name: 'Mes Cours', href: '/mes-cours' },
  { name: 'Note AI', href: '/note-ai' },
  { name: 'Horraires', href: '/horraires' },
  { name: 'Annonces', href: '/annonces' },
  { name: 'Evenements', href: '#' },
  { name: 'Programmes Scolaires', href: '#' },
]

const EcoleLinks = [
  { name: 'Les Elèves', href: '/eleves' },
  { name: 'Enseignants', href: '/personnels' },
  { name: 'Annonces', href: '/annonces' },
  { name: 'Palmares', href: '/palmares' },
  { name: 'Publier un cours', href: '/publier-cours' },
]

const Footer = () => {
  const { isAdmin } = useAdminContext()
  const linksToShow = isAdmin ? EcoleLinks : ElevesLinks
  return (
    <footer className="bg-linear-to-r from-gray-900 to-indigo-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white size-12 flex justify-center items-center rounded-full">
                <img src="/imgAcc.png" alt="" className=" object-contain" />
              </div>

              <div>
                <h3 className="text-xl font-bold">C.S Sacré Coeur De Jésus</h3>
                <p className="text-sm text-gray-400">
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
            <h4 className="text-lg font-semibold mb-4">
              {isAdmin ? 'Ecole' : 'Eleves'}
            </h4>
            <ul className="space-y-2">
              {linksToShow.map((link, id) => (
                <li key={id}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Notre Application</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <Settings2Icon size={16} />
                <Link
                  to="/parametres"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Paramètres
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
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <PhoneIcon size={16} />
                <span>+243 XXX XXX XXX</span>
              </li>
              <li className="flex items-center space-x-2 text-gray- 400">
                <MailIcon size={16} />
                <span>cssacrecoeurdejesus@gmail.com</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPinIcon size={16} />
                <span>Kinshasa, RDC</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} C.S sacré coeur de jésus. Tous droits
            réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
