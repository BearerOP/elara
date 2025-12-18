'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  MenuTrigger,
  MenuPanel,
  MenuItem,
  MenuSeparator,
} from '@/components/animate-ui/components/base/menu'
import { sortOptions } from '@/lib/wardrobeData'

interface SortDropdownProps {
  value: string
  onChange: (value: string) => void
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <Menu open={isOpen} onOpenChange={setIsOpen}>
      <MenuTrigger
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10"
        style={{
          height: '44px',
          backgroundColor: 'rgba(42, 42, 42, 0.72)',
        }}
      >
        <span
          className="text-base font-normal text-white"
          style={{ lineHeight: '1.5' }}
        >
          Sort by: {value}
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-white" />
        ) : (
          <ChevronDown className="h-4 w-4 text-white" />
        )}
      </MenuTrigger>
      <MenuPanel className="border border-white/10 rounded-lg bg-[#2a2a2a] p-1 min-w-[200px]">
        {sortOptions.map((option) => {
          const isActive = option === value
          const isHover = hovered === option
          return (
            <div
              className="relative cursor-pointer"
              key={option}
              onMouseEnter={() => setHovered(option)}
              onMouseLeave={() => setHovered(null)}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key={`${option}-active`}
                    layoutId="sort-active"
                    className="absolute inset-0 rounded bg-white"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {!isActive && isHover && (
                  <motion.div
                    key={`${option}-hover`}
                    layoutId="sort-hover"
                    className="absolute inset-0 rounded bg-white/10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </AnimatePresence>
              <MenuItem
                className={`relative flex items-center px-3 py-2 text-sm rounded cursor-pointer transition-colors ${
                  isActive ? 'text-black' : 'text-white'
                }`}
                onClick={() => {
                  onChange(option)
            setIsOpen(false)
          }}
        >
              {option}
              </MenuItem>
            </div>
          )
        })}
      </MenuPanel>
    </Menu>
  )
}

