import React, { Dispatch, SetStateAction } from 'react'
import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { propTypeFilteredPersonnel } from '@/@types/PropsTypeFilteredPersonnel'
import {
  CardContainer,
  CardHeader,
  CardContent,
  CardFooter,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '../ui'

type propsTypePersonnelCard = {
  filteredPersonnel: propTypeFilteredPersonnel[]
  setSelected: Dispatch<SetStateAction<propTypeFilteredPersonnel | null>>
}

const PersonnelManagementCard = React.memo(
  ({ filteredPersonnel, setSelected }: propsTypePersonnelCard) => {
    const MotionCardContainer = motion.create(CardContainer)

    return (
      <section className="md:col-span-2 ">
        <div className="max-md:flex max-md:flex-col max-md:justify-center max-md:items-center w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4  gap-y-4 ">
          {filteredPersonnel.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-2xl shadow">
              <p className="text-slate-500">
                Aucun personnel correspondant. Essayez une autre recherche.
              </p>
            </div>
          )}

          {filteredPersonnel?.map((member, id) => (
            <MotionCardContainer
              key={id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white border-none max-md:w-68 rounded-3xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer  mx-2"
            >
              {/* Header : photo + nom + rôle */}
              <CardContent>
                <CardHeader className="gap-3">
                  <Avatar>
                    <AvatarImage
                      src={member.img || '/imgAcc.png'}
                      alt={`Photo de ${member.name}`}
                    />
                    <AvatarFallback
                      className={
                        'w-20 h-20 rounded-full p-3 border-2 bg-gray-200 border-slate-200'
                      }
                    >
                      SC
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {member.name}
                    </h3>
                    <div className="text-sm text-slate-500 mt-1">
                      Rôle : {member.role}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Département : {member.department}
                    </div>
                  </div>
                </CardHeader>

                {/* Bio */}

                <p className="mt-4 text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {member.bio}
                </p>

                {/* Email */}
                <CardFooter className="flex items-center gap-3">
                  <div className="flex it  gap-2 text-sm text-slate-500 ">
                    <Phone size={16} />
                    <span>+243 823456900</span>
                  </div>

                  {/* Voir la fiche */}
                  <div className="text-xs text-slate-400 font-medium hover:text-blue-500 transition-colors">
                    <button
                      onClick={() => setSelected(member)}
                      type="button"
                      className="cursor-pointer"
                    >
                      voir plus
                    </button>
                  </div>
                </CardFooter>
              </CardContent>
            </MotionCardContainer>
          ))}
        </div>
      </section>
    )
  }
)

export default PersonnelManagementCard
