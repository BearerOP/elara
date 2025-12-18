'use client'

import { useState, useEffect, useCallback } from 'react'

export interface OnboardingData {
  step1: {
    selectedOptions: string[]
    completed: boolean
  }
  step2: {
    selectedGender: string | null
    completed: boolean
  }
  step3: {
    selectedBodyShape: string | null
    completed: boolean
  }
  step4: {
    selectedAge: string | null
    completed: boolean
  }
  step5: {
    heightUnit: 'ft' | 'cm'
    weightUnit: 'kg' | 'lbs'
    heightFeet: number
    heightInches: number
    heightCm: number
    weightKg: number
    weightLbs: number
    selectedFit: string | null
    completed: boolean
  }
  step6: {
    selectedVibes: string[]
    completed: boolean
  }
  step7: {
    selectedBrands: string[]
    completed: boolean
  }
  step8: {
    budgetRange: string | null
    completed: boolean
  }
  step9: {
    instagramUrl: string
    tiktokUrl: string
    completed: boolean
  }
  step10: {
    location: string
    temperatureUnit: 'celsius' | 'fahrenheit'
    completed: boolean
  }
}

const defaultOnboardingData: OnboardingData = {
  step1: { selectedOptions: [], completed: false },
  step2: { selectedGender: null, completed: false },
  step3: { selectedBodyShape: null, completed: false },
  step4: { selectedAge: null, completed: false },
  step5: {
    heightUnit: 'ft',
    weightUnit: 'kg',
    heightFeet: 6,
    heightInches: 3,
    heightCm: 190,
    weightKg: 60,
    weightLbs: 132,
    selectedFit: null,
    completed: false,
  },
  step6: { selectedVibes: [], completed: false },
  step7: { selectedBrands: [], completed: false },
  step8: { budgetRange: null, completed: false },
  step9: { instagramUrl: '', tiktokUrl: '', completed: false },
  step10: { location: '', temperatureUnit: 'celsius', completed: false },
}

export function useOnboardingState() {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(defaultOnboardingData)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('onboardingData')
    if (stored) {
      try {
        setOnboardingData(JSON.parse(stored))
      } catch (e) {
        console.error('Failed to parse onboarding data:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('onboardingData', JSON.stringify(onboardingData))
    }
  }, [onboardingData, isLoaded])

  const updateStep = useCallback(<K extends keyof OnboardingData>(
    step: K,
    data: Partial<OnboardingData[K]>
  ) => {
    setOnboardingData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        ...data,
      },
    }))
  }, [])

  const markStepComplete = useCallback((step: keyof OnboardingData) => {
    setOnboardingData((prev) => ({
      ...prev,
      [step]: {
        ...prev[step],
        completed: true,
      },
    }))
  }, [])

  const resetOnboarding = useCallback(() => {
    setOnboardingData(defaultOnboardingData)
    localStorage.removeItem('onboardingData')
  }, [])

  const getCompletedSteps = useCallback(() => {
    return Object.values(onboardingData).filter((step) => step.completed).length
  }, [onboardingData])

  const isOnboardingComplete = useCallback(() => {
    return getCompletedSteps() === 10
  }, [getCompletedSteps])

  return {
    onboardingData,
    updateStep,
    markStepComplete,
    resetOnboarding,
    getCompletedSteps,
    isOnboardingComplete,
    isLoaded,
  }
}

