import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { LandingPage } from '../pages'
import { Horaires } from '../pages/clients/Horraire'
import { Cours } from '../pages/clients/Cours'
import AnnoncesPage from '../pages/AnnoncesPage'
import StudentsManagement from '../pages/admins/StudentsManagement'
import PersonnelManagement from '../pages/admins/PersonnelManagement'
import Palmares from '../pages/admins/Palmares'
import PublierCours from '../pages/admins/PublierCours'
import { FormulaireConnection, FormulaireInscription } from '@/components/forms'
import ChatAI from '@/pages/clients/NoteAIPage.jsx'
import ProfilStudent from '@/pages/admins/ProfilStudent.jsx'

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
        {/* admin routes */}
      </Routes>
    </Suspense>
  )
}

export default RouterApp
