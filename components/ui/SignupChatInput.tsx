'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  ElaraMicIcon,
  ElaraSendIcon,
} from '../icons'

const TYPEWRITER_PHRASES = [
  'plan outfits for Paris...',
  'style me for a wedding...',
  'find summer vacation looks...',
  'build a capsule wardrobe...',
  'shop for date night...',
  'organize my closet...',
]

export function SignupChatInput() {
  const [placeholder, setPlaceholder] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Typewriter effect
  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[phraseIndex]
    const prefix = 'Ask Elara to '
    const typeSpeed = isDeleting ? 30 : 80
    const pauseTime = isDeleting ? 500 : 2000

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentPhrase.length) {
          setPlaceholder(prefix + currentPhrase.substring(0, charIndex + 1))
          setCharIndex(charIndex + 1)
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime)
        }
      } else {
        if (charIndex > 0) {
          setPlaceholder(prefix + currentPhrase.substring(0, charIndex - 1))
          setCharIndex(charIndex - 1)
        } else {
          setIsDeleting(false)
          setPhraseIndex((phraseIndex + 1) % TYPEWRITER_PHRASES.length)
        }
      }
    }, typeSpeed)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, phraseIndex])

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative w-full max-w-[600px] max-h-screen rounded-[36px] border border-transparent shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl p-4 font-outfit"
        style={{
          background:
            'linear-gradient(135deg, rgba(14,14,20,0.8), rgba(14,14,20,0.7)) padding-box, linear-gradient(173deg, rgba(213, 0, 72, 1) 1%, rgba(190, 114, 129, 1) 40%, rgba(77, 78, 134, 1) 79%) border-box',
        }}
      >
        {/* Single-line Input Area with Icons */}
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left side - Text */}
          <div className="flex-1 bg-transparent text-base leading-[1.26] text-white/90">
            {placeholder}
            <span className="animate-pulse">|</span>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-full p-2.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white/80"
            >
              <ElaraMicIcon />
            </button>
            <button
              type="button"
              className="rounded-full bg-white/10 p-2.5 text-white/70 transition-all hover:bg-white/20 hover:text-white"
            >
              <ElaraSendIcon />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

