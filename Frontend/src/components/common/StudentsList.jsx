import React from 'react'
import { useNavigate } from 'react-router-dom'

const StudentsList = ({ students = [] }) => {
  const navigate = useNavigate()
  if (!students.length) {
    return <p className="text-gray-500">Aucun élève trouvé.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {students.map((student, id) => (
        <div
          key={id}
          className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm flex items-center space-x-4"
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
            <img
              src={student.photo_path}
              alt="photoProfil"
              className="size-12 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-800">{student.nom}</h4>
              <span className="text-xs text-gray-500">{student.classe}</span>
            </div>
            <p className="text-sm text-gray-500"> {student.email}</p>
            <div className="mt-3 flex items-center space-x-2">
              <button
                className="px-3 py-1 text-sm rounded-md bg-linear-to-r from-blue-600 to-indigo-600 text-white cursor-pointer"
                onClick={() => navigate(`/eleves/${student.user_id}`)}
              >
                Voir
              </button>
              <button className="px-3 py-1 text-sm rounded-md border border-red-200 text-red-600 bg-red-50">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StudentsList
