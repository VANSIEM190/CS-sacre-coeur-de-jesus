import { studentTypeData } from '../../controllers/clients/@types/studentType.js'
import { loginStudentRepository } from '../../db/clients/students.login.repository.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '../../config/env.config.js'
import dotenv from 'dotenv'
dotenv.config()

export const validateLoginOfStudent = async (data: studentTypeData) => {
  try {
    if (!data.email || !data.motdepasse)
      throw new Error('Email and password are required')

    const studentLogged = await loginStudentRepository(data)

    if (studentLogged.length === 0) throw new Error('aucun utilisateur trouvé')
    const student = studentLogged[0]
    const mdpCompare = await bcrypt.compare(data.motdepasse, student.motdepasse)

    if (!mdpCompare) throw new Error('mot de passe invalid')
    const accessToken = jwt.sign(
      { id: student.id, email: student.email, role: 'élèves' },
      env.JWT_SECRET as string,
      { expiresIn: '1h' }
    )

    const refreshToken = jwt.sign(
      { id: student.id, email: student.email, role: 'élèves' },
      env.JWT_REFRESH_SECRET as string,
      { expiresIn: '30d' }
    )
    return { accessToken, refreshToken, student }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw error
  }
}
