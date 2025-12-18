'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import CardStack, { StyleCard } from '@/components/onboarding/CardStack'
import { generateStyleCards } from '@/lib/styleCardGenerator'

interface VibesStackDialogProps {
    isOpen: boolean
    onClose: () => void
    selectedVibes: string[]
    onSave: (vibes: string[]) => void
    gender?: string | null
}

export function VibesStackDialog({
    isOpen,
    onClose,
    selectedVibes,
    onSave,
    gender,
}: VibesStackDialogProps) {
    const [cards, setCards] = React.useState<StyleCard[]>([])
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [likedStyles, setLikedStyles] = React.useState<string[]>(selectedVibes)
    const [showCompletion, setShowCompletion] = React.useState(false)

    // Generate cards when dialog opens
    React.useEffect(() => {
        if (isOpen) {
            const generatedCards = generateStyleCards(gender)
            setCards(generatedCards)
            setCurrentIndex(0)
            setLikedStyles(selectedVibes)
            setShowCompletion(false)
        }
    }, [isOpen, gender, selectedVibes])

    const handleSwipe = (direction: 'left' | 'right', card: StyleCard) => {
        if (direction === 'right') {
            setLikedStyles([...likedStyles, card.style])
        }
    }

    const handleIndexChange = (newIndex: number) => {
        setCurrentIndex(newIndex)
        if (newIndex >= cards.length) {
            setShowCompletion(true)
        }
    }

    const handleComplete = () => {
        setShowCompletion(true)
    }

    const handleSave = () => {
        onSave(Array.from(new Set(likedStyles)))
        onClose()
    }

    const handleDoItAgain = () => {
        const generatedCards = generateStyleCards(gender)
        setCards(generatedCards)
        setCurrentIndex(0)
        setLikedStyles([])
        setShowCompletion(false)
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Dialog */}
                    <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="bg-gradient-to-b from-[#161724] to-[#161616] rounded-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 flex-shrink-0">
                                <h2 className="text-xl font-semibold text-white">
                                    {showCompletion ? 'Style Preferences Saved' : 'Choose Your Vibes'}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="text-white/60 hover:text-white transition-colors p-1"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6">
                                {showCompletion ? (
                                    <div className="flex flex-col items-center gap-6 py-8">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                                <path
                                                    d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                        <div className="flex flex-col items-center gap-2">
                                            <h3 className="text-lg font-medium text-white">Great taste!</h3>
                                            <p className="text-white/60 text-center">
                                                You selected {likedStyles.length} style{likedStyles.length !== 1 ? 's' : ''}
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleDoItAgain}
                                            className="text-sm font-medium text-white/75 hover:text-white transition-colors"
                                        >
                                            Do it again
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <p className="text-white/60 text-sm mb-6 text-center">
                                            Swipe right on styles you love, left to skip
                                        </p>
                                        {cards.length > 0 && (
                                            <CardStack
                                                cards={cards}
                                                currentIndex={currentIndex}
                                                onSwipe={handleSwipe}
                                                onComplete={handleComplete}
                                                showArrows={true}
                                                onIndexChange={handleIndexChange}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-end gap-2 px-6 py-3.5 border-t border-white/10 flex-shrink-0">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-white/10 text-white/75 rounded-lg hover:bg-white/15 transition-colors text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition-colors text-base font-normal"
                                >
                                    Save
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
