import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { LandingPage, SchoolGalleryPage, NotFindPage } from '../pages'
import {
  FormulaireConnection,
  FormulaireInscription,
  FormulaireConnectionAdmin,
} from '@/pages/forms'
import {
  ChatAI,
  Cours,
  ScheduleClass,
  QuizPage,
  StudentProfile,
} from '@/pages/clients'
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
import ProgrammeScolaire from '@/pages/clients/ProgrammeScolaire'

const RouterApp = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      }
    >
      <Routes>
        <>
          {/* <Route path="/eleves/:studentId" element={<ProfilStudent />} /> */}
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

        <>
          <Route path="/horraires" element={<ScheduleClass />} />
          <Route path="/mes-cours" element={<Cours />} />
          <Route path="/annonces" element={<AnnouncementPage />} />
          <Route path="/note-ai" element={<ChatAI />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/programme-scolaire" element={<ProgrammeScolaire />} />
          <Route path="/eleves/mon-compte" element={<StudentProfile />} />
        </>

        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFindPage />} />
        <Route path="/eleves/connexion" element={<FormulaireConnection />} />
        <Route
          path="/admin/connexion"
          element={<FormulaireConnectionAdmin />}
        />
        <Route path="/eleves/inscription" element={<FormulaireInscription />} />
        <Route path="/galerie-ecole" element={<SchoolGalleryPage />} />
        {/* admin routes */}
      </Routes>
    </Suspense>
  )
}

export default RouterApp
