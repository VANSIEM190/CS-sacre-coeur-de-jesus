import React from 'react'

const Avatar = ({ name }) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
      {initials}
    </div>
  )
}

const StudentsList = ({ students = [] }) => {
  if (!students.length) {
    return <p className="text-gray-500">Aucun élève trouvé.</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {students.map(s => (
        <div
          key={s.id}
          className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm flex items-center space-x-4"
        >
          <Avatar name={s.name} />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-800">{s.name}</h4>
              <span className="text-xs text-gray-500">{s.classe}</span>
            </div>
            <p className="text-sm text-gray-500">Âge: {s.age}</p>
            <div className="mt-3 flex items-center space-x-2">
              <button className="px-3 py-1 text-sm rounded-md bg-linear-to-r from-blue-600 to-indigo-600 text-white">
                Modifier
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
