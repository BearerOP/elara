'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react'
import Image from 'next/image'
import { OutfitSuggestion } from './OutfitSuggestionRow'

interface VirtualTryOnModalProps {
  outfit: OutfitSuggestion | null
  outfits: OutfitSuggestion[]
  isOpen: boolean
  onClose: () => void
  onSaveToLookbook?: (outfit: OutfitSuggestion) => void
}

export default function VirtualTryOnModal({
  outfit,
  outfits,
  isOpen,
  onClose,
  onSaveToLookbook,
}: VirtualTryOnModalProps) {
  const [currentOutfitIndex, setCurrentOutfitIndex] = useState(
    outfit ? outfits.findIndex((o) => o.id === outfit.id) : 0
  )
  const [isSaved, setIsSaved] = useState(false)

  const currentOutfit = outfits[currentOutfitIndex] || outfit

  const handlePrevious = () => {
    setCurrentOutfitIndex((prev) => (prev > 0 ? prev - 1 : outfits.length - 1))
  }

  const handleNext = () => {
    setCurrentOutfitIndex((prev) => (prev < outfits.length - 1 ? prev + 1 : 0))
  }

  const handleSaveToLookbook = () => {
    if (currentOutfit) {
      setIsSaved(true)
      onSaveToLookbook?.(currentOutfit)
      setTimeout(() => setIsSaved(false), 2000)
    }
  }

  if (!currentOutfit) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 backdrop-blur-md"
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.64)',
              zIndex: 80,
            }}
          />

          {/* Modal */}
          <div 
            className="fixed inset-0 flex items-center justify-center p-4 pointer-events-none"
            style={{ zIndex: 90 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full rounded-2xl border shadow-xl pointer-events-auto overflow-hidden flex flex-col"
              style={{
                maxWidth: '800px',
                backgroundColor: '#1a1a1a',
                borderColor: '#363636',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div 
                className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
                style={{ borderColor: '#363636' }}
              >
                <h2 className="text-lg font-medium text-white">Virtual Try-On</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Main Content */}
              <div 
                className="flex-1 relative"
                style={{
                  minHeight: '500px',
                  backgroundColor: '#0f0f0f',
                }}
              >
                {/* Outfit Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="relative w-full h-full"
                    style={{ maxHeight: '600px' }}
                  >
                    {/* Placeholder for outfit image */}
                    <div 
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(to bottom right, #1a1a1a, #0a0a0a)',
                      }}
                    >
                      <div className="text-center space-y-4">
                        <div className="w-32 h-32 mx-auto rounded-full bg-white/5 flex items-center justify-center">
                          <svg
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-white/40"
                          >
                            <path d="M20 7h-3V6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v1H4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a1 1 0 0 0-1-1z" />
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                          </svg>
                        </div>
                        <p className="text-white/60 text-sm">Virtual Try-On Preview</p>
                        <p className="text-white/40 text-xs">{currentOutfit.title}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Arrows */}
                {outfits.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur-sm text-white transition-colors"
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full backdrop-blur-sm text-white transition-colors"
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Footer */}
              <div 
                className="flex items-center justify-between px-6 py-4 border-t flex-shrink-0"
                style={{
                  borderColor: '#363636',
                  backgroundColor: '#1a1a1a',
                }}
              >
                {/* Outfit Counter */}
                {outfits.length > 1 && (
                  <div 
                    className="text-sm"
                    style={{ color: 'rgba(255, 255, 255, 0.64)' }}
                  >
                    <span>&lt; Outfit {currentOutfitIndex + 1} &gt;</span>
                  </div>
                )}
                <div className="flex-1" />

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSaveToLookbook}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
                      isSaved
                        ? 'bg-green-600 text-white'
                        : 'border text-white hover:bg-white/10'
                    }`}
                    style={
                      !isSaved
                        ? {
                            backgroundColor: '#1a1a1a',
                            borderColor: 'rgba(255, 255, 255, 0.24)',
                          }
                        : {}
                    }
                  >
                    {isSaved ? (
                      <>
                        <Check className="h-4 w-4" />
                        Saved!
                      </>
                    ) : (
                      'Save to lookbook'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

