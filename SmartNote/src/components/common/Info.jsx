import React from 'react'
import { FaBook, FaUser, FaVideo } from 'react-icons/fa'
import { motion } from 'framer-motion'
const infos = [
  {
    icon : <FaBook />,
    titre : 'NoteAI',
    description : 'NoteAI est une IA qui vous aide à comprendre vos notes et à les analyser.'
  },
  {
    icon : <FaUser />,
    titre : 'Profil',
    description : 'Profil est un espace où vous pouvez voir vos informations personnelles et vos notes.'
  },
  {
    icon : <FaVideo />,
    titre : 'Vidéos',
    description : 'Vidéos est un espace où vous pouvez voir les vidéos de nos cours.'
  }
]

const Info = () => {
  return (
    <>
        <section className="flex flex-col items-center justify-center gap-4 py-5 md:py- bg-gray-100 dark:bg-gray-900">
          <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>Nos services</h2>
          <div className='flex flex-wrap items-center justify-center gap-4'>
        {infos.map(({icon, titre, description}, id)=>(
          <motion.div key={id} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: id * 0.1 }}
          className='w-[20%] bg-gray-950/50 backdrop-blur-lg rounded-2xl p-4 flex flex-col items-center justify-center gap-2 '>
            <div className='size-10 rounded-full border border-blue-600 flex justify-center items-center text-blue-600'>
              {icon}
            </div>
            <h2 className='dark:text-white text-gray-100 text-2xl font-bold'>
              {titre}
            </h2>
            <p className='dark:text-gray-400 text-gray-100 text-center'>
              {description}
            </p>
          </motion.div>
        ))}
        </div>
      </section>
    </>
  );
};

export default Info;