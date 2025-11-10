// components/Footer.js
import React from 'react';
import {Link} from 'react-router-dom'
import { FaFacebook , FaInstagram , FaDiscord} from 'react-icons/fa'
import {SiGmail} from 'react-icons/si'

const community = [
  {
    linkName : 'clipnest' ,
    link:'https://vansiem-community-clipnest.vercel.app'
  },
  {
    linkName : 'Blog Tech',
    link:'/Blog Tech'
  }
]

const aide = [
  {
    linkName : 'Nous contacter' ,
    link:'/contact'
  },
  {
    linkName : 'Documentation',
    link:'/Documentation'
  },
  {
    linkName : 'User Guide',
    link:'/Guide'
  }
]

const smartNote = [
  {
    linkName : 'Conseils et astuces' ,
    link:'/conseil'
  },
  {
    linkName : 'Mises à jour Nos' ,
    link:'/update'
  }
]
const Footer = () => {
  return (
    <footer className="dark:bg-gray-900 bg-white dark:text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 place-items-center">
          {/* Colonne Lien rapide */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Lien rapide</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="dark:text-gray-300 text-gray-900 dark:hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/propos" className="dark:text-gray-300 text-gray-900 dark:hover:text-white transition-colors">A propos</Link></li>
            </ul>
          </div>
          
          {/* Colonne Communauté */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Communauté</h3>
            <ul className="space-y-2">
              {
                community.map(({linkName , link}, id)=>(
                  <li key={id}>
                    <a href={link} className="dark:text-gray-300 text-gray-900 dark:hover:text-white transition-colors">{linkName}</a>
                  </li>
                ))
              }
            </ul>
          </div>
          
          {/* Colonne Aide */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Aide</h3>
            <ul className="space-y-2">
              {
                aide.map(({linkName , link} , id)=>(
                  <li key={id}>
                    <Link to={link} className="dark:text-gray-300text-gray-900 dark:hover:text-white transition-colors">{linkName}</Link>
                  </li>
                ))
              }
            </ul>
          </div>
          
          {/* Colonne Toumai Code */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <ToumaiCode />
            </h3>
            <ul className="space-y-2">
            {
                smartNote.map(({linkName , link} , id)=>(
                  <li key={id}>
                    <Link to={link} className="dark:text-gray-300 text-gray-900dark: hover:text-white transition-colors">{linkName}</Link>
                  </li>
                ))
              }
              
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <div className='flex justify-center items-center gap-1'>
              <div className='size-10 rounded-full border border-blue-600 flex justify-center items-center text-blue-600'>
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <FaFacebook size={25}/>
                  </a>
                </div>
                
                <div className='size-10 rounded-full border border-pink-500 flex justify-center items-center text-pink-500'>
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={25}/>
                  </a>
                </div>
                
                <div className='size-10 rounded-full border border-indigo-500 flex justify-center items-center text-indigo-500'>
                  <a href="https://discord.gg/QAD9KfA8" target="_blank" rel="noopener noreferrer">
                    <FaDiscord size={25}/> 
                  </a>        
                </div>
                <div className='size-10 rounded-full border border-white flex justify-center items-center text-red-700'>
                  <a href="http://" target="_blank" rel="noopener noreferrer">
                    <SiGmail size={25}/> 
                  </a>        
                </div>
          </div>
          <p className=' mt-3'>&copy; {new Date().getFullYear()} ÉcoleOnline. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

// Composant pour le code Toumai
const ToumaiCode = () => {
  return (
    <span className="font-mono">&lt;Toumai-Code/&gt;</span>
  );
};

export default Footer;