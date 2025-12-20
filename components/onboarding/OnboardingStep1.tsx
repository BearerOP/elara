'use client'

import { motion } from 'framer-motion'
import Logo from '../ui/Logo'
import { Button } from '@/components/ui/Button'
import ClosetIcon from '../icons/ClosetIcon'
import GrowthIcon from '../icons/GrowthIcon'
import ShoppingIcon from '../icons/ShoppingIcon'
import { CheckIcon } from '../icons'

interface OnboardingStep1Props {
  onNext: () => void
  onSkip: () => void
  onLater: () => void
  selectedOptions: string[]
  onSelectOption: (option: string) => void
}

const options = [
  {
    id: 'build-wardrobe',
    title: 'Build a new wardrobe',
    description: "I'm starting fresh and want curated outfit suggestions.",
    icon: 'closet',
  },
  {
    id: 'utilise-wardrobe',
    title: 'Utilise wardrobe',
    description: 'Help me create new looks from my existing closet.',
    icon: 'growth',
  },
  {
    id: 'shop-mindfully',
    title: 'Shop more mindfully',
    description: 'Discover pieces that match my style and needs.',
    icon: 'shopping',
  },
]

export default function OnboardingStep1({
  onNext,
  onSkip,
  onLater,
  selectedOptions,
  onSelectOption,
}: OnboardingStep1Props) {
  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col gap-8 px-4 md:px-8 pt-8 md:pt-16">
        <div className="flex flex-col items-center gap-6">
          {/* Logo and Step Indicator */}
          <div className="flex flex-col items-center gap-3.5">
            <Logo size="sm" className='block md:hidden' />
            <Logo size="lg" className='hidden md:block' />
            <motion.div
              layoutId="onboarding-step-pill"
              className="rounded-full bg-white/10 px-2 py-0.5"
            >
              <span className="text-sm font-normal text-text-secondary  px-2.5 py-1 mt-2 rounded-full">
                STEP 1/10
              </span>
            </motion.div>
          </div>

          {/* Title and Description */}
          <div className="flex flex-col items-center gap-1.5">
            <motion.h2
              layoutId="onboarding-title"
              className="text-center text-lg font-medium leading-[1.56] text-text-primary"
            >
              What brings you to Elara?
            </motion.h2>
            <motion.p
              layoutId="onboarding-subtitle"
              className="max-w-[504px] w-full px-4 md:px-0 text-center text-sm md:text-base font-normal leading-[1.375] text-text-quaternary"
            >
              Whether you're building a fresh wardrobe or making the most of
              what you already own—we'll help you shop mindfully and dress with
              intention.
            </motion.p>
          </div>
        </div>

        {/* Options */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          {options.map((option, index) => {
            const isSelected = selectedOptions.includes(option.id)
            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectOption(option.id)}
                className={`
                  relative flex flex-1 flex-row md:flex-col items-center md:items-start gap-4 md:gap-10 rounded-card border p-4 md:p-5
                  ${isSelected
                    ? 'border-white/30 bg-white/10'
                    : 'border-white/10 bg-white/5'
                  }
                `}
              >
                {/* Check Icon in top-right */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-text-primary text-background"
                  >
                    <CheckIcon fill="black" className="text-black size-5" />
                  </motion.div>
                )}

                <div className="flex flex-row md:flex-col items-center md:items-start w-full gap-4 md:gap-2">
                  {/* Icon */}
                  <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center flex-shrink-0">
                    {option.icon === 'closet' && <ClosetIcon className="w-6 h-6 md:w-8 md:h-8" />}
                    {option.icon === 'growth' && <GrowthIcon className="w-8 h-7 md:w-[54px] md:h-[47px]" />}
                    {option.icon === 'shopping' && <ShoppingIcon className="w-6 h-6 md:w-8 md:h-8" />}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col items-start gap-0.5 md:gap-1 flex-1">
                    <h3 className="text-base font-medium leading-[1.25] text-text-primary text-left">
                      {option.title}
                    </h3>
                    <p className="text-sm font-normal leading-[1.29] text-text-quaternary text-left pr-6 md:pr-0">
                      {option.description}
                    </p>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
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
            disabled={selectedOptions.length === 0}
            className="px-4 py-2 disabled:opacity-60 disabled:cursor-not-allowed bg-white text-black/80 hover:bg-white/80 hover:text-black/80 cursor-pointer"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

