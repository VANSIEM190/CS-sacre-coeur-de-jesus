import type { Request, Response } from 'express'
import { validateLoginOfStudent } from '../../services/clients/students.login.services'

export const loginStudent = async (request: Request, response: Response) => {
  try {
    const { accessToken, refreshToken, student } = await validateLoginOfStudent(
      request.body
    )

    const durreHeure = 60 * 60 * 1000
    response.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: durreHeure, // 1h
    })

    const duree = 30 * 24 * 60 * 60 * 1000
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: duree,
    })

    response.status(201).json({
      message: 'User registered successfully',
      student: {
        id: student.id,
        email: student.email,
        role: 'élèves',
      },
    })
  } catch (error) {
    if (error instanceof Error) {
      response.status(400).json({ error: error.message })
    }
    throw error
  }
}
