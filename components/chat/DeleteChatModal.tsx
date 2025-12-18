'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, AlertTriangle } from 'lucide-react'

interface DeleteChatModalProps {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
  chatTitle: string
}

export function DeleteChatModal({ isOpen, onClose, onDelete, chatTitle }: DeleteChatModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!isDeleting) {
      setIsDeleting(true)
      
      // Simulate a brief delete operation for smooth UX
      await new Promise(resolve => setTimeout(resolve, 800))
      
      onDelete()
      
      // Small delay before closing for visual feedback
      setTimeout(() => {
        setIsDeleting(false)
        onClose()
      }, 200)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isDeleting) {
      e.preventDefault()
      handleDelete()
    } else if (e.key === 'Escape' && !isDeleting) {
      e.preventDefault()
      onClose()
    }
  }

  const handleClose = () => {
    if (!isDeleting) {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="bg-[#2a2a2a] rounded-2xl p-8 w-full max-w-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={handleKeyDown}
              tabIndex={-1}
            >
              {/* Icon and Title */}
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    Delete chat?
                  </h2>
                  <p className="text-white/70 text-base">
                    Are you sure you want to delete <span className="font-medium text-white">"{chatTitle}"</span>? This action cannot be undone.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 mt-8">
                <button
                  onClick={handleClose}
                  disabled={isDeleting}
                  className="px-6 py-2.5 rounded-xl text-white bg-transparent hover:bg-white/5 transition-colors text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-6 py-2.5 rounded-xl text-white bg-red-500 hover:bg-red-600 transition-colors text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[100px] justify-center"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default DeleteChatModal

