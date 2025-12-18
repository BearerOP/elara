'use client'

import { useState, useEffect } from 'react'
import ChatInterface from './ChatInterface'
import WelcomeModal from '../onboarding/WelcomeModal'
import OnboardingModal from '../onboarding/OnboardingModal'
import { useOnboardingState } from '@/hooks/useOnboardingState'

export default function ChatInterfaceWithOnboarding() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingKey, setOnboardingKey] = useState(0)
  const onboardingState = useOnboardingState()

  // Always show welcome modal when the chat route mounts
  useEffect(() => {
      setShowWelcome(true)
  }, [])

  const handleWelcomeStart = () => {
    setShowWelcome(false)
    setShowOnboarding(true)
  }

  const handleWelcomeClose = () => {
    setShowWelcome(false)
  }

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
  }

  const handleOnboardingClose = () => {
    setShowOnboarding(false)
  }

  const handleOpenOnboarding = () => {
    setOnboardingKey(prev => prev + 1) // Force remount by changing key
    setShowOnboarding(true)
  }

  return (
    <>
      <ChatInterface 
        onboardingState={onboardingState}
        onOpenOnboarding={handleOpenOnboarding}
      />
      <WelcomeModal
        isOpen={showWelcome}
        onClose={handleWelcomeClose}
        onStart={handleWelcomeStart}
      />
      <OnboardingModal
        key={onboardingKey}
        isOpen={showOnboarding}
        onClose={handleOnboardingClose}
        onComplete={handleOnboardingComplete}
        onboardingState={onboardingState}
      />
    </>
  )
}
