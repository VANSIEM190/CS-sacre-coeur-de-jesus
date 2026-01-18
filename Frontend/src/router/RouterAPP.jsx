import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import {
  LandingPage,
  SchoolGalleryPage,
  OfflineStatus,
  NotFindPage,
} from '../pages'
import { FormulaireConnection, FormulaireInscription } from '@/components/forms'
import { ChatAI, Cours, ScheduleClass, QuizPage } from '@/pages/clients'
import DashboardClasses from '@/pages/teachers/StudentPresence'
import {
  ProfilStudent,
  PublishCours,
  Palmares,
  PersonnelManagement,
  StudentsManagement,
} from '@/pages/admins'
import { Loader } from 'lucide-react'

// lazy loading
const AnnouncementPage = lazy(() => import('@/pages/AnnouncementPage'))

// import hook Network veirfication
import { useNetworkStatus } from '@/contexts'
import ProgrammeScolaire from '@/pages/clients/ProgrammeScolaire'
import useEtatUtilisateur from '@/hooks/useEtatUtilisateur'

const RouterApp = () => {
  const { isOnline, isOnlineStatus } = useNetworkStatus()
  const { isAdmin } = useEtatUtilisateur()
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      }
    >
      {isOnline && isOnlineStatus ? (
        <Routes>
          {isAdmin ? (
            <>
              <Route path="/eleves/:studentId" element={<ProfilStudent />} />
              <Route path="/galerie-ecole" element={<SchoolGalleryPage />} />
              <Route path="/eleves/Presences" element={<DashboardClasses />} />
              <Route
                path="/eleves/Presences/:classeId"
                element={<DashboardClasses />}
              />
              <Route path="/eleves" element={<StudentsManagement />} />
              <Route path="/personnels" element={<PersonnelManagement />} />
              <Route path="/palmares" element={<Palmares />} />
              <Route path="/publier-cours" element={<PublishCours />} />
              <Route path="/annonces" element={<AnnouncementPage />} />
            </>
          ) : (
            <>
              <Route path="/horraires" element={<ScheduleClass />} />
              <Route path="/mes-cours" element={<Cours />} />
              <Route path="/annonces" element={<AnnouncementPage />} />
              <Route path="/note-ai" element={<ChatAI />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route
                path="/programme-scolaire"
                element={<ProgrammeScolaire />}
              />
            </>
          )}

          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFindPage />} />
          <Route path="/connexion" element={<FormulaireConnection />} />
          <Route path="/inscription" element={<FormulaireInscription />} />
          {/* admin routes */}
        </Routes>
      ) : (
        <OfflineStatus />
      )}
    </Suspense>
  )
}

export default RouterApp
