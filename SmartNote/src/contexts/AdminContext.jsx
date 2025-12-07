import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '@/services/firebaseConfig'

const AdminContext = createContext()

const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isAdminLoading, setIsAdminLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async admin => {
      if (admin) {
        try {
          const docRef = doc(db, 'admin', admin.uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            setIsAdmin(true)
          } else {
            setIsAdmin(false)
          }
        } catch (error) {
          toast.error('Erreur fetch profil : ' + error.message)
        } finally {
          setIsAdminLoading(false)
        }
      } else {
        toast.error("vous n'avais pas de compte inscrivez vous")
      }
    })
    return () => unsubscribe()
  })

  return (
    <AdminContext.Provider value={{ isAdmin, isAdminLoading }}>
      {children}
    </AdminContext.Provider>
  )
}
export default AdminProvider
export const useAdminContext = () => useContext(AdminContext)
