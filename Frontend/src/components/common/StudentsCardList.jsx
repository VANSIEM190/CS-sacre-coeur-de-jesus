import React from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '@/services/firebaseConfig'
import { deleteDoc, doc } from 'firebase/firestore'
import {
  AvatarImage,
  AvatarFallback,
  Avatar,
  Button,
  CardContainer,
  CardContent,
  CardFooter,
  CardHeader,
} from '../ui'

const StudentsList = React.memo(({ students = [] }) => {
  console.log('StudentsList rendered')
  const navigate = useNavigate()
  console.log(students)
  if (!students.length) {
    return <p className="text-gray-500">Aucun élève trouvé.</p>
  }

  const deleteStudent = async studentId => {
    const studentsDBRef = doc(db, 'students', studentId)
    await deleteDoc(studentsDBRef)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {students.map((student, id) => (
        <CardContainer
          key={id}
          className="border-t-3 flex gap-3 justify-center"
        >
          <CardHeader>
            <Avatar>
              <AvatarImage
                src={student.photo_path || '/imgAcc.png'}
                alt="photoProfil"
                className="size-15 rounded-full border-2 border-slate-200"
              />
              <AvatarFallback>
                <p className="w-12 h-12 rounded-full border-2 bg-gray-200 border-slate-200 flex items-center justify-center">
                  SC
                </p>
              </AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex justify-between">
              <h4 className="font-medium text-gray-800">{student.nom}</h4>
              <span className="text-xs text-gray-500">
                {student.optioneleve}
              </span>
            </div>
            <p className="text-sm text-gray-500"> {student.email}</p>
            <CardFooter className="mt-3 justify-start gap-2">
              <Button
                type="button"
                variant="primary"
                className="px-3 py-1 text-sm rounded-md"
                onClick={() => navigate(`/eleves/${student.user_id}`)}
              >
                Voir
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="px-3 py-1 text-sm rounded-md "
                onClick={() => deleteStudent(student.id)}
              >
                Supprimer
              </Button>
            </CardFooter>
          </CardContent>
        </CardContainer>
      ))}
    </div>
  )
})

export default StudentsList
