'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export interface StyleCard {
  id: string
  style: string
  type: string
  occasion: string
  region: string
  image?: string
  label: string
  color?: string
  kind?: 'style' | 'brand' | 'color'
}

interface CardStackProps {
  cards: StyleCard[]
  currentIndex: number
  onSwipe: (direction: 'left' | 'right', card: StyleCard) => void
  onComplete?: () => void
  showArrows?: boolean
  onIndexChange?: (index: number) => void
  onManualSwipe?: (direction: 'left' | 'right') => void
}

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
} from '../icons'

export default function CardStack({
  cards,
  currentIndex,
  onSwipe,
  onComplete,
  showArrows = true,
  onIndexChange,
  onManualSwipe,
}: CardStackProps) {
  const [internalIndex, setInternalIndex] = useState(currentIndex)
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)

  // Store random rotations for each card (persistent per card)
  const cardRotationsRef = useRef<Map<string, number>>(new Map())

  useEffect(() => {
    setInternalIndex(currentIndex)
  }, [currentIndex])

  // Generate or retrieve random rotation for a card
  const getCardRotation = (cardId: string): number => {
    if (!cardRotationsRef.current.has(cardId)) {
      // Random rotation between -7 and 7 degrees
      const randomRotation = (Math.random() * 14) - 7
      cardRotationsRef.current.set(cardId, randomRotation)
    }
    return cardRotationsRef.current.get(cardId) || 0
  }

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating || internalIndex >= cards.length) {
      if (internalIndex >= cards.length && onComplete) {
        onComplete()
      }
      return
    }

    setIsAnimating(true)
    setExitDirection(direction)

    const card = cards[internalIndex]
    if (card) {
      onSwipe(direction, card)
    }

    // Wait for exit animation, then show next card
    setTimeout(() => {
      const newIndex = internalIndex + 1
      setInternalIndex(newIndex)
      onIndexChange?.(newIndex)
      setExitDirection(null)
      setDragOffset(0)
      setIsAnimating(false)

      if (newIndex >= cards.length && onComplete) {
        onComplete()
      }
    }, 300)
  }

  const handleLike = () => handleSwipe('right')
  const handleDislike = () => handleSwipe('left')

  // Drag handlers
  const handleDragStart = (clientX: number) => {
    if (isAnimating) return
    setIsDragging(true)
    startX.current = clientX
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging || isAnimating) return
    const diff = clientX - startX.current
    setDragOffset(diff)
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    const threshold = 100

    if (dragOffset > threshold) {
      handleSwipe('right')
    } else if (dragOffset < -threshold) {
      handleSwipe('left')
    } else {
      setDragOffset(0)
    }
  }

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX)
  const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX)
  const onMouseUp = () => handleDragEnd()
  const onMouseLeave = () => {
    if (isDragging) handleDragEnd()
  }

  // Touch events
  const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX)
  const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX)
  const onTouchEnd = () => handleDragEnd()

  // Calculate rotation based on drag (will be calculated per card)

  // Get visible cards (current + next 2 for stack effect)
  const visibleCards = cards.slice(internalIndex, internalIndex + 3)

  if (visibleCards.length === 0) {
    if (onComplete) {
      onComplete()
    }
    return null
  }

  return (
    <div className="relative flex h-full items-center  justify-center gap-6 w-full ">
      {/* Left Arrow Button */}
      {showArrows && (
        <div className="hidden md:flex flex-col items-center gap-1.5">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center gap-1.5"
          >
            <button
              type="button"
              onClick={handleDislike}
              disabled={isAnimating}
              className="flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed p-2 backdrop-blur-sm border border-white/10"
            >
              <ArrowLeftIcon />
            </button>
            <span className="text-sm font-medium leading-[1.26] text-white/72 whitespace-pre-line text-center">
              Click left{'\n'}arrow to dislike
            </span>
          </motion.div>
        </div>
      )}

      {/* Card Stack */}
      <div className="relative flex-1 w-full -left-6  max-w-[180px] h-[300px]">
        {visibleCards.map((card, stackIndex) => {
          const isTopCard = stackIndex === 0
          const scale = 1 - stackIndex * 0.1
          // Cards behind are translated downward (positive Y)
          const yOffset = stackIndex > 0 ? stackIndex * 36 : 0
          const cardIndex = internalIndex + stackIndex

          // Get random rotation for this card
          const cardBaseRotation = getCardRotation(card.id)

          // Calculate rotation based on drag (only for top card)
          const rotation = isTopCard
            ? cardBaseRotation + dragOffset * 0.1
            : cardBaseRotation

          const isBrand = card.kind === 'brand'

          return (
            <div
              key={card.id}
              ref={isTopCard ? cardRef : null}
              className={cn(
                'absolute inset-0 rounded-3xl overflow-hidden transform-gpu transition-all duration-300 ease-in-out w-full min-w-[240px]',
                isBrand
                  ? 'bg-white border border-white/10 shadow-[0_8px_20px_rgba(0,0,0,0.12)]'
                  : 'bg-gradient-to-br from-white/40 via-neutral-50/30 to-neutral-100/20 dark:from-neutral-800/40 dark:via-neutral-900/30 dark:to-black/20 border border-white/2 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-b before:from-white/20 before:via-neutral-100/10 before:to-transparent dark:before:from-white/5 dark:before:via-neutral-500/5 dark:before:to-transparent before:opacity-100 before:transition-opacity before:duration-500 after:absolute after:inset-0 after:rounded-3xl after:bg-gradient-to-br after:from-white/80 after:to-neutral-100/70 dark:after:from-neutral-900/80 dark:after:to-black/70 after:z-[-1] after:blur-xl backdrop-blur-xl backdrop-saturate-150 shadow-[0_8px_20px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_20px_rgb(0,0,0,0.3)] hover:border-white/10 hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_12px_40px_rgb(0,0,0,0.4)] hover:backdrop-blur-2xl hover:bg-gradient-to-br hover:from-white/50 hover:via-neutral-50/40 hover:to-neutral-100/30 dark:hover:from-neutral-800/50 dark:hover:via-neutral-900/40 dark:hover:to-black/30',
                isTopCard && 'cursor-grab active:cursor-grabbing',
                !isTopCard && 'pointer-events-none',
                'border-white/10 border-1'
              )}
              style={{
                transform: isTopCard && exitDirection
                  ? exitDirection === 'left'
                    ? 'translateX(-500px) rotate(-30deg)'
                    : 'translateX(500px) rotate(30deg)'
                  : isTopCard && !exitDirection
                    ? `translateX(${dragOffset}px) rotate(${rotation}deg)`
                    : !isTopCard
                      ? `scale(${scale}) translateY(${yOffset}px) rotate(${rotation}deg)`
                      : undefined,
                zIndex: 10 - stackIndex,
                opacity: exitDirection && isTopCard ? 0 : 1,
                transition: isDragging ? 'none' : exitDirection && isTopCard
                  ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseDown={isTopCard ? onMouseDown : undefined}
              onMouseMove={isTopCard ? onMouseMove : undefined}
              onMouseUp={isTopCard ? onMouseUp : undefined}
              onMouseLeave={isTopCard ? onMouseLeave : undefined}
              onTouchStart={isTopCard ? onTouchStart : undefined}
              onTouchMove={isTopCard ? onTouchMove : undefined}
              onTouchEnd={isTopCard ? onTouchEnd : undefined}
            >

              <div className="relative z-10 h-full w-full">
                {/* Image or Color Container */}
                <div className={cn(
                  'relative h-full w-full overflow-hidden rounded-2xl p-2',
                  isBrand && 'bg-white'
                )}>
                  <div className={cn(
                    'relative h-full w-full overflow-hidden rounded-[24px]',
                    isBrand && 'flex items-center justify-center bg-white'
                  )}>
                    {card.image ? (
                      <Image
                        src={card.image}
                        alt={card.label}
                        fill
                        className={cn(
                          'transition-transform duration-300 ease-in-out',
                          isBrand ? 'object-contain' : 'object-cover'
                        )}
                        unoptimized
                        priority={stackIndex === 0}
                        draggable={false}
                      />
                    ) : (
                      <div
                        className="flex h-full w-full items-center justify-center text-center"
                        style={{
                          backgroundColor: card.color ?? '#B56B7A',
                        }}
                      >
                        <span className="px-4 text-sm font-medium tracking-[0.18em] text-white/90">
                          {card.label}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Overlay Buttons - Thumb Icons */}
                {isTopCard && (
                  <div className="absolute bottom-[16px] left-0 right-0 flex items-center justify-center gap-[148px] z-20">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDislike()
                      }}
                      disabled={isAnimating}
                      className="flex h-[48px] w-[48px] items-center justify-center rounded-full border-2 border-red-500 bg-transparent backdrop-blur-[5px] transition-all hover:bg-red-500/20 disabled:opacity-50 p-[11.25px]"
                    >
                      <ThumbsDownIcon />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLike()
                      }}
                      disabled={isAnimating}
                      className="flex h-[48px] w-[48px] items-center justify-center rounded-full border-2 border-green-500 bg-transparent backdrop-blur-[5px] transition-all hover:bg-green-500/20 disabled:opacity-50 p-[11.25px]"
                    >
                      <ThumbsUpIcon />
                    </button>
                  </div>
                )}

                {/* Drag feedback overlays */}
                {isTopCard && !exitDirection && (
                  <>
                    <div
                      className="absolute inset-0 bg-green-500/20 pointer-events-none transition-opacity duration-150"
                      style={{ opacity: Math.max(0, dragOffset / 200) }}
                    />
                    <div
                      className="absolute inset-0 bg-red-500/20 pointer-events-none transition-opacity duration-150"
                      style={{ opacity: Math.max(0, -dragOffset / 200) }}
                    />
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Right Arrow Button */}
      {showArrows && (
        <div className="hidden md:flex flex-col items-center gap-1.5">
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center gap-1.5"
          >
            <button
              type="button"
              onClick={handleLike}
              disabled={isAnimating}
              className="flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed p-2 backdrop-blur-sm border border-white/10"
            >
              <ArrowRightIcon />
            </button>
            <span className="text-sm font-medium leading-[1.26] text-white/72 whitespace-pre-line text-center">
              Click right{'\n'}arrow to like
            </span>
          </motion.div>
        </div>
      )}
    </div>
  )
}
