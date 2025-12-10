import React, { useState, useEffect } from 'react'
import { User } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { db } from '@/services/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { NavbarRetourHome } from '@/components/layout'

const ProfileField = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm font-medium text-gray-500">{label}</span>
    <span className="text-base font-semibold text-gray-900 bg-white p-3 rounded-lg border shadow-sm mt-1">
      {value || 'Non renseigné'}
    </span>
  </div>
)

const ProfileSection = ({ title, children }) => (
  <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
    <div className="space-y-4">{children}</div>
  </section>
)

const ProfilStudent = () => {
  const { studentId } = useParams()
  const [student, setStudent] = useState('')

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const studentRef = doc(db, 'students', studentId)
        const studentSnap = await getDoc(studentRef)
        if (studentSnap.exists()) {
          setStudent(studentSnap.data())
        } else {
          toast.error('No such student!')
        }
      } catch (error) {
        console.error('Error fetching student:', error)
      }
    }

    fetchStudent()
  }, [studentId])

  return (
    <>
      <NavbarRetourHome />

      <main className="w-full flex justify-center py-10 px-3 bg-gray-100 min-h-screen mt-15">
        <div className="w-full max-w-4xl space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profil Elève</h1>
            <p className="text-gray-600 text-base mt-1">
              Informations détaillées du profil personnel et Scolaire
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shadow-md border border-gray-300">
              {student.photo_path ? (
                <img
                  src={student.photo_path}
                  alt="Profil utilisateur"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-gray-500" />
              )}
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mt-4">
              {student.nom} {student.postNom}
            </h2>
            <p className="text-sm text-gray-500">Profil Utilisateur</p>
            <p className="text-xs text-gray-400 mt-4 text-center">
              Formats acceptés : JPG, PNG, GIF (Max 5 Mo)
            </p>
          </div>

          <ProfileSection title="Informations Personnelles">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileField label="Nom" value={student.nom} />
              <ProfileField label="Post-Nom" value={student.postnom} />
              <ProfileField
                label="Date de Naissance"
                value={student.datenaissance}
              />
              <ProfileField
                label="Lieu de Naissance"
                value={student.lieunaissance}
              />
              <ProfileField label="Nationalité" value={student.nationalite} />
              <ProfileField label="Sexe" value={student.sexe} />
            </div>
          </ProfileSection>

          <ProfileSection title="Informations Familiales">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileField label="Nom du Père" value={student.nompere} />
              <ProfileField label="Nom de la Mère" value={student.nommere} />
            </div>
          </ProfileSection>

          <ProfileSection title="Informations de Localisation">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileField label="Territoire" value={student.territoire} />
              <ProfileField label="Commune" value={student.commune} />
              <ProfileField label="Secteur" value={student.secteur} />
              <ProfileField label="Village" value={student.village} />
            </div>
            <div className="mt-4">
              <ProfileField label="Adresse Complète" value={student.adresse} />
            </div>
          </ProfileSection>

          <ProfileSection title="Informations de Contact">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProfileField label="Email" value={student.email} />
              <ProfileField label="Téléphone" value={student.telephone} />
            </div>
          </ProfileSection>

          <ProfileSection title="Informations Scolaires">
            <ProfileField
              label="Filière d'Études"
              value={student.optioneleve}
            />
          </ProfileSection>

          <div className="text-center text-sm text-gray-500 py-4">
            Dernière mise à jour : 06/12/2025 à 21:30
          </div>
        </div>
      </main>
    </>
  )
}

export default ProfilStudent
