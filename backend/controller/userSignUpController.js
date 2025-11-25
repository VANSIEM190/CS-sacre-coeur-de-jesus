const user = require('../model/model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// const auth = (req, res, next) => {
//   const token = req.cookies.token

//   if (!token) return res.status(404).json({ message: 'token marquant' })
//   jwt.verify(token, process.env.JWT_SECRET, (err, decod) => {
//     if (err) return res.status(404).json({ message: 'token invalid' })
//     const userId = decod.id
//     req.getConnection((errConnection, connection) => {
//       if (errConnection)
//         return res
//           .status(4001)
//           .json({ message: 'erreur de connection avec le db' })
//       user.findById(connection, userId, (errRes, result) => {
//         if (errRes)
//           return res
//             .status(404)
//             .json({
//               message: 'erreur lors de réccupération des données au serveur ',
//             })

//         if (result.length === 0)
//           return res.status(404).json({ message: 'aucun utilisateur trouvé' })
//         const user = result[0]
//         req.user = user
//         next()
//       })
//     })
//   })
// }

// const getUser = (req, res) => {
//   res.status(200).json({
//     data: {
//       id: req.user.id,
//       nom: req.user.nom,
//       email: req.user.email,
//       img: req.user.img,
//       date: req.user.dateuser,
//       status: 'succes',
//     },
//   })
// }

const inscription = async (req, res) => {
  const { nom, email, passwordUser } = req.body
  const image = req.file.filename
  const passwordHash = await bcrypt.hash(passwordUser, 10)

  req.getConnection((err, connection) => {
    if (err)
      return res.status(404).json({
        message: "une erreur s'est produite lors de la connexion à la db",
      })

    user.create(
      connection,
      { nom, email, passwordUser: passwordHash, img: image },
      (erreurRes, result) => {
        if (erreurRes)
          return res.status(4001).json({
            message:
              "une erreur s'est produite lors de l'ajout de l'utilisateur",
          })

        const token = jwt.sign(
          { id: result.insertId, email: email },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        )

        res.cookie('token', token, { httpOnly: true })

        res.json({
          data: {
            id: result.insertId,
            nom,
            email,
            image,
            date: new Date(),
            status: 'succes',
          },
        })
      }
    )
  })
}

// const connection = (req, res) => {
//   const { email, passwordUser } = req.body

//   req.getConnection((err, connection) => {
//     if (err)
//       return res
//         .status(404)
//         .json({
//           message: "une erreur s'est produite lors de la connexion à la db",
//         })

//     user.findByEmail(connection, email, async (erreurRes, result) => {
//       if (erreurRes)
//         return res
//           .status(4001)
//           .json({
//             message: "une erreur s'est produite lors de la verification",
//           })

//       if (result.length === 0)
//         return res.status(404).json({ message: 'aucun utilisateur trouvé' })
//       const user = result[0]
//       const mdpCompare = await bcrypt.compare(passwordUser, user.passwordUser)
//       if (!mdpCompare)
//         return res.status(404).json({ message: 'mot de passe invalid' })

//       const token = jwt.sign(
//         { id: user.id, email: user.email },
//         process.env.JWT_SECRET,
//         { expiresIn: '7d' }
//       )

//       res.cookie('token', token, { httpOnly: true })

//       res.json({
//         data: {
//           id: user?.id,
//           nom: user?.nom,
//           email: user?.email,
//           image: user?.img,
//           date: user?.dateuser || new Date(),
//           status: 'succes',
//         },
//       })
//     })
//   })
// }

// const updateProfil = (req, res) => {
//   const { nom } = req.body
//   const userId = req.params.id

//   req.getConnection((err, connection) => {
//     if (err) return res.status(500).json({ message: 'Erreur connexion BD' })

//     user.findById(connection, userId, (errRes, result) => {
//       if (errRes)
//         return res
//           .status(500)
//           .json({ message: 'Erreur récupération utilisateur' })
//       if (result.length === 0)
//         return res.status(404).json({ message: 'Utilisateur non trouvé' })

//       const userInfo = result[0]

//       const imgProfil = req.file ? req.file.filename : userInfo.img
//       const newNom = nom || userInfo.nom

//       user.updateById(
//         connection,
//         { nom: newNom, img: imgProfil, id: userId },
//         errUpdate => {
//           if (errUpdate)
//             return res.status(500).json({ message: 'Erreur update profil' })
//           res.json({ status: 'succes' })
//         }
//       )
//     })
//   })
// }

// const deconnection = (req, res) => {
//   res.clearCookie('token', { httpOnly: true })
//   res.json({ status: 'succes' })
// }

module.exports = {
  inscription,
  // connection,
  // auth,
  // deconnection,
  // updateProfil,
  // getUser,
}
