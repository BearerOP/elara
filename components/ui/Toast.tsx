'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react'

export type ToastVariant = 'success' | 'warning' | 'danger' | 'info'
export type ToastWidth = 'sm' | 'md' | 'lg' | 'full'

export interface ToastProps {
  isOpen: boolean
  onClose: () => void
  variant?: ToastVariant
  title: string
  message: string
  duration?: number
  showCloseButton?: boolean
  width?: ToastWidth
  standalone?: boolean // Whether the toast is standalone or in a container
}

const variantConfig = {
  success: {
    icon: CheckCircle2,
    iconBg: 'bg-green-500/15',
    iconColor: 'text-green-300',
  },
  warning: {
    icon: AlertTriangle,
    iconBg: 'bg-yellow-500/15',
    iconColor: 'text-yellow-300',
  },
  danger: {
    icon: XCircle,
    iconBg: 'bg-red-500/15',
    iconColor: 'text-red-300',
  },
  info: {
    icon: Info,
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-300',
  },
}

const widthConfig: Record<ToastWidth, string> = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-lg',
  full: 'sm:max-w-2xl',
}

export function Toast({
  isOpen,
  onClose,
  variant = 'info',
  title,
  message,
  duration = 5000,
  showCloseButton = true,
  width = 'md',
  standalone = true,
}: ToastProps) {
  const config = variantConfig[variant]
  const IconComponent = config.icon
  const widthClass = widthConfig[width]

  // Auto-close after duration (only for standalone toasts)
  useEffect(() => {
    if (isOpen && duration > 0 && standalone) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isOpen, duration, onClose, standalone])

  const toastContent = (
    <motion.div
      initial={{ opacity: 0, y: standalone ? 100 : 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: standalone ? 100 : 0 }}
      transition={{
        duration: 0.4,
        ease: [0.32, 0.72, 0, 1],
      }}
      className="pointer-events-auto flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-[#141118] px-3 sm:px-4 py-2.5 sm:py-3 text-xs text-white shadow-[0_18px_60px_rgba(0,0,0,0.75)] border border-white/10 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 25,
          delay: 0.15,
        }}
        className={`flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full ${config.iconBg} ${config.iconColor} flex-shrink-0`}
      >
        <IconComponent className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
      </motion.div>
      
      <div className="space-y-0.5 min-w-0 flex-1">
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.3,
            delay: 0.1,
            ease: [0.32, 0.72, 0, 1]
          }}
          className="font-medium text-xs sm:text-sm"
        >
          {title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.3,
            delay: 0.15,
            ease: [0.32, 0.72, 0, 1]
          }}
          className="text-[10px] sm:text-[11px] text-white/70"
        >
          {message}
        </motion.p>
      </div>

      {showCloseButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.2,
            delay: 0.25,
            ease: [0.32, 0.72, 0, 1]
          }}
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Close notification"
        >
          <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-white/50 hover:text-white/80" />
        </motion.button>
      )}
    </motion.div>
  )

  // If standalone, wrap in positioning container
  if (standalone) {
    return (
      <AnimatePresence mode="wait">
        {isOpen && (
          <div className={`pointer-events-none fixed bottom-4 sm:bottom-6 left-1/2 z-[60] -translate-x-1/2 w-full max-w-[calc(100%-2rem)] ${widthClass} px-4 sm:px-0`}>
            {toastContent}
          </div>
        )}
      </AnimatePresence>
    )
  }

  // If in container, just return the content
  return (
    <div className={`w-full ${widthClass} mx-auto`}>
      {toastContent}
    </div>
  )
}
