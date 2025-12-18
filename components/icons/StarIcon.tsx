import React from 'react'

interface StarIconProps {
  className?: string
  width?: number | string
  height?: number | string
}

export default function StarIcon({
  className = '',
  width = 16,
  height = 16,
}: StarIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8 2L9.5 5.5L13.5 6.5L10.5 9L11 13L8 11L5 13L5.5 9L2.5 6.5L6.5 5.5L8 2Z"
        fill="currentColor"
      />
    </svg>
  )
}
