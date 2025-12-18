import React from 'react'

interface RefreshIconProps {
  className?: string
  width?: number | string
  height?: number | string
  stroke?: string
}

export default function RefreshIcon({
  className = '',
  width = 12,
  height = 12,
  stroke = '#f7f8f8',
}: RefreshIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      className={className}
    >
      <g data-transform-wrapper="on" transform="translate(20 20) scale(-1 -1)">
        <path
          d="m5,5.101c1.271-1.297,3.041-2.101,5-2.101,3.866,0,7,3.134,7,7s-3.134,7-7,7c-2.792,0-5.203-1.635-6.326-4"
          fill="none"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          data-color="color-2"
        />
        <polygon
          points="4.367 3.044 3.771 6.798 7.516 6.145 4.367 3.044"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          fill={stroke}
        />
      </g>
    </svg>
  )
}
