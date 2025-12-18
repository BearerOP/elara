'use client'

import { motion } from 'framer-motion'
import Logo from '../ui/Logo'
import { Button } from '@/components/ui/Button'

interface WelcomeModalProps {
  isOpen: boolean
  onClose: () => void
  onStart: () => void
}

export default function WelcomeModal({
  isOpen,
  onClose,
  onStart,
}: WelcomeModalProps) {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-0"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-[5px]"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-[740px] rounded-modal border border-white/10"
        style={{
          background:
            'linear-gradient(180deg, rgba(22, 23, 36, 1) 0%, rgba(22, 22, 22, 1) 37%)',
        }}
      >
        <div className="flex flex-col gap-8 px-4 md:px-8 pt-8 md:pt-16">
          <div className="flex flex-col items-center gap-2">
            {/* Logo */}
            <Logo size="lg" />
            <span className="text-xl font-light tracking-[0.15em] text-text-tertiary">
              PROFILE
            </span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <h2 className="text-center text-xl font-medium leading-[1.6] text-text-primary">
              Let's build your Elara Profile
            </h2>
            <p className="max-w-[504px] w-full px-4 md:px-0 text-center text-sm md:text-base font-normal leading-[1.5] text-text-quaternary">
              This isn't just a quiz. It's your fashion fingerprint. <br className="hidden md:inline" />
              From killer fits to early access drops — your style, your rules.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pb-8 md:pb-16">
            <Button variant="secondary" onClick={onClose} className="w-full md:w-auto px-14 py-2.5 bg-white/10 text-white hover:bg-white/20">
              Do it later
            </Button>
            <Button variant="default" onClick={onStart} className="w-full md:w-auto px-14 py-2.5 bg-white text-black/80 hover:bg-white/80">
              Lets do it
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

