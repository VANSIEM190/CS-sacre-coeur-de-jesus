import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FormValuesData } from '@/@types/PropsTypeFormulaireInscription'
import api from '@/apis/axios'

type propTypeStudentProvider = {
  children: React.ReactNode
}

type propsTypeStudentContext = {
  data: FormValuesData | null
  loading: boolean
}

const UserContext = createContext<propsTypeStudentContext | null>(null)

export const UserProvider = ({ children }: propTypeStudentProvider) => {
  const [data, setData] = useState<FormValuesData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const studetInfos = async () => {
      try {
        const response = await api.get('/me', {
          withCredentials: true,
        })

        if (response.data.status !== 'succes') {
          setData(null)
          return
        }
        setData(response.data)
        console.log(response.data)
      } catch (error) {
        toast.error(`Erreur lors du chargement du profil : ${error}`)
      } finally {
        setLoading(false)
      }
    }
    studetInfos()
  }, [])

  return (
    <UserContext.Provider
      value={{
        data,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useStudent must be used inside StudentProvider')
  }
  return context
}
