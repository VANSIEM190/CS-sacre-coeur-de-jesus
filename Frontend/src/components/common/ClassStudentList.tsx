import { cn } from '@/lib/cn'
import ListeParClasse from '@/utils/ListeParClasse'
import { Dispatch, SetStateAction } from 'react'

type proptypeClassStudentList = {
  setSelectedClasse: Dispatch<SetStateAction<string>>
  selectedClasse: string
}

const ClassStudentList = ({
  setSelectedClasse,
  selectedClasse,
}: proptypeClassStudentList) => {
  return (
    <>
      <div className="bg-white shadow grid grid-cols-1 rounded-lg overflow-y-auto mb-2 max-lg:hidden">
        <button onClick={() => setSelectedClasse('Tous')}>
          <p
            className={cn(
              'p-2 cursor-pointer hover:bg-indigo-600 border-t border-gray-200 hover:text-white transition-colors duration-200 text-left',
              selectedClasse === 'Tous'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'text-gray-700'
            )}
          >
            Tous les Classes
          </p>
        </button>
        {ListeParClasse.map(classe => (
          <button
            key={classe.classe}
            onClick={() => setSelectedClasse(classe.fillierCode)}
          >
            <p
              className={cn(
                'p-2 cursor-pointer hover:bg-indigo-600 border-t border-gray-200 hover:text-white transition-colors duration-200 text-left',
                selectedClasse === classe.fillierCode
                  ? 'bg-indigo-600 text-white font-semibold'
                  : 'text-gray-700'
              )}
            >
              {classe.classe}
            </p>
          </button>
        ))}
      </div>
    </>
  )
}

export default ClassStudentList
