'use client'

import { AnimatePresence, motion } from 'framer-motion'
import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import {
  ElaraCalendarIcon,
  ElaraMessageIcon,
  ElaraMicIcon,
  ElaraPaperclipIcon,
  ElaraSendIcon,
  ElaraShoppingCartIcon,
  Wardrobe
} from '../icons'
import { Tooltip, TooltipTrigger, TooltipPanel } from '@/components/animate-ui/components/base/tooltip'

const TYPEWRITER_PHRASES = [
  'plan outfits for Paris...',
  'style me for a wedding...',
  'find summer vacation looks...',
  'build a capsule wardrobe...',
  'shop for date night...',
  'organize my closet...',
]

import RemoveFileIcon from '../icons/RemoveFileIcon'

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
  // {
  //   id: 'chat',
  //   icon: <ElaraMessageIcon />,
  //   label: 'Your Personal Stylist',
  //   description: 'Chat freely with your personal stylist for fashion tips and outfit ideas.',
  // },
  // {
  //   id: 'shop',
  //   icon: <ElaraShoppingCartIcon />,
  //   label: 'Smart Shopper',
  //   description: 'Instantly find outfits tailored to your vibe, closet, and budget.',
  // },
  // {
  //   id: 'calendar',
  //   icon: <ElaraCalendarIcon />,
  //   label: 'Trip & Event Planner',
  //   description: 'Get styled looks for any destination, season, or special occasion.',
  // },
  {
    id: 'wardrobe-only',
    icon: <Wardrobe className='h-6' />,
    label: 'Wardrobe Only',
    description: 'The outfits response will only be related to your wardrobe.'
  }
]

interface ChatInputProps {
  onSubmit?: (message: string, mode?: string) => void
  className?: string
  initialValue?: string
}

export function ElaraChatInput({ onSubmit, className = '', initialValue = '' }: ChatInputProps) {
  const [inputValue, setInputValue] = useState(initialValue)
  const [placeholder, setPlaceholder] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [activeButton, setActiveButton] = useState<string | null>('chat')
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const [wardrobeOnlyMode, setWardrobeOnlyMode] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [oversizeCount, setOversizeCount] = useState(0)
  const [showOversizeToast, setShowOversizeToast] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Update input value when initialValue changes
  useEffect(() => {
    if (initialValue) {
      setInputValue(initialValue)
    }
  }, [initialValue])

  // Typewriter effect (only if no initial value)
  useEffect(() => {
    if (initialValue) {
      setPlaceholder('')
      return
    }

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
  }, [charIndex, isDeleting, phraseIndex, initialValue])

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
    if (inputValue.trim() && onSubmit) {
      onSubmit(inputValue, wardrobeOnlyMode ? 'wardrobe-only' : undefined)
      setInputValue('')
      setUploadedFiles([])
      if (inputRef.current) {
        inputRef.current.style.height = 'auto'
      }
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
    <div className={`w-full max-w-[780px] pt-0 p-1  ${className} md:mb-2`}>
      {/* Hidden file input for upload */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
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

      {/* Inner container with background - matches border radius */}
      <div className="relative rounded-[24px] md:rounded-[32px] bg-[#252525] overflow-hidden border border-white/10">
        {/* Upload previews above input */}
        {uploadedFiles.length > 0 && (
          <div className="px-3 pt-3">
            <div className="grid grid-cols-6 gap-1.5 sm:grid-cols-8">
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
                      <div className="aspect-[4/3] w-full bg-black/40 border border-white/10 rounded-2xl flex items-center justify-center text-xs font-semibold text-white/70">
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
        <motion.div className="p-6 pb-0 md:p-6 md:pb-2">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className="w-full bg-transparent text-base leading-[1.26] text-white/90 placeholder-white/40 outline-none resize-none"
            style={{ minHeight: '24px', maxHeight: '200px' }}
          />
        </motion.div>

        {/* Bottom Toolbar */}
        <motion.div
          className="flex items-center justify-between p-2 pt-0  pb-0 md:p-4 md:py-2 md:pt-0"
        >
          {/* Left Utility Buttons */}
          <div className="relative flex items-center gap-2">
            {/* Standalone upload square */}
            <Tooltip>
              <TooltipTrigger>
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
                  className={`group relative flex h-10 w-10 items-center justify-center rounded-[12px] transition-all duration-300 ${activeButton === 'upload'
                    ? 'bg-[#1b141f] text-white'
                    : 'bg-[#120d16] text-white/60 hover:bg-[#181018] hover:text-white/80'
                    }`}
                >
                  {utilityButtons[0].icon}
                </button>
              </TooltipTrigger>
              <TooltipPanel side="top" className="bg-[#1a1a1a] text-white border border-white/10">
                {utilityButtons[0].label}
              </TooltipPanel>
            </Tooltip>

            {/* Tab group for the remaining utilities */}
            <motion.div
              className="flex gap-1 items-center rounded-[15px] bg-[#181018] px-1 py-1"
            >
              {utilityButtons.slice(1).map((button) => {
                const isActive = button.id === 'wardrobe-only' ? wardrobeOnlyMode : activeButton === button.id
                return (
                  <Tooltip key={button.id}>
                    <TooltipTrigger>
                      <motion.button
                        layoutId={button.id}
                        type="button"
                        onMouseEnter={() => setHoveredButton(button.id)}
                        onMouseLeave={() => setHoveredButton(null)}
                        onClick={() => {
                          if (button.id === 'wardrobe-only') {
                            setWardrobeOnlyMode(!wardrobeOnlyMode)
                          } else {
                            setActiveButton(button.id)
                          }
                        }}
                        className={`
                          flex h-8 items-center justify-center rounded-[12px] p-2
                          transition-all duration-200
                          ${isActive
                            ? 'bg-white/[.07] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.10)]'
                            : 'text-white/65 hover:bg-white/10 hover:text-white/95'
                          }
                        `}
                      >
                        {/* icons inherit currentColor so active state appears "filled" */}
                        {button.icon}
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipPanel side="top" className="bg-[#1a1a1a] text-white border border-white/10">
                      {button.label}
                    </TooltipPanel>
                  </Tooltip>
                )
              })}
            </motion.div>

          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger>
                <button
                  type="button"
                  className="rounded-full p-2.5 text-white/50 transition-colors hover:bg-white/10 hover:text-white/80"
                >
                  <ElaraMicIcon />
                </button>
              </TooltipTrigger>
              <TooltipPanel side="top" className="bg-[#1a1a1a] text-white border border-white/10">
                Voice input
              </TooltipPanel>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="rounded-full bg-white/10 p-2.5 text-white/70 transition-all hover:bg-white/20 hover:text-white"
                >
                  <ElaraSendIcon />
                </button>
              </TooltipTrigger>
              <TooltipPanel side="top" className="bg-[#1a1a1a] text-white border border-white/10">
                Send message
              </TooltipPanel>
            </Tooltip>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showOversizeToast && (
          <div className="pointer-events-none fixed bottom-6 left-1/2 z-[60] -translate-x-1/2">
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
                className="pointer-events-auto flex items-center gap-3 rounded-2xl bg-[#141118] px-4 py-3 text-xs text-white shadow-[0_18px_60px_rgba(0,0,0,0.75)] border border-white/10 backdrop-blur-xl"
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
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/15 text-red-300 text-[11px] font-semibold p-2"
                >
                  !
                </motion.div>
                <div className="space-y-0.5">
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15, duration: 0.2 }}
                    className="font-medium"
                  >
                    Some files were too large
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.2 }}
                    className="text-[11px] text-white/70"
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

// Default export to keep existing imports working
export default function ChatInput(props: ChatInputProps) {
  return <ElaraChatInput {...props} />
}

