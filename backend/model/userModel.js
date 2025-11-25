const user = {
  create: (connection, { nom, email, passwordUser, img }, callback) => {
    const sql =
      'INSERT INTO users(nom , email , passwordUser , img) VALUES (? , ?, ?, ?)'
    connection.query(sql, [nom, email, passwordUser, img], callback)
  },
  findByEmail: (connection, email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?'
    connection.query(sql, [email], callback)
  },
  findById: (connection, id, callback) => {
    const sql = 'SELECT * FROM users WHERE id =? '
    connection.query(sql, [id], callback)
  },
  updateById: (connection, { nom, img, id }, callback) => {
    const sql = 'UPDATE users SET nom = ?,  img = ? WHERE id = ?'
    connection.query(sql, [nom, img, id], callback)
  },
}

module.exports = user
