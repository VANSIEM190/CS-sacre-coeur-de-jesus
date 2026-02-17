import { useState } from 'react'
import { UserIcon, UploadIcon, ChevronUp, ChevronDown } from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import { toast } from 'react-toastify'
import { supabase } from '@/supabase/supabaseConfig'
import { db, auth } from '@/services/firebaseConfig'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import ListeParClasse from '@/utils/ListeParClasse'
import FicheInscription from './FicheInscription'
import { signUpSchema as validateYupSchema } from '@/validators/signUpSchema'
import type { FormikErrors } from 'formik/dist/types'
import { FormValuesData } from '@/@types/PropsTypeFormulaireInscription'
import axios from 'axios'
import {
  paysDuMonde,
  maladiesList,
  religionsKinshasa,
  communesKinshasa,
} from '@/data'
import {
  Button,
  Input,
  Label,
  Textarea,
  Select,
  SelectGroup,
  SelectItem,
  SelectScrollDownButton,
  SelectTrigger,
  SelectScrollUpButton,
  SelectValue,
  SelectIcon,
  SelectContent,
} from '../../components/ui'

const initialValues: FormValuesData = {
  nom: '',
  postNom: '',
  prenom: '',
  sexe: '',
  nationalite: '',
  dateNaissance: '',
  nomPere: '',
  nomMere: '',
  professionPere: '',
  professionMere: '',
  degreParente: '',
  avenue: '',
  quartier: '',
  commune: '',
  religion: '',
  maladie: '',
  precisionSante: '',
  email: '',
  telephone: '',
  lieuNaissance: '',
  optionEleve: '',
  pourcentage: 0,
  motdepasse: '',
  confirmMdp: '',
  ecoleProvenance: '',
  classeActuelle: '',
  photo_path: '',
}

const FormulaireInscription = () => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<FormValuesData>>
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      setFieldValue('photo_path', file)
      const reader = new FileReader()
      reader.onloadend = () => setPhotoPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (values: FormValuesData) => {
    setIsLoading(true)

    try {
      const formData = new FormData()

      for (const key in values) {
        // @ts-ignore
        formData.append(key, values[key])
      }
      axios.defaults.withCredentials = true
      const response = await axios.post(
        'http://localhost:3000/api/v1/students/auth/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      setSubmitted(true)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          `Erreur lors de l'inscription : ${
            error.response?.data?.message || 'Erreur serveur'
          }`
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (submitted) {
    return <FicheInscription />
  }
  return (
    <>
      <Navbar />
      <div className=" py-12 px-4 mt-12 ">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-white backdrop-blur-sm rounded-full flex items-center justify-center">
                  <img src="/imgAcc.png" alt="" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-center mb-2">
                Formulaire d'Inscription
              </h1>
              <p className="text-center text-blue-100">
                Inscription des Élèves - Année Scolaire{' '}
                {new Date().getFullYear()} - {new Date().getFullYear() + 1}
              </p>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validateYupSchema}
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
                          onChange={e => handleInputChange(e, setFieldValue)}
                          className="hidden"
                        />
                      </div>
                      <p className="text-sm text-gray-500">
                        Cliquez pour télécharger une photo
                      </p>
                      {errors.photo_path && touched.photo_path && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.photo_path}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Informations Personnelles (gérées par Formik ci‑dessous) */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-200">
                      Informations Personnelles
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="nom">Nom *</Label>
                        <Input
                          type="text"
                          name="nom"
                          value={values.nom}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="Entrez le nom"
                        />
                        {errors.nom && touched.nom && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.nom}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="postNom">Post Nom *</Label>
                        <Input
                          type="text"
                          name="postNom"
                          value={values.postNom}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="Entrez le post nom"
                        />
                        {errors.postNom && touched.postNom && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.postNom}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="postNom">Prenom *</Label>
                        <Input
                          type="text"
                          name="prenom"
                          value={values.prenom}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="Entrez le prenom"
                        />
                        {errors.prenom && touched.prenom && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.prenom}
                          </div>
                        )}
                      </div>
                      <div translate="no" className="relative">
                        <Label htmlFor="sexe">Sexe *</Label>
                        <Select
                          value={values.sexe}
                          onValueChange={value => setFieldValue('sexe', value)}
                          required
                        >
                          <SelectTrigger className="w-full flex justify-between items-center px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300">
                            <SelectValue placeholder="Sélectionnez le sexe" />
                            <SelectIcon>
                              <ChevronDown className="size-4" />
                            </SelectIcon>
                          </SelectTrigger>
                          <SelectContent className="mt-8 absolute z-10 right-0 top-7 bg-white border border-gray-300 rounded-lg shadow-lg">
                            <SelectScrollUpButton>
                              <ChevronUp className="size-4" />
                            </SelectScrollUpButton>
                            <SelectGroup>
                              <SelectItem value="Masculin">Masculin</SelectItem>
                              <SelectItem value="Féminin">Féminin</SelectItem>
                            </SelectGroup>
                            <SelectScrollDownButton>
                              <ChevronDown className="size-4" />
                            </SelectScrollDownButton>
                          </SelectContent>
                        </Select>

                        {errors.sexe && touched.sexe && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.sexe}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="dateNaissance">
                          Date de Naissance *
                        </Label>
                        <Input
                          type="date"
                          name="dateNaissance"
                          value={values.dateNaissance}
                          onChange={handleChange}
                          required
                          onBlur={handleBlur}
                        />
                        {errors.dateNaissance && touched.dateNaissance && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.dateNaissance}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lieuNaissance">
                          Lieu de Naissance *
                        </Label>
                        <Input
                          type="text"
                          name="lieuNaissance"
                          value={values.lieuNaissance}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="Ville/Province"
                        />
                        {errors.lieuNaissance && touched.lieuNaissance && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.lieuNaissance}
                          </div>
                        )}
                      </div>
                      <div
                        className="md:col-span-2
                      "
                      >
                        <Label htmlFor="nationalite">Nationalité *</Label>
                        <Select
                          value={values.nationalite}
                          onValueChange={value =>
                            setFieldValue('nationalite', value)
                          }
                        >
                          <SelectTrigger className="w-full flex justify-between items-center px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300">
                            <SelectValue placeholder="Sélectionnez une nationalité" />
                            <SelectIcon>
                              <ChevronDown className="size-4" />
                            </SelectIcon>
                          </SelectTrigger>

                          <SelectContent className="mt-8 bg-white border border-gray-300 rounded-lg shadow-lg">
                            <SelectScrollUpButton>
                              <ChevronUp className="size-4" />
                            </SelectScrollUpButton>

                            <SelectGroup>
                              {paysDuMonde.map(pays => (
                                <SelectItem key={pays} value={pays}>
                                  {pays}
                                </SelectItem>
                              ))}
                            </SelectGroup>

                            <SelectScrollDownButton>
                              <ChevronDown className="size-4" />
                            </SelectScrollDownButton>
                          </SelectContent>
                        </Select>

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
                        <Label htmlFor="nomPere">Nom du Père *</Label>
                        <Input
                          type="text"
                          name="nomPere"
                          value={values.nomPere}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="Nom complet du père"
                        />
                        {errors.nomPere && touched.nomPere && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.nomPere}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="nomMere">Nom de la Mère *</Label>
                        <Input
                          type="text"
                          name="nomMere"
                          value={values.nomMere}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="Nom complet de la mère"
                        />
                        {errors.nomMere && touched.nomMere && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.nomMere}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="nomMere">Profession du père *</Label>
                        <Input
                          type="text"
                          name="professionPere"
                          value={values.professionPere}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="profession du père"
                        />
                        {errors.professionPere && touched.professionPere && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.professionPere}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="nomMere">Profession de la Mère *</Label>
                        <Input
                          type="text"
                          name="professionMere"
                          value={values.professionMere}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="profession de la mère"
                        />
                        {errors.professionMere && touched.professionMere && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.professionMere}
                          </div>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="nomMere">
                          Degré Parenté avec le Tuteur *
                        </Label>
                        <Textarea
                          name="degreParente"
                          value={values.degreParente}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="degré parenté avec le tuteur..."
                        />
                        {errors.degreParente && touched.degreParente && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.degreParente}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Localisation */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-200">
                      Localisation & Religion
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="Avenue">Avenue *</Label>
                        <Input
                          type="text"
                          name="avenue"
                          value={values.avenue}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="avenue"
                        />
                        {errors.avenue && touched.avenue && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.avenue}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="Quartier">Quartier *</Label>
                        <Input
                          type="text"
                          name="quartier"
                          value={values.quartier}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="quartier"
                        />
                        {errors.quartier && touched.quartier && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.quartier}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="commune">Commune *</Label>
                        <Select
                          value={values.commune}
                          onValueChange={value =>
                            setFieldValue('commune', value)
                          }
                          required
                        >
                          <SelectTrigger className="w-full flex justify-between items-center px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300">
                            <SelectValue placeholder="Sélectionnez votre commune" />
                            <SelectIcon>
                              <ChevronDown className="size-4" />
                            </SelectIcon>
                          </SelectTrigger>
                          <SelectContent className="mt-8  bg-white border border-gray-300 rounded-lg shadow-lg">
                            <SelectScrollUpButton>
                              <ChevronUp className="size-4" />
                            </SelectScrollUpButton>
                            <SelectGroup>
                              {communesKinshasa.map(commune => (
                                <SelectItem value={commune} key={commune}>
                                  {commune}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                            <SelectScrollDownButton>
                              <ChevronDown className="size-4" />
                            </SelectScrollDownButton>
                          </SelectContent>
                        </Select>
                        {errors.commune && touched.commune && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.commune}
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="religion">Réligion *</Label>
                        <Select
                          value={values.religion}
                          onValueChange={value =>
                            setFieldValue('religion', value)
                          }
                          required
                        >
                          <SelectTrigger className="w-full flex justify-between items-center px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300">
                            <SelectValue placeholder="Sélectionnez votre Réligion" />
                            <SelectIcon>
                              <ChevronDown className="size-4" />
                            </SelectIcon>
                          </SelectTrigger>
                          <SelectContent className="mt-8  bg-white border border-gray-300 rounded-lg shadow-lg">
                            <SelectScrollUpButton>
                              <ChevronUp className="size-4" />
                            </SelectScrollUpButton>
                            <SelectGroup>
                              {religionsKinshasa.map(religion => (
                                <SelectItem value={religion} key={religion}>
                                  {religion}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                            <SelectScrollDownButton>
                              <ChevronDown className="size-4" />
                            </SelectScrollDownButton>
                          </SelectContent>
                        </Select>
                        {errors.religion && touched.religion && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.religion}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Santé */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-indigo-200">
                      Santé
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <Label htmlFor="maladie">L'élève souffre de *</Label>
                        <Select
                          value={values.maladie}
                          onValueChange={value =>
                            setFieldValue('maladie', value)
                          }
                          required
                        >
                          <SelectTrigger className="w-full flex justify-between items-center px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300">
                            <SelectValue placeholder="Sélectionnez" />
                            <SelectIcon>
                              <ChevronDown className="size-4" />
                            </SelectIcon>
                          </SelectTrigger>
                          <SelectContent className="mt-8  bg-white border border-gray-300 rounded-lg shadow-lg">
                            <SelectScrollUpButton>
                              <ChevronUp className="size-4" />
                            </SelectScrollUpButton>
                            <SelectGroup>
                              {maladiesList.map(maladie => (
                                <SelectItem value={maladie} key={maladie}>
                                  {maladie}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                            <SelectScrollDownButton>
                              <ChevronDown className="size-4" />
                            </SelectScrollDownButton>
                          </SelectContent>
                        </Select>
                        {errors.maladie && touched.maladie && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.maladie}
                          </div>
                        )}
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="precisionSante">
                          Prière de Préciser *
                        </Label>
                        <Textarea
                          type="text"
                          name="precisionSante"
                          value={values.precisionSante}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="Écrivez votre précision en deux lignes ou plus... "
                        />
                        {errors.precisionSante && touched.precisionSante && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.precisionSante}
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
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          type="email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="exemple@email.com"
                        />
                        {errors.email && touched.email && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.email}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="telephone">
                          Numéro de Téléphone Du Tuteur *
                        </Label>
                        <Input
                          type="tel"
                          name="telephone"
                          value={values.telephone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="+243 XXX XXX XXX"
                        />
                        {errors.telephone && touched.telephone && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.telephone}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="motdepasse">Mot de Passe *</Label>
                        <Input
                          type="password"
                          name="motdepasse"
                          value={values.motdepasse}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="XXX XXX XXX"
                        />
                        {errors.motdepasse && touched.motdepasse && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.motdepasse}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="confirmMdp">
                          Confirmer le Mot de Passe *
                        </Label>
                        <Input
                          type="password"
                          name="confirmMdp"
                          value={values.confirmMdp}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
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
                      <div translate="no">
                        <Label htmlFor="optionEleve">Classe Sollicité *</Label>

                        <Select
                          value={values.optionEleve}
                          onValueChange={value => {
                            setFieldValue('optionEleve', value)
                          }}
                        >
                          <SelectTrigger className="w-full px-2 py-2 flex justify-between border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                            <SelectValue placeholder="Sélectionnez votre classe sollicitée" />
                            <SelectIcon>
                              <ChevronDown />
                            </SelectIcon>
                          </SelectTrigger>

                          <SelectContent>
                            <SelectScrollUpButton />
                            {ListeParClasse.map(({ classe, fillierCode }) => (
                              <SelectItem key={classe} value={fillierCode}>
                                {classe}
                              </SelectItem>
                            ))}
                            <SelectScrollDownButton />
                          </SelectContent>
                        </Select>

                        {errors.optionEleve && touched.optionEleve && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.optionEleve}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="ecoleProvenance">
                          Ecole de Provenance *
                        </Label>
                        <Input
                          type="text"
                          name="ecoleProvenance"
                          value={values.ecoleProvenance}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          placeholder="Ecole de Provenance"
                        />
                        {errors.ecoleProvenance && touched.ecoleProvenance && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.ecoleProvenance}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="">Pourcentage École Venant *</Label>
                        <Input
                          type="number"
                          name="pourcentage"
                          value={values.pourcentage}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          min="0"
                          max="100"
                          required
                          placeholder="Ex: 75"
                        />
                        {errors.pourcentage && touched.pourcentage && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.pourcentage}
                          </div>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="classeActuelle">
                          Classe Actuelle *
                        </Label>
                        <Select
                          value={values.classeActuelle}
                          onValueChange={value => {
                            setFieldValue('classeActuelle', value)
                          }}
                        >
                          <SelectTrigger className="w-full px-2 py-2 flex justify-between border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                            <SelectValue placeholder="Sélectionnez votre classe Actuelle" />
                            <SelectIcon>
                              <ChevronDown />
                            </SelectIcon>
                          </SelectTrigger>

                          <SelectContent>
                            <SelectScrollUpButton />
                            {ListeParClasse.map(({ classe, fillierCode }) => (
                              <SelectItem key={classe} value={fillierCode}>
                                {classe}
                              </SelectItem>
                            ))}
                            <SelectScrollDownButton />
                          </SelectContent>
                        </Select>
                        {errors.classeActuelle && touched.classeActuelle && (
                          <div className="text-red-500 text-sm mt-1">
                            {errors.classeActuelle}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600">
                      J'ai déjà un compte?{' '}
                      <Link
                        to="/connexion"
                        className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-300"
                      >
                        connectez-vous ici
                      </Link>
                    </p>
                  </div>
                  {/* Submit Button */}
                  <div className="flex justify-center pt-6">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isLoading}
                    >
                      {isLoading ? 'chargement...' : "Soumettre l'Inscription"}
                    </Button>
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
