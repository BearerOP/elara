'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import StarIcon from '../icons/StarIcon'

export default function WardrobeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
      className="absolute bottom-6 right-6 z-10 flex gap-7 rounded-card bg-background-cardTertiary p-5"
    >
      <div className="flex w-[240px] flex-col gap-2">
        <div className="flex items-center gap-1">
          <h3 className="text-base font-medium text-text-primary">
            Unlock your style twin
          </h3>
          <StarIcon width={16} height={16} />
        </div>
        <p className="text-sm font-medium leading-[1.43] text-text-muted">
          Sync your wardrobe and let Elara evolve with you.
        </p>
      </div>
      <div className="relative h-[100px] w-[155px] overflow-hidden rounded-button">
        <Image
          src="/images/wardrobe-card-image.png"
          alt="Wardrobe"
          fill
          className="object-cover"
        />
      </div>
    </motion.div>
  )
}
