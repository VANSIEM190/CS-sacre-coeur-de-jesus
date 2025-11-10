import { useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa";
import {BsSun , BsMoon} from 'react-icons/bs'
import { Link } from "react-router-dom";
import { useDarkMode } from "../../contexts/Darkmode";

const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'A propos', href: '/propos', },
  { name: 'NoteAI', },
  { name: 'Annonces', href: '/Annonces', },
  { name: 'Nos Vidéos', href: '/nos-videos', },
]

const navigationProfilUser = [
  { name: 'votre profil', href: '/mon-profil' },
  { name: 'se connecter', href: '/connexion', },
  { name: 'se déconnecter', href: 'deconnection', },
]

const  Navbar = ()=> {
  const [isvisible , setIsVisible] = useState(false)
  const [showOptionProfil , setShowOptionProfil] = useState(false)
  const {isDarkMode , ToggleMode} = useDarkMode()
  console.log(isDarkMode , ToggleMode)
  return (
    <nav
      className="relative  after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button 
              className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
              onClick={()=> setIsVisible(!isvisible)}
              >
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              {isvisible ? 
              (
                <FaTimes aria-hidden="true" className=" size-6 group-data-open:block" />            
              ) : (
                <FaBars aria-hidden="true" className="block size-6 group-data-open:hidden" />
              )
              }
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className= 'bg-gray-950 text-white  hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium cursor-pointer dark:bg-gray-800'
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
            </button>

            {/* Profile dropdown */}
            <div  className="relative ml-3 ">
              <div className="flex items-center justify-center gap-3 ">
                <div className="flex items-center justify-center gap-3 ">
                  <button 
                    type="button" 
                    onClick={ToggleMode}
                    className="cursor-pointer dark:text-gray-50"
                    >
                    { isDarkMode ?  <BsSun/> :  <BsMoon/>}
                  </button>
                  </div>
                <div 
                    className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer"
                    role="button"     
                    onClick={()=> setShowOptionProfil(!showOptionProfil)}>
                      
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt="profil user"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10 "      
                  />
                </div>
              </div>
              

              {showOptionProfil && <div
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-950 py-1 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                {
                  navigationProfilUser.map(({name , href} , id)=>(
                    <div key={id}>
                    <Link
                      to={href}
                      className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                    >
                      {name}
                    </Link>
                  </div>
                  ))
                }
              </div>}
            </div>
          </div>
        </div>
      </div>

      {isvisible && <div className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <button
              key={item.name}
              as="a"
              href={item.href}
              className='bg-gray-950/50 text-white  hover:bg-white/5 hover:text-white block rounded-md px-3 py-2 text-base font-medium cursor-pointer'
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>}
    </nav>
  )
}


export default Navbar