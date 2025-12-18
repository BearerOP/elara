'use client'

import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, ThumbsUp, ThumbsDown, Bookmark, AlertTriangle } from 'lucide-react'
import Image from 'next/image'
import { OutfitSuggestion } from './OutfitSuggestionRow'
import { Product } from '@/components/chat/ProductCard'
import { useToast } from '@/hooks/useToast'
import { ToastContainer } from '@/components/ui/ToastContainer'

interface ViewDetailsSidebarProps {
  outfit: OutfitSuggestion | null
  isOpen: boolean
  onClose: () => void
  onVirtualTryOn?: (outfit: OutfitSuggestion) => void
  onProductLike?: (productId: string) => void
  likedOutfit?: boolean
  dislikedOutfit?: boolean
  savedOutfit?: boolean
  onOutfitLike?: () => void
  onOutfitDislike?: () => void
  onOutfitSave?: () => void
  hideLikeDislike?: boolean // Hide like/dislike buttons for saved outfits
}

export default function ViewDetailsSidebar({
  outfit,
  isOpen,
  onClose,
  onVirtualTryOn,
  onProductLike,
  likedOutfit = false,
  dislikedOutfit = false,
  savedOutfit = false,
  onOutfitLike,
  onOutfitDislike,
  onOutfitSave,
  hideLikeDislike = false,
}: ViewDetailsSidebarProps) {
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set())
  const [dislikedProducts, setDislikedProducts] = useState<Set<string>>(new Set())
  const [showUnsaveDialog, setShowUnsaveDialog] = useState(false)
  const { toasts, success, removeToast } = useToast()

  const handleLike = (productId: string) => {
    const newLiked = new Set(likedProducts)
    if (newLiked.has(productId)) {
      newLiked.delete(productId)
    } else {
      newLiked.add(productId)
    }
    setLikedProducts(newLiked)
    onProductLike?.(productId)
  }

  const handleDislike = (productId: string) => {
    const next = new Set(dislikedProducts)
    if (next.has(productId)) {
      next.delete(productId)
    } else {
      next.add(productId)
    }
    setDislikedProducts(next)
  }

  const handleBookmarkClick = () => {
    // If viewing saved outfit, show confirmation dialog
    if (hideLikeDislike && savedOutfit) {
      setShowUnsaveDialog(true)
      return // Prevent any further execution
    }
    // Normal toggle behavior for non-saved outfits
    onOutfitSave?.()
  }

  const handleConfirmUnsave = () => {
    onOutfitSave?.()
    setShowUnsaveDialog(false)
    success('Outfit Removed', 'The outfit has been removed from your saved collection')
  }

  if (!outfit) return null

  return (
    <>
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Mobile backdrop - only on screens < md (768px) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Sidebar */}
            <motion.div
              key="sidebar"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              className="
                flex-shrink-0 h-full flex flex-col overflow-hidden border-none min-w-0 bg-[#1a1a1a] rounded-2xl
                fixed md:relative right-0 top-0 bottom-0 z-50 w-full max-w-[359px]
                md:ml-2
              "
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-6 py-3.5 flex-shrink-0 border-b border-white/10"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <span className="text-xs font-medium text-black">{outfit.number}</span>
                  </div>
                  <h2 className="text-lg font-medium text-white">{outfit.title}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div
                className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent"
                style={{ scrollbarColor: '#2a2a2a transparent' }}
              >
                <div className="px-2 py-3 space-y-4">
                  {/* Description */}
                  <div className="space-y-3">
                    <h3
                      className="text-sm font-normal px-4"
                      style={{ color: 'rgba(255, 255, 255, 0.48)' }}
                    >
                      DESCRIPTION
                    </h3>
                    {outfit.description ? (
                      <p
                        className="text-base font-normal text-white px-4"
                        style={{ lineHeight: '1.5' }}
                      >
                        {outfit.description}
                      </p>
                    ) : (
                      <p
                        className="text-base font-normal text-white/80 px-6"
                        style={{ lineHeight: '1.5' }}
                      >
                        A stylish and polished look for a brunch at ETHGlobal Conference in Argentina.
                      </p>
                    )}
                  </div>

                  {/* Items */}
                  <div className="space-y-4 px-5">
                    <h3
                      className="text-sm font-normal"
                      style={{ color: 'rgba(255, 255, 255, 0.48)' }}
                    >
                      ITEMS
                    </h3>
                    <div className="space-y-5">
                      {outfit.products.map((product) => (
                        <ProductDetailCard
                          key={product.id}
                          product={product}
                          isLiked={likedProducts.has(product.id)}
                          onLike={() => handleLike(product.id)}
                          isDisliked={dislikedProducts.has(product.id)}
                          onDislike={() => handleDislike(product.id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Bar - Sticky */}
              <div
                className="flex-shrink-0 px-5 py-3 border-t"
                style={{
                  borderColor: '#292929',
                  backgroundColor: '#1F1F1F',
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {!hideLikeDislike && (
                      <>
                        <button
                          onClick={onOutfitLike}
                          className={`p-2 rounded-lg transition-colors ${likedOutfit
                            ? 'bg-white/20 text-white'
                            : 'text-white/80 hover:bg-white/10'
                            }`}
                          style={!likedOutfit ? { backgroundColor: 'rgba(255, 255, 255, 0.05)' } : {}}
                        >
                          <ThumbsUp className="h-5 w-5" fill={likedOutfit ? 'currentColor' : 'none'} />
                        </button>
                        <button
                          onClick={onOutfitDislike}
                          className={`p-2 rounded-lg transition-colors ${dislikedOutfit
                            ? 'bg-white/20 text-white'
                            : 'text-white/80 hover:bg-white/10'
                            }`}
                          style={!dislikedOutfit ? { backgroundColor: 'rgba(255, 255, 255, 0.05)' } : {}}
                        >
                          <ThumbsDown className="h-5 w-5" fill={dislikedOutfit ? 'currentColor' : 'none'} />
                        </button>
                      </>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleBookmarkClick()
                      }}
                      className={`p-2 rounded-lg transition-colors ${(hideLikeDislike || savedOutfit)
                        ? 'bg-white/10 text-white'
                        : 'text-white/60 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                      <Bookmark className="h-5 w-5" fill={(hideLikeDislike || savedOutfit) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <button
                    onClick={() => outfit && onVirtualTryOn?.(outfit)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition-colors"
                  >
                    <span>Virtual Try-On</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Unsave Confirmation Dialog - Rendered in Portal OUTSIDE AnimatePresence */}
      {showUnsaveDialog && typeof window !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[9998] flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUnsaveDialog(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-[#1a1a1a] rounded-2xl border border-white/10 shadow-xl z-[9999] p-6 mx-4"
          >
            <div className="flex flex-col gap-4">
              {/* Icon and Title */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">Remove Saved Outfit?</h3>
              </div>

              {/* Message */}
              <p className="text-white/70 text-sm">
                Are you sure you want to remove "{outfit?.title}" from your saved outfits? This action cannot be undone.
              </p>

              {/* Buttons */}
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setShowUnsaveDialog(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 text-white hover:bg-white/15 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmUnsave}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          </motion.div>
        </div>,
        document.body
      )}

      {/* Toast Container */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  )
}

interface ProductDetailCardProps {
  product: Product
  isLiked: boolean
  isDisliked: boolean
  onLike: () => void
  onDislike: () => void
}

function ProductDetailCard({
  product,
  isLiked,
  isDisliked,
  onLike,
  onDislike,
}: ProductDetailCardProps) {
  const productUrl = (product as any).url || (product as any).link

  return (
    <div
      className="relative flex flex-col gap-3 p-4 pb-12 rounded-2xl overflow-hidden"
      style={{ backgroundColor: '#232323' }}
    >
      {/* Product Image */}
      <div
        className="relative w-full rounded-xl overflow-hidden bg-white/5"
        style={{ height: '316px' }}
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-white/5" />
        )}

        {/* Action buttons overlay at bottom right */}
        <div className="absolute right-4 bottom-4 flex items-center justify-end gap-2">
          <button
            onClick={onLike}
            className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${isLiked
              ? 'bg-white/20 text-white'
              : 'text-white/80 hover:bg-white/20'
              }`}
            style={!isLiked ? { backgroundColor: 'rgba(0, 0, 0, 0.64)' } : {}}
          >
            <ThumbsUp className="h-4 w-4" fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          <button
            onClick={onDislike}
            className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${isDisliked
              ? 'bg-white/20 text-white'
              : 'text-white/80 hover:bg-white/20'
              }`}
            style={!isDisliked ? { backgroundColor: 'rgba(0, 0, 0, 0.64)' } : {}}
            aria-label="Dislike"
          >
            <ThumbsDown className="h-4 w-4" fill={isDisliked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>



      {/* Product Info */}
      <div className="flex flex-col gap-1">
        <p
          className="text-base font-medium text-white"
          style={{ lineHeight: '1.5' }}
        >
          {product.name}
        </p>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-white/80">{product.price}</span>
          <span className="text-white/80">•</span>
          <span className="text-white/80">{product.brand}</span>
        </div>
      </div>

      {/* Visit Button */}
      <div className="absolute bottom-0 right-0">
        <button
          className="w-fit px-4 py-1 rounded-ss-xl border-t border-l transition-colors flex items-center justify-center gap-1 text-sm font-normal text-white hover:opacity-90"
          style={{
            backgroundColor: '#373737',
            borderColor: 'rgba(255, 255, 255, 0.16)',
          }}
          onClick={() => {
            if (productUrl) window.open(productUrl, '_blank')
          }}
          disabled={!productUrl}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#404040'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#373737'
          }}
        >
          Visit
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
    </div>

  )
}