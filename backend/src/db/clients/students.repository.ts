import { studentTypeData } from '../../controllers/clients/@types/studentType.js'
import { StudentAuthModel } from '../../model/clients/student.Auth.model.js'
import { sacreCoeurDB } from '../../config/db.config.js'
import { ResultSetHeader } from 'mysql2'

export const createStudent = async (data: studentTypeData) => {
  try {
    const {
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
      classeActuelle,
    } = data
    const { sql, values } = StudentAuthModel.create({
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
      classeActuelle,
    })
    const [result] = await sacreCoeurDB.execute<ResultSetHeader>(sql, values)
    return result
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error('Email already exists')
    }
    throw error
  }
}
