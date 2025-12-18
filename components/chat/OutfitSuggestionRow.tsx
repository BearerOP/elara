'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard, { Product } from './ProductCard'

export interface OutfitSuggestion {
  id: string
  title: string
  number: number
  tag: 'Wardrobe' | 'Wardrobe + Shopping' | 'Shopping'
  products: Product[]
  total: string
  description?: string
}

interface OutfitSuggestionRowProps {
  outfit: OutfitSuggestion
  isLoading?: boolean
  isSidebarOpen?: boolean
  onViewDetails?: (outfit: OutfitSuggestion) => void
  onVirtualTryOn?: (outfit: OutfitSuggestion) => void
  onProductLike?: (productId: string) => void
  onProductDislike?: (productId: string) => void
  onProductShare?: (productId: string) => void
  onProductSave?: (productId: string) => void
}

export default function OutfitSuggestionRow({
  outfit,
  isLoading = false,
  isSidebarOpen = false,
  onViewDetails,
  onVirtualTryOn,
  onProductLike,
  onProductDislike,
  onProductShare,
  onProductSave,
}: OutfitSuggestionRowProps) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  useEffect(() => {
    setIsOverlayVisible(isSidebarOpen)
  }, [isSidebarOpen])

  const handleViewDetails = () => {
    setIsOverlayVisible(true)
    onViewDetails?.(outfit)
  }

  const tagStyle = {
    backgroundColor: 'rgba(25, 118, 210, 0.16)',
    borderColor: '#1976D2',
    color: '#5AA6F1',
  }

  if (isLoading) {
    return (
      <div 
        className="flex flex-col gap-4 p-4 rounded-2xl bg-white/5 border"
        style={{ borderColor: '#363636' }}
      >
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-white/5 rounded-full animate-pulse" />
            <div className="h-5 w-32 bg-white/5 rounded animate-pulse" />
            <div className="h-6 w-24 bg-white/5 rounded-full animate-pulse" />
          </div>
          <div className="h-5 w-5 bg-white/5 rounded animate-pulse" />
        </div>
        {/* Products Skeleton */}
        <div className="flex gap-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-1">
              <ProductCard
                product={{
                  id: '',
                  name: '',
                  price: '',
                  brand: '',
                  image: '',
                }}
                isLoading={true}
              />
            </div>
          ))}
        </div>
        {/* Footer Skeleton */}
        <div 
          className="flex items-center justify-between pt-4 border-t"
          style={{ borderColor: '#363636' }}
        >
          <div className="h-5 w-20 bg-white/5 rounded animate-pulse" />
          <div className="flex gap-2">
            <div className="h-8 w-28 bg-white/5 rounded-lg animate-pulse" />
            <div className="h-8 w-28 bg-white/5 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="relative flex flex-col gap-4 p-4 rounded-2xl bg-white/5 border"
      style={{ borderColor: '#363636' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
              <span className="text-xs font-medium text-black">{outfit.number}</span>
            </div>
            <h3 className="text-base font-medium text-white">{outfit.title}</h3>
          </div>
          <div 
            className="px-2.5 py-1 rounded-full border text-xs font-normal"
            style={tagStyle}
          >
            {outfit.tag}
          </div>
        </div>
        {/* Optional menu icon */}
      </div>

      {/* Products Grid */}
      <div 
        className="flex gap-5 overflow-x-auto scrollbar-thin scrollbar-track-transparent mt-2"
        style={{ scrollbarColor: '#2a2a2a transparent' }}
      >
        {outfit.products.map((product) => (
          <div key={product.id} className="flex-1" style={{ minWidth: '140px' }}>
            <ProductCard
              product={product}
              onLike={onProductLike}
              onDislike={onProductDislike}
              onShare={onProductShare}
              onSave={onProductSave}
            />
          </div>
        ))}
      </div>

      {/* Footer with Total and Actions */}
      <div 
        className="flex items-center justify-between pt-4 border-t"
        style={{ borderColor: '#363636' }}
      >
        <span className="text-base font-semibold text-white">Total: {outfit.total}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onVirtualTryOn?.(outfit)}
            className="px-2 py-1.5 rounded-lg border bg-transparent hover:bg-white/10 transition-colors text-sm font-medium text-white"
            style={{ borderColor: 'rgba(255, 255, 255, 0.16)' }}
          >
            Virtual Try-On
          </button>
          <button
            onClick={handleViewDetails}
            className="px-4 py-2 rounded-lg hover:bg-white/20 transition-colors text-sm font-medium text-white"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.16)' }}
          >
            View details
          </button>
        </div>
      </div>

      {/* Overlay when opened in sidebar */}
      <AnimatePresence>
        {isOverlayVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-2xl backdrop-blur-md flex flex-col items-center justify-center gap-2 pointer-events-none z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.72)' }}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              className="mb-1"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
            <span className="text-base font-medium text-white">Opened in side panel</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
