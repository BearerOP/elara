'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ThumbsUp, ThumbsDown, ArrowUpRight } from 'lucide-react'
import Image from 'next/image'

export interface Product {
  id: string
  name: string
  price: string
  brand: string
  image: string
  isLiked?: boolean
  isSaved?: boolean
}

interface ProductCardProps {
  product: Product
  isLoading?: boolean
  onLike?: (id: string) => void
  onDislike?: (id: string) => void
  onShare?: (id: string) => void
  onSave?: (id: string) => void
}

export default function ProductCard({
  product,
  isLoading = false,
  onLike,
  onDislike,
  onShare,
  onSave,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [liked, setLiked] = useState(product.isLiked || false)
  const [saved, setSaved] = useState(product.isSaved || false)

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLiked(!liked)
    onLike?.(product.id)
  }

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDislike?.(product.id)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    onShare?.(product.id)
  }

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSaved(!saved)
    onSave?.(product.id)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <div className="w-full h-40 rounded-xl bg-white/5 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-white/5 rounded animate-pulse" />
          <div className="flex items-center gap-2">
            <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
            <div className="h-3 w-12 bg-white/5 rounded animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="group relative flex flex-col gap-2 flex-1 min-w-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <motion.div
        className="relative w-full h-40 rounded-xl overflow-hidden bg-white/5"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
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

        {/* Hover Actions - Like, Dislike, Share */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center gap-2"
        >
          <button
            onClick={handleLike}
            className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${
              liked
                ? 'bg-white/20 text-white'
                : 'text-white/80 hover:bg-white/20'
            }`}
            style={!liked ? { backgroundColor: 'rgba(0, 0, 0, 0.64)' } : {}}
          >
            <ThumbsUp className="h-4 w-4" />
          </button>
          <button
            onClick={handleDislike}
            className="p-2 rounded-lg backdrop-blur-sm text-white/80 hover:bg-white/20 transition-colors"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.64)' }}
          >
            <ThumbsDown className="h-4 w-4" />
          </button>
          <button
            onClick={handleShare}
            className="p-2 rounded-lg backdrop-blur-sm text-white/80 hover:bg-white/20 transition-colors"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.64)' }}
          >
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </motion.div>
      </motion.div>

      {/* Product Info */}
      <div className="flex flex-col gap-1">
        <p 
          className="text-sm font-medium text-white/80 line-clamp-2"
          style={{ lineHeight: '1.5' }}
        >
          {product.name}
        </p>
        <div className="flex items-center gap-1 text-sm">
          <span className="text-white/70">{product.price}</span>
          <span className="text-white/70">•</span>
          <span className="text-white/70">{product.brand}</span>
        </div>
      </div>
    </div>
  )
}

