'use client'

import { ChevronRight } from 'lucide-react'

interface OnboardingProgressProps {
  completedSteps: number
  totalSteps: number
  onClick: () => void
}

export function OnboardingProgress({ completedSteps, totalSteps, onClick }: OnboardingProgressProps) {
  const progress = (completedSteps / totalSteps) * 100
  const circumference = 2 * Math.PI * 14 // radius = 14
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#2A2A2A] hover:bg-[#2A2A2A]/80 transition-colors w-full"
    >
      {/* Circular Progress Indicator */}
      <div className="relative w-8 h-8 flex-shrink-0">
        <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
          {/* Background circle */}
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <circle
            cx="16"
            cy="16"
            r="14"
            fill="none"
            stroke="#FFA751"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.3s ease',
            }}
          />
        </svg>
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-start flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-[14px] font-medium text-white" style={{ lineHeight: '1.26' }}>
            Setup your preferences
          </span>
          <ChevronRight className="h-4 w-4 text-white flex-shrink-0" />
        </div>
        <span 
          className="text-sm font-normal text-white/48"
          style={{ lineHeight: '1.4285714285714286em' }}
        >
          {completedSteps}/{totalSteps} Completed
        </span>
      </div>
    </button>
  )
}

