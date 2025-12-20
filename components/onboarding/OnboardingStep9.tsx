'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Logo from '../ui/Logo'
import { Button } from '@/components/ui/Button'
import { InstagramIcon, TikTokIcon } from '../icons'
import { ChevronLeftIcon } from 'lucide-react'

interface OnboardingStep9Props {
  onNext: () => void
  onSkip: () => void
  onLater: () => void
  onBack?: () => void
  initialData?: {
    instagramUrl: string
    tiktokUrl: string
  }
  onDataChange?: (data: { instagramUrl: string; tiktokUrl: string }) => void
}

function validateInstagramUrl(url: string): boolean {
  if (!url) return true
  try {
    const parsed = new URL(url)
    return /instagram\.com$/.test(parsed.hostname)
  } catch {
    return false
  }
}

function validateTiktokUrl(url: string): boolean {
  if (!url) return true
  try {
    const parsed = new URL(url)
    return /tiktok\.com$/.test(parsed.hostname)
  } catch {
    return false
  }
}

export default function OnboardingStep9({
  onNext,
  onSkip,
  onLater,
  onBack,
  initialData,
  onDataChange,
}: OnboardingStep9Props) {
  const [instagramUrl, setInstagramUrl] = React.useState(initialData?.instagramUrl || '')
  const [tiktokUrl, setTiktokUrl] = React.useState(initialData?.tiktokUrl || '')

  // Sync state changes to parent
  React.useEffect(() => {
    if (onDataChange) {
      onDataChange({ instagramUrl, tiktokUrl })
    }
  }, [instagramUrl, tiktokUrl, onDataChange])
  const [instagramError, setInstagramError] = React.useState<string | null>(null)
  const [tiktokError, setTiktokError] = React.useState<string | null>(null)

  const handleInstagramBlur = () => {
    if (!instagramUrl) {
      setInstagramError(null)
      return
    }
    setInstagramError(
      validateInstagramUrl(instagramUrl)
        ? null
        : 'Enter a valid Instagram profile URL.'
    )
  }

  const handleTiktokBlur = () => {
    if (!tiktokUrl) {
      setTiktokError(null)
      return
    }
    setTiktokError(
      validateTiktokUrl(tiktokUrl)
        ? null
        : 'Enter a valid TikTok profile URL.'
    )
  }

  const handleContinue = () => {
    const instaValid = validateInstagramUrl(instagramUrl)
    const tiktokValid = validateTiktokUrl(tiktokUrl)

    setInstagramError(
      !instaValid && instagramUrl ? 'Enter a valid Instagram profile URL.' : null
    )
    setTiktokError(
      !tiktokValid && tiktokUrl ? 'Enter a valid TikTok profile URL.' : null
    )

    if ((!instaValid && instagramUrl) || (!tiktokValid && tiktokUrl)) {
      return
    }

    onNext()
  }

  const hasValidationError = Boolean(instagramError || tiktokError)
  const hasAtLeastOneUrl = Boolean(instagramUrl.trim() || tiktokUrl.trim())
  const canContinue = hasAtLeastOneUrl && !hasValidationError

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
      <div className="flex flex-col gap-4 px-8 pt-10 md:pt-16">
        <div className="flex flex-col items-center gap-4">
          <Logo size="sm" className='block md:hidden' />
          <Logo size="lg" className='hidden md:block' />
          <motion.div
            layoutId="onboarding-step-pill"
            className="rounded-full bg-white/10 px-2 py-0.5"
          >
            <span className="rounded-full px-2.5 py-1 text-sm font-normal text-text-secondary">
              STEP 9/10
            </span>
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <motion.h2
            layoutId="onboarding-title"
            className="text-center text-lg font-medium leading-[1.56] text-text-primary"
          >
            Want us to learn from your style?
          </motion.h2>
          <motion.p
            layoutId="onboarding-subtitle"
            className="max-w-[560px] w-full px-4 md:px-0 text-center text-sm md:text-base font-normal leading-[1.375] text-text-quaternary"
          >
            Add your Instagram or TikTok and we&apos;ll get to know your taste better.
            Don&apos;t worry — we only analyze your feed, not post anything.
          </motion.p>
        </div>
      </div>

      {/* Social Inputs */}
      <div className="mt-8 flex flex-col gap-6 px-4 md:px-8 mb-4 md:pb-6">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Instagram Card */}
          <div className="rounded-[20px] bg-[#202020] px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]">
                <InstagramIcon size={24} />
              </div>
              <span className="text-sm font-medium text-text-primary">
                Instagram
              </span>
            </div>
            <div className="mt-4">
              <input
                type="url"
                value={instagramUrl}
                onChange={(e) => {
                  setInstagramUrl(e.target.value)
                  if (instagramError) setInstagramError(null)
                }}
                onBlur={handleInstagramBlur}
                placeholder="Paste your profile URL"
                className={`mt-2 w-full rounded-[12px] border px-4 py-3 text-sm text-text-primary placeholder:text-text-disabled bg-white/5 focus:outline-none transition-colors duration-200 ${instagramError
                  ? 'border-red-500/70 focus:border-red-400'
                  : 'border-white/10 focus:border-white/30'
                  }`}
              />
              {instagramError && (
                <p className="mt-1 text-xs text-red-400">{instagramError}</p>
              )}
            </div>
          </div>

          {/* TikTok Card */}
          <div className="rounded-[20px] bg-[#202020] px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black">
                <TikTokIcon size={24} />
              </div>
              <span className="text-sm font-medium text-text-primary">
                TikTok
              </span>
            </div>
            <div className="mt-4">
              <input
                type="url"
                value={tiktokUrl}
                onChange={(e) => {
                  setTiktokUrl(e.target.value)
                  if (tiktokError) setTiktokError(null)
                }}
                onBlur={handleTiktokBlur}
                placeholder="Paste your profile URL"
                className={`mt-2 w-full rounded-[12px] border px-4 py-3 text-sm text-text-primary placeholder:text-text-disabled bg-white/5 focus:outline-none transition-colors duration-200 ${tiktokError
                  ? 'border-red-500/70 focus:border-red-400'
                  : 'border-white/10 focus:border-white/30'
                  }`}
              />
              {tiktokError && (
                <p className="mt-1 text-xs text-red-400">{tiktokError}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-2 flex items-center justify-between border-t border-[#292929] px-6 py-3">
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
            onClick={handleContinue}
            disabled={!canContinue}
            className="px-4 py-2 disabled:opacity-60 disabled:cursor-not-allowed bg-white text-black/80 hover:bg-white/80 hover:text-black/80 cursor-pointer"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}


