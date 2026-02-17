// src/controllers/students.controller.ts
import { Request, Response } from 'express'
import { studentService } from '../../services/clients/getAllStudents.services'

export const getAllStudentsController = async (req: Request, res: Response) => {
  try {
    const students = await studentService()
    return res.status(200).json({ success: true, data: students })
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message })
  }
}
