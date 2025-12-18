'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface RenameChatModalProps {
  isOpen: boolean
  onClose: () => void
  onRename: (newTitle: string) => void
  currentTitle: string
}

export function RenameChatModal({ isOpen, onClose, onRename, currentTitle }: RenameChatModalProps) {
  const [title, setTitle] = useState(currentTitle)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setTitle(currentTitle)
      setIsSaving(false)
    }
  }, [isOpen, currentTitle])

  const handleSave = async () => {
    if (title.trim() && !isSaving) {
      setIsSaving(true)
      
      // Simulate a brief save operation for smooth UX
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      onRename(title.trim())
      
      // Small delay before closing for visual feedback
      setTimeout(() => {
        setIsSaving(false)
        onClose()
      }, 200)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSaving) {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape' && !isSaving) {
      e.preventDefault()
      onClose()
    }
  }

  const handleClose = () => {
    if (!isSaving) {
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
            >
              {/* Title */}
              <h2 className="text-2xl font-semibold text-white mb-6">
                Rename chat
              </h2>

              {/* Input */}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter chat name"
                disabled={isSaving}
                className="w-full bg-[#3a3a3a] text-white px-4 py-3 rounded-xl border-2 border-[#4a9eff] focus:border-[#4a9eff] focus:outline-none transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed"
                autoFocus
              />

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={handleClose}
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl text-white bg-transparent hover:bg-white/5 transition-colors text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!title.trim() || isSaving}
                  className="px-6 py-2.5 rounded-xl text-black bg-white hover:bg-white/90 transition-colors text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 min-w-[83px] justify-center"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    'Save'
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

export default RenameChatModal

