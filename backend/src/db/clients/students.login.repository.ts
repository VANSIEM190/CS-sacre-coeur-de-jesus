import { studentTypeData } from '../../controllers/clients/@types/studentType.js'
import { StudentAuthModel } from '../../model/clients/student.Auth.model.js'
import { sacreCoeurDB } from '../../config/db.config.js'

export const loginStudentRepository = async (data: studentTypeData) => {
  try {
    const { email } = data
    const { sql, values } = StudentAuthModel.findStudentsByEmail(email)
    const [rows] = await sacreCoeurDB.execute(sql, values)
    return rows as studentTypeData[]
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error('Email already exists')
    }
    throw error
  }
}
