import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify'
import { auth, db } from '@/services/firebaseConfig'

const AdminContext = createContext(null)

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAdminLoading, setIsAdminLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      try {
        if (!user) {
          setIsAdmin(false)
          setIsAdminLoading(false)
          return
        }

        const adminRef = doc(db, 'admin', user.uid)
        const adminSnap = await getDoc(adminRef)

        if (adminSnap.exists()) {
          setIsAdmin(true)
          return
        }
        setIsAdmin(false)
      } catch (error) {
        toast.error(`Erreur lors du chargement admin : ${error.message}`)
      } finally {
        setIsAdminLoading(false)
      }
    })

    return unsubscribe
  }, [])

  return (
    <AdminContext.Provider value={{ isAdmin, isAdminLoading }}>
      <ToastContainer position="top-right" />
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
