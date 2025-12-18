'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Logo from '../ui/Logo'
import { Button } from '@/components/ui/Button'
import { ChevronLeftIcon } from 'lucide-react'

interface OnboardingStep10Props {
  onNext: () => void
  onSkip: () => void
  onLater: () => void
  onBack?: () => void
  initialData?: {
    location: string
    temperatureUnit: 'celsius' | 'fahrenheit'
  }
  onDataChange?: (data: { location: string; temperatureUnit: 'celsius' | 'fahrenheit' }) => void
}

const MAX_BYTES = 5 * 1024 * 1024 // 5MB

export default function OnboardingStep10({
  onNext,
  onSkip,
  onLater,
  onBack,
  initialData,
  onDataChange,
}: OnboardingStep10Props) {
  const [file, setFile] = React.useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [isUploading, setIsUploading] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [error, setError] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const startFakeUpload = () => {
    setIsUploading(true)
    setProgress(0)
    const start = performance.now()
    const duration = 1200

    const tick = (time: number) => {
      const elapsed = time - start
      const ratio = Math.min(1, elapsed / duration)
      setProgress(Math.round(ratio * 100))
      if (ratio < 1) {
        requestAnimationFrame(tick)
      } else {
        setIsUploading(false)
      }
    }

    requestAnimationFrame(tick)
  }

  const handleFileSelected = (selected: File | null) => {
    if (!selected) return
    if (selected.size > MAX_BYTES) {
      setError('Image must be smaller than 5MB.')
      return
    }
    setError(null)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    const url = URL.createObjectURL(selected)
    setFile(selected)
    setPreviewUrl(url)
    startFakeUpload()
  }

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0] ?? null
    handleFileSelected(f)
  }

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    const f = e.dataTransfer.files?.[0] ?? null
    handleFileSelected(f)
  }

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isDragging) setIsDragging(true)
  }

  const handleDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (isDragging) setIsDragging(false)
  }

  const handleRemove = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setFile(null)
    setPreviewUrl(null)
    setProgress(0)
    setIsUploading(false)
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleContinue = () => {
    onNext()
  }

  const handleSkip = () => {
    // Always proceed to profile sync when skipping
    onSkip()
  }

  const fileSizeLabel =
    file &&
    `${(file.size / 1024 / 1024).toFixed(2)} MB · ${file.type
      .replace('image/', '')
      .toUpperCase()}`

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
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-sm font-normal text-text-secondary">
              STEP 10/10
            </span>
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <motion.h2
            layoutId="onboarding-title"
            className="text-center text-lg font-medium leading-[1.56] text-text-primary"
          >
            Meet your virtual twin
          </motion.h2>
          <motion.p
            layoutId="onboarding-subtitle"
            className="max-w-[560px] w-full px-4 md:px-0 text-center text-sm md:text-base font-normal leading-[1.375] text-text-quaternary"
          >
            Upload a full-body image and we&apos;ll create your virtual try-on model.
            You&apos;ll see outfit previews on a digital version of you.
          </motion.p>
        </div>
      </div>

      <div className="mt-8 px-8 pb-4">
        {/* Hidden input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={handleInputChange}
        />

        {!previewUrl ? (
          <motion.div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`flex h-[170px] w-full cursor-pointer flex-col items-center justify-center rounded-[20px] border px-6 text-center text-sm transition-colors duration-200 ${isDragging ? 'border-white/40 bg-white/5' : 'border-white/10 bg-black/20'
              }`}
          >
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 20 20"><polyline points="7.25 5.75 10 3 12.75 5.75" fill="none" stroke="#f7f8f8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" data-color="color-2"></polyline><line x1="10" y1="13" x2="10" y2="3" fill="none" stroke="#f7f8f8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" data-color="color-2"></line><path d="m6,9.07c-1.216.268-2.168,1.277-2.328,2.557l-.25,2c-.224,1.791,1.172,3.372,2.977,3.372h7.203c1.804,0,3.201-1.582,2.977-3.372l-.25-2c-.16-1.281-1.113-2.289-2.328-2.557" fill="none" stroke="#f7f8f8" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>
            </div>
            <p className="text-sm text-text-primary">
              <span className="font-medium">Drop your image here</span>{' '}
              <span className="text-[#7E8BFF] underline">or Click to upload</span>
            </p>
            <p className="mt-1 text-xs text-text-quaternary">PNG or JPG · Max 5MB</p>
            {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
          </motion.div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="relative flex h-[220px] w-full items-center justify-center overflow-hidden ">
              <img
                src={previewUrl}
                alt={file?.name ?? 'Uploaded full-body'}
                className="h-full max-h-[220px] w-auto object-contain rounded-[20px] border-2 border-white/40"
              />
              {isUploading && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                  <div className="h-1.5 w-40 overflow-hidden rounded-full ">
                    <div
                      className="h-full rounded-full bg-white/80"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="mt-2 text-xs text-text-secondary">
                    Uploading… {progress}%
                  </span>
                </div>
              )}
              <button
                type="button"
                onClick={handleRemove}
                className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-xs text-white/80 hover:bg-black hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-text-secondary">
              <div className="truncate">
                <span className="font-medium text-text-primary">
                  {file?.name ?? 'Uploaded image'}
                </span>
                {fileSizeLabel && (
                  <span className="ml-2 text-text-quaternary">{fileSizeLabel}</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-medium text-[#7E8BFF] hover:underline"
              >
                Replace
              </button>
            </div>
          </div>
        )}
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
          <Button variant="ghost" onClick={handleSkip} className="px-4 py-2 bg-white/10 text-white hover:bg-white/20 cursor-pointer">
            Skip
          </Button>
          <Button
            variant="default"
            onClick={handleContinue}
            disabled={!file}
            className="px-4 py-2 disabled:opacity-60 disabled:cursor-not-allowed bg-white text-black/80 hover:bg-white/80 hover:text-black/80 cursor-pointer"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}


