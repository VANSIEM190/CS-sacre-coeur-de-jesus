import React from 'react'
import {Navbar , Footer} from '../components/layout'


const  Apropos = () => {
  return (
    <>
    <Navbar/>
    <div>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-indigo-400">
          À propos de NotePlus
        </h1>

        <p className="text-lg leading-relaxed">
          Bienvenue sur <span className="font-semibold">NotePlus</span>, la
          plateforme conçue pour aider les élèves et étudiants à mieux{" "}
          <span className="font-semibold text-indigo-500">
            comprendre leurs notes
          </span>{" "}
          et à progresser avec confiance.
        </p>

        <section className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-md space-y-4">
          <h2 className="text-gray-800 text-2xl font-semibold dark:text-indigo-500">
            Ce que nous proposons
          </h2>
          <ul className="text-left space-y-3">
            <li>🧩 Analyse intelligente des notes pour une compréhension claire.</li>
            <li>
              🤖 Quiz personnalisés générés par l’IA selon ton niveau et tes
              résultats.
            </li>
            <li>📊 Tableau de bord interactif pour suivre ton évolution.</li>
          </ul>
        </section>

        <section className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-md space-y-4">
          <h2 className="text-gray-800 text-2xl font-semibold dark:text-indigo-500"> Notre objectif</h2>
          <p>
            Rendre l’apprentissage <span className="font-semibold">plus
            interactif, motivant et personnalisé</span>. Avec NotePlus, chaque
            étudiant devient acteur de sa réussite — accompagné par
            l’intelligence artificielle.
          </p>
        </section>

        <section className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 shadow-md space-y-4">
          <h2 className="text-gray-800 text-2xl font-semibold dark:text-indigo-500"> Notre vision</h2>
          <p>
            Faire de l’éducation numérique un espace où la technologie{" "}
            <span className="italic">n’évalue pas seulement</span>, mais{" "}
            <span className="font-semibold">accompagne, explique et encourage</span>.
          </p>
        </section>

        <p className="text-lg">
          🌟 Rejoins-nous dès aujourd’hui et découvre une nouvelle manière de
          comprendre tes notes, d’apprendre avec plaisir et de suivre ton
          évolution.
        </p>
      </div>
    </div>
  </div>
  <Footer/>
  </>
  )
}

export default Apropos