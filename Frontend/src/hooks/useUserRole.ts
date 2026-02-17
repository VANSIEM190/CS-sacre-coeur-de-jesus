import { useUser } from '@/contexts'

const useUserRole = () => {
  const { userData, loading } = useUser()

  const isAdmin = userData?.role === 'admin'
  const isStudent = userData?.role === 'élève'
  console.log(isAdmin, isStudent, userData?.role)

  return { userData, isAdmin, isStudent, loading }
}

export default useUserRole
