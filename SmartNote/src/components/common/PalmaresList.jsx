import React from 'react'

const PalmaresList = ({ results = [] }) => {
  if (!results.length)
    return <p className="text-gray-500">Aucun résultat publié.</p>

  return (
    <div className="space-y-4">
      {results.map(r => (
        <div
          key={r.id}
          className="p-4 rounded-lg border border-gray-100 bg-white shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-gray-800">
                {r.student}{' '}
                <span className="text-sm text-gray-500">• {r.classe}</span>
              </h4>
              <p className="text-sm text-gray-500">
                Moyenne:{' '}
                <span className="font-semibold text-indigo-600">
                  {r.average}
                </span>
              </p>
            </div>
            <div className="text-right">
              <button className="px-3 py-1 text-sm rounded-md bg-linear-to-r from-blue-600 to-indigo-600 text-white">
                Voir
              </button>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {r.subjects.map((s, i) => (
              <div
                key={i}
                className="p-2 rounded-md bg-gray-50 border border-gray-100 text-sm"
              >
                <div className="font-medium text-gray-700">{s.name}</div>
                <div className="text-sm text-gray-500">{s.grade}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default PalmaresList
