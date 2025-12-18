import React from 'react'

interface UploadIconProps {
  className?: string
  width?: number | string
  height?: number | string
}

export default function UploadIcon({
  className = '',
  width = 20,
  height = 20,
}: UploadIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      className={className}
    >
      <polyline
        points="7.25 5.75 10 3 12.75 5.75"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        data-color="color-2"
      />
      <line
        x1="10"
        y1="13"
        x2="10"
        y2="3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        data-color="color-2"
      />
      <path
        d="m6,9.07c-1.216.268-2.168,1.277-2.328,2.557l-.25,2c-.224,1.791,1.172,3.372,2.977,3.372h7.203c1.804,0,3.201-1.582,2.977-3.372l-.25-2c-.16-1.281-1.113-2.289-2.328-2.557"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}
