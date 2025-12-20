'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Logo from '../ui/Logo'
import { Button } from '@/components/ui/Button'
import { CheckIcon } from '../icons'
import { ChevronLeftIcon } from 'lucide-react'

interface OnboardingStep4Props {
  onNext: () => void
  onSkip: () => void
  onLater: () => void
  onBack?: () => void
  selectedAge?: string | null
  onSelectAge?: (age: string) => void
}

const bodyTypeOptions = [
  {
    id: 'ectomorph',
    label: 'Ectomorph',
    image: '/images/onboarding/ectomorph.png',
  },
  {
    id: 'mesomorph',
    label: 'Mesomorph',
    image: '/images/onboarding/mesomorph.png',
  },
  {
    id: 'endomorph',
    label: 'Endomorph',
    image: '/images/onboarding/endomorph.png',
  },
]

export default function OnboardingStep4({
  onNext,
  onSkip,
  onLater,
  onBack,
  selectedAge,
  onSelectAge,
}: OnboardingStep4Props) {
  const [selectedBodyType, setSelectedBodyType] = React.useState<string | null>(selectedAge || null)

  return (
    <div className="flex flex-col relative">
      {/* Back Button - Top Left */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute left-6 top-6 z-10 p-2 text-white/60 hover:text-white transition-colors flex items-center gap-2"
        >
          <ChevronLeftIcon className="size-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
      )}

      {/* Header Section (shared layout with previous steps) */}
      <div className="flex flex-col gap-4 px-8 pt-16">
        <div className="flex flex-col items-center gap-3.5">
          <Logo size="sm" className='block md:hidden' />
          <Logo size="lg" className='hidden md:block' />
          <motion.div
            layoutId="onboarding-step-pill"
            className="rounded-full bg-white/10 px-2 py-0.5"
          >
            <span className="text-sm font-normal text-text-secondary  px-2.5 py-1 rounded-full">
              STEP 4/10
            </span>
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <motion.h2
            layoutId="onboarding-title"
            className="text-center text-lg font-medium leading-[1.56] text-text-primary"
          >
            Know your shape
          </motion.h2>
          <motion.p
            layoutId="onboarding-subtitle"
            className="max-w-[504px] w-full px-4 md:px-0 text-center text-sm md:text-base font-normal leading-[1.375] text-text-quaternary"
          >
            Tell us about your body type so we can suggest outfits that highlight your best
            features.
          </motion.p>
        </div>
      </div>

      {/* Body Type Options */}
      <div className="mt-8 flex justify-center gap-2 px-2 md:px-8 ">
        {bodyTypeOptions.map((option, index) => {
          const isSelected = selectedBodyType === option.id
          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedBodyType(option.id)
                onSelectAge?.(option.id)
              }}
              className={`
                relative flex flex-1 flex-col items-center gap-3 p-2 md:p-3 rounded-card border
                ${isSelected ? 'border-white/60' : 'border-white/10'}
              `}
            >
              <div className="relative w-full h-48 overflow-hidden rounded-lg bg-white flex items-center justify-center">
                <Image
                  src={option.image}
                  alt={option.label}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <span className="text-base font-medium text-text-primary">{option.label}</span>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-4 border border-white/10 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-text-primary text-background"
                >
                  <CheckIcon fill="black" className="text-black size-5" />
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between border-t border-[#292929] px-6 py-3">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={onLater}
            className="p-2 text-base font-normal text-text-secondary"
          >
            Setup later
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={onSkip} className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 cursor-pointer">
            Skip
          </Button>
          <Button
            variant="default"
            onClick={onNext}
            disabled={!selectedBodyType}
            className="px-4 py-2 disabled:opacity-60 disabled:cursor-not-allowed bg-white text-black/80 hover:bg-white/80 hover:text-black/80 cursor-pointer"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

