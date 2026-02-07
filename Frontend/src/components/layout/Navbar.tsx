import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import useEtatUtilisateur from '@/hooks/useEtatUtilisateur'
import {
  Button,
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from '../ui'
import { IoIosNotifications } from 'react-icons/io'
import { TiUserAdd } from 'react-icons/ti'

const ElevesLinks = [
  { name: 'Mes Cours', href: '/mes-cours' },
  { name: 'Note AI', href: '/note-ai' },
  { name: 'Horraires', href: '/horraires' },
  { name: 'Annonces', href: '/annonces' },
  { name: 'Evenements', href: '#' },
  { name: 'Programmes Scolaires', href: '/programme-scolaire' },
]

const EcoleLinks = [
  { name: 'Les Elèves', href: '/eleves' },
  { name: 'Enseignants', href: '/personnels' },
  { name: 'Annonces', href: '/annonces' },
  { name: 'Palmares', href: '/palmares' },
  { name: 'Publier un cours', href: '/publier-cours' },
]

const Navbar = () => {
  const [itemsIsVisible, setItemsIsVisible] = useState(false)
  const navigate = useNavigate()
  const { isAdmin, studentData } = useEtatUtilisateur()
  const accesUtilisateur = studentData || isAdmin
  const linksToShow = isAdmin ? EcoleLinks : ElevesLinks
  console.log(studentData)
  const onNavigateToConnetion = () => {
    navigate('/connexion')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3">
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
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <DropdownMenu>
              <DropdownTrigger className="relative inline-block">
                <button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 shadow px-3 py-2 text-sm font-semibold text-gray-600 inset-ring-1 inset-ring-white/5 hover:bg-white/20">
                  {isAdmin ? 'Ecole' : 'Elève'}
                  <ChevronDown
                    aria-hidden="true"
                    className="-mr-1 size-5 text-gray-400"
                    onClick={() => setItemsIsVisible(!itemsIsVisible)}
                  />
                </button>
              </DropdownTrigger>

              {itemsIsVisible && (
                <DropdownContent className="absolute right-0 z-10 mt-6 w-56 origin-top-right rounded-md bg-white outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in shadow">
                  {linksToShow.map(link => (
                    <DropdownItem
                      className="list-none px-0.5 rounded hover:bg-gray-300 cursor-pointer"
                      key={link.name}
                    >
                      <Link to={link.href}>{link.name}</Link>
                    </DropdownItem>
                  ))}
                </DropdownContent>
              )}
            </DropdownMenu>

            <Link to="" className="text-2xl">
              <IoIosNotifications />
            </Link>

            {accesUtilisateur ? (
              isAdmin ? (
                <Link
                  to=""
                  className="w-13 h-13  rounded-full flex items-center justify-center"
                >
                  <img src="/imgAcc.png" alt="profil-admin" />
                </Link>
              ) : (
                <Link
                  to=""
                  className="w-13 h-13  rounded-full flex items-center justify-center"
                >
                  <img
                    src={studentData?.photo_path ?? '/iamge'}
                    alt="profil-admin"
                  />
                </Link>
              )
            ) : (
              <button
                type="button"
                onClick={() => {
                  onNavigateToConnetion()
                }}
                className=" text-2xl cursor-pointer "
              >
                <TiUserAdd />
              </button>
            )}
          </nav>
          {/* Mobile Menu Button */}
        </div>
        {/* Mobile Navigation */}

        <nav className="md:hidden pb-4 space-y-3">
          <DropdownMenu className="w-full">
            <DropdownTrigger className="relative ">
              <button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white/10 shadow px-3 py-2 text-sm font-semibold text-gray-600 inset-ring-1 inset-ring-white/5 hover:bg-white/20">
                {isAdmin ? 'Ecole' : 'Elève'}
                <ChevronDown
                  aria-hidden="true"
                  className="-mr-1 size-5 text-gray-400"
                  onClick={() => setItemsIsVisible(!itemsIsVisible)}
                />
              </button>
            </DropdownTrigger>

            {itemsIsVisible && (
              <DropdownContent className="absolute -right-20 z-10 w-65 mt-4.9 px-8 py-5 t rounded-md bg-white outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in shadow">
                {linksToShow.map(link => (
                  <DropdownItem
                    className="list-none px-0.5 rounded hover:bg-gray-300 cursor-pointer"
                    key={link.name}
                  >
                    <Link to={link.href}>{link.name}</Link>
                  </DropdownItem>
                ))}
              </DropdownContent>
            )}
          </DropdownMenu>
          {accesUtilisateur ? null : (
            <Button
              variant="primary"
              onClick={() => {
                onNavigateToConnetion()
              }}
              className="w-full px-4 py-2 text-white rounded-lg"
            >
              Connexion
            </Button>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
