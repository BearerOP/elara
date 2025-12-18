import React from 'react'

interface ArrowRightIconProps {
  className?: string
  width?: number | string
  height?: number | string
}

export default function ArrowRightIcon({
  className = '',
  width = 24,
  height = 24,
}: ArrowRightIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M9 18L15 12L9 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
