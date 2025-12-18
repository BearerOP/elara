'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Gift } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import ReferralModal from './ReferralModal'

interface WardrobeHeaderProps {
  credits: number
  maxCredits: number
  isProcessing?: boolean
  processedCount?: number
  totalProcessing?: number
}

export function WardrobeHeader({
  credits,
  maxCredits,
  isProcessing = false,
  processedCount = 0,
  totalProcessing = 0,
}: WardrobeHeaderProps) {
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false)

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a]">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <h2
            className="text-xl font-medium text-white"
            style={{ lineHeight: '1.26' }}
          >
            Wardrobe
          </h2>

          {/* Processing Indicator */}
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 px-3 py-2 rounded-full border"
              style={{
                backgroundColor: 'rgba(25, 118, 210, 0.24)',
                borderColor: 'rgba(25, 118, 210, 0.48)',
              }}
            >
              <span
                className="text-base font-normal"
                style={{ color: 'rgba(255, 255, 255, 0.72)' }}
              >
                Your images are being processed. Eta 5 mins.
              </span>
              <div
                className="flex items-center gap-2 px-2 py-1 rounded-full"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.16)' }}
              >
                <Loader2 className="h-5 w-5 text-white animate-spin" />
                <span className="text-sm font-normal text-white">
                  {processedCount}/{totalProcessing} Processed
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Credits */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2a2a2a]">
            <span
              className="text-sm font-medium"
              style={{ color: 'rgba(255, 255, 255, 0.72)' }}
            >
              {credits}/{maxCredits} Credits left
            </span>
          </div>

          {/* Gift icon */}
          <button
            onClick={() => setIsReferralModalOpen(true)}
            className="text-white/72 hover:text-white transition-colors"
          >
            <Gift className="h-5 w-5" />
          </button>

          {/* Avatar */}
          <Avatar className="h-10 w-10">
            <AvatarImage src="/images/user-avatar.png" />
            <AvatarFallback className="text-white text-xs">U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Referral Modal */}
      <ReferralModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
      />
    </>
  )
}

export default WardrobeHeader

