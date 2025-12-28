import React from 'react'
import { FileTextIcon, DownloadIcon, CalendarIcon } from 'lucide-react'
import formatDate from '@/utils/FormatDate'
import { CardContainer, CardHeader, CardContent, InfoRow } from '../ui'

export const CourseCard = ({
  title,
  subject,
  teacher,
  date,
  fileSize,
  pdfUrl,
}) => {
  const formatFileSize = fileSize => {
    const MEGA_OCTET = fileSize * 1024 * 1024
    const KILO_OCTET = `${(fileSize / 1024).toFixed(2)} Ko`
    const MEGA_OCTET_PLUS = `${(fileSize / (1024 * 1024)).toFixed(2)} MO`

    if (!fileSize) return 'Taille inconnue'

    if (MEGA_OCTET) {
      // Moins de 1 Mo → afficher en Ko
      return KILO_OCTET
    } else {
      // 1 Mo ou plus → afficher en Mo
      return MEGA_OCTET_PLUS
    }
  }

  // Télécharger le fichier
  const handleDownload = () => {
    if (!pdfUrl) return

    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = `${title}.pdf`
    link.click()
  }

  return (
    <CardContainer>
      <CardHeader>
        <div className="flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-gray-100">
            <FileTextIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-gray-600">{subject}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 mb-4">
        <InfoRow leading={'Enseignant:'}>{teacher}</InfoRow>

        <InfoRow
          leading={<CalendarIcon className="w-4 h-4 text-gray-500" />}
          trailing={formatFileSize(fileSize)}
        >
          {formatDate(date.toDate())}
        </InfoRow>
      </CardContent>

      <div className="flex space-x-2">
        <button
          className="flex-1 py-2 px-4 rounded-md text-white font-medium transition-colors bg-[#4361EE] cursor-pointer"
          onClick={handleDownload}
        >
          <DownloadIcon className="w-4 h-4 inline mr-2" />
          Télécharger
        </button>
      </div>
    </CardContainer>
  )
}
