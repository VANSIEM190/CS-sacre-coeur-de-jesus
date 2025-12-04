import React, { useEffect, useState } from 'react'
import { ScheduleCard } from './ScheduleCard'
import { CalendarIcon, ClockIcon } from 'lucide-react'
import { useStudent } from '@/contexts/StudentContext'
import { toast } from 'react-toastify'
const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']

export function ScheduleDisplay() {
  const [selectedDay, setSelectedDay] = useState('Lundi')
  const [horraires, setHorraires] = useState([])
  const { studentData, loading } = useStudent()

  useEffect(() => {
    const fetchScheduleForOption = async () => {
      if (!loading && studentData) {
        try {
          const response = await fetch(`/horraires/${studentData}.json`)
          const data = await response.json()
          setHorraires(data)
          console.log('Horaires fetchés selon option:', data)
        } catch (error) {
          toast.error('Erreur fetch des horaires:', error.message)
        }
      }
    }
    fetchScheduleForOption()
  }, [loading, studentData])

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">Horaire des cours</h2>
        <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm">
          <CalendarIcon className="text-[#4361EE] w-5 h-5" />
          <span className="text-sm font-medium">
            Année Scolaire {new Date().getFullYear()} -{' '}
            {new Date().getFullYear() + 1}
          </span>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-1 mb-6">
        <div className="flex overflow-x-auto">
          {daysOfWeek.map(day => (
            <button
              key={day}
              className={`flex-1 py-3 px-4 text-center rounded-lg transition-colors ${
                selectedDay === day
                  ? 'bg-[#4361EE] text-white font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <ClockIcon className="text-[#4361EE] w-5 h-5 mr-2" />
          <h3 className="font-medium">{selectedDay}</h3>
        </div>
        {horraires.map(horr => {
          return horr[selectedDay]?.map((session, idx) => (
            <ScheduleCard
              key={idx}
              startTime={session.heure.split(' - ')[0]}
              endTime={session.heure.split(' - ')[1]}
              subject={session.matiere}
              teacher={session.prof}
              classroom={session.salle}
              color="#4361EE"
            />
          ))
        })}
      </div>
    </div>
  )
}
