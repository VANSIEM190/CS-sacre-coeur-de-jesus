import { adminTypeData } from '../../controllers/admin/@types/admintypeData.js'
import { loginAdminRepository } from '../../db/admin/Admin.login.repository.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { env } from '../../config/env.config.js'
import dotenv from 'dotenv'
dotenv.config()

export const validateLoginOfAdmin = async (data: adminTypeData) => {
  try {
    if (!data.email || !data.motdepasse)
      throw new Error('Email and password are required')

    const adminLogged = await loginAdminRepository(data)
    if (adminLogged.length === 0) throw new Error('aucun utilisateur trouvé')

    const admin = adminLogged[0]

    const mdpCompare = await bcrypt.compare(data.motdepasse, admin.motdepasse)
    if (!mdpCompare) throw new Error('mot de passe invalid')

    const accessToken = jwt.sign(
      { id: admin.id, email: admin.email, role: 'admin' },
      env.JWT_SECRET as string,
      { expiresIn: '1h' }
    )

    const refreshToken = jwt.sign(
      { id: admin.id, email: admin.email, role: 'admin' },
      env.JWT_REFRESH_SECRET as string,
      { expiresIn: '30d' }
    )

    return { accessToken, refreshToken, admin }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw error
  }
}
