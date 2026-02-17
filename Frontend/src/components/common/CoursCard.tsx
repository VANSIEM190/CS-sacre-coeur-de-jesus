import React from 'react'
import { FileTextIcon, DownloadIcon, CalendarIcon, Trash2 } from 'lucide-react'
import formatDate from '@/utils/FormatDate'
import { CardContainer, CardHeader, CardContent, InfoRow } from '../ui'
import { db } from '@/services/firebaseConfig'
import { deleteDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'

export const CourseCard = ({
  title,
  subject,
  teacher,
  date,
  fileSize,
  pdfUrl,
  coursId,
  setCoursData,
}) => {
  const formatFileSize = fileSize => {
    const MEGA_OCTET = fileSize * 1024 * 1024
    const KILO_OCTET = `${(fileSize / 1024).toFixed(2)} Ko`
    const MEGA_OCTET_PLUS = `${(fileSize / (1024 * 1024)).toFixed(2)} MO`

    if (!fileSize) return 'Taille inconnue'

    if (MEGA_OCTET) {
      // Moins de 1 Mo  afficher en Ko
      return KILO_OCTET
    } else {
      // 1 Mo ou plus  afficher en Mo
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

  const deleteCours = async id => {
    try {
      const coursDocRef = doc(db, 'course', id)
      await deleteDoc(coursDocRef)
      setCoursData(prevCours => prevCours.filter(cours => cours.id !== id))
      toast.success('cours supprimé avec succès !')
    } catch (error) {
      toast.error('Erreur lors de la suppression : ' + error.message)
    }
  }

  return (
    <></>
    // <CardContainer>
    //   <CardHeader>
    //     <div className="w-full flex items-center justify-between space-x-3">
    //       <div className="flex items-center gap-2">
    //         <div className="p-2 rounded-lg bg-gray-100">
    //           <FileTextIcon className="w-6 h-6" />
    //         </div>
    //         <div>
    //           <h3 className="font-semibold text-lg">{title}</h3>
    //           <p className="text-sm text-gray-600">{subject}</p>
    //         </div>
    //       </div>
    //       {isAdmin && (
    //         <button
    //           size="icon"
    //           className="ml-2 text-red-600 hover:text-red-700 hover:bg-red-50 "
    //           onClick={() => deleteCours(coursId)}
    //         >
    //           <Trash2 className="w-4 h-4" />
    //         </button>
    //       )}
    //     </div>
    //   </CardHeader>

    //   <CardContent className="space-y-2 mb-4">
    //     <InfoRow leading={'Enseignant:'}>{teacher}</InfoRow>

    //     <InfoRow
    //       leading={<CalendarIcon className="w-4 h-4 text-gray-500" />}
    //       trailing={formatFileSize(fileSize)}
    //     >
    //       {formatDate(date.toDate())}
    //     </InfoRow>
    //   </CardContent>

    //   <div className="flex space-x-2">
    //     <button
    //       className="flex-1 py-2 px-4 rounded-md text-white font-medium transition-colors bg-[#4361EE] cursor-pointer"
    //       onClick={handleDownload}
    //     >
    //       <DownloadIcon className="w-4 h-4 inline mr-2" />
    //       Télécharger
    //     </button>
    //   </div>
    // </CardContainer>
  )
}
