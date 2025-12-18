'use client'

import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OnboardingStep1 from './OnboardingStep1'
import OnboardingStep2 from './OnboardingStep2'
import OnboardingStep3 from './OnboardingStep3'
import OnboardingStep4 from './OnboardingStep4'
import OnboardingStep5 from './OnboardingStep5'
import OnboardingStep6 from './OnboardingStep6'
import OnboardingStep7 from './OnboardingStep7'
import OnboardingStep8 from './OnboardingStep8'
import OnboardingStep9 from './OnboardingStep9'
import OnboardingStep10 from './OnboardingStep10'
import OnboardingProfileSync from './OnboardingProfileSync'
import { useOnboardingState } from '@/hooks/useOnboardingState'

interface OnboardingModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
  onboardingState?: ReturnType<typeof useOnboardingState>
}

export default function OnboardingModal({
  isOpen,
  onClose,
  onComplete,
  onboardingState,
}: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)
  const hasLoadedInitialState = useRef(false)

  // Reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      hasLoadedInitialState.current = false
      setCurrentStep(1)
      setIsAnimating(false)
    }
  }, [isOpen])

  // Reset to step 1 when modal opens
  useLayoutEffect(() => {
    if (isOpen) {
      setCurrentStep(1)
    }
  }, [isOpen])

  // Determine if this is first-time onboarding (no completed steps)
  const isFirstTime = onboardingState ? onboardingState.getCompletedSteps() === 0 : true

  // Local state for each step - initialized from onboardingState when modal opens
  const [localStep1, setLocalStep1] = useState<string[]>([])
  const [localStep2, setLocalStep2] = useState<string | null>(null)
  const [localStep3, setLocalStep3] = useState<string | null>(null)
  const [localStep4, setLocalStep4] = useState<string | null>(null)
  const [localStep5, setLocalStep5] = useState({
    heightUnit: 'ft' as 'ft' | 'cm',
    weightUnit: 'kg' as 'kg' | 'lbs',
    heightFeet: 6,
    heightInches: 3,
    heightCm: 190,
    weightKg: 60,
    weightLbs: 132,
    selectedFit: null as string | null,
  })
  const [localStep6, setLocalStep6] = useState<string[]>([])
  const [localStep7, setLocalStep7] = useState<string[]>([])
  const [localStep8, setLocalStep8] = useState<string | null>(null)
  const [localStep9, setLocalStep9] = useState({ instagramUrl: '', tiktokUrl: '' })

  // Initialize local state from onboardingState when modal opens
  useEffect(() => {
    if (isOpen && onboardingState && !hasLoadedInitialState.current) {
      const data = onboardingState.onboardingData

      setLocalStep1(data.step1.selectedOptions || [])
      setLocalStep2(data.step2.selectedGender || null)
      setLocalStep3(data.step3.selectedBodyShape || null)
      setLocalStep4(data.step4.selectedAge || null)
      setLocalStep5({
        heightUnit: data.step5.heightUnit || 'ft',
        weightUnit: data.step5.weightUnit || 'kg',
        heightFeet: data.step5.heightFeet || 6,
        heightInches: data.step5.heightInches || 3,
        heightCm: data.step5.heightCm || 190,
        weightKg: data.step5.weightKg || 60,
        weightLbs: data.step5.weightLbs || 132,
        selectedFit: data.step5.selectedFit || null,
      })
      setLocalStep6(data.step6.selectedVibes || [])
      setLocalStep7(data.step7.selectedBrands || [])
      setLocalStep8(data.step8.budgetRange || null)
      setLocalStep9({
        instagramUrl: data.step9.instagramUrl || '',
        tiktokUrl: data.step9.tiktokUrl || '',
      })

      hasLoadedInitialState.current = true
    }
  }, [isOpen, onboardingState])

  // Helper to check if local state differs from saved state
  const hasStep1Changed = () => {
    if (!onboardingState) return localStep1.length > 0
    const saved = onboardingState.onboardingData.step1.selectedOptions || []
    return JSON.stringify([...localStep1].sort()) !== JSON.stringify([...saved].sort())
  }

  const hasStep2Changed = () => {
    if (!onboardingState) return localStep2 !== null
    return localStep2 !== (onboardingState.onboardingData.step2.selectedGender || null)
  }

  const hasStep3Changed = () => {
    if (!onboardingState) return localStep3 !== null
    return localStep3 !== (onboardingState.onboardingData.step3.selectedBodyShape || null)
  }

  const hasStep4Changed = () => {
    if (!onboardingState) return localStep4 !== null
    return localStep4 !== (onboardingState.onboardingData.step4.selectedAge || null)
  }

  const hasStep5Changed = () => {
    if (!onboardingState) return localStep5.selectedFit !== null
    const saved = onboardingState.onboardingData.step5
    return (
      localStep5.heightUnit !== saved.heightUnit ||
      localStep5.weightUnit !== saved.weightUnit ||
      localStep5.heightFeet !== saved.heightFeet ||
      localStep5.heightInches !== saved.heightInches ||
      localStep5.heightCm !== saved.heightCm ||
      localStep5.weightKg !== saved.weightKg ||
      localStep5.weightLbs !== saved.weightLbs ||
      localStep5.selectedFit !== (saved.selectedFit || null)
    )
  }

  const hasStep6Changed = () => {
    if (!onboardingState) return localStep6.length > 0
    const saved = onboardingState.onboardingData.step6.selectedVibes || []
    return JSON.stringify([...localStep6].sort()) !== JSON.stringify([...saved].sort())
  }

  const hasStep7Changed = () => {
    if (!onboardingState) return localStep7.length > 0
    const saved = onboardingState.onboardingData.step7.selectedBrands || []
    return JSON.stringify([...localStep7].sort()) !== JSON.stringify([...saved].sort())
  }

  const hasStep8Changed = () => {
    if (!onboardingState) return localStep8 !== null
    return localStep8 !== (onboardingState.onboardingData.step8.budgetRange || null)
  }

  const hasStep9Changed = () => {
    if (!onboardingState) return localStep9.instagramUrl !== '' || localStep9.tiktokUrl !== ''
    const saved = onboardingState.onboardingData.step9
    return localStep9.instagramUrl !== (saved.instagramUrl || '') ||
      localStep9.tiktokUrl !== (saved.tiktokUrl || '')
  }

  // Unified step handler with animation control
  const handleStepChange = (nextStep: number, shouldUpdateState: boolean, updateFn?: () => void) => {
    if (isAnimating) return

    setIsAnimating(true)

    if (shouldUpdateState && updateFn) {
      updateFn()
    }

    // Change step immediately - AnimatePresence will handle exit/enter
    setCurrentStep(nextStep)

    // Reset animation flag after transitions complete
    setTimeout(() => {
      setIsAnimating(false)
    }, 350)
  }

  // Handler for step 1
  const handleStep1Continue = () => {
    handleStepChange(2, isFirstTime || hasStep1Changed(), () => {
      onboardingState?.updateStep('step1', {
        selectedOptions: localStep1,
        completed: localStep1.length > 0,
      })
    })
  }

  const handleStep1Skip = () => {
    handleStepChange(2, false)
  }

  // Handler for step 2
  const handleStep2Continue = () => {
    handleStepChange(3, isFirstTime || hasStep2Changed(), () => {
      onboardingState?.updateStep('step2', {
        selectedGender: localStep2,
        completed: localStep2 !== null,
      })
    })
  }

  const handleStep2Skip = () => {
    handleStepChange(3, false)
  }

  // Handler for step 3
  const handleStep3Continue = () => {
    handleStepChange(4, isFirstTime || hasStep3Changed(), () => {
      onboardingState?.updateStep('step3', {
        selectedBodyShape: localStep3,
        completed: localStep3 !== null,
      })
    })
  }

  const handleStep3Skip = () => {
    handleStepChange(4, false)
  }

  // Handler for step 4
  const handleStep4Continue = () => {
    handleStepChange(5, isFirstTime || hasStep4Changed(), () => {
      onboardingState?.updateStep('step4', {
        selectedAge: localStep4,
        completed: localStep4 !== null,
      })
    })
  }

  const handleStep4Skip = () => {
    handleStepChange(5, false)
  }

  // Handler for step 5
  const handleStep5Continue = () => {
    handleStepChange(6, isFirstTime || hasStep5Changed(), () => {
      onboardingState?.updateStep('step5', {
        ...localStep5,
        completed: localStep5.selectedFit !== null,
      })
    })
  }

  const handleStep5Skip = () => {
    handleStepChange(6, false)
  }

  // Handler for step 6
  const handleStep6Continue = () => {
    handleStepChange(7, isFirstTime || hasStep6Changed(), () => {
      onboardingState?.updateStep('step6', {
        selectedVibes: localStep6,
        completed: localStep6.length > 0,
      })
    })
  }

  const handleStep6Skip = () => {
    handleStepChange(7, false)
  }

  // Handler for step 7
  const handleStep7Continue = () => {
    handleStepChange(8, isFirstTime || hasStep7Changed(), () => {
      onboardingState?.updateStep('step7', {
        selectedBrands: localStep7,
        completed: localStep7.length > 0,
      })
    })
  }

  const handleStep7Skip = () => {
    handleStepChange(8, false)
  }

  // Handler for step 8
  const handleStep8Continue = () => {
    handleStepChange(9, isFirstTime || hasStep8Changed(), () => {
      onboardingState?.updateStep('step8', {
        budgetRange: localStep8,
        completed: localStep8 !== null,
      })
    })
  }

  const handleStep8Skip = () => {
    handleStepChange(9, false)
  }

  // Handler for step 9
  const handleStep9Continue = () => {
    handleStepChange(10, isFirstTime || hasStep9Changed(), () => {
      onboardingState?.updateStep('step9', {
        instagramUrl: localStep9.instagramUrl,
        tiktokUrl: localStep9.tiktokUrl,
        completed: localStep9.instagramUrl !== '' || localStep9.tiktokUrl !== '',
      })
    })
  }

  const handleStep9Skip = () => {
    handleStepChange(10, false)
  }

  // Handler for step 10
  const handleStep10Continue = () => {
    if (isFirstTime) {
      onboardingState?.markStepComplete('step10')
    }
    handleStepChange(11, false)
  }

  const handleStep10Skip = () => {
    handleStepChange(11, false)
  }

  const handleBack = () => {
    if (currentStep > 1 && !isAnimating) {
      handleStepChange(currentStep - 1, false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="modal-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-0"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/64 backdrop-blur-[16px]"
        />

        {/* Modal */}
        <motion.div
          key={`modal-step-${currentStep}`}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
          className="relative z-10 w-full max-w-[740px] rounded-modal border border-white/10"
          style={{
            background:
              'linear-gradient(180deg, rgba(22, 23, 36, 1) 0%, rgba(22, 22, 22, 1) 37%)',
            maxHeight: '90vh',
          }}
        >
          <div
            className="overflow-x-hidden relative"
            style={{ maxHeight: '90vh', position: 'relative' }}
          >
            {/* Step 1 */}
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ position: 'relative', width: '100%' }}
                >
                  <OnboardingStep1
                    onNext={handleStep1Continue}
                    onSkip={handleStep1Skip}
                    onLater={onClose}
                    selectedOptions={localStep1}
                    onSelectOption={(option) => {
                      const newOptions = localStep1.includes(option)
                        ? localStep1.filter((o) => o !== option)
                        : [...localStep1, option]
                      setLocalStep1(newOptions)
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 2 */}
            <AnimatePresence mode="wait">
              {currentStep === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ position: 'relative', width: '100%' }}
                >
                  <OnboardingStep2
                    onNext={handleStep2Continue}
                    onSkip={handleStep2Skip}
                    onLater={onClose}
                    onBack={handleBack}
                    selectedGender={localStep2}
                    onSelectGender={(gender) => {
                      setLocalStep2(gender)
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 3 */}
            <AnimatePresence mode="wait">
              {currentStep === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ position: 'relative', width: '100%' }}
                >
                  <OnboardingStep3
                    onNext={handleStep3Continue}
                    onSkip={handleStep3Skip}
                    onLater={onClose}
                    onBack={handleBack}
                    selectedBodyShape={localStep3}
                    onSelectBodyShape={(bodyShape) => {
                      setLocalStep3(bodyShape)
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 4 */}
            <AnimatePresence mode="wait">
              {currentStep === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ position: 'relative', width: '100%' }}
                >
                  <OnboardingStep4
                    onNext={handleStep4Continue}
                    onSkip={handleStep4Skip}
                    onLater={onClose}
                    onBack={handleBack}
                    selectedAge={localStep4}
                    onSelectAge={(age) => {
                      setLocalStep4(age)
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 5 */}
            <AnimatePresence mode="wait">
              {currentStep === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ position: 'relative', width: '100%' }}
                >
                  <OnboardingStep5
                    onNext={handleStep5Continue}
                    onSkip={handleStep5Skip}
                    onLater={onClose}
                    onBack={handleBack}
                    initialData={localStep5}
                    onDataChange={setLocalStep5}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 6 */}
            <AnimatePresence mode="wait">
              {currentStep === 6 && (
                <motion.div
                  key="step-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ position: 'relative', width: '100%' }}
                >
                  <OnboardingStep6
                    onNext={handleStep6Continue}
                    onSkip={handleStep6Skip}
                    onLater={onClose}
                    onBack={handleBack}
                    selectedVibes={localStep6}
                    onSelectVibes={setLocalStep6}
                    selectedGender={localStep2}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 7 */}
            <AnimatePresence mode="wait">
              {currentStep === 7 && (
                <motion.div
                  key="step-7"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ position: 'relative', width: '100%' }}
                >
                  <OnboardingStep7
                    onNext={handleStep7Continue}
                    onSkip={handleStep7Skip}
                    onLater={onClose}
                    onBack={handleBack}
                    selectedBrands={localStep7}
                    onSelectBrands={setLocalStep7}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 8 */}
            <AnimatePresence mode="wait">
              {currentStep === 8 && (
                <motion.div
                  key="step-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ position: 'relative', width: '100%' }}
                >
                  <OnboardingStep8
                    onNext={handleStep8Continue}
                    onSkip={handleStep8Skip}
                    onLater={onClose}
                    onBack={handleBack}
                    selectedBudget={localStep8}
                    onSelectBudget={setLocalStep8}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 9 */}
            <AnimatePresence mode="wait">
              {currentStep === 9 && (
                <motion.div
                  key="step-9"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ position: 'relative', width: '100%' }}
                >
                  <OnboardingStep9
                    onNext={handleStep9Continue}
                    onSkip={handleStep9Skip}
                    onLater={onClose}
                    onBack={handleBack}
                    initialData={localStep9}
                    onDataChange={setLocalStep9}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 10 */}
            <AnimatePresence mode="wait">
              {currentStep === 10 && (
                <motion.div
                  key="step-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ position: 'relative', width: '100%' }}
                >
                  <OnboardingStep10
                    onNext={handleStep10Continue}
                    onSkip={handleStep10Skip}
                    onLater={onClose}
                    onBack={handleBack}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Sync Step */}
            <AnimatePresence mode="wait">
              {currentStep === 11 && (
                <motion.div
                  key="step-sync"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ position: 'relative', width: '100%' }}
                >
                  <OnboardingProfileSync onDone={onComplete} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}