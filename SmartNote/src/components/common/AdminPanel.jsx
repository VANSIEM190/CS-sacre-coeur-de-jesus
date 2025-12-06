import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import { db } from '@/services/firebaseConfig'
import { toast } from 'react-toastify'
import AnnouncementsView from '@/pages/clients/Annonce.jsx'
import {
  addDoc,
  getDocs,
  collection,
  serverTimestamp,
  deleteDoc,
  doc,
} from 'firebase/firestore'

export default function AdminPanel({ setPanelIsVisible, panelIsVisible }) {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(false)
  const [valueAnnonce, setValueAnnonce] = useState({
    title: '',
    content: '',
    author: '',
    category: 'general',
    priority: 'normal',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setValueAnnonce(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const sendAnnouncement = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const newAnnouncementRef = collection(db, 'announcements')
      await addDoc(newAnnouncementRef, {
        ...valueAnnonce,
        createdAt: serverTimestamp() || new Date(),
      })
      setLoading(false)
      setPanelIsVisible(false)
      toast.success('Annonce publiée avec succès !')
    } catch (error) {
      toast.error('Erreur lors de la publication : ' + error.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsRef = collection(db, 'announcements')
        const snapshot = await getDocs(announcementsRef)
        const announcementsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        setAnnouncements(announcementsList)
        console.log('Annonces fetchées :', announcementsList)
      } catch (error) {
        toast.error('Erreur lors du fetch des annonces : ' + error.message)
      }
    }
    fetchAnnouncements()
  }, [])

  const deleteAnnoucement = async id => {
    try {
      const announcementDocRef = doc(db, 'announcements', id)
      await deleteDoc(announcementDocRef)
      setAnnouncements(prev =>
        prev.filter(announcement => announcement.id !== id)
      )
      toast.success('Annonce supprimée avec succès !')
    } catch (error) {
      toast.error('Erreur lors de la suppression : ' + error.message)
    }
  }

  return panelIsVisible ? (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="shadow-xl border-0 bg-white">
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg p-3">
          <div className="flex items-center gap-2">Nouvelle Annonce</div>
          <p className="text-blue-100">
            Créez une annonce pour informer les élèves
          </p>{' '}
        </div>
        <div className="p-3">
          <form onSubmit={sendAnnouncement} className="space-y-4 mt-10">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Titre *
              </label>
              <input
                value={valueAnnonce.title}
                name="title"
                onChange={handleChange}
                placeholder="Titre de l'annonce"
                className="w-[90%] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Contenu *
              </label>
              <textarea
                value={valueAnnonce.content}
                name="content"
                onChange={handleChange}
                placeholder="Contenu de l'annonce"
                rows={5}
                className="w-[90%] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Auteur *
              </label>
              <input
                value={valueAnnonce.author}
                name="author"
                onChange={handleChange}
                placeholder="Nom de l'auteur"
                className="w-[90%] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Catégorie
                </label>
                <select
                  value={valueAnnonce.category}
                  name="category"
                  onChange={handleChange}
                >
                  <option value="general">📢 Général</option>
                  <option value="academic">📚 Académique</option>
                  <option value="events">🎉 Événements</option>
                  <option value="urgent">⚠️ Urgent</option>
                  <option value="sports">⚽ Sports</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Priorité
                </label>
                <select
                  value={valueAnnonce.priority}
                  name="priority"
                  onChange={handleChange}
                >
                  <option value="low">Basse</option>
                  <option value="normal">Normale</option>
                  <option value="high">Haute</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-indigo-700 rounded-md transition-colors duration-75 ease-in-out cursor-pointer text-white shadow-lg mt-5"
            >
              {loading ? 'Publication...' : "Publier l'annonce"}
            </button>
          </form>
        </div>
      </div>

      <div className="shadow-xl border-0 bg-white">
        <div className="bg-linear-to-r from-gray-700 to-gray-900 text-white rounded-t-lg p-3">
          <h2>Gestion des Annonces</h2>
          <p className="text-gray-300">
            {announcements.length} annonce(s) publiée(s)
          </p>
        </div>
        <div className="pt-6">
          <div className="space-y-3 max-h-[600px] overflow-y-auto px-2">
            {announcements.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <div className="text-4xl mb-2">📭</div>
                <p>Aucune annonce pour le moment</p>
              </div>
            ) : (
              announcements.map(announcement => (
                <div
                  key={announcement.id}
                  className="flex items-start justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 truncate">
                      {announcement.title}
                    </h4>
                    <p className="text-sm text-muted-foreground truncate">
                      {announcement.content}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {announcement.category}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded-full">
                        {announcement.priority}
                      </span>
                    </div>
                  </div>
                  <button
                    variant="ghost"
                    size="icon"
                    className="ml-2 text-red-600 hover:text-red-700 hover:bg-red-50 "
                    onClick={() => deleteAnnoucement(announcement.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <AnnouncementsView />
  )
}
