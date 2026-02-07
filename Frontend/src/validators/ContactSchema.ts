import * as Yup from 'yup'
const regex = /^[a-zA-Z1-9À-ÿ ']+$/
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const contactSchema = Yup.object({
  name: Yup.string()
    .required('le nom est requis')
    .min(3, 'le nom doit comporter au moins 3 caractères')
    .max(25, 'le nom ne doit pas depasser 25 caractères')
    .matches(
      regex,
      "le nom ne doit pas comporter @ ou d'autres caractères spéciaux"
    ),
  subject: Yup.string()
    .required("l'object est requis")
    .min(4, "l'object doit comporter au moins 4 caractères")
    .max(50, "l'object ne doit pas depasser 50 caractères"),
  email: Yup.string()
    .required('email est requis')
    .email('email est incorrect')
    .matches(regexEmail, "format d'email invalide"),
  message: Yup.string()
    .required('le message est requis')
    .min(10, 'votre message à envoyer doit comporter au moins 10 caratères '),
})
