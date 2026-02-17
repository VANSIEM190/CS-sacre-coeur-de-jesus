import { studentTypeData } from '../../controllers/clients/@types/studentType.js'
import { createStudent } from '../../db/clients/students.repository.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '../../config/env.config.js'
import dotenv from 'dotenv'
dotenv.config()

export const validateStudent = async (
  data: studentTypeData,
  photoProfil: string | null
) => {
  try {
    if (!data.email || !data.motdepasse)
      throw new Error('Email and password are required')

    const slat = 10
    const hashedPassword = await bcrypt.hash(data.motdepasse, slat)
    const studentData = {
      ...data,
      motdepasse: hashedPassword,
      photo_path: photoProfil,
    }
    const studentCreated = await createStudent(studentData)
    const accessToken = jwt.sign(
      { id: studentCreated.insertId, role: 'élèves' },
      env.JWT_SECRET as string,
      { expiresIn: '1h' }
    )
    return accessToken
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    throw error
  }
}
