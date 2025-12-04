import React from 'react'
import { ScheduleDisplay } from '@/components/common'
import { Footer, Navbar } from '@/components/layout'
import NavbarRetourHome from '@/components/layout/NavbarRetourHome'
import { jsPDF } from 'jspdf'

export function Horaires() {
  return (
    <>
      <NavbarRetourHome />
      <div className="min-h-screen flex flex-col mt-20">
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="inline-flex items-center bg-[#E8EFFD] text-[#4361EE] px-4 py-1 rounded-full text-sm font-medium mb-4">
              <span className="mr-2">•</span>
              Année Scolaire {new Date().getFullYear()} -{' '}
              {new Date().getFullYear() + 1}
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              Horaires des Cours
            </h1>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Consultez les horaires de cours pour l'année scolaire en cours.
              Les horaires sont organisés par jour de la semaine.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ScheduleDisplay />
            </div>
            <div className="lg:col-span-1">
              <div className="card mb-6">
                <h3 className="font-bold text-lg mb-4">Informations</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-[#4361EE] mt-2 mr-3"></div>
                    <span>Les cours commencent à 7h00 précises</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-[#E74694] mt-2 mr-3"></div>
                    <span>Pause déjeuner de 9h45 à 10h00</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-[#10B981] mt-2 mr-3"></div>
                    <span>Fin des cours à 12h15 au plus tard</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
