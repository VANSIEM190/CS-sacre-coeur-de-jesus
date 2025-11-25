import { useEffect, useState } from 'react'
import { AnnonceCard as AnnouncementCard } from '@/components/common'
import { Filter } from 'lucide-react'

export default function AnnouncementsView() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')

  const categories = [
    { value: 'all', label: 'Toutes les catégories', icon: '📋' },
    { value: 'general', label: 'Général', icon: '📢' },
    { value: 'academic', label: 'Académique', icon: '📚' },
    { value: 'events', label: 'Événements', icon: '🎉' },
    { value: 'urgent', label: 'Urgent', icon: '⚠️' },
    { value: 'sports', label: 'Sports', icon: '⚽' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-md">
        <Filter className="w-5 h-5 text-blue-600" />
        <span className="font-medium text-gray-700">
          Filtrer par catégorie:
        </span>
        <select
          value={category}
          onChange={value => setCategory(value)}
          className="flex items-center gap-2"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.icon}
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-md animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      ) : announcements.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-md">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Aucune annonce disponible
          </h3>
          <p className="text-muted-foreground">
            Il n'y a pas d'annonces dans cette catégorie pour le moment.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {announcements.map(announcement => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
            />
          ))}
        </div>
      )}
    </div>
  )
}
