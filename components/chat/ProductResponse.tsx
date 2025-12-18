'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import OutfitSuggestionRow, { OutfitSuggestion } from './OutfitSuggestionRow'
import VirtualTryOnModal from './VirtualTryOnModal'

interface ProductResponseProps {
  outfitSuggestions: OutfitSuggestion[]
  isLoading?: boolean
  selectedOutfit?: OutfitSuggestion | null
  isSidebarOpen?: boolean
  onViewDetails?: (outfit: OutfitSuggestion) => void
  onVirtualTryOn?: (outfit: OutfitSuggestion) => void
  onProductLike?: (productId: string) => void
  onProductDislike?: (productId: string) => void
  onProductShare?: (productId: string) => void
  onProductSave?: (productId: string) => void
}

export default function ProductResponse({
  outfitSuggestions,
  isLoading = false,
  selectedOutfit = null,
  isSidebarOpen = false,
  onViewDetails,
  onVirtualTryOn,
  onProductLike,
  onProductDislike,
  onProductShare,
  onProductSave,
}: ProductResponseProps) {
  const [isVirtualTryOnOpen, setIsVirtualTryOnOpen] = useState(false)
  const [virtualTryOnOutfit, setVirtualTryOnOutfit] = useState<OutfitSuggestion | null>(null)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (!isLoading && outfitSuggestions.length > 0) {
      // Show skeleton for 0.5 seconds, then show content
      setShowContent(false)
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isLoading, outfitSuggestions.length])

  const handleViewDetails = (outfit: OutfitSuggestion) => {
    onViewDetails?.(outfit)
  }

  const handleVirtualTryOn = (outfit: OutfitSuggestion) => {
    setVirtualTryOnOutfit(outfit)
    setIsVirtualTryOnOpen(true)
  }

  const handleCloseVirtualTryOn = () => {
    setIsVirtualTryOnOpen(false)
    setVirtualTryOnOutfit(null)
  }

  const handleProductLike = (productId: string) => {
    // Handle product like
    console.log('Liked product:', productId)
  }

  const handleProductDislike = (productId: string) => {
    // Handle product dislike
    console.log('Disliked product:', productId)
  }

  const handleProductShare = (productId: string) => {
    // Handle product share
    console.log('Shared product:', productId)
  }

  const handleProductSave = (productId: string) => {
    // Handle product save
    console.log('Saved product:', productId)
  }

  const handleSaveToLookbook = (outfit: OutfitSuggestion) => {
    // Handle save to lookbook
    console.log('Saved outfit to lookbook:', outfit)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        {[...Array(3)].map((_, i) => (
          <OutfitSuggestionRow
            key={i}
            outfit={{
              id: '',
              title: '',
              number: 1,
              tag: 'Wardrobe',
              products: [],
              total: '$0',
            }}
            isLoading={true}
          />
        ))}
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {!showContent && !isLoading ? (
          // Show skeleton for 0.5 seconds
          outfitSuggestions.map((outfit, index) => (
            <OutfitSuggestionRow
              key={`skeleton-${outfit.id}`}
              outfit={{
                id: '',
                title: '',
                number: 1,
                tag: 'Wardrobe',
                products: [],
                total: '$0',
              }}
              isLoading={true}
            />
          ))
        ) : showContent && !isLoading ? (
          // Show actual content after skeleton
          outfitSuggestions.map((outfit, index) => (
            <motion.div
              key={outfit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <OutfitSuggestionRow
                outfit={outfit}
                isSidebarOpen={isSidebarOpen && selectedOutfit?.id === outfit.id}
                onViewDetails={handleViewDetails}
                onVirtualTryOn={handleVirtualTryOn}
                onProductLike={onProductLike}
                onProductDislike={onProductDislike}
                onProductShare={onProductShare}
                onProductSave={onProductSave}
              />
            </motion.div>
          ))
        ) : null}
      </div>

      {/* Virtual Try-On Modal */}
      <VirtualTryOnModal
        outfit={virtualTryOnOutfit}
        outfits={outfitSuggestions}
        isOpen={isVirtualTryOnOpen}
        onClose={handleCloseVirtualTryOn}
        onSaveToLookbook={handleSaveToLookbook}
      />
    </>
  )
}

