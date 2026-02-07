import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/services/firebaseConfig'
import { FormValuesData } from '@/@types/PropsTypeFormulaireInscription'

type propTypeStudentProvider = {
  children: React.ReactNode
}

type propsTypeStudentContext = {
  studentData: FormValuesData | null
  isStudent: boolean
  isStudentLoading: boolean
}

const StudentContext = createContext<propsTypeStudentContext | null>(null)

export const StudentProvider = ({ children }: propTypeStudentProvider) => {
  const [studentData, setStudentData] = useState<FormValuesData | null>(null)
  const [isStudent, setIsStudent] = useState(false)
  const [isStudentLoading, setIsStudentLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      try {
        if (!user) {
          setStudentData(null)
          setIsStudent(false)
          return
        }

        const studentRef = doc(db, 'students', user.uid)
        const studentSnap = await getDoc(studentRef)

        if (studentSnap.exists()) {
          setStudentData(studentSnap.data() as FormValuesData)
          setIsStudent(true)
          return
        } else {
          setStudentData(null)
          setIsStudent(false)
        }
      } catch (error) {
        toast.error(`Erreur lors du chargement du profil : ${error}`)
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
