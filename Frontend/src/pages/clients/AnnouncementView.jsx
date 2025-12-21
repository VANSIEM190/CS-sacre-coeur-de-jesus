import { useEffect, useMemo, useState } from 'react'
import { AnnonceCard as AnnouncementCard } from '@/components/common'
import { db } from '@/services/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { Filter } from 'lucide-react'
import { toast } from 'react-toastify'

const categories = [
  { value: 'all', label: 'Toutes ', icon: '📋' },
  { value: 'general', label: 'Général', icon: '📢' },
  { value: 'scolaire', label: 'Scolaire', icon: '📚' },
  { value: 'events', label: 'Événements', icon: '🎉' },
  { value: 'urgent', label: 'Urgent', icon: '⚠️' },
  { value: 'sports', label: 'Sports', icon: '⚽' },
]

const SKELETON_COUNT = 12
const LOADING_ITEMS = Array.from({ length: SKELETON_COUNT })

export default function AnnouncementsView() {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsRef = collection(db, 'announcements')
        const snapshot = await getDocs(announcementsRef)
        const announcementsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        setLoading(false)
        setAnnouncements(announcementsList)
      } catch (error) {
        toast.error('Erreur lors du fetch des annonces : ' + error.message)
      }
    }
    fetchAnnouncements()
  }, [])

  const filteredAnnouncements = useMemo(() => {
    const touteCategory = 'all'
    if (category === touteCategory) {
      return announcements
    }

    return announcements.filter(
      announcement => announcement.category === category
    )
  }, [category, announcements])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-md">
        <Filter className="w-5 h-5 text-blue-600" />
        <span className="max-sm:hidden font-medium text-gray-700">
          Filtrer par catégorie:
        </span>
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
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
          {LOADING_ITEMS.map((_, index) => (
            <div
              key={index}
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
          {filteredAnnouncements.map(announcement => (
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
