import React from 'react'

interface CheckIconProps {
  className?: string
  width?: number | string
  height?: number | string
  fill?: string
}

export default function CheckIcon({
  className = '',
  width = 32,
  height = 32,
  fill = 'white',
}: CheckIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
        fill={fill}
      />
    </svg>
  )
}

