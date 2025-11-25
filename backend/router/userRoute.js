const express = require('express')
const router = express.Router()
const uploadFile = require('../middlewares/multer')
const { inscription } = require('../controller/userController')

// router.get('/api/userInfo', auth, getUser)

router.post('/api/inscription', uploadFile.single('img'), inscription)

// router.post('/api/connection', connection)

// router.put('/api/update-profil/:id', uploadFile.single('img'), updateProfil)

// router.get('/api/logout', deconnection)

module.exports = router
