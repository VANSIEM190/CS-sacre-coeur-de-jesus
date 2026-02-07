import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Footer, Navbar } from '@/components/layout'
import {
  AttendanceSection,
  ClassList,
  ResumeParClasse,
} from '@/components/common'

export default function DashboardClasses() {
  const [isAttendanceSection, setIsAttendanceSection] = useState(false)
  const navigate = useNavigate()

  const handleAttendanceSection = useCallback(
    promotion => {
      setIsAttendanceSection(prev => !prev)
      navigate(`/eleves/Presences/${promotion.fillierCode}`)
    },
    [navigate]
  )
  return (
    <>
      <Navbar />
      <div className="p-10 bg-linear-to-br from-gray-100 to-gray-200 mt-20 space-y-10">
        {/* ------------------- CARD CLASSES ------------------- */}
        <ResumeParClasse />
        {/* ------------------- SECTION Liste Classes ------------------- */}
        <ClassList onClick={handleAttendanceSection} />
        {/* ------------------- SECTION FEUILLE DE PRÉSENCE ------------------- */}
        {isAttendanceSection && <AttendanceSection />}
      </div>
      <Footer />
    </>
  )
}
