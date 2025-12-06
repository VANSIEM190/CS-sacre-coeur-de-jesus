import { useContext, createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '@/services/firebaseConfig'

const StudentContext = createContext()

export const StudentProvider = ({ children }) => {
  const [studentData, setStudentData] = useState(null)
  const [loading, setLoading] = useState(true)

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
          setLoading(false)
        }
      }
    })
    return () => unsubscribe()
  }, [])

  // Fonction pour fetch le profil

  return (
    <StudentContext.Provider value={{ studentData, loading }}>
      {children}
    </StudentContext.Provider>
  )
}

export const useStudent = () => useContext(StudentContext)
