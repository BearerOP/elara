"use client"

import { useMemo, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import Image from "next/image"
import SortDropdown from "./SortDropdown"

type OutfitItem = {
  id: string
  name: string
  brand: string
  price: string
}

type Outfit = {
  id: string
  title: string
  date: string
  description: string
  items: OutfitItem[]
}

const sampleOutfits: Outfit[] = [
  {
    id: "look-1",
    title: "Bright & Minimal",
    date: "September 23rd, 2025",
    description:
      "A stylish and polished look for a brunch at ETHGlobal Conference in Argentina. Perfect balance of smart casual and comfort.",
    items: [
      { id: "top-1", name: "Basic Quarter-Zip Sweatshirt", brand: "Zara", price: "$45.99" },
      { id: "pants-1", name: "Washed Effect Carpenter Jeans", brand: "Zara", price: "$45.99" },
      { id: "shoes-1", name: "Monochrome Chunky Sneakers", brand: "Zara", price: "$45.99" },
      { id: "glasses-1", name: "Squared Sunglasses", brand: "Zara", price: "$45.99" },
    ],
  },
  {
    id: "look-2",
    title: "Casual Coffee Run",
    date: "September 20th, 2025",
    description: "Cozy layers with a relaxed fit for errands or a coffee meet-up.",
    items: [
      { id: "top-2", name: "Relaxed Crew Sweatshirt", brand: "Uniqlo", price: "$39.99" },
      { id: "pants-2", name: "Tapered Denim", brand: "Levi's", price: "$69.99" },
      { id: "shoes-2", name: "Retro Runners", brand: "New Balance", price: "$89.99" },
      { id: "glasses-2", name: "Rounded Sunglasses", brand: "Warby Parker", price: "$75.00" },
    ],
  },
  {
    id: "look-3",
    title: "Evening Minimal",
    date: "September 18th, 2025",
    description: "Clean, dark palette for an elevated evening look.",
    items: [
      { id: "top-3", name: "Mock Neck Sweater", brand: "COS", price: "$85.00" },
      { id: "pants-3", name: "Slim Black Denim", brand: "Everlane", price: "$78.00" },
      { id: "shoes-3", name: "Leather Low-Tops", brand: "Common Projects", price: "$289.00" },
      { id: "glasses-3", name: "Square Acetate Shades", brand: "Ray-Ban", price: "$125.00" },
    ],
  },
  {
    id: "look-4",
    title: "Street Smart",
    date: "September 15th, 2025",
    description: "Edgy and confident layers that transition from day to night.",
    items: [
      { id: "top-4", name: "Utility Overshirt", brand: "Aritzia", price: "$98.00" },
      { id: "pants-4", name: "Cargo Joggers", brand: "Nike", price: "$74.00" },
      { id: "shoes-4", name: "High-Top Classics", brand: "Converse", price: "$65.00" },
      { id: "glasses-4", name: "Tinted Aviators", brand: "Quay", price: "$55.00" },
    ],
  },
]

const swatches = ["bg-[#EFEFEF]", "bg-[#E9EEF6]", "bg-[#111111]", "bg-[#0C0C0C]", "bg-[#F5F3F0]", "bg-[#1A1A1A]"] as const

// Helper function to get the correct image for each item
const getItemImage = (itemName: string, index: number): string => {
  const nameLower = itemName.toLowerCase()
  
  if (nameLower.includes('sweatshirt') || nameLower.includes('sweater') || nameLower.includes('shirt')) {
    return '/images/onboarding/wardrobe-cloth-1.png'
  } else if (nameLower.includes('jeans') || nameLower.includes('denim') || nameLower.includes('pants') || nameLower.includes('joggers')) {
    return '/images/trackpant.png'
  } else if (nameLower.includes('sneakers') || nameLower.includes('shoes') || nameLower.includes('runners') || nameLower.includes('tops')) {
    return '/images/shoes.png'
  } else if (nameLower.includes('sunglasses') || nameLower.includes('glasses') || nameLower.includes('shades')) {
    return '/images/sunglasses.png'
  }
  
  // Fallback based on index
  const images = ['/images/onboarding/wardrobe-cloth-1.png', '/images/trackpant.png', '/images/shoes.png', '/images/sunglasses.png']
  return images[index % images.length]
}

export interface SavedOutfitsPageProps {
  selectedId?: string | null
  isSidebarOpen?: boolean
  onOutfitClick?: (outfitId: string) => void
  onCloseSidebar?: () => void
}

export default function SavedOutfitsPage({
  selectedId: externalSelectedId,
  isSidebarOpen: externalIsSidebarOpen,
  onOutfitClick,
  onCloseSidebar,
}: SavedOutfitsPageProps = {}) {
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState('Newest')

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const outfitsGrid = useMemo(() => {
    const duplicated = sampleOutfits.flatMap((outfit) => [
      outfit,
      { ...outfit, id: `${outfit.id}-copy` }, // duplicate to fill the grid visually
    ])

    // Sort based on sortBy value
    const sorted = [...duplicated].sort((a, b) => {
      const aOriginal = a.id.replace('-copy', '')
      const bOriginal = b.id.replace('-copy', '')
      
      switch (sortBy) {
        case 'Newest':
          // Parse dates and sort newest first
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case 'Oldest':
          // Parse dates and sort oldest first
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case 'Name A-Z':
          return a.title.localeCompare(b.title)
        case 'Name Z-A':
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

    return sorted
  }, [sortBy])

  const handleOutfitClick = (outfitId: string) => {
    onOutfitClick?.(outfitId)
  }

  return (
    <div className="flex-1 flex flex-col gap-6 p-4 sm:p-6 lg:p-8 bg-[#1A1A1A] text-white overflow-hidden">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 border border-white/10 min-w-[240px] sm:min-w-[320px]">
            <Search className="h-4 w-4 text-white/50" />
            <input
              type="text"
              placeholder="Search outfits"
              className="bg-transparent flex-1 text-sm text-white placeholder:text-white/50 focus:outline-none"
            />
          </div>
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        {/* Content */}
        <motion.div 
          className="flex-1 overflow-y-auto pr-1 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          animate={{
            marginRight: (externalIsSidebarOpen || false) ? '0px' : '0px',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="flex flex-wrap gap-4 sm:gap-5 ">
            {isLoading ? (
              // Skeleton loaders
              Array.from({ length: 10 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  className="flex flex-col rounded-2xl border border-white/10 bg-[#111111] p-3"
                  style={{ 
                    minWidth: '160px',
                    width: 'calc(20% - 16px)',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ 
                    duration: 0.3,
                    delay: index * 0.05,
                  }}
                >
                  {/* Skeleton grid */}
                  <div className="grid grid-cols-2 grid-rows-2 gap-2">
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <div
                        key={`skeleton-item-${idx}`}
                        className="aspect-square rounded-xl border border-white/10 bg-white/5 animate-pulse"
                      />
                    ))}
                  </div>
                  {/* Skeleton text */}
                  <div className="mt-3 flex flex-col gap-2">
                    <div className="h-4 bg-white/10 rounded animate-pulse w-3/4" />
                    <div className="h-3 bg-white/5 rounded animate-pulse w-1/2" />
                  </div>
                </motion.div>
              ))
            ) : (
              // Actual outfit cards
              outfitsGrid.map((outfit, index) => {
                const isSelected = externalSelectedId === outfit.id.replace("-copy", "")
                return (
                  <motion.button
                    key={outfit.id}
                    onClick={() => handleOutfitClick(outfit.id.replace("-copy", ""))}
                    className={`flex flex-col rounded-2xl border min-w-[180px] md:min-w-[220px] ${isSelected ? "border-white/30" : "border-white/10"
                      } bg-[#111111] p-3 text-left transition-all hover:border-white/30 hover:bg-[#151515]`}
                    style={{ 
                      width: 'calc(20% - 16px)',
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      width: (externalIsSidebarOpen || false) ? 'calc(25% - 16px)' : 'calc(20% - 16px)',
                    }}
                    transition={{ 
                      duration: 0.3, 
                      ease: 'easeInOut',
                      delay: index * 0.02,
                    }}
                  >
                    <div className="grid grid-cols-2 grid-rows-2 gap-2">
                      {outfit.items.slice(0, 4).map((item, idx) => (
                        <div
                          key={item.id + idx}
                          className={`aspect-square rounded-xl border border-white/10 ${swatches[(idx + outfit.id.length) % swatches.length]} flex items-center justify-center overflow-hidden`}
                        >
                          <Image
                            src={getItemImage(item.name, idx)}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-col gap-1">
                      <p className="text-sm font-semibold text-white">{outfit.title}</p>
                      <p className="text-xs text-white/60">{outfit.date}</p>
                    </div>
                  </motion.button>
                )
              })
            )}
          </div>
        </motion.div>
    </div>
  )
}

// Export sample outfits and helper function for use in ChatInterface
export { sampleOutfits, getItemImage }

