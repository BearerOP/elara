'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Logo from '../ui/Logo'
import { Button } from '@/components/ui/Button'
import CardStack, { StyleCard } from './CardStack'
import { ChevronLeftIcon } from 'lucide-react'

interface OnboardingStep7Props {
  onNext: () => void
  onSkip: () => void
  onLater: () => void
  onBack?: () => void
  selectedBrands?: string[]
  onSelectBrands?: (brands: string[]) => void
}

const brandCards: StyleCard[] = [
  {
    id: 'chanel',
    style: 'Chanel',
    type: 'Luxury',
    occasion: 'Iconic classics',
    region: 'Global',
    image: '/images/onboarding/brands/chanel.jpg',
    label: 'Chanel',
    kind: 'brand',
  },
  {
    id: 'dior',
    style: 'Dior',
    type: 'Luxury',
    occasion: 'Evening & couture',
    region: 'Global',
    image: '/images/onboarding/brands/dior.jpg',
    label: 'Dior',
    kind: 'brand',
  },
  {
    id: 'armani',
    style: 'Giorgio Armani',
    type: 'Tailored',
    occasion: 'Formal & suiting',
    region: 'Global',
    image: '/images/onboarding/brands/giorgio-armani.jpg',
    label: 'Giorgio Armani',
    kind: 'brand',
  },
  {
    id: 'givenchy',
    style: 'Givenchy',
    type: 'Modern',
    occasion: 'Night out',
    region: 'Global',
    image: '/images/onboarding/brands/givenchy.jpg',
    label: 'Givenchy',
    kind: 'brand',
  },
  {
    id: 'prada',
    style: 'Prada',
    type: 'Minimal',
    occasion: 'Everyday luxury',
    region: 'Global',
    image: '/images/onboarding/brands/prada.jpg',
    label: 'Prada',
    kind: 'brand',
  },
  {
    id: 'saint-laurent',
    style: 'Saint Laurent',
    type: 'Edgy',
    occasion: 'Evening & tailoring',
    region: 'Global',
    image: '/images/onboarding/brands/saint-laurent.jpg',
    label: 'Saint Laurent',
    kind: 'brand',
  },
  {
    id: 'versace',
    style: 'Versace',
    type: 'Bold',
    occasion: 'Statement looks',
    region: 'Global',
    image: '/images/onboarding/brands/versace.jpg',
    label: 'Versace',
    kind: 'brand',
  },
]

export default function OnboardingStep7({
  onNext,
  onSkip,
  onLater,
  onBack,
  selectedBrands = [],
  onSelectBrands,
}: OnboardingStep7Props) {
  // #region agent log
  React.useEffect(() => {
    fetch('http://127.0.0.1:7243/ingest/007d17b5-8e69-40c1-8f90-8932da0292c0', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'OnboardingStep7.tsx:92', message: 'OnboardingStep7 component mounted', data: { selectedBrandsCount: selectedBrands.length }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'skip-debug', hypothesisId: 'H5' }) }).catch(() => { });
  }, []);
  // #endregion
  const [cards, setCards] = React.useState<StyleCard[]>(brandCards)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [likedBrands, setLikedBrands] = React.useState<string[]>(selectedBrands)

  // Sync likedBrands to parent when it changes
  React.useEffect(() => {
    if (onSelectBrands) {
      onSelectBrands(likedBrands)
    }
  }, [likedBrands, onSelectBrands])
  const [showCompletion, setShowCompletion] = React.useState(false)
  const [hasSwiped, setHasSwiped] = React.useState(false)

  const handleSwipe = (direction: 'left' | 'right', card: StyleCard) => {
    setHasSwiped(true)
    if (direction === 'right') {
      setLikedBrands((prev) => [...prev, card.style])
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
    setCards(brandCards)
    setCurrentIndex(0)
    setLikedBrands([])
    setShowCompletion(false)
    setHasSwiped(false)
  }

  if (showCompletion) {
    const likedLabels = Array.from(new Set(likedBrands))
    let displayText = 'Your favorite brands — noted.'

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
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex flex-col gap-8 px-8 pt-16">
          <div className="flex flex-col items-center gap-6">
            <Logo size="lg" />
            <motion.div
              layoutId="onboarding-step-pill"
              className="rounded-full bg-white/10 px-2 py-0.5"
            >
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-sm font-normal text-text-secondary">
                STEP 7/10
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
                  Got it. Brands saved.
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
            {onBack && (
              <Button
                variant="ghost"
                onClick={onBack}
                className="p-2 pr-4 text-base font-normal text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2"
              >
                <ChevronLeftIcon className="size-4" />
                <span>Back</span>
              </Button>
            )}
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
    <div className="flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col gap-6 px-8 pt-16">
        <div className="flex flex-col items-center gap-6">
          <Logo size="lg" />
          <motion.div
            layoutId="onboarding-step-pill"
            className="rounded-full bg-white/10 px-2 py-0.5"
          >
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-sm font-normal text-text-secondary">
              STEP 7/10
            </span>
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <motion.h2
            layoutId="onboarding-title"
            className="text-center text-lg font-medium leading-[1.56] text-text-primary"
          >
            Favorite brands?
          </motion.h2>
          <motion.p
            layoutId="onboarding-subtitle"
            className="max-w-[504px] w-full px-4 md:px-0 text-center text-sm md:text-base font-normal leading-[1.375] text-text-quaternary"
          >
            Swipe through and tap the brands you love.
          </motion.p>
        </div>
      </div>

      {/* Brand Card Stack */}
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
          {onBack && (
            <Button
              variant="ghost"
              onClick={onBack}
              className="p-2 pr-4 text-base font-normal text-text-secondary hover:text-text-primary transition-colors flex items-center gap-2"
            >
              <ChevronLeftIcon className="size-4" />
              <span>Back</span>
            </Button>
          )}
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


