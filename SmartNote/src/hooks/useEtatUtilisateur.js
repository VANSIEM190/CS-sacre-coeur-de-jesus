import { useStudent, useAdminContext } from '@/contexts'

const useEtatUtilisateur = () => {
  const { isAdmin, isAdminLoading } = useAdminContext()
  const { studentData, isStudentLoading } = useStudent()
  const loading = isStudentLoading && isAdminLoading
  const userInformation = {
    isAdmin,
    studentData,
    loading,
  }

  return userInformation
}

export default useEtatUtilisateur
