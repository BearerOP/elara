'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Image as ImageIcon, Mail, Copy, Loader2 } from 'lucide-react'

interface AddToClosetModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload?: (files: File[]) => void
  userEmail?: string
}

export default function AddToClosetModal({
  isOpen,
  onClose,
  onUpload,
  userEmail = 'mehuagar@iu.edu',
}: AddToClosetModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const emailAddress = 'add@joinelara.com'

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setSelectedFiles(files)
      handleUpload(files)
    }
  }

  const handleUpload = async (files: File[]) => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          onUpload?.(files)
          setTimeout(() => {
            onClose()
            setSelectedFiles([])
            setUploadProgress(0)
          }, 1000)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleAddPhotosClick = () => {
    fileInputRef.current?.click()
  }

  if (!isOpen) return null

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
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.64)', backdropFilter: 'blur(16px)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, rgba(22, 23, 36, 1) 0%, rgba(22, 22, 22, 1) 37%)',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-5 border-b"
                style={{ borderColor: '#292929' }}
              >
                <h2 className="text-lg font-medium text-white">Add to closet</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex gap-4 p-6">
                {/* Left Section: Add with photos */}
                <div className="flex-1 flex flex-col justify-between gap-10 p-4 rounded-2xl">
                  <div className="flex flex-col gap-3">
                    <div className="flex-shrink-0">
                      <ImageIcon className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-medium text-white">Add with photos</h3>
                      <p
                        className="text-sm"
                        style={{ color: 'rgba(255, 255, 255, 0.64)' }}
                      >
                        Elara will modify the image to make sure it looks the best.
                      </p>
                    </div>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  <button
                    onClick={handleAddPhotosClick}
                    disabled={isUploading}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                      isUploading
                        ? 'bg-white/50 text-black'
                        : 'bg-white text-black hover:bg-white/90'
                    }`}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="text-base font-normal">
                          Uploading {selectedFiles.length} photos
                        </span>
                      </>
                    ) : (
                      <span className="text-base font-normal">Add photos</span>
                    )}
                  </button>
                </div>

                {/* Divider */}
                <div
                  className="w-px self-stretch"
                  style={{
                    background: 'linear-gradient(117deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 52%, rgba(255, 255, 255, 0) 100%)',
                  }}
                />

                {/* Right Section: Forward receipts */}
                <div className="flex-1 flex flex-col justify-between gap-10 p-4 rounded-2xl">
                  <div className="flex flex-col gap-3">
                    <div className="flex-shrink-0">
                      <Mail className="h-10 w-10 text-white" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-base font-medium text-white">Forward receipts</h3>
                      <p
                        className="text-sm"
                        style={{ color: 'rgba(255, 255, 255, 0.64)' }}
                      >
                        Forward your digital receipts to Elara from {userEmail}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p
                      className="text-sm"
                      style={{ color: 'rgba(255, 255, 255, 0.64)' }}
                    >
                      Forward to
                    </p>
                    <div
                      className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                    >
                      <span className="text-base font-normal text-white">{emailAddress}</span>
                      <button
                        onClick={handleCopyEmail}
                        className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.12)' }}
                      >
                        {copied ? (
                          <CheckIcon className="h-4 w-4 text-white" />
                        ) : (
                          <Copy className="h-4 w-4 text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 4L6 11L3 8" />
    </svg>
  )
}

