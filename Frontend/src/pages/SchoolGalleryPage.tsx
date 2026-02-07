import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ZoomIn } from 'lucide-react'
import { Footer, Navbar } from '@/components/layout'

// Sample data: replace with real images/videos
const GALLERY = [
  {
    id: 1,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1596496055850-9b4d4a7c20e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fGVjb2xlJTIwc2Nob29sfGVufDB8fHx8MTY5Nzg5MDI0OA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: 2,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1596495578060-f26e0a7585f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fGVjbGFzc3Jvb20lMjBhY2FkZW1pYXMlMjBmb3JtYXR8ZW58MHx8fHwxNjk3ODkwMjQ4&ixlib=rb-4.0.3&q=80&w=400',
  },
  { id: 3, type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  {
    id: 4,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1596496055850-9b4d4a7c20e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fGVjb2xlJTIwc2Nob29sfGVufDB8fHx8MTY5Nzg5MDI0OA&ixlib=rb-4.0.3&q=80&w=400',
  },
  {
    id: 5,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1596495578060-f26e0a7585f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDF8fGVjbGFzc3Jvb20lMjBhY2FkZW1pYXMlMjBmb3JtYXR8ZW58MHx8fHwxNjk3ODkwMjQ4&ixlib=rb-4.0.3&q=80&w=400',
  },
]

export default function SchoolGalleryPage() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <Navbar />
      <div className="min-h-[80%] mt-15 bg-linear-to-b from-neutral-50 to-white p-6 md:p-12 font-sans">
        <header className="max-w-6xl mx-auto mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Galerie de l'École
          </h1>
          <p className="text-slate-600">
            Découvrez les classes, l'ambiance, les installations et les
            activités de notre école.
          </p>
        </header>

        <main className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY.map(item => (
            <motion.div
              key={item.id}
              layout
              whileHover={{ scale: 1.05 }}
              className="relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
              onClick={() => setSelected(item)}
            >
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt="Galerie"
                  className="w-full h-56 object-cover"
                />
              ) : (
                <video src={item.src} className="w-full h-56 object-cover" />
              )}
              <div className="absolute top-2 right-2 bg-indigo-600 text-white p-2 rounded-full shadow">
                <ZoomIn size={16} />
              </div>
            </motion.div>
          ))}
        </main>

        {/* Modal pour voir en grand */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="relative bg-white rounded-2xl max-w-3xl w-full shadow-xl">
              <button
                className="absolute top-3 right-3 text-slate-500 text-lg"
                onClick={() => setSelected(null)}
              >
                ✕
              </button>
              {selected.type === 'image' ? (
                <img
                  src={selected.src}
                  alt="Galerie détaillée"
                  className="w-full h-auto rounded-2xl"
                />
              ) : (
                <video
                  src={selected.src}
                  controls
                  autoPlay
                  className="w-full h-auto rounded-2xl"
                />
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
