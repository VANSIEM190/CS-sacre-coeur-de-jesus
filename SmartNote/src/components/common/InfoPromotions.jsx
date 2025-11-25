import React from 'react'
import { FaBook, FaCut, FaLaptop, FaPen, FaSchool } from 'react-icons/fa'
import { GiMaterialsScience, GiToyMallet } from 'react-icons/gi'
import { motion } from 'framer-motion'

const infos = [
  {
    icon: <GiToyMallet />,
    titre: 'Ecole Maternelle',
    description:
      "développe te compétences en expression écrits et orale en n'analysant des textes , ainsi que la culture générale.",
  },
  {
    icon: <FaSchool />,
    titre: 'Ecole Primaire',
    description:
      "développe te compétences en expression écrits et orale en n'analysant des textes , ainsi que la culture générale.",
  },
  {
    icon: <FaSchool />,
    titre: 'Ecole Secondaire',
    description:
      "développe te compétences en expression écrits et orale en n'analysant des textes , ainsi que la culture générale.",
  },
  {
    icon: <FaBook />,
    titre: 'Littéraire',
    description:
      "développe te compétences en expression écrits et orale en n'analysant des textes , ainsi que la culture générale.",
  },
  {
    icon: <FaLaptop />,
    titre: 'Commercial et gestion',
    description:
      'Développe te compétences en gestion des entreprises, marketing et en analyse économique',
  },
  {
    icon: <FaPen />,
    titre: 'Pédagogie Générale',
    description:
      "Cette option forme les élèves aux méthodes d'enseignement et à la comprehension des processus d'apprentissage.",
  },
  {
    icon: <GiMaterialsScience />,
    titre: 'Scientifique',
    description:
      "Met l'accent sur les matières mathématiques, physiques et biologiques. elle développe l'esprit d'analyse, la rigueur et la résolution des problèmes. ",
  },
  {
    icon: <FaCut />,
    titre: 'Coupe et Couture',
    description:
      'Forme les élèves aux techniques de création et de confection de vêtements elle développe la créativté, le sens du détail et maîtrise des outils et matériaux.',
  },
]

const InfoPromotions = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-5 md:py- bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 ">Promotions</h2>
        <div className="grid grid-cols-3 max-sm1:grid-cols-2 max-xs:grid-cols-1 w-3/4 gap-4">
          {infos.map(({ icon, titre, description }, id) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: id * 0.2 }}
              className="w- h-60 dark:bg-gray-950/50 bg-gray-100 backdrop-blur-lg rounded-2xl p-4 flex flex-col items-center justify-center gap-2 "
            >
              <div className="size-10 rounded-full border border-blue-600 flex justify-center items-center text-blue-600">
                {icon}
              </div>
              <h2 className="text-gray-900 text-2xl font-bold">{titre}</h2>
              <p className="text-gray-900 text-center">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}

export default InfoPromotions
