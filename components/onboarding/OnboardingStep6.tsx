'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Logo from '../ui/Logo'
import { Button } from '@/components/ui/Button'
import CardStack, { StyleCard } from './CardStack'
import { ChevronLeftIcon } from 'lucide-react'
import { generateStyleCards } from '@/lib/styleCardGenerator'

interface OnboardingStep6Props {
  onNext: () => void
  onSkip: () => void
  onLater: () => void
  onBack?: () => void
  selectedVibes?: string[]
  onSelectVibes?: (vibes: string[]) => void
  selectedGender?: string | null
}

export default function OnboardingStep6({
  onNext,
  onSkip,
  onLater,
  onBack,
  selectedVibes = [],
  onSelectVibes,
  selectedGender,
}: OnboardingStep6Props) {
  // Generate initial cards based on gender - memoized to prevent regeneration on every render
  const initialStyleCards = React.useMemo(() => generateStyleCards(selectedGender), [selectedGender])

  const [cards, setCards] = React.useState<StyleCard[]>(initialStyleCards)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [likedStyles, setLikedStyles] = React.useState<string[]>(selectedVibes)

  // Update cards when gender changes
  React.useEffect(() => {
    setCards(generateStyleCards(selectedGender))
    setCurrentIndex(0)
  }, [selectedGender])

  // Sync likedStyles to parent when it changes
  React.useEffect(() => {
    if (onSelectVibes) {
      onSelectVibes(likedStyles)
    }
  }, [likedStyles, onSelectVibes])
  const [showCompletion, setShowCompletion] = React.useState(false)
  const [isRotating, setIsRotating] = React.useState(false)

  const handleSwipe = (direction: 'left' | 'right', card: StyleCard) => {
    if (direction === 'right') {
      setLikedStyles([...likedStyles, card.style])
    }
  }

  const handleIndexChange = (newIndex: number) => {
    setCurrentIndex(newIndex)
    if (newIndex >= cards.length) {
      setShowCompletion(true)
    }
  }

  const handleComplete = () => {
    setShowCompletion(true)
  }

  const handleDoItAgain = () => {
    if (isRotating) return // Prevent multiple clicks

    setIsRotating(true)

    // After 1.5 seconds, proceed with the action
    setTimeout(() => {
      setCards(generateStyleCards(selectedGender))
      setCurrentIndex(0)
      setLikedStyles([])
      setShowCompletion(false)
      setIsRotating(false)
    }, 1500)
  }

  if (showCompletion) {
    const likedStyleLabels = Array.from(new Set(likedStyles))
    let displayText = 'Your preferences — noted.'

    if (likedStyleLabels.length > 0) {
      if (likedStyleLabels.length <= 3) {
        const lastStyle = likedStyleLabels[likedStyleLabels.length - 1]
        const otherStyles = likedStyleLabels.slice(0, -1)
        if (otherStyles.length > 0) {
          displayText = `${otherStyles.join(', ')}, and ${lastStyle} — noted.`
        } else {
          displayText = `${lastStyle} — noted.`
        }
      } else {
        displayText = `${likedStyleLabels.slice(0, 3).join(', ')}, and ${likedStyleLabels.length - 3} more — noted.`
      }
    }

    return (
      <div className="flex flex-col relative">
        {/* Back Button - Top Left */}
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-4 left-4 md:top-6 md:left-6 z-10 p-2 text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1 group"
          >
            <ChevronLeftIcon className="size-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
        )}

        {/* Header Section */}
        <div className="flex flex-col gap-8 px-8 pt-16">
          <div className="flex flex-col items-center gap-6">
            <Logo size="lg" />
            <motion.div
              layoutId="onboarding-step-pill"
              className="rounded-full bg-white/10 px-2 py-0.5"
            >
              <span className="text-sm font-normal text-text-secondary  px-2.5 py-1 rounded-full">
                STEP 6/10
              </span>
            </motion.div>
          </div>
        </div>

        {/* Completion Card */}
        <div className="mt-8 flex flex-col items-center gap-8 px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md rounded-3xl border border-white/10 bg-black/10 p-8"
          >
            <div className="flex flex-col items-center gap-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                    fill="white"
                  />
                </svg>
              </motion.div>

              <div className="flex flex-col items-center gap-2">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center text-lg font-medium text-text-primary"
                >
                  Got it. You&apos;ve got great taste.
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center text-base font-normal text-text-quaternary"
                >
                  {displayText}
                </motion.p>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={handleDoItAgain}
                disabled={isRotating}
                className="flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Do it again</span>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 20 20"
                  animate={isRotating ? { rotate: 0 } : { rotate: 360 }}
                  transition={
                    isRotating
                      ? {
                        duration: 1.5,
                        ease: 'easeOut',
                        repeat: 0,
                      }
                      : { duration: 0 }
                  }
                >
                  <g data-transform-wrapper="on" transform="translate(20 20) scale(-1 -1)">
                    <path
                      d="m5,5.101c1.271-1.297,3.041-2.101,5-2.101,3.866,0,7,3.134,7,7s-3.134,7-7,7c-2.792,0-5.203-1.635-6.326-4"
                      fill="none"
                      stroke="#f7f8f8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      data-color="color-2"
                    ></path>
                    <polygon
                      points="4.367 3.044 3.771 6.798 7.516 6.145 4.367 3.044"
                      stroke="#f7f8f8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      fill="#f7f8f8"
                    ></polygon>
                  </g>
                </motion.svg>
              </motion.button>
            </div>
          </motion.div>
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
            <Button
              variant="ghost"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                if (onSkip) {
                  onSkip()
                }
              }}
              className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 cursor-pointer"
            >
              Skip
            </Button>
            <Button
              variant="default"
              onClick={() => {
                onNext()
              }}
              className="px-4 py-2 bg-white text-black/80 hover:bg-white/80 hover:text-black/80 cursor-pointer"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col relative">
      {/* Back Button - Top Left */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-4 left-4 md:top-6 md:left-6 z-10 p-2 text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1 group"
        >
          <ChevronLeftIcon className="size-5" />
          <span className="text-sm font-medium">Back</span>
        </button>
      )}

      {/* Header Section */}
      <div className="flex flex-col gap-6 px-8 pt-16">
        <div className="flex flex-col items-center gap-6">
          <Logo size="lg" />
          <motion.div
            layoutId="onboarding-step-pill"
            className="rounded-full bg-white/10 px-2 py-0.5"
          >
            <span className="text-sm font-normal text-text-secondary  px-2.5 py-1 rounded-full">
              STEP 6/10
            </span>
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <motion.h2
            layoutId="onboarding-title"
            className="text-center text-lg font-medium leading-[1.56] text-text-primary"
          >
            Your vibe, your style
          </motion.h2>
          <motion.p
            layoutId="onboarding-subtitle"
            className="max-w-[504px] w-full px-4 md:px-0 text-center text-sm md:text-base font-normal leading-[1.375] text-text-quaternary"
          >
            From bold streetwear to romantic pastels <br />choose what feels most you.
          </motion.p>
        </div>
      </div>

      {/* Card Stack */}
      <div className="mt-6 px-8">
        <CardStack
          cards={cards}
          currentIndex={currentIndex}
          onSwipe={handleSwipe}
          onComplete={handleComplete}
          showArrows={true}
          onIndexChange={handleIndexChange}
        />
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
            disabled={currentIndex < cards.length}
            className="px-4 py-2 disabled:opacity-60 disabled:cursor-not-allowed bg-white text-black/80 hover:bg-white/80 hover:text-black/80 cursor-pointer"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}
