import type { Request, Response } from 'express'
import { validateStudent } from '../../services/clients/students.services.js'

export const SignupStudent = async (request: Request, response: Response) => {
  const photoProfil = request?.file?.filename ?? null
  try {
    const accessToken = await validateStudent(request.body, photoProfil)
    response.cookie('accessToken', accessToken, { httpOnly: true })
    response
      .status(201)
      .json({ message: 'User registered successfully', role: 'élèves' })
  } catch (error) {
    if (error instanceof Error) {
      response.status(400).json({ error: error.message })
    }
    throw error
  }
}
