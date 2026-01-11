import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import { db } from '@/services/firebaseConfig'
import { toast, ToastContainer } from 'react-toastify'
import AnnouncementsView from '@/pages/clients/AnnouncementView.jsx'
import { Button, Input, Textarea, Label } from '../ui'
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

    if (!valueAnnonce.title && !valueAnnonce.content && !valueAnnonce.author) {
      toast.error('veillez remplir les coodonnées')
      return
    }

    setLoading(true)

    try {
      const newAnnouncementRef = collection(db, 'announcements')
      await addDoc(newAnnouncementRef, {
        ...valueAnnonce,
        createdAt: serverTimestamp() || new Date(),
      })
      setPanelIsVisible(false)
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

  return (
    <>
      <ToastContainer position="top-right" />
      {panelIsVisible ? (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="shadow-xl border-0 bg-white">
            <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg p-3">
              <div className="flex items-center gap-2 max-sm:text-sm max-sm:font-bold">
                Nouvelle Annonce
              </div>
              <p className="text-blue-100 max-sm:text-sm">
                Créez une annonce pour informer les élèves
              </p>{' '}
            </div>
            <div className="p-3">
              <form onSubmit={sendAnnouncement} className="space-y-4 mt-10">
                <div>
                  <Label htmlFor="title">Titre *</Label>
                  <Input
                    type="text"
                    value={valueAnnonce.title}
                    name="title"
                    onChange={handleChange}
                    required
                    placeholder="Titre de l'annonce"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Contenu *</Label>
                  <Textarea
                    value={valueAnnonce.content}
                    name="content"
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Contenu de l'annonce"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Auteur *
                  </label>
                  <Input
                    type="text"
                    value={valueAnnonce.author}
                    name="author"
                    onChange={handleChange}
                    required
                    placeholder="Nom de l'auteur"
                  />
                </div>

                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 mt-8">
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
                      <option value="Scolaire">📚 Scolaire</option>
                      <option value="events">🎉 Événements</option>
                      <option value="urgent">⚠️ Urgent</option>
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

                <Button
                  type="submit"
                  disabled={loading}
                  className={
                    'w-full p-3 cursor-pointer text-white shadow-lg mt-5  hover:scale-100'
                  }
                >
                  {loading ? 'Publication...' : "Publier l'annonce"}
                </Button>
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
      )}
    </>
  )
}
