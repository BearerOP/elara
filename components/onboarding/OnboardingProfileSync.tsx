'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Logo from '../ui/Logo'
import { Button } from '@/components/ui/Button'
import ShinyText from '../ui/ShinyText'

interface OnboardingProfileSyncProps {
  onDone: () => void
}

export default function OnboardingProfileSync({ onDone }: OnboardingProfileSyncProps) {
  const [isReady, setIsReady] = React.useState(false)

  React.useEffect(() => {
    // Play subtle sync sound
    const audio = new Audio('/sounds/syncing.mp3')
    audio.volume = 0.7
    audio.play().catch(() => {
      // ignore autoplay failures
    })
    // audio.loop = true

    const timer = setTimeout(() => {
      setIsReady(true)
    }, 4000)

    return () => {
      clearTimeout(timer)
      audio.pause()
    }
  }, [])

  return (
    <div className="flex flex-col">
      <AnimatePresence mode="wait">
        {!isReady ? (
          <motion.div
            key="syncing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex flex-col items-center gap-8 px-8 pt-20 pb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-6"
              >
                {/* Animated icon replaced with syncing GIF */}
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/onboarding/syncing.gif"
                    alt="Syncing animation"
                    width={80}
                    height={80}
                    className="size-16"
                    priority
                  />
                </div>

                {/* Elara Profile label */}
                <div className="flex flex-col items-center gap-1">
                  <Logo size="sm" className='md:block hidden' />
                  <Logo size="lg" className='block md:hidden' />
                  <span className="text-xs font-medium tracking-[0.28em] text-text-quaternary">
                    PROFILE
                  </span>
                </div>
              </motion.div>

              <div className="mt-4 flex flex-col items-center gap-2">
                <ShinyText
                  text="Your fashion brain is syncing..."
                  disabled={false}
                  speed={2.2}
                  className='text-center text-base font-medium '
                />
                <p className="max-w-md text-center text-sm text-text-quaternary">
                  We&apos;re processing your picks to fine-tune your Elara Profile. This
                  means smarter suggestions, better outfit combos, and recommendations
                  you&apos;ll actually want to wear.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ready"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="flex flex-col items-center gap-8 px-8 pt-20 pb-16">
              <div className="flex flex-col items-center gap-4">
                <Logo size="sm" className='md:block hidden' />
                <Logo size="lg" className='block md:hidden' />
                <span className="text-xs font-medium tracking-[0.28em] text-text-quaternary">
                  PROFILE
                </span>
              </div>

              <div className="flex flex-col items-center gap-3">
                <h2 className="text-center text-lg font-medium text-text-primary">
                  You&apos;re all set ✨˝
                </h2>
                <p className="max-w-md text-center text-[15px] text-text-quaternary">
                  Your Elara Profile is ready. We&apos;ve matched your style, colors, and
                  favorites to create recommendations tailored just for you.
                </p>
                <p className="mt-1 max-w-md text-center text-[13px] text-text-disabled">
                  Note: You can make changes to your profile anytime from settings.
                </p>
              </div>

              <Button
                variant="default"
                onClick={onDone}
                className="mt-2 px-6 py-2 bg-white text-black/80 hover:bg-white/80 hover:text-black/80 cursor-pointer"
              >
                Take Me to Elara
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


