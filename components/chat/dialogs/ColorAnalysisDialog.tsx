'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ColorAnalysisDialogProps {
    isOpen: boolean
    onClose: () => void
    selectedColor: string | null
    onSelect: (colorId: string) => void
}

type ToneRow = {
    id: 'warm' | 'cool' | 'neutral'
    label: string
    swatches: string[]
}

const toneRows: ToneRow[] = [
    {
        id: 'warm',
        label: 'WARM',
        swatches: ['#ECCAAA', '#EFD4B6', '#D8BB91', '#E2AD98', '#AA7537', '#D3AB79', '#966040', '#62340F', '#522A08', '#422408'],
    },
    {
        id: 'cool',
        label: 'COOL',
        swatches: ['#FAEFEC', '#FEE3EE', '#FFE6E7', '#E3C6C2', '#C29081', '#DABABA', '#977160', '#613A31', '#482422', '#2E1416'],
    },
    {
        id: 'neutral',
        label: 'NEUTRAL',
        swatches: ['#EDD9D4', '#EFD1C2', '#D3B1A1', '#F2D9C8', '#D9A094', '#DCBBA6', '#AC7B65', '#61301C', '#402216', '#270F08'],
    },
]

export function ColorAnalysisDialog({
    isOpen,
    onClose,
    selectedColor,
    onSelect,
}: ColorAnalysisDialogProps) {
    const [localSelected, setLocalSelected] = React.useState<string | null>(selectedColor)

    React.useEffect(() => {
        if (isOpen) {
            setLocalSelected(selectedColor)
        }
    }, [isOpen, selectedColor])

    const handleSelect = (colorId: string) => {
        setLocalSelected(colorId)
    }

    const handleSave = () => {
        if (localSelected) {
            onSelect(localSelected)
        }
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
                                <h2 className="text-xl font-semibold text-white">Select Your Color Analysis</h2>
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
                                    Choose the tone that best matches your skin undertones. This helps us recommend colors that complement you best.
                                </p>

                                {/* Swatch grid */}
                                <div className="flex flex-col gap-4">
                                    {toneRows.map((row) => (
                                        <div key={row.id} className="flex items-center gap-5">
                                            <span className="w-20 text-right text-sm font-medium tracking-[0.18em] text-white/60">
                                                {row.label}
                                            </span>
                                            <div className="flex flex-wrap gap-3">
                                                {row.swatches.map((color, index) => {
                                                    const id = `${row.id}-${index}`
                                                    const isSelected = localSelected === id
                                                    return (
                                                        <button
                                                            key={id}
                                                            type="button"
                                                            onClick={() => handleSelect(id)}
                                                            className="relative h-10 w-10 rounded-full transition-transform hover:scale-110"
                                                            style={{ backgroundColor: color }}
                                                        >
                                                            {isSelected && (
                                                                <span className="absolute inset-[-3px] rounded-full border-2 border-white" />
                                                            )}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-end gap-2 px-6 py-3.5 border-t border-white/10">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-white/10 text-white/75 rounded-lg hover:bg-white/15 transition-colors text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={!localSelected}
                                    className="px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition-colors text-base font-normal disabled:opacity-50 disabled:cursor-not-allowed"
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
