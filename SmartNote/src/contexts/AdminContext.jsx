import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '@/services/firebaseConfig'

const AdminContext = createContext()

const AdminProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async admin => {
      if (admin) {
        try {
          const docRef = doc(db, 'admin', admin.uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            setAdminData(docSnap.data().role)
            setIsAdmin(true)
          } else {
            setAdminData(null)
            setIsAdmin(false)
          }
        } catch (error) {
          toast.error('Erreur fetch profil : ' + error.message)
        }
      }
    })
    return () => unsubscribe()
  })

  return (
    <AdminContext.Provider value={{ adminData, isAdmin }}>
      {children}
    </AdminContext.Provider>
  )
}
export default AdminProvider
export const useAdminContext = () => useContext(AdminContext)
