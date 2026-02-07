import React from 'react'
import { X } from 'lucide-react'
import { Button } from '../ui'

const ModalInformation = ({
  selectedAnnouncement,
  setSelectedAnnouncement,
}) => {
  return (
    <>
      {selectedAnnouncement && (
        <div
          id="default-modal"
          tabIndex="-1"
          className="fixed m-auto left-0 right-0 z-50 justify-center items-center w-max md:inset-y-25  max-h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            {/* Modal content */}
            <div className="bg-white relative bg-neutral-primary-soft  rounded-md shadow-md p-4 md:p-6 overflow-y-auto">
              {/* Modal header  */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-4 md:pb-5">
                <h3 className="text-lg font-medium text-heading">ANNONCE</h3>
                <button
                  type="button"
                  className="text-body bg-transparent hover:bg-neutral-tertiary hover:text-heading rounded-base text-sm w-9 h-9 ms-auto inline-flex justify-center items-center"
                  onClick={() => setSelectedAnnouncement(null)}
                >
                  <X size={18} />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body  */}
              <div className="space-y-4 md:space-y-6 py-4 md:py-6">
                <p className="leading-relaxed text-body">
                  {selectedAnnouncement}
                </p>
              </div>
              {/* Modal footer  */}
              <div className="flex items-center border-t border-gray-200 space-x-4 pt-4 md:pt-5">
                <Button
                  type="button"
                  className={'p-3'}
                  onClick={() => setSelectedAnnouncement(null)}
                >
                  I accept
                </Button>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 bg-black/30 -z-10" />
        </div>
      )}
    </>
  )
}

export default ModalInformation
