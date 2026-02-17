export const StudentModel = {
  getStudents: () => {
    const sql = 'SELECT * FROM students ORDER BY nom ASC'
    return { sql }
  },
}
