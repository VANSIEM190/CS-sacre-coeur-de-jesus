import { useContext, createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '@/services/firebaseConfig'

const StudentContext = createContext()

export const StudentProvider = ({ children }) => {
  const [studentData, setStudentData] = useState(null)
  const [isStudentLoading, setIsStudentLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        try {
          const docRef = doc(db, 'students', user.uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            setStudentData(docSnap.data())
          } else {
            setStudentData(null)
          }
        } catch (error) {
          toast.error('Erreur fetch profil : ' + error.message)
        } finally {
          setIsStudentLoading(false)
        }
      } else {
        toast.error('veillez vous inscrire')
      }
    })
    unsubscribe()
    return () => unsubscribe()
  }, [])

  // Fonction pour fetch le profil

  return (
    <StudentContext.Provider value={{ studentData, isStudentLoading }}>
      {children}
    </StudentContext.Provider>
  )
}

export const useStudent = () => useContext(StudentContext)
