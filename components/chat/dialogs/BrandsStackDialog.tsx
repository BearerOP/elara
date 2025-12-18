'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface BrandsStackDialogProps {
    isOpen: boolean
    onClose: () => void
    selectedBrands: string[]
    onSave: (brands: string[]) => void
}

export function BrandsStackDialog({
    isOpen,
    onClose,
    selectedBrands,
    onSave,
}: BrandsStackDialogProps) {
    const [localBrands, setLocalBrands] = React.useState<string[]>(selectedBrands)

    React.useEffect(() => {
        if (isOpen) {
            setLocalBrands(selectedBrands)
        }
    }, [isOpen, selectedBrands])

    const handleSave = () => {
        onSave(localBrands)
        onClose()
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
                            className="bg-gradient-to-b from-[#161724] to-[#161616] rounded-2xl w-full max-w-2xl overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                                <h2 className="text-xl font-semibold text-white">Preferred Brands</h2>
                                <button
                                    onClick={onClose}
                                    className="text-white/60 hover:text-white transition-colors p-1"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex-1 overflow-y-auto">
                                <p className="text-white/60 text-sm mb-6">
                                    Brand selection coming soon! This feature will allow you to swipe through brands and save your preferences.
                                </p>
                                <div className="flex items-center justify-center py-12">
                                    <div className="text-center">
                                        <div className="inline-block px-6 py-3 mb-4 bg-gradient-to-r from-[#D50048] to-[#4D4E86] rounded-full text-white text-base font-medium">
                                            Coming Soon
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-end gap-2 px-6 py-3.5 border-t border-white/10">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-white/10 text-white/75 rounded-lg hover:bg-white/15 transition-colors text-base"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
