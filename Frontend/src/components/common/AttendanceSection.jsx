import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '@/services/firebaseConfig'
import { getDocs, collection } from 'firebase/firestore'

const AttendanceSection = () => {
  const [students, setStudents] = useState([])

  const { classeId } = useParams()

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const studentsDBRef = collection(db, 'students')
        const querySnapshot = await getDocs(studentsDBRef)
        const studentListClass = querySnapshot.docs.map(studentList => ({
          id: studentList.id,
          ...studentList.data(),
        }))
        console.log(studentListClass)
        setStudents(studentListClass)
      } catch (err) {
        console.log('erreur', err)
      }
    }
    fetchStudent()
  }, [])

  const updateStatus = (id, status) => {
    setStudents(prev => prev.map(s => (s.id === id ? { ...s, status } : s)))
  }

  const filterByClassName = () =>
    students.filter(classe => classe.optioneleve === classeId)
  console.log(filterByClassName())

  return (
    <div className="backdrop-blur-xl bg-white/80 shadow-2xl border border-white/40 rounded-3xl p-8 transition hover:shadow-3xl">
      <h2 className="text-3xl font-bold mb-8 bg-linear-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">
        Feuille de présence – Enseignant
      </h2>

      <div className="space-y-4">
        {students.map(s => (
          <div
            key={s.user_id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl bg-white/80 shadow-sm hover:shadow-md transition-all"
          >
            <p className="text-lg font-semibold text-gray-800">{s.nom}</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateStatus(s.id, 'present')}
                className={`px-4 py-2 rounded-xl border transition font-medium ${
                  s?.status === 'present'
                    ? 'bg-green-600 text-white shadow'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                Présent
              </button>
              <button
                onClick={() => updateStatus(s.id, 'absent')}
                className={`px-4 py-2 rounded-xl border transition font-medium ${
                  s.status === 'absent'
                    ? 'bg-red-600 text-white shadow'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                Absent
              </button>
              <button
                onClick={() => updateStatus(s.id, 'late')}
                className={`px-4 py-2 rounded-xl border transition font-medium ${
                  s.status === 'late'
                    ? 'bg-yellow-500 text-white shadow'
                    : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                }`}
              >
                Retard
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-8 w-full py-3 rounded-2xl bg-blue-600 text-white text-lg shadow hover:bg-blue-700 transition">
        Enregistrer la feuille de présence
      </button>
    </div>
  )
}

export default AttendanceSection
