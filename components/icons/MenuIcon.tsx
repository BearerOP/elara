import React from 'react'

interface MenuIconProps {
  className?: string
  width?: number | string
  height?: number | string
}

export default function MenuIcon({
  className = '',
  width = 32,
  height = 32,
}: MenuIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 14" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3H13" stroke="#F7F8F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M3 7H9.5" stroke="#F7F8F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M3 11H13" stroke="#F7F8F8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

  )
}
