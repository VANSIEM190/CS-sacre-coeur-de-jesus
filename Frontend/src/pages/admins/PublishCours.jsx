import React, { useState } from 'react'
import { NavbarRetourHome, Footer } from '@/components/layout'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { UploadCloud, ChevronDown } from 'lucide-react'
import { supabase } from '@/supabase/supabaseConfig'
import { toast } from 'react-toastify'
import { db } from '@/services/firebaseConfig'
import { addDoc, serverTimestamp, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectIcon,
  SelectTrigger,
  SelectScrollDownButton,
  SelectItem,
  SelectScrollUpButton,
  SelectValue,
} from '@/components/ui'
import ListeParClasse from '@/utils/ListeParClasse'

const regex = /^[a-zA-ZÀ-ÿ '-]+$/
const schema = Yup.object({
  title: Yup.string()
    .required('Titre requis')
    .min(5, 'le titre doit avoir au moins 5 caractères')
    .max(50, 'le titre ne doit pas avoir plus de 50 caractères'),
  subject: Yup.string()
    .required('Matière requise')
    .min(4, 'la matière ne doit pas avoir moins de 4 caractères')
    .max(20, 'la matière ne doit pas dépasser 20 caractères'),
  teacher: Yup.string()
    .required("Nom de l'enseignant requis")
    .min(4, 'le nom doit comporter au moins 4 caractères')
    .max(15, 'le nom ne doit pas dépasser 15 caractères')
    .matches(
      regex,
      "Le nom ne doit contenir que des lettres, espaces, apostrophes ou traits d'union"
    ),
  file: Yup.mixed()
    .required('Fichier requis')
    .test('fileType', 'Seuls les fichiers PDF sont autorisés', value => {
      if (!value) return false
      return value && value.type === 'application/pdf'
    })
    .test('filesize', 'Le fichier est trop volumineux (max 5MB)', value => {
      if (!value) return false
      return value && value.size <= 5 * 1024 * 1024 // 5MB
    }),
})

const initialValues = {
  title: '',
  subject: '',
  teacher: '',
  date: '',
  file: null,
}

const PublishCours = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleFileUpload = event => {
    const file = event.target.files[0]
    const allowedExtensions = /pdf$/i

    if (!file) return false

    if (!allowedExtensions.test(file.name)) return false

    if (file.type !== 'application/pdf') return false

    return true
  }

  const uploadfileCours = async fileCours => {
    if (!fileCours) return null

    const fileExt = fileCours.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `course-files/${fileName}`

    const { data, error } = await supabase.storage
      .from('cours-files')
      .upload(filePath, fileCours)

    if (error) {
      toast.error('Erreur upload photo : ' + error.message)
      return null
    }

    const { data: url } = await supabase.storage
      .from('cours-files')
      .getPublicUrl(filePath)

    return url.publicUrl
  }

  const saveCourse = async (values, fileUrl) => {
    try {
      const courseDBRef = collection(db, 'course')

      await addDoc(courseDBRef, {
        title: values.title,
        subject: values.subject,
        teacher: values.teacher,
        fileSize: values.file.size,
        fileName: values.file.name,
        file_path: fileUrl,
        date: serverTimestamp(),
      })

      toast.success('Cours publié avec succès !')
    } catch (err) {
      toast.error('Erreur Firestore : ' + err.message)
    }
  }

  const PublierCours = async values => {
    setIsLoading(true)
    try {
      const fileUrl = await uploadfileCours(values.file)

      if (!fileUrl) {
        setIsLoading(false)
        return
      }

      await saveCourse(values, fileUrl)

      navigate('/mes-cours')
    } catch (err) {
      toast.error(
        'une erreur est survenue lors du publication du cours',
        err.message
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <NavbarRetourHome />
      <div className="min-h-[80%] mt-20 bg-gray-50 py-8 flex justify-center items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
            <h1 className="text-3xl font-bold bg-linear-to-b from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Publier un cours
            </h1>
            <p className="text-sm text-gray-500 mb-6">
              Ajoutez un support de cours (PDF) et décrivez-le brièvement.
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={schema}
              onSubmit={PublierCours}
            >
              {({
                values,
                handleChange,
                setFieldValue,
                handleSubmit,
                handleBlur,
                errors,
                touched,
              }) => (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Titre</Label>
                    <Input
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-1 w-full px-4 py-3 border rounded-lg"
                      required
                      placeholder="Titre du cours"
                    />
                    {errors.title && touched.title && (
                      <div className="text-red-500 text-sm">{errors.title}</div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="subject">Matière</Label>
                      <Input
                        type="text"
                        name="subject"
                        value={values.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mt-1 w-full px-4 py-3 border rounded-lg"
                        required
                        placeholder="Mathématiques"
                      />
                      {errors.subject && touched.subject && (
                        <div className="text-red-500 text-sm">
                          {errors.subject}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="teacher">Enseignant</Label>
                      <Input
                        type="text"
                        name="teacher"
                        value={values.teacher}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="mt-1 w-full px-4 py-3 border rounded-lg"
                        required
                        placeholder="Prénom Nom"
                      />
                      {errors.teacher && touched.teacher && (
                        <div className="text-red-500 text-sm">
                          {errors.teacher}
                        </div>
                      )}
                    </div>
                    <div translate="no">
                      <Label htmlFor="classe">Classe</Label>
                      <Select
                        name="classe"
                        value={values.classe}
                        onValueChange={value => setFieldValue('classe', value)}
                        onBlur={handleBlur}
                      >
                        <SelectTrigger className="w-full px-2 py-2 flex justify-between border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500">
                          <SelectValue placeholder="Sélectionnez une classe" />
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
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Fichier (PDF)
                    </label>
                    <div className="mt-1 flex items-center gap-4">
                      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-md">
                        <UploadCloud size={16} />
                        <span>Choisir un fichier</span>
                        <input
                          type="file"
                          accept=".pdf , application/pdf"
                          className="hidden"
                          onChange={e =>
                            handleFileUpload(e) &&
                            setFieldValue('file', e.currentTarget.files[0])
                          }
                          onBlur={handleBlur}
                        />
                      </label>
                      <div className="text-sm text-gray-600">
                        {values.file
                          ? values.file.name
                          : 'Aucun fichier sélectionné'}
                      </div>
                    </div>
                    {errors.file && touched.file && (
                      <div className="text-red-500 text-sm">{errors.file}</div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className={'px-6 py-2  text-white rounded-lg'}
                    >
                      {isLoading ? 'publication...' : 'Publier'}
                    </Button>

                    <div className="text-sm text-gray-500">
                      Aperçu rapide du cours
                    </div>
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

export default PublishCours
