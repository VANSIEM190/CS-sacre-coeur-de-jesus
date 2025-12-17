import { useStudent, useAdminContext } from '@/contexts'

const useEtatUtilisateur = () => {
  const { isAdmin, isAdminLoading } = useAdminContext()
  const { studentData, isStudentLoading, isStudent } = useStudent()
  const loading = isStudentLoading || isAdminLoading
  console.log(isStudent)
  const userInformation = {
    isAdmin,
    studentData,
    isStudent,
    loading,
  }

  return userInformation
}

export default useEtatUtilisateur
