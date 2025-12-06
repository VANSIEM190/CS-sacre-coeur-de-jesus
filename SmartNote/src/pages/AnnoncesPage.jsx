import { useState } from 'react'
import AnnouncementsView from './clients/Annonce'
import { AdminPanel } from '@/components/common'
import { Shield, GraduationCap } from 'lucide-react'
import { Footer } from '@/components/layout'
import NavbarRetourHome from '@/components/layout/NavbarRetourHome'
import { useAdminContext } from '@/contexts/AdminContext'

export default function AnnoncesPage() {
  const { isAdmin } = useAdminContext()
  const [isVisiblePanel, setIsvisiblePanel] = useState(isAdmin)

  return (
    <>
      <NavbarRetourHome />
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full shadow-lg">
                  <img
                    src="imgAcc.png"
                    alt=""
                    className="w-15 h-15 rounded-full object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Tableau d'Annonces
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Restez informé des dernières nouvelles de l'école
                  </p>
                </div>
              </div>
              {isAdmin && (
                <button
                  onClick={() => {
                    setIsvisiblePanel(!isVisiblePanel)
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg ${
                    isAdmin
                      ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {isVisiblePanel ? (
                    <>
                      <Shield className="w-5 h-5" />
                      Mode Administrateur
                    </>
                  ) : (
                    <>
                      <GraduationCap className="w-5 h-5" />
                      Mode Élève
                    </>
                  )}
                </button>
              )}
            </div>
          </header>

          {isVisiblePanel ? (
            <AdminPanel
              setPanelIsVisible={setIsvisiblePanel}
              panelIsVisible={isVisiblePanel}
            />
          ) : (
            <AnnouncementsView />
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
