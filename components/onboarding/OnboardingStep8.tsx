'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Logo from '../ui/Logo'
import { Button } from '@/components/ui/Button'
import CardStack, { StyleCard } from './CardStack'
import { ChevronLeftIcon } from 'lucide-react'

interface OnboardingStep8Props {
  onNext: () => void
  onSkip: () => void
  onLater: () => void
  onBack?: () => void
  selectedBudget?: string | null
  onSelectBudget?: (budget: string | null) => void
}

const colorCards: StyleCard[] = [
  {
    id: 'mauve',
    style: 'Mauve',
    type: 'Soft',
    occasion: 'Everyday',
    region: 'Global',
    color: '#B56B7A',
    label: 'MAUVE',
    kind: 'color',
  },
  {
    id: 'neutrals',
    style: 'Neutrals',
    type: 'Essentials',
    occasion: 'All day',
    region: 'Global',
    color: '#B8A89A',
    label: 'NEUTRALS',
    kind: 'color',
  },
  {
    id: 'monochrome',
    style: 'Monochrome',
    type: 'Minimal',
    occasion: 'City',
    region: 'Global',
    color: '#2B2B2F',
    label: 'MONOCHROME',
    kind: 'color',
  },
  {
    id: 'earthy',
    style: 'Earthy tones',
    type: 'Warm',
    occasion: 'Casual',
    region: 'Global',
    color: '#9C6A4C',
    label: 'EARTHY',
    kind: 'color',
  },
  {
    id: 'pastels',
    style: 'Pastels',
    type: 'Soft',
    occasion: 'Daytime',
    region: 'Global',
    color: '#E4BFD4',
    label: 'PASTELS',
    kind: 'color',
  },
  {
    id: 'bold',
    style: 'Bold colors',
    type: 'Statement',
    occasion: 'Night',
    region: 'Global',
    color: '#D04255',
    label: 'BOLD',
    kind: 'color',
  },
]

export default function OnboardingStep8({
  onNext,
  onSkip,
  onLater,
  onBack,
  selectedBudget,
  onSelectBudget,
}: OnboardingStep8Props) {
  const [cards, setCards] = React.useState<StyleCard[]>(colorCards)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [likedColors, setLikedColors] = React.useState<string[]>(selectedBudget ? [selectedBudget] : [])

  // Sync likedColors to parent - use first liked color as budget
  React.useEffect(() => {
    if (onSelectBudget) {
      onSelectBudget(likedColors.length > 0 ? likedColors[0] : null)
    }
  }, [likedColors, onSelectBudget])
  const [showCompletion, setShowCompletion] = React.useState(false)
  const [hasSwiped, setHasSwiped] = React.useState(false)

  const handleSwipe = (direction: 'left' | 'right', card: StyleCard) => {
    setHasSwiped(true)
    if (direction === 'right') {
      setLikedColors((prev) => [...prev, card.style])
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

  const handleRestart = () => {
    setCards(colorCards)
    setCurrentIndex(0)
    setLikedColors([])
    setShowCompletion(false)
    setHasSwiped(false)
  }

  if (showCompletion) {
    const likedLabels = Array.from(new Set(likedColors))
    let displayText = 'Your go-to colors — noted.'

    if (likedLabels.length > 0) {
      if (likedLabels.length <= 3) {
        const last = likedLabels[likedLabels.length - 1]
        const others = likedLabels.slice(0, -1)
        displayText =
          others.length > 0
            ? `${others.join(', ')}, and ${last} — noted.`
            : `${last} — noted.`
      } else {
        displayText = `${likedLabels.slice(0, 3).join(', ')}, and ${likedLabels.length - 3
          } more — noted.`
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

        {/* Header */}
        <div className="flex flex-col gap-8 px-8 pt-16">
          <div className="flex flex-col items-center gap-6">
            <Logo size="lg" />
            <motion.div
              layoutId="onboarding-step-pill"
              className="rounded-full bg-white/10 px-2 py-0.5"
            >
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-sm font-normal text-text-secondary">
                STEP 8/10
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
            className="w-full max-w-md rounded-card border border-white/10 bg-white/5 p-8"
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
                  Got it. Colors saved.
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
                onClick={handleRestart}
                className="flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                <span>Do it again</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 20 20"
                >
                  <g data-transform-wrapper="on" transform="translate(20 20) scale(-1 -1)">
                    <path
                      d="m5,5.101c1.271-1.297,3.041-2.101,5-2.101,3.866,0,7,3.134,7,7s-3.134,7-7,7c-2.792,0-5.203-1.635-6.326-4"
                      fill="none"
                      stroke="#f7f8f8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
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
                </svg>
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
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-sm font-normal text-text-secondary">
              STEP 8/10
            </span>
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <motion.h2
            layoutId="onboarding-title"
            className="text-center text-lg font-medium leading-[1.56] text-text-primary"
          >
            What colors do you usually wear?
          </motion.h2>
          <motion.p
            layoutId="onboarding-subtitle"
            className="max-w-[504px] w-full px-4 md:px-0 text-center text-sm md:text-base font-normal leading-[1.375] text-text-quaternary"
          >
            Pick from your go-to shades. We&apos;ll use these to build outfits and
            suggest pieces you&apos;ll actually want to wear.
          </motion.p>
        </div>
      </div>

      {/* Color Card Stack */}
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


