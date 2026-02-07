import React from 'react'
import { Calendar, BookOpen, Plane, Scale, GraduationCap } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button } from '../ui'

const TABS = [
  { id: 'programme', label: 'Programme national', icon: BookOpen },
  { id: 'feries', label: 'Jours fériés & activités', icon: Calendar },
  { id: 'vacances', label: 'Billet de vacances', icon: Plane },
  { id: 'conditions', label: 'Conditions & niveaux', icon: GraduationCap },
  { id: 'reglement', label: 'Règlement intérieur', icon: Scale },
]

const ProgramBar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {TABS.map(tab => {
        const Icon = tab.icon
        return (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            variant="primary"
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm bg-linear-to-r from-blue-400 via-indigo-500 to-purple-500',

              activeTab === tab.id
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-indigo-50'
            )}
          >
            <Icon size={18} />
            {tab.label}
          </Button>
        )
      })}
    </div>
  )
}

export default ProgramBar
