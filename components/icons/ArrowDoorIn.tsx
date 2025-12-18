import React from 'react'

interface ArrowDoorInIconProps {
  className?: string
  width?: number | string
  height?: number | string
}

export default function ArrowDoorInIcon({
  className = '',
  width = 54,
  height = 47,
}: ArrowDoorInIconProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="m17,6c0-1.195-.703-2.217-1.714-2.7l-2.993,2.993c-.188.188-.293.442-.293.707v6c0,.265.105.52.293.707l2.993,2.993c1.011-.483,1.714-1.505,1.714-2.7V6Z" strokeWidth="0" fill="#f7f8f8"></path>
      <line x1="9" y1="10" x2="3" y2="10" fill="none" stroke="#f7f8f8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" data-color="color-2"></line>
      <path d="m7.563,15.738c.544.761,1.43,1.262,2.437,1.262h4c1.657,0,3-1.343,3-3V6c0-1.657-1.343-3-3-3h-4c-1.009,0-1.898.502-2.441,1.267" fill="none" stroke="#f7f8f8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
      <polyline points="6.25 12.5 9 10 6.25 7.5" fill="none" stroke="#f7f8f8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" data-color="color-2"></polyline>
    </svg>
  )
}
