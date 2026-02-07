import { createContext, useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/services/firebaseConfig'

const StudentContext = createContext(null)

export const StudentProvider = ({ children }) => {
  const [studentData, setStudentData] = useState(null)
  const [isStudent, setIsStudent] = useState(false)
  const [isStudentLoading, setIsStudentLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      try {
        if (!user) {
          setStudentData(null)
          setIsStudent(false)
          setIsStudentLoading(false)
          return
        }

        const studentRef = doc(db, 'students', user.uid)
        const studentSnap = await getDoc(studentRef)

        if (studentSnap.exists()) {
          setStudentData(studentSnap.data())
          setIsStudent(true)
          return
        }
        setStudentData(null)
        setIsStudent(false)
      } catch (error) {
        toast.error(`Erreur lors du chargement du profil : ${error.message}`)
      } finally {
        setIsStudentLoading(false)
      }
    })

    return unsubscribe
  }, [])

  return (
    <StudentContext.Provider
      value={{
        studentData,
        isStudent,
        isStudentLoading,
      }}
    >
      {children}
    </StudentContext.Provider>
  )
}

export const useStudent = () => {
  const context = useContext(StudentContext)
  if (!context) {
    throw new Error('useStudent must be used inside StudentProvider')
  }
  return context
}
