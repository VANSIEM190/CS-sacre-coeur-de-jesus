import { useState } from 'react'
import AnnouncementsView from './clients/AnnouncementView'
import { AdminPanel } from '@/components/common'
import { Shield, GraduationCap } from 'lucide-react'
import { Footer, Navbar } from '@/components/layout'
import { useAdminContext } from '@/contexts/AdminContext'
import { cn } from '@/lib/cn'

const AnnouncementPage = () => {
  const { isAdmin } = useAdminContext()
  const [isVisiblePanel, setIsvisiblePanel] = useState(true)

  return (
    <>
      <Navbar />
      <div className="min-h-[70%] bg-linear-to-br from-blue-50 via-white to-indigo-50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <div className="flex items-center justify-between max-sm:my-5 mb-6 max-sm:block">
              <div className="flex items-center gap-3">
                <img
                  src="imgAcc.png"
                  alt="image de l'école "
                  className="w-15 h-15 rounded-full object-contain"
                />
                <div>
                  <h1 className="text-4xl max-sm:text-sm font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Tableau d'Annonces
                  </h1>
                  <p className="text-muted-foreground max-sm:hidden block">
                    Restez informé des dernières nouvelles de l'école
                  </p>
                </div>
              </div>
              {isAdmin && (
                <button
                  onClick={() => {
                    setIsvisiblePanel(prevVisibility => !prevVisibility)
                  }}
                  className={cn(
                    'flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg max-sm:text-sm cursor-pointer',
                    isAdmin
                      ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <Shield
                    className={cn('w-5 h-5', isVisiblePanel ? '' : 'hidden')}
                  />
                  <GraduationCap
                    className={cn('w-5 h-5', !isVisiblePanel ? '' : 'hidden')}
                  />
                  {isVisiblePanel ? 'Mode Administrateur' : 'Mode Élève'}
                </button>
              )}
            </div>
          </header>

          {isAdmin && isVisiblePanel ? (
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

export default AnnouncementPage
