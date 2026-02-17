import { StudentModel } from '../../model/clients/students.model.js'
import { sacreCoeurDB } from '../../config/db.config.js'
import { studentTypeData } from '../../controllers/clients/@types/studentType.js'

export const getAllStudents = async () => {
  try {
    const { sql } = StudentModel.getStudents()
    const [rows] = await sacreCoeurDB.execute(sql)
    return rows as studentTypeData[]
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error('Email already exists')
    }
    throw error
  }
}
