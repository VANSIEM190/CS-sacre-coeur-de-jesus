import { studentTypeData } from '../../controllers/clients/@types/studentType.js'
export const StudentAuthModel = {
  create: (data: studentTypeData) => {
    const sql = `INSERT INTO students (
    photo_path,
    nom,
    postNom,
    prenom,
    sexe,
    dateNaissance,
    lieuNaissance,
    nationalite,
    nomPere,
    nomMere,
    professionPere,
    professionMere,
    degreParente,
    avenue,
    quartier,
    commune,
    religion,
    maladie,
    precisionSante,
    email,
    telephone,
    motdepasse,
    optionEleve,
    ecoleProvenance,
    pourcentage,
    classeActuelle) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [
      data?.photo_path,
      data?.nom,
      data?.prenom,
      data?.postNom,
      data?.sexe,
      data?.dateNaissance,
      data?.lieuNaissance,
      data?.nationalite,
      data?.nomPere,
      data?.nomMere,
      data?.professionPere,
      data?.professionMere,
      data?.degreParente,
      data?.avenue,
      data?.quartier,
      data?.commune,
      data?.religion,
      data?.maladie,
      data?.precisionSante,
      data?.email,
      data?.telephone,
      data?.motdepasse,
      data?.optionEleve,
      data?.ecoleProvenance,
      data?.pourcentage,
      data?.classeActuelle,
    ]
    return { sql, values }
  },
  findStudentsById: (id: number) => {
    const sql = `SELECT * FROM students  WHERE id=?`
    const values = [id]
    return { sql, values }
  },

  findStudentsByEmail: (email: string) => {
    const sql = 'SELECT * FROM students WHERE email=?'
    const values = [email]
    return { sql, values }
  },
}
