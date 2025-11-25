import React, { useState } from 'react'
import { ScheduleCard } from './ScheduleCard'
import { CalendarIcon, ClockIcon } from 'lucide-react'
const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi']
const scheduleData = {
  Lundi: [
    {
      startTime: '08:00',
      endTime: '09:30',
      subject: 'Mathématiques',
      teacher: 'Prof. Martin',
      classroom: 'A101',
      color: '#4361EE',
    },
    {
      startTime: '10:00',
      endTime: '11:30',
      subject: 'Histoire-Géographie',
      teacher: 'Prof. Dubois',
      classroom: 'B205',
      color: '#E74694',
    },
    {
      startTime: '13:00',
      endTime: '14:30',
      subject: 'Sciences Physiques',
      teacher: 'Prof. Leroy',
      classroom: 'C110',
      color: '#10B981',
    },
  ],
  Mardi: [
    {
      startTime: '08:00',
      endTime: '09:30',
      subject: 'Français',
      teacher: 'Prof. Bernard',
      classroom: 'A203',
      color: '#E74694',
    },
    {
      startTime: '10:00',
      endTime: '11:30',
      subject: 'Anglais',
      teacher: 'Prof. Wilson',
      classroom: 'B104',
      color: '#10B981',
    },
    {
      startTime: '13:00',
      endTime: '14:30',
      subject: 'Éducation Physique',
      teacher: 'Prof. Lambert',
      classroom: 'Gymnase',
      color: '#4361EE',
    },
  ],
  Mercredi: [
    {
      startTime: '08:00',
      endTime: '09:30',
      subject: 'Arts Plastiques',
      teacher: 'Prof. Moreau',
      classroom: 'D101',
      color: '#10B981',
    },
    {
      startTime: '10:00',
      endTime: '11:30',
      subject: 'Musique',
      teacher: 'Prof. Petit',
      classroom: 'Salle de Musique',
      color: '#4361EE',
    },
  ],
  Jeudi: [
    {
      startTime: '08:00',
      endTime: '09:30',
      subject: 'Mathématiques',
      teacher: 'Prof. Martin',
      classroom: 'A101',
      color: '#4361EE',
    },
    {
      startTime: '10:00',
      endTime: '11:30',
      subject: 'SVT',
      teacher: 'Prof. Roux',
      classroom: 'C210',
      color: '#10B981',
    },
    {
      startTime: '13:00',
      endTime: '14:30',
      subject: 'Technologie',
      teacher: 'Prof. Garcia',
      classroom: 'Atelier',
      color: '#E74694',
    },
  ],
  Vendredi: [
    {
      startTime: '08:00',
      endTime: '09:30',
      subject: 'Français',
      teacher: 'Prof. Bernard',
      classroom: 'A203',
      color: '#E74694',
    },
    {
      startTime: '10:00',
      endTime: '11:30',
      subject: 'Histoire-Géographie',
      teacher: 'Prof. Dubois',
      classroom: 'B205',
      color: '#4361EE',
    },
    {
      startTime: '13:00',
      endTime: '14:30',
      subject: 'Anglais',
      teacher: 'Prof. Wilson',
      classroom: 'B104',
      color: '#10B981',
    },
  ],
}
export function ScheduleDisplay() {
  const [selectedDay, setSelectedDay] = useState('Lundi')
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
        {scheduleData[selectedDay].map((schedule, index) => (
          <ScheduleCard
            key={index}
            startTime={schedule.startTime}
            endTime={schedule.endTime}
            subject={schedule.subject}
            teacher={schedule.teacher}
            classroom={schedule.classroom}
            color={schedule.color}
          />
        ))}
      </div>
    </div>
  )
}
