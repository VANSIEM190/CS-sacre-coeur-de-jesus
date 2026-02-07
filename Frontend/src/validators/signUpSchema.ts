import * as Yup from 'yup'
import { paysDuMonde } from '@/data/paysList'

const regex = /^[a-zA-Z0-9À-ÿ '-]+$/
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const regexTelephone = /^\+243[0-9]{9}$/

export const signUpSchema = Yup.object({
  nom: Yup.string()
    .required('Le nom est requis')
    .min(4, 'Lechamp doit comporter au moins 4 caractères')
    .max(20, 'Lechamp ne peut pas dépasser 20 caractères')
    .matches(
      regex,
      "Lechamp ne peut contenir que des lettres, des espaces, des apostrophes et des traits d'union"
    ),
  postNom: Yup.string()
    .required('Le post nom est requis')
    .min(4, 'Le champ doit comporter au moins 4 caractères')
    .max(20, 'Le champ ne peut pas dépasser 20 caractères')
    .matches(
      regex,
      "Le champ ne peut contenir que des lettres, des espaces, des apostrophes et des traits d'union"
    ),
  prenom: Yup.string()
    .required('Le prenom est requis')
    .min(4, 'Le champdoit comporter au moins 4 caractères')
    .max(20, 'Le champne peut pas dépasser 20 caractères')
    .matches(
      regex,
      "Le champne peut contenir que des lettres, des espaces, des apostrophes et des traits d'union"
    ),
  sexe: Yup.string().required('Le sexe est requis'),
  dateNaissance: Yup.date().required('La date de naissance est requise'),
  lieuNaissance: Yup.string()
    .required('Le lieu de naissance est requis')
    .min(4, 'Le lieu de naissance doit comporter au moins 4 caractères'),
  nationalite: Yup.string()
    .oneOf(paysDuMonde, 'Veuillez sélectionner une option valide')
    .required('La nationalité est requise'),
  nomPere: Yup.string()
    .required('Le nom du père est requis')
    .min(4, 'Le champ doit comporter au moins 4 caractères')
    .max(20, 'Le champ ne peut pas dépasser 20 caractères')
    .matches(
      regex,
      "Le champ ne peut contenir que des lettres, des espaces, des apostrophes et des traits d'union"
    ),
  nomMere: Yup.string()
    .required('Le nom de la mère est requis')
    .min(4, 'Le champ doit comporter au moins 4 caractères')
    .max(20, 'Lechamp ne peut pas dépasser 20 caractères')
    .matches(
      regex,
      "Lechamp ne peut contenir que des lettres, des espaces, des apostrophes et des traits d'union"
    ),
  professionPere: Yup.string()
    .required('La profession du père est requis')
    .min(4, 'Le champ doit comporter au moins 4 caractères')
    .max(20, 'Le champ ne peut pas dépasser 20 caractères')
    .matches(
      regex,
      "Le champ ne peut contenir que des lettres, des espaces, des apostrophes et des traits d'union"
    ),
  professionMere: Yup.string()
    .required('La profession de la mère est requis')
    .min(4, 'Le champ doit comporter au moins 4 caractères')
    .max(20, 'Le champ ne peut pas dépasser 20 caractères')
    .matches(
      regex,
      "Le champ ne peut contenir que des lettres, des espaces, des apostrophes et des traits d'union"
    ),
  degreParente: Yup.string()
    .required('Le territoire est requis')
    .min(4, 'Le champ doit comporter au moins 4 caractères')
    .max(50, 'Le champ ne peut pas dépasser 50 caractères')
    .matches(
      regex,
      "Le champ ne peut contenir que des lettres, des espaces, des apostrophes et des traits d'union"
    ),
  avenue: Yup.string()
    .required("L'avenue est requise")
    .min(4, 'Le champ doit comporter au moins 4 caractères')
    .max(30, 'Le champ ne peut pas dépasser 30 caractères')
    .matches(
      regex,
      "Le champ ne peut contenir que des lettres, des espaces, des apostrophes et des traits d'union"
    ),
  quartier: Yup.string()
    .required('Le quartier est requise')
    .min(4, 'Le champ doit comporter au moins 4 caractères')
    .max(30, 'Le champ ne peut pas dépasser 30 caractères')
    .matches(
      regex,
      "Le champ ne peut contenir que des lettres, des espaces, des apostrophes et des traits d'union"
    ),
  commune: Yup.string().required('La commune est requise'),
  religion: Yup.string().required('La réligion est requise'),
  maladie: Yup.string().required("l'état de santé de l'élève est requise"),
  precisionSante: Yup.string()
    .required('Le champ est requise')
    .min(4, 'Le champ doit comporter au moins 4 caractères')
    .max(500, 'Le champ ne peut pas dépasser 500 caractères')
    .matches(
      regex,
      "Le champ ne peut contenir que des lettres, des espaces, des apostrophes et des traits d'union"
    ),
  email: Yup.string()
    .required("L'email est requis")
    .email("Format d'email invalide")
    .matches(regexEmail, "Format d'email invalide"),
  telephone: Yup.string()
    .required('Le numéro de téléphone est requis')
    .matches(
      regexTelephone,
      'Le numéro de téléphone doit commencer par +243 suivi de 9 chiffres'
    ),
  motdepasse: Yup.string()
    .required('Le mot de passe est requis')
    .min(8, 'Le mot de passe doit comporter au moins 8 caractères')
    .matches(
      /[A-Z]/,
      'Le mot de passe doit contenir au moins une lettre majuscule'
    )
    .matches(
      /[a-z]/,
      'Le mot de passe doit contenir au moins une lettre minuscule'
    )
    .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
    .matches(
      /[@$!%*?&]/,
      'Le mot de passe doit contenir au moins un caractère spécial (@, $, !, %, *, ?, &)'
    ),
  confirmMdp: Yup.string()
    .oneOf([Yup.ref('motdepasse')], 'Les mots de passe doivent correspondre')
    .required('La confirmation du mot de passe est requise'),
  optionEleve: Yup.string().required("L'option est requise"),
  ecoleProvenance: Yup.string()
    .required('Le champ est requise')
    .min(4, 'Le champ doit comporter au moins 4 caractères')
    .max(50, 'Le champ ne peut pas dépasser 500 caractères')
    .matches(
      regex,
      "Le champ ne peut contenir que des lettres, des espaces, des apostrophes et des traits d'union"
    ),
  pourcentage: Yup.number()
    .required("Le pourcentage de l'école venant est requis")
    .min(0, 'Le pourcentage doit être au moins 0')
    .max(100, 'Le pourcentage ne peut pas dépasser 100'),
  classeActuelle: Yup.string().required(
    'La séléction est obligatoire est requise'
  ),
  photo_path: Yup.mixed<File>()
    .required('image requis')
    .test('fileType', 'Seuls les images sont autorisés', value => {
      if (!value) return false
      return value && value.type.startsWith('image/')
    })
    .test('filesize', "L'image est trop volumineux (max 3MB)", value => {
      if (!value) return false
      return value && value.size <= 3 * 1024 * 1024 // 5MB
    }),
})
