import { adminTypeData } from '../../controllers/admin/@types/admintypeData.js'
import { adminModel } from '../../model/admin/admin.model.js'
import { sacreCoeurDB } from '../../config/db.config.js'

export const loginAdminRepository = async (data: adminTypeData) => {
  try {
    const { email } = data
    const { sql, values } = adminModel.findStudentsByEmail(email)
    const [rows] = await sacreCoeurDB.execute(sql, values)
    return rows as adminTypeData[]
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error('Email already exists')
    }
    throw error
  }
}
