import React, { useState } from 'react'
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react'
import emailjs from 'emailjs-com'
import { Formik } from 'formik'
import { contactSchema as schemaValidation } from '@/validators/ContactSchema'
import { toast } from 'react-toastify'
import {
  Button,
  Input,
  Textarea,
  Label,
  CardContainer,
  CardHeader,
  CardContent,
} from '../ui'

const initialeValues = {
  name: '',
  subject: '',
  email: '',
  message: '',
}

const SectionContact = () => {
  const [isMailLoading, setIsMailLoading] = useState(false)

  ;(function () {
    emailjs.init(import.meta.env.VITE_EMAILJS_INIT)
  })()

  const sendEmail = template => {
    setIsMailLoading(true)

    try {
      const response = emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE,
        template
      )

      if (!response) return toast.error("une erreur s'est produit")

      toast.success('Email envoyé avec succes!')
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
            <CardContainer className="bg-white border-none rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <CardContent>
                <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PhoneIcon size={24} className="text-white" />
                </div>
                <CardHeader className="text-lg font-semibold text-gray-900 mb-2">
                  <h3>Téléphone</h3>
                </CardHeader>
                <p className="text-gray-600">+243 XXX XXX XXX</p>
              </CardContent>
            </CardContainer>
            <CardContainer className="bg-white border-none rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <CardContent>
                <div className="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MailIcon size={24} className="text-white" />
                </div>
                <CardHeader className="text-lg font-semibold text-gray-900 mb-2">
                  <h3>Email</h3>
                </CardHeader>
                <p className="text-gray-600">cssacrecoeurdejesus@gmail.com</p>
              </CardContent>
            </CardContainer>
            <CardContainer className="bg-white border-none rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <CardContent>
                <div className="w-16 h-16 bg-linear-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPinIcon size={24} className="text-white" />
                </div>
                <CardHeader className="text-lg font-semibold text-gray-900 mb-2">
                  <h3>Adresse</h3>
                </CardHeader>
                <p className="text-gray-600">
                  Av INDONDO/KIKWIT N°36/40
                  <br />
                  Q/ MPASSA2 C/ N'SELE
                  <br />
                  KINSHASA , RDC
                </p>
              </CardContent>
            </CardContainer>
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
                      <Label htmlFor="name">Nom Complet</Label>
                      <Input
                        type="text"
                        name="name"
                        className="w-full px-4 py-3"
                        placeholder="Votre nom"
                        required
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
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        className="px-4 py-3"
                        placeholder="votre@email.com"
                        required
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
                    <Label htmlFor="subject">Sujet</Label>
                    <Input
                      type="text"
                      name="subject"
                      className="w px-4 py-3"
                      placeholder="Sujet de votre message"
                      required
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
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      name="message"
                      placeholder="Votre message..."
                      required
                      onChange={handleChange}
                      value={values.message}
                      onBlur={handleBlur}
                    />
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
