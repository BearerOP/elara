'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../ui/Logo'
import { Button } from '@/components/ui/Button'
import { CheckIcon } from '../icons'
import { ChevronLeftIcon } from 'lucide-react'

interface OnboardingStep5Props {
  onNext: () => void
  onSkip: () => void
  onLater: () => void
  onBack?: () => void
  initialData?: {
    heightUnit: 'ft' | 'cm'
    weightUnit: 'kg' | 'lbs'
    heightFeet: number
    heightInches: number
    heightCm: number
    weightKg: number
    weightLbs: number
    selectedFit: string | null
  }
  onDataChange?: (data: {
    heightUnit: 'ft' | 'cm'
    weightUnit: 'kg' | 'lbs'
    heightFeet: number
    heightInches: number
    heightCm: number
    weightKg: number
    weightLbs: number
    selectedFit: string | null
  }) => void
}

const fitOptions = [
  {
    id: 'slim',
    label: 'Slim',
    description: 'Apparel skims the shape of your body.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 10C15.5817 10 12 13.5817 12 18C12 22.4183 15.5817 26 20 26C24.4183 26 28 22.4183 28 18C28 13.5817 24.4183 10 20 10Z"
          fill="currentColor"
        />
        <path
          d="M10 30C10 28.8954 10.8954 28 12 28H28C29.1046 28 30 28.8954 30 30V32C30 33.1046 29.1046 34 28 34H12C10.8954 34 10 33.1046 10 32V30Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: 'regular',
    label: 'Regular',
    description: 'Apparel shaped loosely to your body.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 12H32V14H8V12ZM8 18H32V20H8V18ZM8 24H32V26H8V24ZM8 28H32V30H8V28Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'loose',
    label: 'Loose',
    description: 'Apparel hangs away from the body.',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 10C10.8954 10 10 10.8954 10 12V28C10 29.1046 10.8954 30 12 30H28C29.1046 30 30 29.1046 30 28V12C30 10.8954 29.1046 10 28 10H12Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M15 20H25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function OnboardingStep5({
  onNext,
  onSkip,
  onLater,
  onBack,
  initialData,
  onDataChange,
}: OnboardingStep5Props) {
  const [heightUnit, setHeightUnit] = React.useState<'ft' | 'cm'>(initialData?.heightUnit || 'ft')
  const [weightUnit, setWeightUnit] = React.useState<'kg' | 'lbs'>(initialData?.weightUnit || 'kg')
  const [heightFeet, setHeightFeet] = React.useState(initialData?.heightFeet || 6)
  const [heightInches, setHeightInches] = React.useState(initialData?.heightInches || 3)
  const [heightCm, setHeightCm] = React.useState(initialData?.heightCm || 190)
  const [weightKg, setWeightKg] = React.useState(initialData?.weightKg || 60)
  const [weightLbs, setWeightLbs] = React.useState(initialData?.weightLbs || 132)
  const [heightFeetInput, setHeightFeetInput] = React.useState((initialData?.heightFeet || 6).toString())
  const [heightInchesInput, setHeightInchesInput] = React.useState((initialData?.heightInches || 3).toString())
  const [heightCmInput, setHeightCmInput] = React.useState((initialData?.heightCm || 190).toString())
  const [weightKgInput, setWeightKgInput] = React.useState((initialData?.weightKg || 60).toString())
  const [weightLbsInput, setWeightLbsInput] = React.useState((initialData?.weightLbs || 132).toString())
  const [selectedFit, setSelectedFit] = React.useState<string | null>(initialData?.selectedFit || null)

  // Sync state changes to parent
  React.useEffect(() => {
    if (onDataChange) {
      onDataChange({
        heightUnit,
        weightUnit,
        heightFeet,
        heightInches,
        heightCm,
        weightKg,
        weightLbs,
        selectedFit,
      })
    }
  }, [heightUnit, weightUnit, heightFeet, heightInches, heightCm, weightKg, weightLbs, selectedFit, onDataChange])

  const [heightKey, setHeightKey] = React.useState(0)
  const [weightKey, setWeightKey] = React.useState(0)
  const [heightFeetKey, setHeightFeetKey] = React.useState(0)
  const [heightInchesKey, setHeightInchesKey] = React.useState(0)
  const [heightCmKey, setHeightCmKey] = React.useState(0)
  const [weightKgKey, setWeightKgKey] = React.useState(0)
  const [weightLbsKey, setWeightLbsKey] = React.useState(0)

  const handleHeightIncrement = (type: 'feet' | 'inches' | 'cm') => {
    if (heightUnit === 'ft') {
      if (type === 'feet') {
        setHeightFeet(Math.min(8, heightFeet + 1))
        setHeightFeetInput((Math.min(8, heightFeet + 1)).toString())
        setHeightFeetKey((prev) => prev + 1)
      }
      if (type === 'inches') {
        setHeightInches(Math.min(11, heightInches + 1))
        setHeightInchesInput((Math.min(11, heightInches + 1)).toString())
        setHeightInchesKey((prev) => prev + 1)
      }
    } else {
      setHeightCm(Math.min(250, heightCm + 1))
      setHeightCmInput((Math.min(250, heightCm + 1)).toString())
      setHeightCmKey((prev) => prev + 1)
    }
  }

  const handleHeightDecrement = (type: 'feet' | 'inches' | 'cm') => {
    if (heightUnit === 'ft') {
      if (type === 'feet') {
        setHeightFeet(Math.max(3, heightFeet - 1))
        setHeightFeetInput((Math.max(3, heightFeet - 1)).toString())
        setHeightFeetKey((prev) => prev + 1)
      }
      if (type === 'inches') {
        setHeightInches(Math.max(0, heightInches - 1))
        setHeightInchesInput((Math.max(0, heightInches - 1)).toString())
        setHeightInchesKey((prev) => prev + 1)
      }
    } else {
      setHeightCm(Math.max(100, heightCm - 1))
      setHeightCmInput((Math.max(100, heightCm - 1)).toString())
      setHeightCmKey((prev) => prev + 1)
    }
  }

  const handleWeightIncrement = () => {
    if (weightUnit === 'kg') {
      setWeightKg(Math.min(200, weightKg + 1))
      setWeightKgInput((Math.min(200, weightKg + 1)).toString())
      setWeightKgKey((prev) => prev + 1)
    } else {
      setWeightLbs(Math.min(440, weightLbs + 1))
      setWeightLbsInput((Math.min(440, weightLbs + 1)).toString())
      setWeightLbsKey((prev) => prev + 1)
    }
  }

  const handleWeightDecrement = () => {
    if (weightUnit === 'kg') {
      setWeightKg(Math.max(30, weightKg - 1))
      setWeightKgInput((Math.max(30, weightKg - 1)).toString())
      setWeightKgKey((prev) => prev + 1)
    } else {
      setWeightLbs(Math.max(66, weightLbs - 1))
      setWeightLbsInput((Math.max(66, weightLbs - 1)).toString())
      setWeightLbsKey((prev) => prev + 1)
    }
  }

  const handleHeightUnitChange = (unit: 'ft' | 'cm') => {
    if (heightUnit !== unit) {
      setHeightUnit(unit)
      setHeightKey((prev) => prev + 1)
    }
  }

  const handleWeightUnitChange = (unit: 'kg' | 'lbs') => {
    if (weightUnit !== unit) {
      setWeightUnit(unit)
      setWeightKey((prev) => prev + 1)
    }
  }

  const handleHeightFeetChange = (value: string) => {
    setHeightFeetInput(value)
    if (value === '') {
      return
    }
    const num = parseInt(value)
    if (!isNaN(num)) {
      if (num >= 3 && num <= 8) {
        setHeightFeet(num)
      } else if (num < 3) {
        setHeightFeet(3)
        setHeightFeetInput('3')
      } else if (num > 8) {
        setHeightFeet(8)
        setHeightFeetInput('8')
      }
    }
  }

  const handleHeightInchesChange = (value: string) => {
    setHeightInchesInput(value)
    if (value === '') {
      return
    }
    const num = parseInt(value)
    if (!isNaN(num)) {
      if (num >= 0 && num <= 11) {
        setHeightInches(num)
      } else if (num < 0) {
        setHeightInches(0)
        setHeightInchesInput('0')
      } else if (num > 11) {
        setHeightInches(11)
        setHeightInchesInput('11')
      }
    }
  }

  const handleHeightCmChange = (value: string) => {
    setHeightCmInput(value)
    if (value === '') {
      return
    }
    const num = parseInt(value)
    if (!isNaN(num)) {
      if (num >= 100 && num <= 250) {
        setHeightCm(num)
      } else if (num < 100) {
        setHeightCm(100)
        setHeightCmInput('100')
      } else if (num > 250) {
        setHeightCm(250)
        setHeightCmInput('250')
      }
    }
  }

  const handleWeightKgChange = (value: string) => {
    setWeightKgInput(value)
    if (value === '') {
      return
    }
    const num = parseInt(value)
    if (!isNaN(num)) {
      if (num >= 30 && num <= 200) {
        setWeightKg(num)
      } else if (num < 30) {
        setWeightKg(30)
        setWeightKgInput('30')
      } else if (num > 200) {
        setWeightKg(200)
        setWeightKgInput('200')
      }
    }
  }

  const handleWeightLbsChange = (value: string) => {
    setWeightLbsInput(value)
    if (value === '') {
      return
    }
    const num = parseInt(value)
    if (!isNaN(num)) {
      if (num >= 66 && num <= 440) {
        setWeightLbs(num)
      } else if (num < 66) {
        setWeightLbs(66)
        setWeightLbsInput('66')
      } else if (num > 440) {
        setWeightLbs(440)
        setWeightLbsInput('440')
      }
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
      <div className="flex flex-col gap-4 px-4 md:px-8 pt-4 md:pt-8">
        <div className="flex flex-col items-center gap-3">
          <Logo size="lg" />
          <motion.div
            layoutId="onboarding-step-pill"
            className="rounded-full bg-white/10 px-2 py-0.5"
          >
            <span className="text-sm font-normal text-text-secondary  px-2.5 py-1 rounded-full">
              STEP 5/10
            </span>
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <motion.h2
            layoutId="onboarding-title"
            className="text-center text-lg font-medium leading-[1.56] text-text-primary"
          >
            Fit matters
          </motion.h2>
          <motion.p
            layoutId="onboarding-subtitle"
            className="max-w-[504px] w-full px-4 md:px-0 text-center text-sm md:text-base font-normal leading-[1.375] text-text-quaternary"
          >
            Your height, weight, and fit preferences help us tailor the recommendations to your
            proportions.
          </motion.p>
        </div>
      </div>

      {/* Height and Weight Inputs */}
      <div className="mt-4 flex flex-col gap-3 px-4 md:px-8">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Height */}
          <div className="flex-1 rounded-card bg-[#202020] p-3 md:p-4">
            <div className="mb-3 md:mb-4 flex items-center justify-between">
              <span className="text-base md:text-lg font-medium text-text-primary">Height</span>
              <div className="flex items-center gap-1.5 md:gap-2">
                <button
                  type="button"
                  onClick={() => handleHeightUnitChange('cm')}
                  className={`px-1.5 md:px-2 py-0.5 md:py-1 text-xs md:text-sm transition-colors ${heightUnit === 'cm' ? 'text-text-primary' : 'text-text-secondary'
                    }`}
                >
                  cm
                </button>
                <button
                  type="button"
                  onClick={() => handleHeightUnitChange(heightUnit === 'ft' ? 'cm' : 'ft')}
                  className={`relative h-5 w-9 md:h-6 md:w-11 rounded-full transition-colors duration-200 ${heightUnit === 'ft' ? 'bg-[#7F56D9]' : 'bg-gray-400/30'
                    }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-4 w-4 md:h-5 md:w-5 rounded-full bg-white transition-transform duration-200 ${heightUnit === 'ft' ? 'translate-x-4 md:translate-x-5' : 'translate-x-0'
                      }`}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => handleHeightUnitChange('ft')}
                  className={`px-1.5 md:px-2 py-0.5 md:py-1 text-xs md:text-sm transition-colors ${heightUnit === 'ft' ? 'text-text-primary' : 'text-text-secondary'
                    }`}
                >
                  ft
                </button>
              </div>
            </div>
            <AnimatePresence mode="wait">
              {heightUnit === 'ft' ? (
                <motion.div
                  key="ft"
                  initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex gap-4 md:gap-6"
                >
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <div className="relative h-10 md:h-12 flex items-center">
                      <motion.input
                        key={`height-feet-${heightFeetKey}`}
                        type="number"
                        min="3"
                        max="8"
                        value={heightFeetInput}
                        onChange={(e) => handleHeightFeetChange(e.target.value)}
                        onBlur={(e) => {
                          if (e.target.value === '') {
                            setHeightFeetKey((prev) => prev + 1)
                            setHeightFeet(0)
                            setHeightFeetInput('0')
                          } else if (parseInt(e.target.value) < 3) {
                            setHeightFeetKey((prev) => prev + 1)
                            setHeightFeet(3)
                            setHeightFeetInput('3')
                          } else {
                            setHeightFeetInput(heightFeet.toString())
                          }
                        }}
                        initial={heightFeetKey > 0 ? { opacity: 0, y: 20, filter: 'blur(4px)' } : false}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="w-10 md:w-12 bg-transparent text-xl md:text-2xl font-semibold text-text-primary outline-none border-none"
                      />
                      <span className="text-xl md:text-2xl font-semibold text-text-primary pointer-events-none ml-0.5 md:ml-1">
                        ft
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5 md:gap-1">
                      <button
                        type="button"
                        onClick={() => handleHeightIncrement('feet')}
                        className="text-text-primary hover:opacity-80 transition-opacity"
                      >
                        <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 8L8 12H16L12 8Z"
                            fill="currentColor"
                            fillOpacity="0.64"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleHeightDecrement('feet')}
                        className="text-text-primary hover:opacity-80 transition-opacity"
                      >
                        <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 16L8 12H16L12 16Z"
                            fill="currentColor"
                            fillOpacity="0.64"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <div className="relative h-10 md:h-12 flex items-center">
                      <motion.input
                        key={`height-inches-${heightInchesKey}`}
                        type="number"
                        min="0"
                        max="11"
                        value={heightInchesInput}
                        onChange={(e) => handleHeightInchesChange(e.target.value)}
                        onBlur={(e) => {
                          if (e.target.value === '') {
                            setHeightInchesKey((prev) => prev + 1)
                            setHeightInches(0)
                            setHeightInchesInput('0')
                          } else {
                            setHeightInchesInput(heightInches.toString())
                          }
                        }}
                        initial={heightInchesKey > 0 ? { opacity: 0, y: 20, filter: 'blur(4px)' } : false}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="w-10 md:w-12 bg-transparent text-xl md:text-2xl font-semibold text-text-primary outline-none border-none"
                      />
                      <span className="text-xl md:text-2xl font-semibold text-text-primary pointer-events-none ml-0.5 md:ml-1">
                        inch
                      </span>
                    </div>
                    <div className="flex flex-col gap-0.5 md:gap-1">
                      <button
                        type="button"
                        onClick={() => handleHeightIncrement('inches')}
                        className="text-text-primary hover:opacity-80 transition-opacity"
                      >
                        <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 8L8 12H16L12 8Z"
                            fill="currentColor"
                            fillOpacity="0.64"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleHeightDecrement('inches')}
                        className="text-text-primary hover:opacity-80 transition-opacity"
                      >
                        <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M12 16L8 12H16L12 16Z"
                            fill="currentColor"
                            fillOpacity="0.64"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="cm"
                  initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex items-center gap-1.5 md:gap-2"
                >
                  <div className="relative h-10 md:h-12 flex items-center">
                    <motion.input
                      key={`height-cm-${heightCmKey}`}
                      type="number"
                      min="0"
                      max="250"
                      value={heightCmInput}
                      onChange={(e) => handleHeightCmChange(e.target.value)}
                      onBlur={(e) => {
                        if (e.target.value === '') {
                          setHeightCmKey((prev) => prev + 1)
                          setHeightCm(0)
                          setHeightCmInput('0')
                        } else if (parseInt(e.target.value) < 100) {
                          setHeightCmKey((prev) => prev + 1)
                          setHeightCm(100)
                          setHeightCmInput('100')
                        } else {
                          setHeightCmInput(heightCm.toString())
                        }
                      }}
                      initial={heightCmKey > 0 ? { opacity: 0, y: 20, filter: 'blur(4px)' } : false}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="w-12 md:w-14 bg-transparent text-xl md:text-2xl font-semibold text-text-primary outline-none border-none"
                    />
                    <span className="text-xl md:text-2xl font-semibold text-text-primary pointer-events-none ml-0.5 md:ml-1">
                      cm
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 md:gap-1">
                    <button
                      type="button"
                      onClick={() => handleHeightIncrement('cm')}
                      className="text-text-primary hover:opacity-80 transition-opacity"
                    >
                      <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 8L8 12H16L12 8Z"
                          fill="currentColor"
                          fillOpacity="0.64"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHeightDecrement('cm')}
                      className="text-text-primary hover:opacity-80 transition-opacity"
                    >
                      <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 16L8 12H16L12 16Z"
                          fill="currentColor"
                          fillOpacity="0.64"
                        />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Weight */}
          <div className="flex-1 rounded-card bg-[#202020] p-3 md:p-4">
            <div className="mb-3 md:mb-4 flex items-center justify-between">
              <span className="text-base md:text-lg font-medium text-text-primary">Weight</span>
              <div className="flex items-center gap-1.5 md:gap-2">
                <button
                  type="button"
                  onClick={() => handleWeightUnitChange('lbs')}
                  className={`px-1.5 md:px-2 py-0.5 md:py-1 text-xs md:text-sm transition-colors ${weightUnit === 'lbs' ? 'text-text-primary' : 'text-text-secondary'
                    }`}
                >
                  lbs
                </button>
                <button
                  type="button"
                  onClick={() => handleWeightUnitChange(weightUnit === 'kg' ? 'lbs' : 'kg')}
                  className={`relative h-5 w-9 md:h-6 md:w-11 rounded-full transition-colors duration-200 ${weightUnit === 'kg' ? 'bg-[#7F56D9]' : 'bg-gray-400/30'
                    }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 h-4 w-4 md:h-5 md:w-5 rounded-full bg-white transition-transform duration-200 ${weightUnit === 'kg' ? 'translate-x-4 md:translate-x-5' : 'translate-x-0'
                      }`}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => handleWeightUnitChange('kg')}
                  className={`px-1.5 md:px-2 py-0.5 md:py-1 text-xs md:text-sm transition-colors ${weightUnit === 'kg' ? 'text-text-primary' : 'text-text-secondary'
                    }`}
                >
                  kg
                </button>
              </div>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={weightKey}
                initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex items-center gap-2"
              >
                <div className="relative h-12 flex items-center">
                  {weightUnit === 'kg' ? (
                    <motion.input
                      key={`weight-kg-${weightKgKey}`}
                      type="number"
                      min="0"
                      max="200"
                      value={weightKgInput}
                      onChange={(e) => handleWeightKgChange(e.target.value)}
                      onBlur={(e) => {
                        if (e.target.value === '') {
                          setWeightKgKey((prev) => prev + 1)
                          setWeightKg(0)
                          setWeightKgInput('0')
                        } else if (parseInt(e.target.value) < 30) {
                          setWeightKgKey((prev) => prev + 1)
                          setWeightKg(30)
                          setWeightKgInput('30')
                        } else {
                          setWeightKgInput(weightKg.toString())
                        }
                      }}
                      initial={weightKgKey > 0 ? { opacity: 0, y: 20, filter: 'blur(4px)' } : false}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="w-14 bg-transparent text-2xl font-semibold text-text-primary outline-none border-none"
                    />
                  ) : (
                    <motion.input
                      key={`weight-lbs-${weightLbsKey}`}
                      type="number"
                      min="66"
                      max="440"
                      value={weightLbsInput}
                      onChange={(e) => handleWeightLbsChange(e.target.value)}
                      onBlur={(e) => {
                        if (e.target.value === '') {
                          setWeightLbsKey((prev) => prev + 1)
                          setWeightLbs(0)
                          setWeightLbsInput('0')
                        } else if (parseInt(e.target.value) < 66) {
                          setWeightLbsKey((prev) => prev + 1)
                          setWeightLbs(66)
                          setWeightLbsInput('66')
                        } else {
                          setWeightLbsInput(weightLbs.toString())
                        }
                      }}
                      initial={weightLbsKey > 0 ? { opacity: 0, y: 20, filter: 'blur(4px)' } : false}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="w-14 bg-transparent text-2xl font-semibold text-text-primary outline-none border-none"
                    />
                  )}
                  <span className="text-2xl font-semibold text-text-primary pointer-events-none ml-1">
                    {weightUnit}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={handleWeightIncrement}
                    className="text-text-primary hover:opacity-80 transition-opacity"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 8L8 12H16L12 8Z"
                        fill="currentColor"
                        fillOpacity="0.64"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleWeightDecrement}
                    className="text-text-primary hover:opacity-80 transition-opacity"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 16L8 12H16L12 16Z"
                        fill="currentColor"
                        fillOpacity="0.64"
                      />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Fit Preference */}
        <div className="flex flex-col gap-3">
          <span className="text-lg font-medium text-text-primary">Your fit preference</span>
          <div className="flex flex-wrap gap-3">
            {fitOptions.map((option, index) => {
              const isSelected = selectedFit === option.id
              // Mobile: First two cards take half width, third card takes full width
              // Desktop: All three cards take equal width (flex-1)
              const widthClass = index < 2
                ? 'flex-1 min-w-[calc(50%-0.375rem)] md:min-w-0'
                : 'w-full md:w-auto md:flex-1'

              // Third card (Loose) has horizontal layout, first two are vertical
              const isLooseCard = index === 2

              return (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedFit(option.id)}
                  className={`
                    relative flex ${isLooseCard ? 'flex-row items-center' : 'flex-col'} gap-3 rounded-card border p-4 ${widthClass}
                  
                    ${isSelected ? 'border-white/50 bg-white/10' : 'border-white/10 bg-white/5'}
                  `}
                >
                  <div className={`flex ${isLooseCard ? 'flex-row items-center gap-3 flex-1' : 'flex-col items-start gap-3'} justify-start`}>
                    <div className="text-text-primary w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
                      <svg className="w-full h-full" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {option.id === 'slim' && (
                          <>
                            <path
                              d="M20 10C15.5817 10 12 13.5817 12 18C12 22.4183 15.5817 26 20 26C24.4183 26 28 22.4183 28 18C28 13.5817 24.4183 10 20 10Z"
                              fill="currentColor"
                            />
                            <path
                              d="M10 30C10 28.8954 10.8954 28 12 28H28C29.1046 28 30 28.8954 30 30V32C30 33.1046 29.1046 34 28 34H12C10.8954 34 10 33.1046 10 32V30Z"
                              fill="currentColor"
                            />
                          </>
                        )}
                        {option.id === 'regular' && (
                          <path
                            d="M8 12H32V14H8V12ZM8 18H32V20H8V18ZM8 24H32V26H8V24ZM8 28H32V30H8V28Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        )}
                        {option.id === 'loose' && (
                          <>
                            <path
                              d="M12 10C10.8954 10 10 10.8954 10 12V28C10 29.1046 10.8954 30 12 30H28C29.1046 30 30 29.1046 30 28V12C30 10.8954 29.1046 10 28 10H12Z"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path d="M15 20H25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </>
                        )}
                      </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-medium text-text-primary text-start">
                        {option.label}
                      </span>
                      <span className="text-sm font-normal leading-[1.29] text-text-quaternary text-start">
                        {option.description}
                      </span>
                    </div>
                  </div>
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
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-[#292929] px-6 py-3">
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
            disabled={!selectedFit}
            className="px-4 py-2 disabled:opacity-60 disabled:cursor-not-allowed bg-white text-black/80 hover:bg-white/80 hover:text-black/80 cursor-pointer"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

