import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { auth, db } from '@/services/firebaseConfig'

type propsTypeAdminProvider = {
  children: React.ReactNode
}

type AdminContextType = {
  isAdmin: boolean
  isAdminLoading: boolean
}

const AdminContext = createContext<AdminContextType | null>(null)

export const AdminProvider = ({ children }: propsTypeAdminProvider) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAdminLoading, setIsAdminLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      try {
        if (!user) {
          setIsAdmin(false)
          return
        }

        const dbAdminRef = doc(db, 'admin', user.uid)
        const adminSnap = await getDoc(dbAdminRef)

        if (adminSnap.exists()) {
          setIsAdmin(true)
          return
        }
        setIsAdmin(false)
      } catch (error) {
        toast.error(`Erreur lors du chargement admin : ${error}`)
      } finally {
        setIsAdminLoading(false)
      }
    })

    return unsubscribe
  }, [])

  return (
    <AdminContext.Provider value={{ isAdmin, isAdminLoading }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdminContext = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdminContext must be used inside AdminProvider')
  }
  return context
}
