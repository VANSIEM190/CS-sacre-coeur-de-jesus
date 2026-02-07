import React from 'react'

const ClassFilter = ({ classes = [], selected, onSelect }) => {
  return (
    <div className="space-y-2">
      {classes.map(c => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={`w-full text-left px-3 py-2 rounded-md transition-colors border ${
            c === selected
              ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
              : 'bg-white border-gray-100 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  )
}

export default ClassFilter
