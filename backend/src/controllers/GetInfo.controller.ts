import type { Request, Response } from 'express'
import { userTokenDataType } from './clients/@types/userTokenDataType'

export const getInformations = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      status: 'succes',
      data: req.studentTypeData,
      role: req.userRole,
    } as userTokenDataType)
  } catch (err) {
    res
      .status(400)
      .json({ error: 'erreur lors de la récupération des données' })
  }
}
