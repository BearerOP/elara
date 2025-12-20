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

// Component to handle image preview with dynamic aspect ratio
const ImagePreviewContainer = ({ file }: { file: UploadedFile }) => {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const handleImageLoad = () => {
    if (imgRef.current) {
      const { naturalWidth, naturalHeight } = imgRef.current
      if (naturalWidth > 0 && naturalHeight > 0) {
        setAspectRatio(naturalWidth / naturalHeight)
      }
    }
  }

  return (
    <div
      className="w-full bg-black/40 border border-white/10 rounded-2xl overflow-hidden"
      style={
        aspectRatio
          ? { aspectRatio: aspectRatio.toString() }
          : { minHeight: '60px' }
      }
    >
      <img
        ref={imgRef}
        src={file.previewUrl}
        alt={file.name}
        className="w-full h-full object-contain"
        onLoad={handleImageLoad}
      />
    </div>
  )
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

interface ChatInputLandingProps {
  onSubmit?: (message: string) => void
  className?: string
  initialValue?: string
}

export function ChatInputLanding({ onSubmit, className = '', initialValue = '' }: ChatInputLandingProps) {
  const [inputValue, setInputValue] = useState('')
  const [placeholder, setPlaceholder] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [activeButton, setActiveButton] = useState<string | null>('chat')
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [oversizeCount, setOversizeCount] = useState(0)
  const [showOversizeToast, setShowOversizeToast] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<any>(null)
  const manualStopRef = useRef(false)
  const lastErrorRef = useRef<string | null>(null)
  const retryCountRef = useRef<number>(0)

  // Cleanup recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    }
  }, [])

  const stopListening = () => {
    manualStopRef.current = true
    setIsListening(false)
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
        recognitionRef.current = null
      } catch (e) {
        console.error('Error stopping recognition:', e)
      }
    }
  }

  const startListening = () => {
    // Check browser support
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.')
      return
    }

    // Stop any existing recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
      } catch (e) {
        // Ignore
      }
    }

    // Create new recognition instance
    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'
    recognition.maxAlternatives = 1

    manualStopRef.current = false
    lastErrorRef.current = null
    retryCountRef.current = 0

    // Store the base text when starting
    const baseText = inputValue

    recognition.onstart = () => {
      console.log('Speech recognition started')
      setIsListening(true)
    }

    recognition.onresult = (event: any) => {
      let interimTranscript = ''
      let finalTranscript = ''

      // Process all results
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' '
        } else {
          interimTranscript += transcript
        }
      }

      // Combine all final transcripts from the beginning
      let allFinalTranscript = ''
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          allFinalTranscript += event.results[i][0].transcript + ' '
        }
      }

      // Combine base text with all transcripts
      const newText = baseText
        ? `${baseText} ${allFinalTranscript}${interimTranscript}`.trim()
        : `${allFinalTranscript}${interimTranscript}`.trim()

      setInputValue(newText)
    }

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition error:', event.error)
      lastErrorRef.current = event.error

      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        manualStopRef.current = true
        setIsListening(false)
        alert('Microphone access denied. Please enable microphone permissions in your browser settings.')
      } else if (event.error === 'network') {
        // Don't alert immediately, let onend handle the retry
        console.warn('Network error detected in speech recognition')
      }
    }

    recognition.onend = () => {
      console.log('Speech recognition ended')

      // If manually stopped, just clean up
      if (manualStopRef.current) {
        setIsListening(false)
        recognitionRef.current = null
        return
      }

      // Handle restarts for continuous listening or error recovery
      const isNetworkError = lastErrorRef.current === 'network'

      if (isNetworkError) {
        if (retryCountRef.current >= 5) {
          console.error('Too many network errors, stopping.')
          setIsListening(false)
          recognitionRef.current = null
          alert('Connection unstable. Speech recognition stopped.')
          return
        }

        retryCountRef.current += 1
        console.log(`Retrying speech recognition (attempt ${retryCountRef.current}) in 1s...`)

        setTimeout(() => {
          if (manualStopRef.current) return
          try {
            recognition.start()
          } catch (e) {
            console.error('Failed to restart recognition:', e)
            setIsListening(false)
          }
        }, 1000)
        return
      }

      // Immediate restart for other non-fatal ends (like no-speech timeout)
      try {
        recognition.start()
      } catch (e) {
        // If it fails to start immediately, just stop
        console.error('Failed to restart recognition:', e)
        setIsListening(false)
        recognitionRef.current = null
      }
    }

    // Start recognition
    try {
      recognitionRef.current = recognition
      recognition.start()
    } catch (e) {
      console.error('Failed to start speech recognition:', e)
      alert('Failed to start speech recognition. Please try again.')
      setIsListening(false)
    }
  }

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

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

  const handleSubmit = () => {
    if (inputValue.trim()) {
      // Stop listening if active
      if (isListening) {
        stopListening()
      }

      if (onSubmit) {
        onSubmit(inputValue.trim())
      }
      setInputValue('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const currentHoveredButton = utilityButtons.find((b) => b.id === hoveredButton)

  const startFakeUpload = (fileIds: string[]) => {
    if (fileIds.length === 0) return

    setIsUploading(true)

    const start = Date.now()
    const duration = 2500
    const interval = 150

    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const ratio = Math.min(1, elapsed / duration)
      const percent = Math.round(ratio * 100)

      setUploadedFiles((prev) =>
        prev.map((file) =>
          fileIds.includes(file.id) ? { ...file, progress: percent } : file,
        ),
      )

      if (percent >= 100) {
        clearInterval(timer)
        setIsUploading(false)
      }
    }, interval)
  }

  const handleRemoveFile = (id: string) => {
    setUploadedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id)
      if (fileToRemove?.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl)
      }
      return prev.filter((file) => file.id !== id)
    })
  }

  return (
    <div className={`w-full max-w-[755px] ${className}`}>
      {/* Hidden file input for upload */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const files = e.target.files
          if (!files || files.length === 0) return
          const filesArray = Array.from(files)

          const MAX_BYTES = 5 * 1024 * 1024 // 5MB

          const validFiles: UploadedFile[] = []
          let skipped = 0

          filesArray.forEach((file) => {
            if (file.size > MAX_BYTES) {
              skipped += 1
              return
            }

            const isImage = file.type.startsWith('image/')

            validFiles.push({
              id: `${Date.now()}-${file.name}-${Math.random()
                .toString(36)
                .slice(2, 8)}`,
              file,
              name: file.name,
              size: file.size,
              type: file.type,
              previewUrl: isImage ? URL.createObjectURL(file) : undefined,
              progress: 0,
            })
          })

          if (skipped > 0) {
            setOversizeCount((prev) => prev + skipped)
            setShowOversizeToast(true)
            // Auto-hide the toast after a short delay
            setTimeout(() => setShowOversizeToast(false), 3500)
          }

          if (validFiles.length === 0) return

          setUploadedFiles((prev) => [...prev, ...validFiles])
          startFakeUpload(validFiles.map((file) => file.id))
        }}
      />

      {/* Main Chat Input Container */}
      <motion.div
        layout
        className="relative rounded-[32px] border border-transparent shadow-[0_24px_80px_rgba(0,0,0,0.6)] w-full lg:w-[755px] mx-auto backdrop-blur-3xl pt-6 px-6 pb-4 font-outfit flex flex-col items-start gap-[34px]"
        style={{
          background: 'rgba(0, 0, 0, 0.72)',
          backdropFilter: 'blur(50px)',
        }}
      >
        {/* Upload previews above input */}
        {uploadedFiles.length > 0 && (
          <div className="w-full">
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-1 sm:gap-1.5">
              {uploadedFiles.map((file) => {
                const ext = file.name.split('.').pop()?.toUpperCase() ?? ''
                return (
                  <div
                    key={file.id}
                    className="group relative overflow-hidden rounded-2xl bg-white/5"
                  >
                    {file.previewUrl ? (
                      <ImagePreviewContainer file={file} />
                    ) : (
                      <div className="aspect-[4/3] w-full bg-black/40 border border-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center text-[10px] sm:text-xs font-semibold text-white/70">
                        {ext}
                      </div>
                    )}

                    {/* Progress bar */}
                    <div className="absolute inset-x-1.5 bottom-1 h-0.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        style={{ width: `${file.progress}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-indigo-400 transition-[width] duration-300"
                      />
                    </div>

                    {/* Hover overlay with name + delete */}
                    <div className="pointer-events-none absolute inset-0 flex flex-col justify-between bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/35 group-hover:opacity-100">
                      <div className="flex items-start justify-end p-1">
                        <button
                          type="button"
                          className="pointer-events-auto inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-white/80 hover:bg-black hover:text-white"
                          onClick={(event) => {
                            event.stopPropagation()
                            handleRemoveFile(file.id)
                          }}
                        >
                          <RemoveFileIcon />
                        </button>
                      </div>
                      <div className="pointer-events-auto bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2 pb-2 pt-4 text-[9px] font-medium text-white">
                        <div className="truncate">{file.name}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Text Input Area */}
        <motion.div className="w-full">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
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
              onMouseEnter={() => setHoveredButton('upload')}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => {
                setActiveButton('upload')
                if (fileInputRef.current) {
                  fileInputRef.current.click()
                }
              }}
              className={`group relative flex h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 items-center justify-center rounded-lg sm:rounded-[10px] lg:rounded-[12px] transition-all duration-300 ${activeButton === 'upload'
                ? 'bg-[#1b141f] text-white'
                : 'bg-[#120d16] text-white/60 hover:bg-[#181018] hover:text-white/80'
                }`}
            >
              {utilityButtons[0].icon}
            </button>

            {/* Tab group for the remaining utilities */}
            <div className="flex items-center rounded-xl sm:rounded-[13px] lg:rounded-[15px] bg-[#181018] px-0.5 sm:px-1 py-0.5 sm:py-1">
              {utilityButtons.slice(1).map((button) => {
                const isActive = activeButton === button.id
                return (
                  <div
                    key={button.id}
                    className="relative cursor-pointer px-[0.5px]"
                    onMouseEnter={() => setHoveredButton(button.id)}
                    onMouseLeave={() => setHoveredButton(null)}
                  >
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          key={`${button.id}-active`}
                          layoutId="chat-input-utility-active"
                          className="pointer-events-none absolute inset-0 rounded-lg sm:rounded-[10px] lg:rounded-[12px] bg-white/10"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                      {!isActive && hoveredButton === button.id && (
                        <motion.div
                          key={`${button.id}-hover`}
                          layoutId="chat-input-utility-hover"
                          className="pointer-events-none absolute inset-0 rounded-lg sm:rounded-[10px] lg:rounded-[12px] bg-white/10"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </AnimatePresence>
                    <button
                      type="button"
                      onClick={() => setActiveButton(button.id)}
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

            {/* Tooltip */}
            {currentHoveredButton && (
              <AnimatePresence>
                <motion.div
                  key={currentHoveredButton.id}
                  layoutId="utility-tooltip"
                  initial={{ scale: 0.96 }}
                  animate={{ scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="absolute left-0 top-full mt-2 z-50 w-56 sm:w-64 rounded-2xl sm:rounded-[2rem] border border-border-tertiary bg-[#1B1117]/95 p-4 sm:p-5 lg:p-6 text-left shadow-xl backdrop-blur-xl transition-all border-white/20 hover:bg-[#1B1117]/50"
                >
                  {currentHoveredButton.id === 'upload' ? (
                    <>
                      <motion.h4
                        layoutId="utility-tooltip-title-upload"
                        className="mb-1 text-xs sm:text-sm font-semibold text-white"
                      >
                        Upload images and more
                      </motion.h4>
                      <motion.p
                        layoutId="utility-tooltip-description-upload"
                        className="text-[11px] sm:text-xs leading-relaxed text-white/60"
                      >
                        Add photos of your clothes to build your digital wardrobe.
                      </motion.p>

                      <div className="mt-2 sm:mt-3 flex items-center justify-between text-[10px] sm:text-[11px] text-white/60">
                        <span>
                          {uploadedFiles.length === 0
                            ? 'No files selected yet'
                            : `${uploadedFiles.length} file${uploadedFiles.length > 1 ? 's' : ''
                            } selected`}
                        </span>
                        {uploadedFiles.length > 0 && (
                          <span>{isUploading ? 'Uploading…' : 'Upload complete'}</span>
                        )}
                      </div>

                      {oversizeCount > 0 && (
                        <div className="mt-1 text-[9px] sm:text-[10px] text-amber-300/80">
                          {oversizeCount} file
                          {oversizeCount > 1 ? 's were' : ' was'} over 5MB and
                          skipped.
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <motion.h4
                        layoutId="utility-tooltip-title"
                        className="mb-1 text-xs sm:text-sm font-semibold text-white"
                      >
                        {currentHoveredButton.label}
                      </motion.h4>
                      <motion.p
                        layoutId="utility-tooltip-description"
                        className="text-[11px] sm:text-xs leading-relaxed text-white/60"
                      >
                        {currentHoveredButton.description}
                      </motion.p>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={toggleListening}
              className={`relative rounded-full p-2 sm:p-2.5 transition-all duration-300 ${isListening
                ? 'text-red-500 bg-red-500/10'
                : 'text-white/50 hover:bg-white/10 hover:text-white/80'
                }`}
            >
              {isListening && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 rounded-full border-[2px] border-red-500/30 border-t-red-500 animate-spin"
                />
              )}
              <div className="relative z-10 size-6 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {isListening ? (
                    <motion.div
                      key="stop"
                      initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5"
                      >
                        <rect
                          x="6"
                          y="6"
                          width="12"
                          height="12"
                          rx="2"
                          fill="currentColor"
                        />
                      </svg>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="mic"
                      initial={{ scale: 0.5, opacity: 0, rotate: -90 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0.5, opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ElaraMicIcon />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </button>
            <button
              type="button"
              onClick={handleSubmit}
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
      <AnimatePresence>
        {showOversizeToast && (
          <div className="pointer-events-none fixed bottom-4 sm:bottom-6 left-1/2 z-[60] -translate-x-1/2 w-full max-w-[calc(100%-2rem)] sm:max-w-none px-4 sm:px-0">
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
                mass: 0.5,
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                }}
                className="pointer-events-auto flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-[#141118] px-3 sm:px-4 py-2.5 sm:py-3 text-xs text-white shadow-[0_18px_60px_rgba(0,0,0,0.75)] border border-white/10 backdrop-blur-xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 25,
                    delay: 0.1,
                  }}
                  className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-red-500/15 text-red-300 text-[10px] sm:text-[11px] font-semibold p-1.5 sm:p-2 flex-shrink-0"
                >
                  !
                </motion.div>
                <div className="space-y-0.5 min-w-0 flex-1">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium text-xs sm:text-sm"
                  >
                    Some files were too large
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="text-[10px] sm:text-[11px] text-white/70"
                  >
                    Files larger than 5MB can&apos;t be uploaded. Try a smaller image or compress it first.
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ChatInputLanding