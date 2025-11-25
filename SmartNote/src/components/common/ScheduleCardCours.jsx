import React from 'react'
import { FileTextIcon, DownloadIcon, CalendarIcon } from 'lucide-react'

export function CourseCard({
  title,
  subject,
  teacher,
  date,
  fileSize,
  color,
  pdfUrl,
}) {
  const handleDownload = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank')
    }
  }
  return (
    <div
      className="card hover:shadow-lg transition-all duration-300 border-t-4"
      style={{
        borderTopColor: color,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div
            className="p-2 rounded-lg"
            style={{
              backgroundColor: `${color}15`,
            }}
          >
            <FileTextIcon
              className="w-6 h-6"
              style={{
                color,
              }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-gray-600">{subject}</p>
          </div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium mr-2">Enseignant:</span>
          <span>{teacher}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <CalendarIcon className="w-4 h-4 mr-2" />
          <span>{date}</span>
          <span className="mx-2">•</span>
          <span>{fileSize}</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          className="flex-1 py-2 px-4 rounded-md text-white font-medium transition-colors"
          style={{
            backgroundColor: color,
          }}
          onClick={handleDownload}
        >
          <DownloadIcon className="w-4 h-4 inline mr-2" />
          Télécharger
        </button>
        <button className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
          Aperçu
        </button>
      </div>
    </div>
  )
}
