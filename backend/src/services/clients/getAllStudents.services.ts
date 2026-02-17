// src/services/students.services.ts
import { getAllStudents } from '../../db/clients/GetStudentInformations.repository'

export const studentService = async () => {
  try {
    const students = await getAllStudents()
    if (!students) {
      return 'erreur de la recupération des students'
    }
    return students
  } catch (error) {
    console.error('Erreur getAllStudents:', error)
    throw new Error('Impossible de récupérer les élèves')
  }
}
