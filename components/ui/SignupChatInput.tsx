import { AnimatePresence, motion } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'
import {
  ElaraCalendarIcon,
  ElaraMessageIcon,
  ElaraMicIcon,
  ElaraPaperclipIcon,
  ElaraSendIcon,
  ElaraShoppingCartIcon,
  RemoveFileIcon
} from '../icons'

const TYPEWRITER_PHRASES = [
  'plan outfits for Paris...',
  'style me for a wedding...',
  'find summer vacation looks...',
  'build a capsule wardrobe...',
  'shop for date night...',
  'organize my closet...',
]

interface UtilityButton {
  id: string
  icon: React.ReactNode
  label: string
  description: string
}

interface UploadedFile {
  id: string
  file: File
  name: string
  size: number
  type: string
  previewUrl?: string
  progress: number
}

export const utilityButtons: UtilityButton[] = [
  {
    id: 'upload',
    icon: <ElaraPaperclipIcon />,
    label: 'Upload & Digitize',
    description: 'Add photos of your clothes to build your digital wardrobe.',
  },
  {
    id: 'chat',
    icon: <ElaraMessageIcon />,
    label: 'Your Personal Stylist',
    description: 'Chat freely with your personal stylist for fashion tips and outfit ideas.',
  },
  {
    id: 'shop',
    icon: <ElaraShoppingCartIcon />,
    label: 'Smart Shopper',
    description: 'Instantly find outfits tailored to your vibe, closet, and budget.',
  },
  {
    id: 'calendar',
    icon: <ElaraCalendarIcon />,
    label: 'Trip & Event Planner',
    description: 'Get styled looks for any destination, season, or special occasion.',
  },
]

interface SignupChatInputProps {
  onSubmit?: (message: string) => void
  className?: string
  initialValue?: string
}

export function SignupChatInput({ onSubmit, className = '', initialValue = '' }: SignupChatInputProps) {
  const [inputValue, setInputValue] = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)


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

  // Auto-resize textarea based on content
  useEffect(() => {
    if (inputRef.current) {
      // Reset height to auto to get the correct scrollHeight
      inputRef.current.style.height = 'auto'
      // Set height to scrollHeight, but respect maxHeight
      const scrollHeight = inputRef.current.scrollHeight
      const maxHeight = 200 // matches maxHeight in className
      inputRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`
      // Enable scrolling if content exceeds maxHeight
      inputRef.current.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden'
    }
  }, [inputValue])

  return (
    <div className={`w-full ${className}`}>
      {/* Main Chat Input Container */}
      <motion.div
        layout
        className="relative max-w-[600px] rounded-[32px] border border-transparent shadow-[0_24px_80px_rgba(0,0,0,0.6)] w-full lg:w-[755px] mx-auto backdrop-blur-3xl pt-6 px-6 pb-4 font-outfit flex flex-col items-start gap-[34px]"
        style={{
          background: 'rgba(0, 0, 0, 0.72)',
          backdropFilter: 'blur(50px)',
        }}
      >

        {/* Text Input Area */}
        <motion.div className="w-full">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            rows={1}
            className="w-full bg-transparent text-sm sm:text-base leading-[1.26] text-white/90 placeholder-white/40 outline-none resize-none font-outfit"
            style={{ minHeight: '24px', maxHeight: '200px' }}
          />
        </motion.div>

        {/* Bottom Toolbar */}
        <div className="flex items-center justify-between w-full">
          {/* Left Utility Buttons */}
          <div className="relative flex items-center gap-1.5 sm:gap-2">
            {/* Standalone upload square (upload tooltip handled by shared panel below) */}
            <button
              type="button"
              className={`group relative flex h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 items-center justify-center rounded-lg sm:rounded-[10px] lg:rounded-[12px] transition-all duration-300 bg-[#120d16] text-white/60 hover:bg-[#181018] hover:text-white/80`}
            >
              {utilityButtons[0].icon}
            </button>

            {/* Tab group for the remaining utilities */}
            <div className="flex items-center rounded-xl sm:rounded-[13px] lg:rounded-[15px] bg-[#181018] px-0.5 sm:px-1 py-0.5 sm:py-1">
              {utilityButtons.slice(1).map((button) => {
                return (
                  <div
                    key={button.id}
                    className="relative cursor-pointer px-[0.5px]"
                  >
                    <AnimatePresence>

                      <motion.div
                        key={`${button.id}-active`}
                        layoutId="chat-input-utility-active"
                        className="pointer-events-none absolute inset-0 rounded-lg sm:rounded-[10px] lg:rounded-[12px] "
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />


                    </AnimatePresence>
                    <button
                      type="button"
                      className="relative flex h-7 sm:h-8 items-center justify-center rounded-lg sm:rounded-[10px] lg:rounded-[12px] px-2 sm:px-2.5 lg:px-3 transition-all duration-200 text-white/85"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        {button.icon}
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>

          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              className={`relative rounded-full p-2 sm:p-2.5 transition-all duration-300 text-white/50 hover:bg-white/10 hover:text-white/80`}
            >

              <div className="relative z-10 size-6 flex items-center justify-center">
                <AnimatePresence mode="wait">

                  <motion.div
                    key="mic"
                    initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ElaraMicIcon />
                  </motion.div>
                </AnimatePresence>
              </div>
            </button>
            <button
              type="button"
              disabled={!inputValue.trim()}
              className={`rounded-full p-2 sm:p-2.5 transition-all duration-500 ${inputValue.trim()
                ? 'bg-white/80 text-black hover:bg-white'
                : 'bg-white/10 text-white/50 cursor-not-allowed'
                }`}
            >
              <div
                className={`w-5 h-5 flex items-center justify-center transition-transform duration-500 ${inputValue.trim() ? '-rotate-[45deg] scale-[1.2] translate-y-[0.8px]' : ''
                  }`}
              >
                <ElaraSendIcon />
              </div>
            </button>
          </div>
        </div>

        {/* Gradient Border - Placed last to overlap if needed, but using pointer-events-none */}
        <div
          className="absolute -inset-[1px] rounded-[32px] p-[1px] pointer-events-none"
          style={{
          background: 'linear-gradient(120deg, #d50048 0%, #440075 100%)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          }}
        />
      </motion.div>
    </div>
  )
}

