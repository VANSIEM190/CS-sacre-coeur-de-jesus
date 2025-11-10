import React, { useState } from 'react'
import FormulaireInscription from './FormulaireInscription'
import UploadProfile from './UploadProfile'
import {Navbar , Footer} from '../layout'

const ParentForm = () => {
  const [step , setStep] = useState(1)
  const [formData , setFormData] = useState({
    nom : '',
    prenom : '',
    email : '',
    niveau : '',
    filiere : '',
    anneeAcademique : '',
    idSecret : '',
    passwordUser : '',
    image : null
  })

  const handleStepOneComplet = (values)=>{
    setFormData(values)
    setStep(2)
  }

  const handleImageSelect = (imgFile)=>{
    setFormData({...formData , image : imgFile})
  }

  const handleFinalSubmit = async ()=>{
    console.log(formData)
  }
  return (
    <>
    <Navbar/>
      {step ===1 && 
      <FormulaireInscription 
      onNext={handleStepOneComplet}
      initialValues={formData}
      />}
      {step ===2 && 
      <UploadProfile 
      onBack={()=> setStep(1)} 
      onRegister={handleFinalSubmit}
      initialValues={formData.image}
      onImageSelect={handleImageSelect}
      />}
      <Footer/>
    </>
  )
}

export default ParentForm