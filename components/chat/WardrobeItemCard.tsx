'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { WardrobeItem } from '@/lib/wardrobeData'

interface WardrobeItemCardProps {
  item: WardrobeItem
  isSelected: boolean
  onClick: () => void
  layoutId?: string
}

export default function WardrobeItemCard({
  item,
  isSelected,
  onClick,
  layoutId,
}: WardrobeItemCardProps) {
  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      className={`group relative flex flex-col gap-2 p-2.5 rounded-3xl cursor-pointer transition-colors ${
        isSelected ? 'ring-2 ring-white/20' : ''
      }`}
      style={{ 
        backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
        aspectRatio: "3:4",
        minWidth: '200px'
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image Container */}
      <div
        className="relative w-full rounded-[17px] overflow-hidden bg-white/5 flex-1"
        style={{ aspectRatio: '220/254', minHeight: 0 }}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="240px"
          />
        ) : (
          <div className="w-full h-full bg-white/5" />
        )}

        {/* Overlay when selected */}
        {isSelected && (
          <div
            className="absolute inset-0 flex flex-col items-center rounded-2xl  justify-center gap-2 border border-white/10"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.32)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18L15 24L27 12" />
            </svg>
            <p className="text-base font-medium text-white">Opened in side panel</p>
          </div>
        )}
      </div>

      {/* Item Info */}
      <div className="flex flex-col gap-0.5 flex-shrink-0">
        <p
          className="text-sm font-medium text-white line-clamp-1"
          style={{ lineHeight: '1.4' }}
        >
          {item.name}
        </p>
        <div className="flex items-center gap-1 text-xs">
          <span className="text-white/72">{item.category}</span>
          <span className="text-white/72">•</span>
          <span className="text-white/72">{item.brand}</span>
        </div>
      </div>
    </motion.div>
  )
}

