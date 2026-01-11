import { useState } from 'react'

import { Footer, NavbarRetourHome } from '@/components/layout'
import { ProgramBar } from '@/components/common'

export default function ProgrammeScolaire() {
  const [activeTab, setActiveTab] = useState('programme')

  return (
    <>
      <div className="mt-20 bg-gray-50 p-6">
        <NavbarRetourHome />
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📘 Programme scolaire
          </h1>
          <p className="text-gray-600 mb-6">
            Informations officielles : programme national, vacances, conditions
            et règlement
          </p>

          {/* Tabs */}
          <ProgramBar activeTab={activeTab} setActiveTab={setActiveTab} />
          {/* Content */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {activeTab === 'programme' && (
              <Section title="Programme national">
                <ul className="list-disc ml-6 space-y-2 text-gray-700">
                  <li>Programme officiel du ministère de l’Éducation</li>
                  <li>Objectifs par niveau (primaire, secondaire)</li>
                  <li>Compétences attendues par matière</li>
                </ul>
              </Section>
            )}

            {activeTab === 'feries' && (
              <Section title="Jours fériés & activités nationales">
                <div className="grid md:grid-cols-2 gap-4">
                  <InfoCard title="Jour de l’indépendance" date="30 juin" />
                  <InfoCard title="Fête du travail" date="1er mai" />
                  <InfoCard title="Journée pédagogique" date="À préciser" />
                  <InfoCard
                    title="Activités culturelles"
                    date="Selon calendrier"
                  />
                </div>
              </Section>
            )}

            {activeTab === 'vacances' && (
              <Section title="Billet & période de vacances">
                <p className="text-gray-700 mb-4">
                  Les vacances scolaires sont accordées conformément au
                  calendrier national.
                </p>
                <ul className="space-y-2">
                  <li>🎒 Vacances de Noël : Décembre</li>
                  <li>🌴 Vacances de Pâques : Mars / Avril</li>
                  <li>☀️ Grandes vacances : Juillet – Août</li>
                </ul>
              </Section>
            )}

            {activeTab === 'conditions' && (
              <Section title="Conditions par classe & niveau">
                <table className="w-full border rounded-xl overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-left">Classe</th>
                      <th className="p-3 text-left">Âge minimum</th>
                      <th className="p-3 text-left">Conditions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3">1ère primaire</td>
                      <td className="p-3">6 ans</td>
                      <td className="p-3">Acte de naissance</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3">1ère secondaire</td>
                      <td className="p-3">12 ans</td>
                      <td className="p-3">Certificat primaire</td>
                    </tr>
                  </tbody>
                </table>
              </Section>
            )}

            {activeTab === 'reglement' && (
              <Section title="Règlement d’ordre intérieur">
                <ol className="list-decimal ml-6 space-y-2 text-gray-700">
                  <li>Respect des enseignants et du personnel</li>
                  <li>Port correct de l’uniforme scolaire</li>
                  <li>Interdiction de la violence</li>
                  <li>Respect des horaires et du matériel</li>
                </ol>
              </Section>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  )
}

function InfoCard({ title, date }) {
  return (
    <div className="border rounded-xl p-4 hover:shadow-md transition">
      <h3 className="font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">📅 {date}</p>
    </div>
  )
}
