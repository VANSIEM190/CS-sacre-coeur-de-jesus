import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.config'
import { StudentAuthModel } from '../model/clients/student.Auth.model'
import { sacreCoeurDB } from '../config/db.config'

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.accessToken
    if (!token) {
      return res.status(401).json({ message: 'Token manquant' })
    }

    const decoded = jwt.verify(token, env.JWT_SECRET as string) as {
      id: number
      role: 'admin' | 'élèves'
    }

    let sql = ''
    let values: any[] = []

    if (decoded.role === 'élèves') {
      const query = StudentAuthModel.findStudentsById(decoded.id, 'students')
      sql = query.sql
      values = query.values
    }

    if (decoded.role === 'admin') {
      const query = StudentAuthModel.findStudentsById(decoded.id, 'admin')
      sql = query.sql
      values = query.values
    }

    const [rows] = await sacreCoeurDB.execute(sql, values)

    if ((rows as any[]).length === 0) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' })
    }

    req.studentTypeData = (rows as any[])[0]
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide ou expiré' })
  }
}

export default auth
