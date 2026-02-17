import React from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '@/services/firebaseConfig'
import { deleteDoc, doc } from 'firebase/firestore'
import { propsTypeDataUser } from '@/@types/PropsTypeDataUser'
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

type StudentsListProps = {
  students: propsTypeDataUser[]
}

const StudentsList = React.memo(({ students = [] }: StudentsListProps) => {
  console.log('StudentsList rendered')
  const navigate = useNavigate()
  console.log(students)
  if (!students.length) {
    return <p className="text-gray-500">Aucun élève trouvé.</p>
  }

  const deleteStudent = async (studentId: string) => {
    const studentsDBRef = doc(db, 'students', studentId)
    await deleteDoc(studentsDBRef)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {students.map((student, id) => (
        <CardContainer key={id} className=" border-none">
          <CardContent className="flex-1">
            <CardHeader className="flex gap-2">
              <Avatar>
                <AvatarImage
                  src={
                    student.photo_path
                      ? `http://localhost:3000/assets/${student.photo_path}`
                      : '/imgAcc.png'
                  }
                  alt="profil_élève"
                  className="size-10 rounded-full border-2 border-slate-200"
                />
                <AvatarFallback>
                  <p className="w-10 h-10 rounded-full border-2 bg-gray-200 border-slate-200 flex items-center justify-center">
                    SC
                  </p>
                </AvatarFallback>
              </Avatar>

              <div className="flex justify-between w-[80%]">
                <div className="font-medium text-gray-800 truncate">
                  {student.nom}
                  <p className="text-sm text-gray-500 truncate ">
                    {' '}
                    {student.email}
                  </p>
                  <span className="text-xs text-gray-500 xl:hidden truncate">
                    {student.optionEleve}
                  </span>
                </div>
                <span className="text-xs text-gray-500 max-xl:hidden truncate">
                  {student.optionEleve}
                </span>
              </div>
            </CardHeader>
            <CardFooter className="mt-3 justify-start gap-2">
              <Button
                type="button"
                variant="primary"
                className="px-3 py-1 text-sm rounded-md hover:scale-100"
                onClick={() => navigate(`/eleves/${student.id}`)}
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
