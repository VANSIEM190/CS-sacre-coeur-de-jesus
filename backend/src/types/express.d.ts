import { studentTypeData } from '../controllers/clients/@types/studentType'

declare global {
  namespace Express {
    interface Request {
      studentTypeData?: studentTypeData
      userRole?: string
    }
  }
}
