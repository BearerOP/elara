'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Link as LinkIcon, Copy, Check } from 'lucide-react'
import Logo, { ElaraLogoGradient } from '../ui/Logo'

interface ReferralModalProps {
  isOpen: boolean
  onClose: () => void
}

function generateRandomCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export default function ReferralModal({ isOpen, onClose }: ReferralModalProps) {
  const [inviteCode, setInviteCode] = useState<string>('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isOpen && !inviteCode) {
      setInviteCode(generateRandomCode())
    }
  }, [isOpen, inviteCode])

  const inviteLink = `https://elara.style/invite/${inviteCode}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full rounded-2xl border shadow-xl pointer-events-auto overflow-hidden"
              style={{
                maxWidth: '519px',
                background: 'linear-gradient(to bottom, #161724, #161616)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient background */}
              <div 
                className="relative w-full overflow-hidden rounded-t-2xl"
                style={{ height: '197px' }}
              >
                {/* Gradient background with image overlay */}
                <div className="absolute inset-0">
                  <img 
                    className="object-cover w-full h-full"
                    src="/images/gradient-background.svg"
                    alt="Gradient background"
                  />
                </div>

                {/* Badge */}
                <div className="absolute top-5 left-5">
                  <div className="px-4 py-1.5 rounded-full border border-white/10 bg-black">
                    <span className="text-sm font-medium text-white/70">
                      Earn 10+ credits
                    </span>
                  </div>
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>

                {/* Title and Logo */}
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <h2 
                    className="text-2xl font-semibold text-white/90"
                    style={{ lineHeight: '1.17' }}
                  >
                    Earn Credits,
                    <br />
                    Share the Style
                  </h2>
                  <Logo size="lg" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* How it works */}
                <div className="space-y-3">
                  <h3 
                    className="text-base font-normal text-white/60"
                    style={{ lineHeight: '1.26' }}
                  >
                    How it works :
                  </h3>
                  <div 
                    className="text-base font-medium text-white/80"
                    style={{ lineHeight: '2em' }}
                  >
                    <div className="flex items-start gap-2">
                      <span>⚡</span>
                      <span>Share your invite link</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span>👯‍♀️</span>
                      <span>They join and get 10 free styling credits</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span>🎁</span>
                      <span>You earn 10 credits when they plan their first outfit</span>
                    </div>
                  </div>
                </div>

                {/* Your invite link */}
                <div className="space-y-3">
                  <h3 
                    className="text-base font-normal text-white/60"
                    style={{ lineHeight: '1.26' }}
                  >
                    Your invite link :
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 flex items-center gap-4 px-4 py-3 rounded-xl bg-white/10">
                      <LinkIcon className="h-5 w-5 text-white flex-shrink-0" />
                      <span 
                        className="text-base font-medium text-white truncate"
                        style={{ lineHeight: '1.625' }}
                      >
                        {inviteLink}
                      </span>
                    </div>
                    <button
                      onClick={handleCopy}
                      className="px-4 py-2.5 rounded-xl bg-white font-medium text-base hover:bg-white/20 cursor-pointer transition-all duration-300 flex items-center gap-2 flex-shrink-0"
                      style={{ 
                        color: 'rgba(0, 0, 0, 0.8)',
                        lineHeight: '1.5',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.03)'
                        e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                        e.currentTarget.style.color = 'rgba(0, 0, 0, 0.8)'
                      }}
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        'Copy link'
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms and conditions */}
                <button 
                  className="text-sm font-medium text-white/60 hover:text-white/80 cursor-pointer transition-all duration-300"
                  style={{ lineHeight: '1.86' }}
                >
                  View terms and conditions
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

