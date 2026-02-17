import type { Request, Response } from 'express'
import { validateLoginOfAdmin } from '../../services/admin/admin.login.services'

export const loginAdmin = async (request: Request, response: Response) => {
  try {
    const { accessToken, refreshToken, admin } = await validateLoginOfAdmin(
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
      admin: {
        id: admin.id,
        email: admin.email,
        role: 'admin',
      },
    })
  } catch (error) {
    if (error instanceof Error) {
      response.status(400).json({ error: error.message })
    }
    throw error
  }
}
