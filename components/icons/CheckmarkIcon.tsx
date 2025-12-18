import React from 'react'

interface CheckmarkIconProps {
  className?: string
  size?: number
}

export const CheckmarkIcon: React.FC<CheckmarkIconProps> = ({
  className,
  size = 32,
}) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
        fill="white"
      />
    </svg>
  )
}

