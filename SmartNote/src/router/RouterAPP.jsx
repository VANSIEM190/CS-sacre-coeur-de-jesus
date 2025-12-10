import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { LandingPage } from '../pages'
import AnnoncesPage from '../pages/AnnoncesPage'
import { FormulaireConnection, FormulaireInscription } from '@/components/forms'
import { ChatAI, Cours, Horaires } from '@/pages/clients'
import DashboardClasses from '@/pages/teachers/StudentPresence'
import {
  ProfilStudent,
  PublierCours,
  Palmares,
  PersonnelManagement,
  StudentsManagement,
} from '@/pages/admins'

const RouterApp = () => {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/connexion" element={<FormulaireConnection />} />
        <Route path="/inscription" element={<FormulaireInscription />} />
        <Route path="/horraires" element={<Horaires />} />
        <Route path="/mes-cours" element={<Cours />} />
        <Route path="/annonces" element={<AnnoncesPage />} />
        <Route path="/eleves" element={<StudentsManagement />} />
        <Route path="/personnels" element={<PersonnelManagement />} />
        <Route path="/palmares" element={<Palmares />} />
        <Route path="/publier-cours" element={<PublierCours />} />
        <Route path="/note-ai" element={<ChatAI />} />
        <Route path="/eleves/:studentId" element={<ProfilStudent />} />
        <Route path="/eleves/Presences" element={<DashboardClasses />} />
        <Route
          path="/eleves/Presences/:classeId"
          element={<DashboardClasses />}
        />
        {/* admin routes */}
      </Routes>
    </Suspense>
  )
}

export default RouterApp
