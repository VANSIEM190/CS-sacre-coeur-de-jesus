export const adminModel = {
  findAdminByEmail: (email: string) => {
    const sql = 'SELECT * FROM admin WHERE email=?'
    const values = [email]
    return { sql, values }
  },
  findAdminById: (id: number) => {
    const sql = 'SELECT * FROM admin  WHERE id=?'
    const values = [id]
    return { sql, values }
  },
}
