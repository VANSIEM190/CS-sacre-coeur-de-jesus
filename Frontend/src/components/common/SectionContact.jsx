import React, { useState } from 'react'
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react'
import emailjs from 'emailjs-com'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import Button from '../ui/Button'

const regex = /^[a-zA-Z1-9À-ÿ ']+$/
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const schemaValidation = Yup.object({
  name: Yup.string()
    .required('le nom est requis')
    .min(4, 'le nom doit comporter au moins 4 caractères')
    .max(20, 'le nom ne doit pas depasser 20 caractères')
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
  message: Yup.string().required('le message est requis'),
})

const initialeValues = {
  name: '',
  subject: '',
  email: '',
  message: '',
}

const SectionContact = () => {
  const [isMailLoading, setIsMailLoading] = useState(false)

  ;(function () {
    emailjs.init('_QdYp5ttx0im4yV0m')
  })()

  const sendEmail = template => {
    try {
      const response = emailjs.send(
        'service_ej5xuoc',
        'template_voj1mqn',
        template
      )

      if (!response) return toast.error("une erreur s' est produit")

      toast.success('Email envoyé avec succes!')
      setIsMailLoading(false)
    } catch (error) {
      toast.error('Failed to send email.', error)
    } finally {
      setIsMailLoading(false)
    }
  }
  return (
    <section
      id="contact"
      className="py-20 bg-linear-to-br from-blue-50 to-indigo-50"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Contactez-Nous
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-indigo-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Nous sommes là pour répondre à vos questions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneIcon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Téléphone
              </h3>
              <p className="text-gray-600">+243 XXX XXX XXX</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MailIcon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Email
              </h3>
              <p className="text-gray-600">cssacrecoeurdejesus@gmail.com</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-linear-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPinIcon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Adresse
              </h3>
              <p className="text-gray-600">Kinshasa, RDC</p>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <Formik
              initialValues={initialeValues}
              validationSchema={schemaValidation}
              onSubmit={(values, { resetForm }) => {
                const template = {
                  name: values.name,
                  email: values.email,
                  subject: values.subject,
                  message: values.message,
                }
                sendEmail(template)
                resetForm()
              }}
            >
              {({
                values,
                handleChange,
                errors,
                touched,
                handleBlur,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom Complet
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="Votre nom"
                        onChange={handleChange}
                        value={values.name}
                        onBlur={handleBlur}
                      />
                      {errors.name && touched.name && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        placeholder="votre@email.com"
                        onChange={handleChange}
                        value={values.email}
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet
                    </label>
                    <input
                      type="text"
                      name="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      placeholder="Sujet de votre message"
                      onChange={handleChange}
                      value={values.subject}
                      onBlur={handleBlur}
                    />
                    {errors.subject && touched.subject && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.subject}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      name="message"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      placeholder="Votre message..."
                      onChange={handleChange}
                      value={values.message}
                      onBlur={handleBlur}
                    ></textarea>
                    {errors.message && touched.message && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <Button type={'subtmit'} disabled={isMailLoading}>
                      {isMailLoading
                        ? "encours d'envoie ..."
                        : 'Envoyer le Message'}
                    </Button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SectionContact
