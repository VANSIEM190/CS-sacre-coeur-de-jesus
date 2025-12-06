import React from 'react'
import { FileTextIcon, DownloadIcon, CalendarIcon } from 'lucide-react'

export const CourseCard = ({
  title,
  subject,
  teacher,
  date,
  fileSize,
  pdfUrl,
}) => {
  const formatFileSize = fileSize => {
    if (!fileSize) return 'Taille inconnue'

    if (fileSize < 1024 * 1024) {
      // Moins de 1 Mo → afficher en Ko
      return (fileSize / 1024).toFixed(2) + ' Ko'
    } else {
      // 1 Mo ou plus → afficher en Mo
      return (fileSize / (1024 * 1024)).toFixed(2) + ' Mo'
    }
  }

  // Télécharger le fichier
  const handleDownload = () => {
    if (!pdfUrl) return

    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `${title}.pdf` // nom du fichier lors du téléchargement
    link.click()
  }

  // Aperçu du PDF

  return (
    <div className="card hover:shadow-lg transition-all duration-300 border-t-4 border-[#4361EE] p-4 rounded-lg bg-white">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-gray-100">
            <FileTextIcon className="w-6 h-6" />
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
          <span>{new Date().toLocaleDateString(date)}</span>
          <span className="mx-2">•</span>
          <span>{formatFileSize(fileSize)}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          className="flex-1 py-2 px-4 rounded-md text-white font-medium transition-colors bg-[#4361EE] cursor-pointer"
          onClick={handleDownload}
        >
          <DownloadIcon className="w-4 h-4 inline mr-2" />
          Télécharger
        </button>
      </div>
    </div>
  )
}
