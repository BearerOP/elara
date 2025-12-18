import React from 'react'

interface ArrowLeftIconProps {
  className?: string
  width?: number | string
  height?: number | string
}

export default function ArrowLeftIcon({
  className = '',
  width = 24,
  height = 24,
}: ArrowLeftIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M15 18L9 12L15 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
