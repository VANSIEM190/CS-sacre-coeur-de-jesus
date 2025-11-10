import { Formik , Form, Field, ErrorMessage } from 'formik';
import * as Yup  from 'yup'

const userIdentite = [
  {
    name : 'nom',
    placeholder :  'Entrez Votre Nom',
    type : 'text',
    nameInput : 'Nom'
  },
  {
    name : 'prenom',
    placeholder :  'Entrez Votre Preom',
    type : 'text',
    nameInput : 'Prenom'
  },
  {
    name : 'email',
    placeholder :  'vansiem@gmail.com',
    type: 'email',
    nameInput : 'Email'
  },
  {
    name : 'niveau',
    nameInput : 'Niveau',
    options : [
      'licence 1' , 
      'licence 2',
      'licence 3',
      'master 1',
      'master 2'
    ]
  },
  {
    name : 'filiere',
    nameInput : 'Filière',
    options : [
      'Droit canonique',
      'Economie et Développement',
      'Droit',
      'Sciences politique',
      'Théologie',
      'Philosophie',
      'Science Informatique',
      'Communications Sociales',
      'Médecine'
    ]
  },
  {
    name : 'anneeAcademique',
    placeholder :  'Exemple : 2025',
    type : 'text',
    nameInput : 'Année Academique'
  },
  {
    name : 'idSecret',
    placeholder :  '*****',
    type : 'text',
    nameInput : 'ID Validation'
  },
  {
    name : 'passwordUser',
    placeholder :  '••••••••',
    type : 'password',
    nameInput : 'Mot De Passe'
  }
]
const regexValidateSchema = /^[a-zA-Z0-9]+$/
const regexValidateEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const regexValidateIdSecrete = /^[a-zA-Z]+@ucc\.cd\.(mont-ngafula|limete)$/i

const schemaValidation = Yup.object({
  nom : Yup.string()
  .min(4 , 'le nom doit contenir au moins 4 caractères')
  .max(20 , 'le nom est trop long')
  .matches(regexValidateSchema , 'le nom doit contenir des lettres et des chiffres')
  .required('veillez saisir votre nom'),
  prenom : Yup.string()
  .min(4 , 'le prenom doit contenir au moins 4 caractères')
  .max(12 , 'le prenom est trop long')
  .matches(regexValidateSchema , 'le prenom doit contenir des lettres et des chiffres')
  .required('veillez saisir votre prénom'),
  email : Yup.string()
  .matches(regexValidateEmail , 'email incorrect')
  .required('veillez saisir votre email'),
  niveau : Yup.string()
  .required('selectionner votre niveau'),
  filiere : Yup.string()
  .required('sélectionner votre filière'),
anneeAcademique : Yup.string()
  .min(4 , "l'année est incorrect")
  .max(4 , "l'année est incorrect")
  .required("veillez saisir l'année academique"),
  idSecret : Yup.string()
  .matches(regexValidateIdSecrete , "l'ID est incorrect")
  .required('veillez entrer votre id secret'),
  passwordUser : Yup.string()
  .min(8 , 'le password doit contenir au moins 8 caractères')
  .required('veillez entre votre mot de passe'),
});


const FormulaireInscription = ({onNext , initialValues}) => {
    
  return (
    <>
    <Formik
        initialValues={initialValues}
        validationSchema={schemaValidation}
        onSubmit={(values) => onNext(values)}
        enableReinitialize
      >
        <div className="flex items-center justify-center min-h-[90%] my-3">
        <div className="dark:bg-gray-800 bg-white/90 backdrop-blur-lg dark:shadow shadow-2xl rounded-2xl p-8 w-[90%] max-w-3xl transition-all">
          <h2 className="text-3xl font-bold text-center dark:text-gray-300 text-gray-800 mb-6">Inscription</h2>
          <Form  className="space-y-5">
            <div className='grid grid-cols-2 gap-3 '>
            {
              userIdentite.map(({nameInput , name , type , placeholder , options} , id)=>(
                <div key={id}>
                  <label 
                    className="block dark:text-gray-300 text-gray-700 mb-1 font-medium"
                    htmlFor={nameInput}
                    >
                    {nameInput}
                  </label>
                  {
                    options? (
                      <Field as='select' name={name} className='w-full px-4 py-2 border dark:border-gray-500 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-gray-100 dark:placeholder:text-gray-300'>
                      <option value="">--choisir--</option>
                      {
                        options.map((option , id)=>(
                          <option value={option} key={id} className='dark:text-gray-800'>{option}</option>
                        ))
                      }
                    </Field>
                  ) : (
                      <Field 
                      type={type} 
                      name={name} 
                      placeholder={placeholder} 
                      className="w-full px-4 py-2 border dark:border-gray-500 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-gray-100 dark:placeholder:text-gray-300"
                    />
                  )}
                  <ErrorMessage name={name} component="span" className='text-red-500 text-sm mt-1'/>
                </div>
              ))
            }
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition"
              >
                Suivant
              </button>
        </Form>
          <p className="text-sm text-center text-gray-600 mt-3">
            Déjà un compte ?{" "}
            <button
              type="button"
              className="text-indigo-600 font-medium hover:underline"
            >
              Se connecter
            </button>
          </p>
        </div>
        </div>
    </Formik>
    </>
  )
}

export default FormulaireInscription