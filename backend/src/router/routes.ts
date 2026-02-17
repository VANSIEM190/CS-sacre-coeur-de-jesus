import express from 'express'
import { SignupStudent } from '../controllers/clients/studentsAuth.controller.js'
import { upload } from '../middlewares/multer.middleware.js'
import { getAllStudentsController } from '../controllers/clients/getAllStudents.controller.js'
import auth from '../middlewares/students.auth.middleware.js'
import { loginStudent } from '../controllers/clients/students.login.controller.js'
import { refreshToken } from '../refreshhToken/refreshtoken.js'
import { loginAdmin } from '../controllers/admin/admin.login.controller.js'
import { getInformations } from '../controllers/GetInfo.controller.js'
const routes = express.Router()

//admin
routes.post('/admin/Auth/login', loginAdmin)

// get students
routes.post(
  '/students/Auth/register',
  upload.single('photo_path'),
  SignupStudent
)
routes.get('/me', auth, getInformations)
routes.post('/students/Auth/login', loginStudent)
routes.get('/students/getAll', getAllStudentsController)

//refresh
routes.post('/refresh', refreshToken)

export { routes }
