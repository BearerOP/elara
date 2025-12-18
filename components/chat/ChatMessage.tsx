'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ChatMessageProps {
  message: string
  isUser?: boolean
  timestamp?: string
}

export default function ChatMessage({
  message,
  isUser = false,
  timestamp,
}: ChatMessageProps) {
  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex justify-end px-6 py-4"
      >
        <div className="max-w-[489px] rounded-[20px] rounded-br-none bg-white/8 px-4 py-4">
          <p className="text-base font-medium leading-[1.5] text-text-secondary">
            {message}
          </p>
        </div>
      </motion.div>
    )
  }

  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="flex flex-col gap-4 px-6 py-4"
      >
      <div className="max-w-[737px] whitespace-pre-line">
        <p className="font-dm-sans text-base font-normal leading-[1.75] text-text-secondary">
          {message}
        </p>
      </div>
      <div className="flex items-center gap-1">
        <button className="flex items-center gap-1 rounded-full border border-white/10-secondary bg-background-card px-3 py-1">
          <span className="text-sm font-medium text-text-secondary">
            Good response
          </span>
        </button>
      </div>
    </motion.div>
  )
}

