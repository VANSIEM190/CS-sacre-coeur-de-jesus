import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.config'

export const refreshToken = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken
  if (!token) return res.status(401).json({ message: 'Token manquant' })

  try {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET as string) as {
      id: number
      role: 'admin' | 'élèves'
    }

    // Générer un nouveau Access Token
    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      env.JWT_SECRET as string,
      { expiresIn: '1h' }
    )

    res.json({ accessToken: newAccessToken })
  } catch (err) {
    res.status(403).json({ message: 'Refresh token invalide' })
  }
}
