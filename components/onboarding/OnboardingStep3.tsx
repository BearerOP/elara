'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Logo from '../ui/Logo'
import { Button } from '@/components/ui/Button'
import { ChevronLeftIcon } from 'lucide-react'

interface OnboardingStep3Props {
  onNext: () => void
  onSkip: () => void
  onLater: () => void
  onBack?: () => void
  selectedBodyShape?: string | null
  onSelectBodyShape?: (bodyShape: string) => void
}

type ToneRow = {
  id: string
  label: string
  swatches: string[]
}

const toneRows: ToneRow[] = [
  {
    id: 'warm',
    label: 'WARM',
    swatches: [
      '#ECCAAA', '#EFD4B6', '#D8BB91', '#E2AD98', '#AA7537',
      '#D3AB79', '#966040', '#62340F', '#522A08', '#422408'
    ],
  },
  {
    id: 'cool',
    label: 'COOL',
    swatches: [
      '#FAEFEC', '#FEE3EE', '#FFE6E7', '#E3C6C2', '#C29081',
      '#DABABA', '#977160', '#613A31', '#482422', '#2E1416'
    ],
  },
  {
    id: 'neutral',
    label: 'NEUTRAL',
    swatches: [
      '#EDD9D4', '#EFD1C2', '#D3B1A1', '#F2D9C8', '#D9A094',
      '#DCBBA6', '#AC7B65', '#61301C', '#402216', '#270F08'
    ],
  },
]

export default function OnboardingStep3({
  onNext,
  onSkip,
  onLater,
  onBack,
  selectedBodyShape,
  onSelectBodyShape,
}: OnboardingStep3Props) {
  const [selectedTone, setSelectedTone] = React.useState<string | null>(selectedBodyShape || null)
  const [uploadedImage, setUploadedImage] = React.useState<{
    file: File
    name: string
    size: number
    previewUrl: string
  } | null>(null)
  const [showOversizeWarning, setShowOversizeWarning] = React.useState(false)

  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    if (!showOversizeWarning) return
    const id = window.setTimeout(() => setShowOversizeWarning(false), 3500)
    return () => window.clearTimeout(id)
  }, [showOversizeWarning])

  React.useEffect(() => {
    return () => {
      if (uploadedImage?.previewUrl) {
        URL.revokeObjectURL(uploadedImage.previewUrl)
      }
    }
  }, [uploadedImage])

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const MAX_BYTES = 5 * 1024 * 1024 // 5MB

    if (file.size > MAX_BYTES) {
      setShowOversizeWarning(true)
      event.target.value = ''
      return
    }

    const previewUrl = URL.createObjectURL(file)

    setUploadedImage((prev) => {
      if (prev?.previewUrl) {
        URL.revokeObjectURL(prev.previewUrl)
      }
      return {
        file,
        name: file.name,
        size: file.size,
        previewUrl,
      }
    })
  }

  const handleRemoveImage = () => {
    setUploadedImage((prev) => {
      if (prev?.previewUrl) {
        URL.revokeObjectURL(prev.previewUrl)
      }
      return null
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

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
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-1.5">
            <Logo size="lg" />
            <motion.div
              layoutId="onboarding-step-pill"
              className="rounded-full bg-white/10 px-2 py-0.5"
            >
              <span className="text-sm font-normal text-text-secondary  px-2.5 py-1 rounded-full">
                STEP 3/10
              </span>
            </motion.div>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <motion.h2
              layoutId="onboarding-title"
              className="text-center text-lg font-medium leading-[1.56] text-text-primary"
            >
              Let&apos;s find your best colors
            </motion.h2>
            <motion.p
              layoutId="onboarding-subtitle"
              className="max-w-[504px] w-full px-4 md:px-0 text-center text-sm md:text-base font-normal leading-[1.375] text-text-quaternary"
            >
              Upload a selfie and we&apos;ll suggest your ideal color palette based on skin
              undertones. Prefer to choose yourself? You can do that too.
            </motion.p>
          </div>
        </div>

        {/* Swatch grid */}
        <div className="mt-4 flex flex-col gap-3 md:gap-4">
          {toneRows.map((row) => (
            <div key={row.id} className="flex items-center justify-center gap-3 md:gap-5">
              <span className="w-14 md:w-16 text-right text-xs md:text-sm font-medium tracking-[0.18em] text-white/60 flex-shrink-0">
                {row.label}
              </span>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-3 justify-start">
                {row.swatches.map((color, index) => {
                  const id = `${row.id}-${index}`
                  const isSelected = selectedTone === id
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setSelectedTone(id)
                        onSelectBodyShape?.(id)
                      }}
                      className="relative h-6 w-6 md:h-8 md:w-8 rounded-full flex-shrink-0"
                      style={{ backgroundColor: color }}
                    >
                      {isSelected && (
                        <span className="absolute inset-[-2px] md:inset-[-3px] rounded-full border-2 border-white" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Divider + Upload CTA */}
        <div className="mt-2 flex flex-col items-center gap-3">
          <div className="flex w-full items-center gap-3">
            <div className="flex-1 border-t border-white/10" />
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-white/40">
              OR
            </span>
            <div className="flex-1 border-t border-white/10" />
          </div>
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          <Button
            variant="secondary"
            onClick={handleUploadClick}
            className="flex items-center gap-2 rounded-2xl border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white border hover:bg-white/10 hover:border-white/20"
          >
            {/* Simple upload icon */}

            <svg width="24px" height="24px" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_2120_2601)">
                <mask id="mask0_2120_2601" mask-type="luminance" maskUnits="userSpaceOnUse" x="3" y="4" width="50" height="51">
                  <path d="M53 4.5H3V54.5H53V4.5Z" fill="white" />
                  <path d="M32.6183 20.953C33.6608 20.5094 34.8392 20.5094 35.8817 20.953C37.0754 21.4612 38.0108 22.939 39.8815 25.8928L47.5598 38.0164C49.6731 41.3533 50.7308 43.0224 50.6258 44.4005C50.534 45.6014 49.9271 46.7041 48.9615 47.4239C47.8533 48.2501 45.8781 48.2499 41.9281 48.2499H26.5719C22.622 48.2499 20.6466 48.2501 19.5385 47.4239C18.573 46.7041 17.966 45.6014 17.8743 44.4005C17.7693 43.0224 18.8269 41.3533 20.9403 38.0164L28.6185 25.8928C30.4892 22.939 31.4246 21.4612 32.6183 20.953ZM17.5833 15.9583C20.4598 15.9583 22.7917 18.2901 22.7917 21.1666C22.7917 24.0431 20.4598 26.3749 17.5833 26.3749C14.7069 26.3749 12.375 24.0431 12.375 21.1666C12.375 18.2901 14.7069 15.9583 17.5833 15.9583Z" fill="black" />
                </mask>
                <g mask="url(#mask0_2120_2601)">
                  <path d="M40.5013 10.75C45.1036 10.75 48.8346 14.481 48.8346 19.0833V35.75C48.8346 40.3523 45.1036 44.0833 40.5013 44.0833H15.5013C10.8989 44.0833 7.16797 40.3523 7.16797 35.75V19.0833C7.16797 14.481 10.8989 10.75 15.5013 10.75H40.5013Z" fill="url(#paint0_linear_2120_2601)" />
                </g>
                <mask id="mask1_2120_2601" mask-type="luminance" maskUnits="userSpaceOnUse" x="12" y="15" width="39" height="34">
                  <path d="M32.6183 20.953C33.6608 20.5094 34.8392 20.5094 35.8817 20.953C37.0754 21.4612 38.0108 22.939 39.8815 25.8928L47.5598 38.0164C49.6731 41.3533 50.7308 43.0224 50.6258 44.4005C50.534 45.6014 49.9271 46.7041 48.9615 47.4239C47.8533 48.2501 45.8781 48.2499 41.9281 48.2499H26.5719C22.622 48.2499 20.6466 48.2501 19.5385 47.4239C18.573 46.7041 17.966 45.6014 17.8743 44.4005C17.7693 43.0224 18.8269 41.3533 20.9403 38.0164L28.6185 25.8928C30.4892 22.939 31.4246 21.4612 32.6183 20.953ZM17.5833 15.9583C20.4598 15.9583 22.7917 18.2901 22.7917 21.1666C22.7917 24.0431 20.4598 26.3749 17.5833 26.3749C14.7069 26.3749 12.375 24.0431 12.375 21.1666C12.375 18.2901 14.7069 15.9583 17.5833 15.9583Z" fill="white" />
                </mask>
                <g mask="url(#mask1_2120_2601)">
                  <g filter="url(#filter0_f_2120_2601)">
                    <path d="M40.5013 10.75C45.1036 10.75 48.8346 14.481 48.8346 19.0833V35.75C48.8346 40.3523 45.1036 44.0833 40.5013 44.0833H15.5013C10.8989 44.0833 7.16797 40.3523 7.16797 35.75V19.0833C7.16797 14.481 10.8989 10.75 15.5013 10.75H40.5013Z" fill="url(#paint1_linear_2120_2601)" />
                  </g>
                </g>
                <path d="M32.6183 20.953C33.6608 20.5094 34.8392 20.5094 35.8817 20.953C37.0754 21.4612 38.0108 22.939 39.8815 25.8928L47.5598 38.0164C49.6731 41.3533 50.7308 43.0224 50.6258 44.4005C50.534 45.6014 49.9271 46.7041 48.9615 47.4239C47.8533 48.2501 45.8781 48.2499 41.9281 48.2499H26.5719C22.622 48.2499 20.6466 48.2501 19.5385 47.4239C18.573 46.7041 17.966 45.6014 17.8743 44.4005C17.7693 43.0224 18.8269 41.3533 20.9403 38.0164L28.6185 25.8928C30.4892 22.939 31.4246 21.4612 32.6183 20.953ZM17.5833 15.9583C20.4598 15.9583 22.7917 18.2901 22.7917 21.1666C22.7917 24.0431 20.4598 26.3749 17.5833 26.3749C14.7069 26.3749 12.375 24.0431 12.375 21.1666C12.375 18.2901 14.7069 15.9583 17.5833 15.9583Z" fill="url(#paint2_linear_2120_2601)" />
                <path d="M41.9262 46.6868V48.2493H26.5698V46.6868H41.9262ZM32.6164 20.9543C33.6591 20.5104 34.8389 20.5104 35.8816 20.9543C37.075 21.4629 38.0114 22.9391 39.8816 25.892L47.5598 38.0158C49.6731 41.3526 50.7287 43.0218 50.6237 44.3999L50.5668 44.8455C50.376 45.871 49.8045 46.7933 48.9595 47.4233C47.8514 48.2493 45.876 48.2493 41.9262 48.2493V46.6868C43.9316 46.6868 45.3279 46.6862 46.3656 46.5912C47.415 46.4949 47.8275 46.3195 48.0256 46.172C48.6291 45.7222 49.0079 45.0324 49.0654 44.282C49.0841 44.0357 49.0129 43.5932 48.5323 42.6543C48.0575 41.7268 47.3125 40.5464 46.2393 38.8518L38.5612 26.7282C37.6096 25.2257 36.9514 24.1908 36.3883 23.4588C35.8252 22.7268 35.4939 22.4864 35.2693 22.3907C34.6177 22.1132 33.8804 22.1133 33.2287 22.3907C33.0041 22.4863 32.6729 22.7267 32.1098 23.4588C31.5466 24.1907 30.8883 25.2259 29.9368 26.7282L22.2587 38.8518C21.1856 40.5462 20.4406 41.7268 19.9658 42.6543C19.4851 43.5932 19.4119 44.0357 19.4307 44.282C19.4881 45.0324 19.8689 45.7222 20.4724 46.172C20.6708 46.3195 21.0823 46.4949 22.1305 46.5912C23.168 46.6862 24.5643 46.6868 26.5698 46.6868V48.2493C22.8679 48.2493 20.9008 48.2501 19.7562 47.5697L19.5386 47.4233C18.6936 46.7933 18.122 45.871 17.9313 44.8455L17.8743 44.3999C17.7693 43.0218 18.8249 41.3526 20.9383 38.0158L28.6164 25.892C30.37 23.1235 31.3016 21.6521 32.3945 21.0601L32.6164 20.9543Z" fill="url(#paint3_linear_2120_2601)" />
                <path d="M21.2292 21.1666C21.2292 19.153 19.5969 17.5208 17.5833 17.5208C15.5698 17.5208 13.9375 19.153 13.9375 21.1666C13.9375 23.1801 15.5698 24.8124 17.5833 24.8124V26.3749C14.7069 26.3749 12.375 24.0431 12.375 21.1666C12.375 18.2901 14.7069 15.9583 17.5833 15.9583C20.4598 15.9583 22.7917 18.2901 22.7917 21.1666C22.7917 24.0431 20.4598 26.3749 17.5833 26.3749V24.8124C19.5969 24.8124 21.2292 23.1801 21.2292 21.1666Z" fill="url(#paint4_linear_2120_2601)" />
              </g>

              <foreignObject x="33.957" y="4.1875" width="20.668" height="20">
                <path xmlns="http://www.w3.org/1999/xhtml"
                  className="backdrop-blur-[1.5px] [clip-path:url(#bgblur_1_2120_2601_clip_path)] h-full w-full">
                </path>
              </foreignObject>

              <path data-figma-bg-blur-radius="3" d="M45.7567 7.1875C47.8102 7.1875 48.8378 7.18712 49.6221 7.56861C50.3119 7.90413 50.8729 8.4397 51.2245 9.09814C51.6241 9.84683 51.6237 10.8277 51.6237 12.7879V15.5871C51.6237 17.5473 51.6241 18.5282 51.2245 19.2769C50.8729 19.9353 50.3119 20.4709 49.6221 20.8064C48.8378 21.1879 47.8102 21.1875 45.7567 21.1875H42.8241C40.7705 21.1875 39.743 21.1879 38.9587 20.8064C38.2689 20.4709 37.7078 19.9353 37.3563 19.2769C36.9566 18.5282 36.957 17.5473 36.957 15.5871V12.7879C36.957 10.8277 36.9566 9.84683 37.3563 9.09814C37.7078 8.4397 38.2689 7.90413 38.9587 7.56861C39.743 7.18712 40.7705 7.1875 42.8241 7.1875H45.7567ZM44.2939 10.25C43.7877 10.25 43.3773 10.6417 43.3773 11.125V13.3125H41.082C40.5758 13.3126 40.1654 13.7043 40.1654 14.1875C40.1654 14.6707 40.5758 15.0624 41.082 15.0625H43.3773V17.25C43.3773 17.7333 43.7877 18.125 44.2939 18.125C44.8002 18.125 45.2106 17.7333 45.2106 17.25V15.0625H47.4987C48.005 15.0625 48.4154 14.6708 48.4154 14.1875C48.4154 13.7042 48.005 13.3125 47.4987 13.3125H45.2106V11.125C45.2106 10.6417 44.8002 10.25 44.2939 10.25Z" fill="url(#paint5_linear_2120_2601)" />
              <path d="M45.7567 20.5312V21.1875H42.8241V20.5312H45.7567ZM50.9362 15.5871V12.7879C50.9362 11.797 50.9359 11.0929 50.8887 10.5422C50.8422 9.99919 50.7534 9.66278 50.6112 9.39636C50.3256 8.86141 49.8701 8.42654 49.3097 8.15393C49.0305 8.01819 48.6781 7.93341 48.1092 7.88904C47.5323 7.84406 46.7947 7.84375 45.7567 7.84375H42.8241C41.786 7.84375 41.0484 7.84406 40.4715 7.88904C39.9026 7.93341 39.5502 8.01819 39.2711 8.15393C38.7107 8.42654 38.2551 8.86141 37.9695 9.39636C37.8273 9.66278 37.7385 9.99919 37.692 10.5422C37.6449 11.0929 37.6445 11.797 37.6445 12.7879V15.5871C37.6445 16.578 37.6449 17.2821 37.692 17.8328C37.7385 18.3758 37.8273 18.7122 37.9695 18.9786C38.2551 19.5136 38.7107 19.9484 39.2711 20.2211C39.5502 20.3568 39.9026 20.4416 40.4715 20.4859C41.0484 20.531 41.786 20.5312 42.8241 20.5312V21.1875L41.4634 21.1816C40.371 21.1651 39.6712 21.1036 39.1091 20.873L38.9587 20.8064C38.3551 20.5128 37.85 20.066 37.4977 19.5178L37.3563 19.2769C36.9566 18.5282 36.957 17.5473 36.957 15.5871V12.7879C36.957 10.8277 36.9566 9.84683 37.3563 9.09814C37.7078 8.4397 38.2689 7.90414 38.9587 7.56861C39.5468 7.28253 40.2718 7.21137 41.4634 7.19349L42.8241 7.1875H45.7567C47.8102 7.1875 48.8378 7.18712 49.6221 7.56861C50.3119 7.90414 50.8729 8.4397 51.2245 9.09814C51.6241 9.84683 51.6237 10.8277 51.6237 12.7879V15.5871C51.6237 17.5473 51.6241 18.5282 51.2245 19.2769L51.083 19.5178C50.7308 20.066 50.2257 20.5128 49.6221 20.8064L49.4716 20.873C48.705 21.1874 47.6819 21.1875 45.7567 21.1875V20.5312C46.7947 20.5312 47.5323 20.531 48.1092 20.4859C48.6781 20.4416 49.0305 20.3568 49.3097 20.2211C49.8701 19.9484 50.3256 19.5136 50.6112 18.9786C50.7534 18.7122 50.8422 18.3758 50.8887 17.8328C50.9359 17.2821 50.9362 16.578 50.9362 15.5871Z" fill="url(#paint6_linear_2120_2601)" />

              <defs>
                <filter id="filter0_f_2120_2601" x="3.16797" y="6.75" width="49.668" height="41.3333" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_2120_2601" />
                </filter>

                <clipPath id="bgblur_1_2120_2601_clip_path" transform="translate(-33.957 -4.1875)">
                  <path d="M45.7567 7.1875C47.8102 7.1875 48.8378 7.18712 49.6221 7.56861C50.3119 7.90413 50.8729 8.4397 51.2245 9.09814C51.6241 9.84683 51.6237 10.8277 51.6237 12.7879V15.5871C51.6237 17.5473 51.6241 18.5282 51.2245 19.2769C50.8729 19.9353 50.3119 20.4709 49.6221 20.8064C48.8378 21.1879 47.8102 21.1875 45.7567 21.1875H42.8241C40.7705 21.1875 39.743 21.1879 38.9587 20.8064C38.2689 20.4709 37.7078 19.9353 37.3563 19.2769C36.9566 18.5282 36.957 17.5473 36.957 15.5871V12.7879C36.957 10.8277 36.9566 9.84683 37.3563 9.09814C37.7078 8.4397 38.2689 7.90413 38.9587 7.56861C39.743 7.18712 40.7705 7.1875 42.8241 7.1875H45.7567ZM44.2939 10.25C43.7877 10.25 43.3773 10.6417 43.3773 11.125V13.3125H41.082C40.5758 13.3126 40.1654 13.7043 40.1654 14.1875C40.1654 14.6707 40.5758 15.0624 41.082 15.0625H43.3773V17.25C43.3773 17.7333 43.7877 18.125 44.2939 18.125C44.8002 18.125 45.2106 17.7333 45.2106 17.25V15.0625H47.4987C48.005 15.0625 48.4154 14.6708 48.4154 14.1875C48.4154 13.7042 48.005 13.3125 47.4987 13.3125H45.2106V11.125C45.2106 10.6417 44.8002 10.25 44.2939 10.25Z" />
                </clipPath>

                <linearGradient id="paint0_linear_2120_2601" x1="28.0013" y1="10.75" x2="28.0013" y2="44.0833" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#575757" />
                  <stop offset="1" stopColor="#151515" />
                </linearGradient>
                <linearGradient id="paint1_linear_2120_2601" x1="28.0013" y1="10.75" x2="28.0013" y2="44.0833" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#575757" />
                  <stop offset="1" stopColor="#151515" />
                </linearGradient>
                <linearGradient id="paint2_linear_2120_2601" x1="31.5042" y1="15.9583" x2="31.5042" y2="48.2499" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E3E3E5" stop-opacity="0.6" />
                  <stop offset="1" stopColor="#BBBBC0" stop-opacity="0.6" />
                </linearGradient>
                <linearGradient id="paint3_linear_2120_2601" x1="34.2485" y1="20.6207" x2="34.2485" y2="36.6208" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stop-opacity="0" />
                </linearGradient>
                <linearGradient id="paint4_linear_2120_2601" x1="17.5833" y1="15.9583" x2="17.5833" y2="23.2499" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stop-opacity="0" />
                </linearGradient>
                <linearGradient id="paint5_linear_2120_2601" x1="44.2904" y1="7.1875" x2="44.2904" y2="21.1875" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E3E3E5" stop-opacity="0.6" />
                  <stop offset="1" stopColor="#BBBBC0" stop-opacity="0.6" />
                </linearGradient>
                <linearGradient id="paint6_linear_2120_2601" x1="44.2904" y1="7.1875" x2="44.2904" y2="15.9375" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stop-opacity="0" />
                </linearGradient>

                <clipPath id="clip0_2120_2601">
                  <rect width="50" height="50" fill="white" transform="translate(3 4.5)" />
                </clipPath>

              </defs>
            </svg>
            {uploadedImage ? 'Replace picture' : 'Upload a picture'}
          </Button>


          {uploadedImage && (
            <div className="mt-3 w-full max-w-xs">
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                <img
                  src={uploadedImage.previewUrl}
                  alt={uploadedImage.name}
                  className="h-32 w-full object-cover"
                />
                {/* Overlay with name + delete (always visible) */}
                <div className="pointer-events-auto absolute inset-0 flex flex-col justify-between bg-black/40">
                  <div className="flex items-start justify-end p-2">
                    <button
                      type="button"
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-white/80 hover:bg-black hover:text-white text-xs backdrop-blur-sm"
                      onClick={handleRemoveImage}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 pb-3 pt-6 text-xs font-medium text-white">
                    <div className="truncate">{uploadedImage.name}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
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
            disabled={!selectedTone && !uploadedImage}
            className="px-4 py-2 disabled:opacity-60 disabled:cursor-not-allowed bg-white text-black/80 hover:bg-white/80 hover:text-black/80 cursor-pointer"
          >
            Continue
          </Button>
        </div>
      </div>
      {/* Simple toast for oversize warning */}
      {showOversizeWarning && (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <div className="pointer-events-auto rounded-2xl border border-white/10 bg-black/85 px-4 py-3 text-xs text-white shadow-[0_18px_60px_rgba(0,0,0,0.75)]">
            <p className="font-medium">File is too large</p>
            <p className="mt-0.5 text-[11px] text-white/70">
              Images larger than 5MB can&apos;t be uploaded. Try a smaller file or compress it first.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}


