'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Plus } from 'lucide-react'
import AddToClosetModal from './AddToClosetModal'
import WardrobeItemCard from './WardrobeItemCard'
import SortDropdown from './SortDropdown'
import { WardrobeItem, categories, sampleWardrobeItems } from '@/lib/wardrobeData'


export default function WardrobePage({
  isProcessing: externalIsProcessing,
  processedCount: externalProcessedCount,
  totalProcessing: externalTotalProcessing,
  onUpdateProcessingState,
  onUpdateItemCount,
  selectedItem: externalSelectedItem,
  isSidebarOpen: externalIsSidebarOpen,
  isEditing: externalIsEditing,
  onItemClick,
  onCloseSidebar,
  onSaveItem,
  onDeleteItem,
  onEditToggle,
}: WardrobePageProps = {} as WardrobePageProps) {
  const [items, setItems] = useState<WardrobeItem[]>(sampleWardrobeItems)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('Newest')
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedCount, setProcessedCount] = useState(5)
  const [totalProcessing, setTotalProcessing] = useState(8)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Loading state effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Update item count when items change
  useEffect(() => {
    if (onUpdateItemCount) {
      onUpdateItemCount(items.length)
    }
  }, [items, onUpdateItemCount])
  const createEmptyFilters = () => ({
    colors: [] as string[],
    tags: [] as string[],
    seasons: [] as string[],
    brands: [] as string[],
    fabrics: [] as string[],
  })
  const [filters, setFilters] = useState(createEmptyFilters())
  const [draftFilters, setDraftFilters] = useState(createEmptyFilters())

  const brandOptions = useMemo(
    () => Array.from(new Set(items.map((item) => item.brand).filter(Boolean))),
    [items],
  )
  const fabricOptions = useMemo(
    () =>
      Array.from(
        new Set(
          items
            .flatMap((item) => item.fabrics ?? [])
            .filter((fabric): fabric is string => Boolean(fabric)),
        ),
      ),
    [items],
  )

  // Use external state if provided, otherwise use internal state
  const currentIsProcessing = externalIsProcessing !== undefined ? externalIsProcessing : isProcessing
  const currentProcessedCount = externalProcessedCount !== undefined ? externalProcessedCount : processedCount
  const currentTotalProcessing = externalTotalProcessing !== undefined ? externalTotalProcessing : totalProcessing

  // Simulate processing state
  useEffect(() => {
    const hasProcessing = items.some(item => item.processing)
    const newIsProcessing = hasProcessing

    if (hasProcessing) {
      const interval = setInterval(() => {
        setProcessedCount(prev => {
          const newCount = prev >= totalProcessing ? totalProcessing : prev + 1

          if (newCount >= totalProcessing) {
            setIsProcessing(false)
            setItems(prevItems => prevItems.map(item => ({
              ...item,
              processing: false,
              processed: true,
            })))
            clearInterval(interval)

            // Notify parent if callback provided
            if (onUpdateProcessingState) {
              onUpdateProcessingState(false, totalProcessing, totalProcessing)
            }
          } else {
            // Notify parent of progress
            if (onUpdateProcessingState) {
              onUpdateProcessingState(true, newCount, totalProcessing)
            }
          }

          return newCount
        })
      }, 3000)

      return () => clearInterval(interval)
    } else {
      setIsProcessing(false)
      if (onUpdateProcessingState) {
        onUpdateProcessingState(false, processedCount, totalProcessing)
      }
    }
  }, [items, totalProcessing, onUpdateProcessingState])

  const filteredAndSortedItems = useMemo(() => {
    let filtered = items

    const matchesAny = (selected: string[], values: string[] = []) =>
      selected.length === 0 || values.some((val) => selected.includes(val))

    filtered = filtered.filter((item) => {
      const colorMatch = matchesAny(filters.colors, item.colors ?? [])
      const tagMatch = matchesAny(filters.tags, item.dressCodes ?? [])
      const seasonMatch = matchesAny(filters.seasons, item.seasons ?? [])
      const brandMatch =
        filters.brands.length === 0 || filters.brands.includes(item.brand)
      const fabricMatch = matchesAny(filters.fabrics, item.fabrics ?? [])
      return colorMatch && tagMatch && seasonMatch && brandMatch && fabricMatch
    })

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'Newest':
          return parseInt(b.id) - parseInt(a.id)
        case 'Oldest':
          return parseInt(a.id) - parseInt(b.id)
        case 'Name A-Z':
          return a.name.localeCompare(b.name)
        case 'Name Z-A':
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

    return sorted
  }, [items, searchQuery, selectedCategory, sortBy, filters])
  useEffect(() => {
    if (isFilterOpen) {
      setDraftFilters(filters)
    }
  }, [isFilterOpen, filters])

  const toggleDraft = (key: keyof typeof filters, value: string) => {
    setDraftFilters((prev) => {
      const exists = prev[key].includes(value)
      const nextValues = exists
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value]
      return { ...prev, [key]: nextValues }
    })
  }

  const applyFilters = () => {
    setFilters(draftFilters)
    setIsFilterOpen(false)
  }

  const resetFilters = () => {
    const cleared = createEmptyFilters()
    setDraftFilters(cleared)
    setFilters(cleared)
  }

  const handleUpload = (files: File[]) => {
    const newItems: WardrobeItem[] = files.map((file, idx) => ({
      id: String(items.length + idx + 1),
      name: file.name.replace(/\.[^/.]+$/, ''),
      category: 'Top',
      brand: 'Unknown',
      image: URL.createObjectURL(file),
      description: '',
      dressCodes: [],
      seasons: [],
      colors: [],
      length: 'Normal',
      fabrics: [],
      allowInStyling: true,
      processed: false,
      processing: true,
    }))

    setItems([...items, ...newItems])
    setTotalProcessing(items.length + files.length)
    setProcessedCount(items.filter(item => item.processed).length)
  }

  const handleItemClickInternal = (item: WardrobeItem) => {
    onItemClick?.(item)
  }

  const handleSaveItemInternal = (updatedItem: WardrobeItem) => {
    setItems(prevItems =>
      prevItems.map(item => (item.id === updatedItem.id ? updatedItem : item))
    )
    onSaveItem?.(updatedItem)
  }

  const handleDeleteItemInternal = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId))
    onDeleteItem?.(itemId)
  }

  return (
    <div className="flex flex-col h-full">
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFilterOpen(false)}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.96, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-[#121212] p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Filters</h3>
                  <p className="text-sm text-white/60">Choose multiple options in each group.</p>
                </div>
                <button
                  className="text-white/60 hover:text-white transition-colors"
                  onClick={() => setIsFilterOpen(false)}
                >
                  X
                </button>
              </div>

              <div className="mt-6 space-y-5">
                {[
                  { title: 'Colors', key: 'colors', options: ['Black', 'White', 'Gray', 'Blue', 'Red', 'Green'] },
                  { title: 'Tags', key: 'tags', options: ['Casual'] },
                  { title: 'Season', key: 'seasons', options: ['Fall', 'Summer', 'Winter', 'Spring'] },
                  { title: 'Brand', key: 'brands', options: brandOptions.length ? brandOptions : ['Zara', 'Uniqlo'] },
                  { title: 'Fabric', key: 'fabrics', options: fabricOptions.length ? fabricOptions : ['Cotton', 'Denim', 'Wool'] },
                ].map((group) => (
                  <div key={group.key} className="space-y-3">
                    <h4 className="text-sm font-medium text-white/80">{group.title}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.options.map((option) => {
                        const key = group.key as keyof typeof filters
                        const isActive = draftFilters[key].includes(option)
                        return (
                          <button
                            key={option}
                            onClick={() => toggleDraft(key, option)}
                            className={`px-3 py-1 rounded-full text-sm transition-colors ${isActive
                              ? 'bg-white text-black'
                              : 'bg-white/10 text-white hover:bg-white/20'
                              }`}
                          >
                            {option}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-lg text-sm text-white/80 hover:text-white transition-colors"
                >
                  Reset
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="px-4 py-2 rounded-lg text-sm text-white/80 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={applyFilters}
                    className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content + Sidebar Container */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Main Content */}
        <div className="flex flex-col flex-1 h-full min-w-0">

          {/* Search and Filters */}
          <div className="flex flex-col gap-5 px-4 sm:px-6 pb-6 flex-shrink-0 mt-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Search */}
              <motion.div
                className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl flex-1 sm:flex-initial"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  borderColor: 'rgba(255, 255, 255, 0.16)',
                  borderWidth: '1px',
                }}
                animate={{
                  width: (externalIsSidebarOpen || false) ? '280px' : '360px',
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm sm:text-base font-normal text-white placeholder-white/48 outline-none"
                  style={{ lineHeight: '1.625' }}
                />
                <Search className="h-5 w-5 sm:h-6 sm:w-6 text-white flex-shrink-0" />
              </motion.div>

              {/* Filter, Sort, Add buttons */}
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-white/10 whitespace-nowrap"
                  style={{
                    height: '44px',
                    backgroundColor: 'rgba(42, 42, 42, 0.72)',
                  }}
                >
                  <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  <span
                    className={`text-sm sm:text-base font-normal text-white ${(externalIsSidebarOpen || false) ? 'hidden lg:inline' : ''}`}
                    style={{ lineHeight: '1.5' }}
                  >
                    Filters
                  </span>
                </button>

                <SortDropdown value={sortBy} onChange={setSortBy} />

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white text-black hover:bg-white/90 transition-colors whitespace-nowrap"
                  style={{
                    height: '44px',
                  }}
                >
                  <span
                    className={`text-sm sm:text-base font-normal ${(externalIsSidebarOpen || false) ? 'hidden lg:inline' : ''}`}
                    style={{ lineHeight: '1.5' }}
                  >
                    Add new
                  </span>
                  <Plus className="h-4 w-4 flex-shrink-0" />
                </button>
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center overflow-x-auto scrollbar-hide">
              {categories.map((category) => {
                const isActive = selectedCategory === category
                const isHover = hoveredCategory === category
                return (
                  <div
                    key={category}
                    className="relative cursor-pointer px-2"
                    onMouseEnter={() => setHoveredCategory(category)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="category-pill-active"
                        className="absolute inset-0 rounded-xl bg-white"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    {isHover && !isActive && (
                      <motion.div
                        layoutId="category-pill-hover"
                        className="absolute inset-0 rounded-xl bg-white/10"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`relative px-3 py-0.5 rounded-xl text-base font-normal whitespace-nowrap transition-colors ${isActive ? 'text-black' : 'text-white/70 hover:text-white/90'
                        }`}
                      style={{ lineHeight: '1.625' }}
                    >
                      {category}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Items Grid */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 min-h-0 py-8">
            {isLoading ? (
              <motion.div
                layout
                className="flex flex-wrap gap-3 md:gap-5"
                animate={{
                  gap: '12px',
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {/* Skeleton loaders */}
                {Array.from({ length: 12 }).map((_, index) => (
                  <motion.div
                    key={`skeleton-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                    }}
                    className="flex flex-col gap-2 p-2.5 rounded-3xl border border-white/10 bg-[#111111] w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] md:w-[calc(33.333%-14px)]"
                    style={{
                      aspectRatio: '3/4',
                    }}
                  >
                    {/* Skeleton image */}
                    <div
                      className="flex-1 rounded-[17px] bg-white/5 animate-pulse"
                      style={{ aspectRatio: '220/254' }}
                    />
                    {/* Skeleton text */}
                    <div className="flex flex-col gap-1">
                      <div className="h-4 bg-white/10 rounded animate-pulse w-3/4" />
                      <div className="h-3 bg-white/5 rounded animate-pulse w-1/2" />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : filteredAndSortedItems.length === 0 ? (
              // Empty state
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center h-full"
              >
                <div className="flex items-center gap-3 text-[#D4A574]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M4 8H20" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span className="text-xl font-medium">Wardrobe</span>
                </div>
                <p className="mt-4 text-2xl font-medium text-[#D4A574]">Add items now!</p>
              </motion.div>
            ) : (
              // Actual items
              <motion.div
                layout
                className="flex flex-wrap gap-3 md:gap-5"
                animate={{
                  gap: '12px',
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredAndSortedItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        duration: 0.3,
                        ease: 'easeInOut',
                        delay: index * 0.01,
                      }}
                      className="w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] md:w-[calc(33.333%-14px)]"
                    >
                      <WardrobeItemCard
                        item={item}
                        isSelected={externalSelectedItem?.id === item.id && (externalIsSidebarOpen || false)}
                        onClick={() => handleItemClickInternal(item)}
                        layoutId={`wardrobe-item-${item.id}`}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

        </div>
      </div>

      {/* Modals */}
      <AddToClosetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  )
}

// Export props interface for use in ChatInterface
export interface WardrobePageProps {
  isProcessing?: boolean
  processedCount?: number
  totalProcessing?: number
  onUpdateProcessingState?: (isProcessing: boolean, processedCount: number, totalProcessing: number) => void
  onUpdateItemCount?: (count: number) => void
  selectedItem?: WardrobeItem | null
  isSidebarOpen?: boolean
  isEditing?: boolean
  onItemClick?: (item: WardrobeItem) => void
  onCloseSidebar?: () => void
  onSaveItem?: (item: WardrobeItem) => void
  onDeleteItem?: (itemId: string) => void
  onEditToggle?: () => void
}
