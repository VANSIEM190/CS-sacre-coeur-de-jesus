export const adminModel = {
  findStudentsByEmail: (email: string) => {
    const sql = 'SELECT * FROM admin WHERE email=?'
    const values = [email]
    return { sql, values }
  },
}
