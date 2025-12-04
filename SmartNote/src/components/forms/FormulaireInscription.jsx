import React, { useState } from 'react'
import { UserIcon, UploadIcon, CheckCircleIcon } from 'lucide-react'
import { NavbarRetourHome, Footer } from '@/components/layout'
import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { supabase } from '@/supabase/supabaseConfig'
import { db, auth } from '@/services/firebaseConfig'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const regex = /^[a-zA-ZÀ-ÿ '-]+$/
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const regexTelephone = /^\+243[0-9]{9}$/
const validationSchema = Yup.object({
  nom: Yup.string()
    .required('Le nom est requis')
    .min(4, 'Le nom doit comporter au moins 4 caractères')
    .max(20, 'Le nom ne peut pas dépasser 20 caractères')
    .matches(
      regex,
      "Le nom ne peut contenir que des lettres, des espaces, des apostrophes et des traits d'union"
    ),
  postNom: Yup.string()
    .required('Le post nom est requis')
    .min(4, 'Le post nom doit comporter au moins 4 caractères')
    .max(20, 'Le post nom ne peut pas dépasser 20 caractères')
    .matches(
      regex,
      "Le post nom ne peut contenir que des lettres, des espaces, des apostrophes et des traits d'union"
    ),
  sexe: Yup.string().required('Le sexe est requis'),
  dateNaissance: Yup.date().required('La date de naissance est requise'),
  lieuNaissance: Yup.string()
    .required('Le lieu de naissance est requis')
    .min(4, 'Le lieu de naissance doit comporter au moins 4 caractères'),
  nationalite: Yup.string()
    .required('La nationalité est requise')
    .min(6, 'la nationalité doit comporter au moins 6 caractères'),
  nomPere: Yup.string()
    .required('Le nom du père est requis')
    .min(4, 'Le nom du père doit comporter au moins 4 caractères')
    .max(20, 'Le nom du père ne peut pas dépasser 20 caractères')
    .matches(
      regex,
      "Le nom du père ne peut contenir que des lettres, des espaces, des apostrophes et des traits d'union"
    ),
  nomMere: Yup.string()
    .required('Le nom de la mère est requis')
    .min(4, 'Le nom de la mère doit comporter au moins 4 caractères')
    .max(20, 'Le nom de la mère ne peut pas dépasser 20 caractères')
    .matches(
      regex,
      "Le nom de la mère ne peut contenir que des lettres, des espaces, des apostrophes et des traits d'union"
    ),
  territoire: Yup.string()
    .required('Le territoire est requis')
    .min(4, 'Le territoire doit comporter au moins 4 caractères')
    .max(20, 'Le territoire ne peut pas dépasser 20 caractères')
    .matches(
      regex,
      "Le territoire ne peut contenir que des lettres, des espaces, des apostrophes et des traits d'union"
    ),
  commune: Yup.string()
    .required('La commune est requise')
    .min(4, 'La commune doit comporter au moins 4 caractères')
    .max(20, 'La commune ne peut pas dépasser 20 caractères')
    .matches(
      regex,
      "La commune ne peut contenir que des lettres, des espaces, des apostrophes et des traits d'union"
    ),
  secteur: Yup.string()
    .required('Le secteur est requis')
    .min(4, 'Le secteur doit comporter au moins 4 caractères')
    .max(20, 'Le secteur ne peut pas dépasser 20 caractères')
    .matches(
      regex,
      "Le secteur ne peut contenir que des lettres, des espaces, des apostrophes et des traits d'union"
    ),
  village: Yup.string()
    .required('Le village est requis')
    .min(4, 'Le village doit comporter au moins 4 caractères')
    .max(20, 'Le village ne peut pas dépasser 20 caractères')
    .matches(
      regex,
      "Le village ne peut contenir que des lettres, des espaces, des apostrophes et des traits d'union"
    ),
  adresse: Yup.string()
    .required("L'adresse est requise")
    .min(10, "L'adresse doit comporter au moins 10 caractères")
    .max(100, "L'adresse ne peut pas dépasser 100 caractères")
    .matches(regex, "L'adresse contient des caractères invalides"),
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
    .oneOf(
      [Yup.ref('motdepasse'), null],
      'Les mots de passe doivent correspondre'
    )
    .required('La confirmation du mot de passe est requise'),
  optionEleve: Yup.string().required("L'option est requise"),
  pourcentage: Yup.number()
    .required("Le pourcentage de l'école venant est requis")
    .min(0, 'Le pourcentage doit être au moins 0')
    .max(100, 'Le pourcentage ne peut pas dépasser 100'),
})

const initialValues = {
  nom: '',
  postNom: '',
  sexe: '',
  nationalite: '',
  dateNaissance: '',
  nomPere: '',
  nomMere: '',
  territoire: '',
  village: '',
  secteur: '',
  email: '',
  telephone: '',
  lieuNaissance: '',
  optionEleve: '',
  pourcentage: '',
  commune: '',
  adresse: '',
  motdepasse: '',
  confirmMdp: '',
  photo_path: null,
}

const FormulaireInscription = () => {
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const onSwitchToRegister = () => {
    navigate('/connexion')
  }

  const handlePhotoUpload = e => {
    const file = e.target.files[0]
    if (file) {
      setProfilePhoto(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Upload la photo dans Supabase Storage
  const uploadProfilePhoto = async () => {
    if (!profilePhoto) return null

    const fileExt = profilePhoto.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `profile_photos/${fileName}`

    const { data, error } = await supabase.storage
      .from('SACRECOEUR')
      .upload(filePath, profilePhoto)

    if (error) {
      toast.error('Erreur upload photo : ' + error.message)
      return null
    }

    const { data: url, error: urlError } = await supabase.storage
      .from('SACRECOEUR')
      .getPublicUrl(filePath)

    if (urlError) {
      toast.error('Erreur récupération URL photo : ' + urlError.message)
      return null
    }
    console.log("Photo uploadée à l'URL :", url.publicUrl)
    return url.publicUrl
  }

  const saveUserInfo = async (userId, values, photoUrl) => {
    try {
      const pourcentage = values.pourcentage ? parseInt(values.pourcentage) : 0
      const studentsDBRef = doc(db, 'students', userId)
      await setDoc(studentsDBRef, {
        user_id: userId,
        nom: values.nom,
        postnom: values.postNom,
        sexe: values.sexe,
        datenaissance: values.dateNaissance || null,
        lieunaissance: values.lieuNaissance,
        nationalite: values.nationalite,
        nompere: values.nomPere,
        nommere: values.nomMere,
        territoire: values.territoire,
        commune: values.commune,
        secteur: values.secteur,
        village: values.village,
        adresse: values.adresse,
        email: values.email,
        telephone: values.telephone,
        motdepasse: values.motdepasse,
        optioneleve: values.optionEleve,
        pourcentage: pourcentage,
        photo_path: photoUrl || '',
        created_at: serverTimestamp() || new Date(),
      })
      return true
    } catch (err) {
      console.error('Erreur:', err)
      return false
    }
  }

  const registerStudent = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      if (!userCredential) {
        toast.error("Erreur lors de l'inscription : utilisateur non créé")
        return null
      }
      return userCredential.user.uid
    } catch (error) {
      toast.error("Erreur lors de l'inscription : " + error.message)
      return null
    }
  }

  const handleSubmit = async values => {
    setIsLoading(true)
    try {
      const userId = await registerStudent(values.email, values.motdepasse)
      if (!userId) return

      // Upload la photo si sélectionnée
      const photoUrl = await uploadProfilePhoto()
      if (photoUrl) values.photo_path = photoUrl

      // Enregistrement des infos utilisateur
      const saved = await saveUserInfo(userId, values, photoUrl)
      if (!saved) return

      setIsLoading(false)
      setSubmitted(true)
    } catch (error) {
      toast.error("Erreur lors de l'inscription : " + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen  flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon size={48} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Inscription Réussie!
          </h2>
          <p className="text-gray-600 mb-6">
            Votre demande d'inscription a été soumise avec succès. Vous recevrez
            une confirmation par email.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
          >
            Retour à l'Accueil
          </button>
        </div>
      </div>
    )
  }
  return (
    <>
      <NavbarRetourHome />
      <div className="min-h-screen py-12 px-4 mt-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <UserIcon size={32} />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-center mb-2">
                Formulaire d'Inscription
              </h1>
              <p className="text-center text-blue-100">
                Inscription des Élèves - Année Académique 2024-2025
              </p>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                setFieldValue,
                errors,
                touched,
                handleBlur,
              }) => (
                <form onSubmit={handleSubmit} className="p-8">
                  {/* Photo de Profil */}
                  <div className="mb-10">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <div className="w-32 h-32 rounded-full bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                          {photoPreview ? (
                            <img
                              src={photoPreview}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <UserIcon size={48} className="text-indigo-400" />
                          )}
                        </div>
                        <label
                          htmlFor="photo-upload"
                          className="absolute bottom-0 right-0 w-10 h-10 bg-linear-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center cursor-pointer hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg"
                        >
                          <UploadIcon size={20} className="text-white" />
                        </label>
                        <input
                          type="file"
                          name="photo_path"
                          id="photo-upload"
                          accept="image/*"
                          onChange={e => handlePhotoUpload(e, setFieldValue)}
                          className="hidden"
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        Cliquez pour télécharger une photo
                      </p>
                    </div>
                  </div>
                  {/* Informations Personnelles (gérées par Formik ci‑dessous) */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-200">
                      Informations Personnelles
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom *
                        </label>
                        <input
                          type="text"
                          name="nom"
                          value={values.nom}
                          onChange={handleChange}
                          required
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          placeholder="Entrez le nom"
                        />
                        {errors.nom && touched.nom && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.nom}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Post Nom *
                        </label>
                        <input
                          type="text"
                          name="postNom"
                          value={values.postNom}
                          onChange={handleChange}
                          required
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          placeholder="Entrez le post nom"
                        />
                        {errors.postNom && touched.postNom && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.postNom}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sexe *
                        </label>
                        <select
                          name="sexe"
                          value={values.sexe}
                          onChange={handleChange}
                          required
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                        >
                          <option value="">Sélectionnez</option>
                          <option value="Masculin">Masculin</option>
                          <option value="Féminin">Féminin</option>
                        </select>
                        {errors.sexe && touched.sexe && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.sexe}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date de Naissance *
                        </label>
                        <input
                          type="date"
                          name="dateNaissance"
                          value={values.dateNaissance}
                          onChange={handleChange}
                          required
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                        />
                        {errors.dateNaissance && touched.dateNaissance && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.dateNaissance}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Lieu de Naissance *
                        </label>
                        <input
                          type="text"
                          name="lieuNaissance"
                          value={values.lieuNaissance}
                          onChange={handleChange}
                          required
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          placeholder="Ville/Province"
                        />
                        {errors.lieuNaissance && touched.lieuNaissance && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.lieuNaissance}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nationalité *
                        </label>
                        <input
                          type="text"
                          name="nationalite"
                          value={values.nationalite}
                          onChange={handleChange}
                          required
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          placeholder="Ex: Congolaise"
                        />
                        {errors.nationalite && touched.nationalite && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.nationalite}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Informations Parentales */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-200">
                      Informations Parentales
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom du Père *
                        </label>
                        <input
                          type="text"
                          name="nomPere"
                          value={values.nomPere}
                          onChange={handleChange}
                          required
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          placeholder="Nom complet du père"
                        />
                        {errors.nomPere && touched.nomPere && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.nomPere}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom de la Mère *
                        </label>
                        <input
                          type="text"
                          name="nomMere"
                          value={values.nomMere}
                          onChange={handleChange}
                          required
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          placeholder="Nom complet de la mère"
                        />
                        {errors.nomMere && touched.nomMere && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.nomMere}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Localisation */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-200">
                      Localisation
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Territoire *
                        </label>
                        <input
                          type="text"
                          name="territoire"
                          value={values.territoire}
                          onChange={handleChange}
                          required
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          placeholder="Territoire"
                        />
                        {errors.territoire && touched.territoire && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.territoire}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Commune *
                        </label>
                        <input
                          type="text"
                          name="commune"
                          value={values.commune}
                          onChange={handleChange}
                          required
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          placeholder="Commune"
                        />
                        {errors.commune && touched.commune && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.commune}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Secteur *
                        </label>
                        <input
                          type="text"
                          name="secteur"
                          value={values.secteur}
                          onChange={handleChange}
                          required
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          placeholder="Secteur"
                        />
                        {errors.secteur && touched.secteur && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.secteur}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Village *
                        </label>
                        <input
                          type="text"
                          name="village"
                          value={values.village}
                          onChange={handleChange}
                          required
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          placeholder="Village"
                        />
                        {errors.village && touched.village && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.village}
                          </div>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Adresse Complète *
                        </label>
                        <textarea
                          name="adresse"
                          value={values.adresse}
                          onChange={handleChange}
                          required
                          onBlur={handleBlur}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          placeholder="Adresse complète de résidence"
                        ></textarea>
                        {errors.adresse && touched.adresse && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.adresse}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Contact */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-200">
                      Informations de Contact
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          required
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          placeholder="exemple@email.com"
                        />
                        {errors.email && touched.email && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.email}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Numéro de Téléphone *
                        </label>
                        <input
                          type="tel"
                          name="telephone"
                          value={values.telephone}
                          onChange={handleChange}
                          required
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          placeholder="+243 XXX XXX XXX"
                        />
                        {errors.telephone && touched.telephone && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.telephone}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mot de Passe *
                        </label>
                        <input
                          type="password"
                          name="motdepasse"
                          value={values.motdepasse}
                          onChange={handleChange}
                          required
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          placeholder="XXX XXX XXX"
                        />
                        {errors.motdepasse && touched.motdepasse && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.motdepasse}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirmer le Mot de Passe *
                        </label>
                        <input
                          type="password"
                          name="confirmMdp"
                          value={values.confirmMdp}
                          onChange={handleChange}
                          required
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          placeholder="XXX XXX XXX"
                        />
                        {errors.confirmMdp && touched.confirmMdp && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.confirmMdp}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Informations Académiques */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-200">
                      Informations Scolaires
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Option *
                        </label>
                        <select
                          name="optionEleve"
                          value={values.optionEleve}
                          onChange={handleChange}
                          required
                          onBlur={handleBlur}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                        >
                          <option value="">Sélectionnez une option</option>
                          <option value="1 Scientifique">1 Scientifique</option>
                          <option value="2 Scientifique">2 Scientifique</option>
                          <option value="3 Scientifique">3 Scientifique</option>
                          <option value="4 Scientifique">4 Scientifique</option>
                          <option value="1 Littéraire">1 Littéraire</option>
                          <option value="2 Littéraire">2 Littéraire</option>
                          <option value="3 Littéraire">3 Littéraire</option>
                          <option value="4 Littéraire">4 Littéraire</option>
                          <option value="1 Commerciale">1 Commerciale</option>
                          <option value="2 Commerciale">2 Commerciale</option>
                          <option value="3 Commerciale">3 Commerciale</option>
                          <option value="4 Commerciale">4 Commerciale</option>
                          <option value="1 Pédagogique">1 Pédagogique</option>
                          <option value="2 Pédagogique">2 Pédagogique</option>
                          <option value="3 Pédagogique">3 Pédagogique</option>
                          <option value="4 Pédagogique">4 Pédagogique</option>
                          <option value="1 Coupe et Couture">
                            1 Coupe et Couture
                          </option>
                          <option value="2 Coupe et Couture">
                            2 Coupe et Couture
                          </option>
                          <option value="3 Coupe et Couture">
                            3 Coupe et Couture
                          </option>
                          <option value="4 Coupe et Couture">
                            4 Coupe et Couture
                          </option>
                          <option value="8 ème">8 ème</option>
                          <option value="7 ème">7 ème</option>
                          <option value="6 ème">6 ème</option>
                          <option value="5 ème">5 ème</option>
                          <option value="4 ème">4 ème</option>
                          <option value="3 ème">3 ème</option>
                          <option value="2 ème">2 ème</option>
                          <option value="1 ème">1 ème</option>
                          <option value="Maternelle">Maternelle</option>
                        </select>
                        {errors.option && touched.option && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.option}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pourcentage École Venant *
                        </label>
                        <input
                          type="number"
                          name="pourcentage"
                          value={values.pourcentage}
                          onChange={handleChange}
                          required
                          onBlur={handleBlur}
                          min="0"
                          max="100"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                          placeholder="Ex: 75"
                        />
                        {errors.pourcentage && touched.pourcentage && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.pourcentage}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">
                      J'ai déjà un compte?{' '}
                      <button
                        type="button"
                        onClick={onSwitchToRegister}
                        className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-300"
                      >
                        connectez-vous ici
                      </button>
                    </p>
                  </div>
                  {/* Submit Button */}
                  <div className="flex justify-center pt-6">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-12 py-4 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'chargement...' : "Soumettre l'Inscription"}
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default FormulaireInscription
