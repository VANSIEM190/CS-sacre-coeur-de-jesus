import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone } from 'lucide-react'

const ModalDetailPersonel = React.memo(({ selected, setSelected }) => {
  console.log('sub')

  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-200 rounded-2xl shadow-xl max-w-2xl w-full p-6"
            initial={{ scale: 0.98, y: 8 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.98, y: 8 }}
          >
            <div className="flex items-start gap-4">
              <img
                src={selected.img}
                alt={`Photo de ${selected.name}`}
                className="w-24 h-24 rounded-full object-cover border"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{selected.name}</h3>
                <div className="text-sm text-slate-500">
                  {selected.role} — {selected.department}
                </div>
                <p className="mt-3 text-sm text-slate-600">{selected.bio}</p>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href="tel:+243 823456900"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm hover:bg-slate-50"
                  >
                    <Phone size={16} />
                    Contacter
                  </a>
                  <button
                    onClick={() => setSelected(null)}
                    className="ml-auto text-sm text-slate-500"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="fixed inset-0 bg-black/30 -z-10" />
        </motion.div>
      )}
    </AnimatePresence>
  )
})

export default ModalDetailPersonel
