'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface HeightWeightDialogProps {
    isOpen: boolean
    onClose: () => void
    initialData: {
        heightUnit: 'ft' | 'cm'
        weightUnit: 'kg' | 'lbs'
        heightFeet: number
        heightInches: number
        heightCm: number
        weightKg: number
        weightLbs: number
    }
    onSave: (data: {
        heightUnit: 'ft' | 'cm'
        weightUnit: 'kg' | 'lbs'
        heightFeet: number
        heightInches: number
        heightCm: number
        weightKg: number
        weightLbs: number
    }) => void
}

export function HeightWeightDialog({
    isOpen,
    onClose,
    initialData,
    onSave,
}: HeightWeightDialogProps) {
    const [heightUnit, setHeightUnit] = React.useState<'ft' | 'cm'>(initialData.heightUnit)
    const [weightUnit, setWeightUnit] = React.useState<'kg' | 'lbs'>(initialData.weightUnit)
    const [heightFeet, setHeightFeet] = React.useState(initialData.heightFeet)
    const [heightInches, setHeightInches] = React.useState(initialData.heightInches)
    const [heightCm, setHeightCm] = React.useState(initialData.heightCm)
    const [weightKg, setWeightKg] = React.useState(initialData.weightKg)
    const [weightLbs, setWeightLbs] = React.useState(initialData.weightLbs)

    // Reset state when dialog opens
    React.useEffect(() => {
        if (isOpen) {
            setHeightUnit(initialData.heightUnit)
            setWeightUnit(initialData.weightUnit)
            setHeightFeet(initialData.heightFeet)
            setHeightInches(initialData.heightInches)
            setHeightCm(initialData.heightCm)
            setWeightKg(initialData.weightKg)
            setWeightLbs(initialData.weightLbs)
        }
    }, [isOpen, initialData])

    const [heightFeetInput, setHeightFeetInput] = React.useState(heightFeet.toString())
    const [heightInchesInput, setHeightInchesInput] = React.useState(heightInches.toString())
    const [heightCmInput, setHeightCmInput] = React.useState(heightCm.toString())
    const [weightKgInput, setWeightKgInput] = React.useState(weightKg.toString())
    const [weightLbsInput, setWeightLbsInput] = React.useState(weightLbs.toString())

    const [heightKey, setHeightKey] = React.useState(0)
    const [weightKey, setWeightKey] = React.useState(0)
    const [heightFeetKey, setHeightFeetKey] = React.useState(0)
    const [heightInchesKey, setHeightInchesKey] = React.useState(0)
    const [heightCmKey, setHeightCmKey] = React.useState(0)
    const [weightKgKey, setWeightKgKey] = React.useState(0)
    const [weightLbsKey, setWeightLbsKey] = React.useState(0)

    const handleHeightUnitChange = (unit: 'ft' | 'cm') => {
        if (heightUnit !== unit) {
            setHeightUnit(unit)
            setHeightKey((prev) => prev + 1)
        }
    }

    const handleWeightUnitChange = (unit: 'kg' | 'lbs') => {
        if (weightUnit !== unit) {
            setWeightUnit(unit)
            setWeightKey((prev) => prev + 1)
        }
    }

    const handleHeightIncrement = (type: 'feet' | 'inches' | 'cm') => {
        if (heightUnit === 'ft') {
            if (type === 'feet') {
                const newVal = Math.min(8, heightFeet + 1)
                setHeightFeet(newVal)
                setHeightFeetInput(newVal.toString())
                setHeightFeetKey((prev) => prev + 1)
            }
            if (type === 'inches') {
                const newVal = Math.min(11, heightInches + 1)
                setHeightInches(newVal)
                setHeightInchesInput(newVal.toString())
                setHeightInchesKey((prev) => prev + 1)
            }
        } else {
            const newVal = Math.min(250, heightCm + 1)
            setHeightCm(newVal)
            setHeightCmInput(newVal.toString())
            setHeightCmKey((prev) => prev + 1)
        }
    }

    const handleHeightDecrement = (type: 'feet' | 'inches' | 'cm') => {
        if (heightUnit === 'ft') {
            if (type === 'feet') {
                const newVal = Math.max(3, heightFeet - 1)
                setHeightFeet(newVal)
                setHeightFeetInput(newVal.toString())
                setHeightFeetKey((prev) => prev + 1)
            }
            if (type === 'inches') {
                const newVal = Math.max(0, heightInches - 1)
                setHeightInches(newVal)
                setHeightInchesInput(newVal.toString())
                setHeightInchesKey((prev) => prev + 1)
            }
        } else {
            const newVal = Math.max(100, heightCm - 1)
            setHeightCm(newVal)
            setHeightCmInput(newVal.toString())
            setHeightCmKey((prev) => prev + 1)
        }
    }

    const handleWeightIncrement = () => {
        if (weightUnit === 'kg') {
            const newVal = Math.min(200, weightKg + 1)
            setWeightKg(newVal)
            setWeightKgInput(newVal.toString())
            setWeightKgKey((prev) => prev + 1)
        } else {
            const newVal = Math.min(440, weightLbs + 1)
            setWeightLbs(newVal)
            setWeightLbsInput(newVal.toString())
            setWeightLbsKey((prev) => prev + 1)
        }
    }

    const handleWeightDecrement = () => {
        if (weightUnit === 'kg') {
            const newVal = Math.max(30, weightKg - 1)
            setWeightKg(newVal)
            setWeightKgInput(newVal.toString())
            setWeightKgKey((prev) => prev + 1)
        } else {
            const newVal = Math.max(66, weightLbs - 1)
            setWeightLbs(newVal)
            setWeightLbsInput(newVal.toString())
            setWeightLbsKey((prev) => prev + 1)
        }
    }

    const handleSave = () => {
        onSave({
            heightUnit,
            weightUnit,
            heightFeet,
            heightInches,
            heightCm,
            weightKg,
            weightLbs,
        })
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
                                <h2 className="text-xl font-semibold text-white">Height & Weight</h2>
                                <button
                                    onClick={onClose}
                                    className="text-white/60 hover:text-white transition-colors p-1"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8 flex-1 overflow-y-auto">
                                <div className="flex flex-col gap-6">
                                    <div className="flex gap-4">
                                        {/* Height */}
                                        <div className="flex-1 rounded-card bg-[#202020] p-5">
                                            <div className="mb-5 flex items-center justify-between">
                                                <span className="text-lg font-medium text-text-primary">Height</span>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleHeightUnitChange('cm')}
                                                        className={`px-2 py-1 text-sm transition-colors ${heightUnit === 'cm' ? 'text-text-primary' : 'text-text-secondary'
                                                            }`}
                                                    >
                                                        cm
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleHeightUnitChange(heightUnit === 'ft' ? 'cm' : 'ft')}
                                                        className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${heightUnit === 'ft' ? 'bg-[#7F56D9]' : 'bg-gray-400/30'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200 ${heightUnit === 'ft' ? 'translate-x-5' : 'translate-x-0'
                                                                }`}
                                                        />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleHeightUnitChange('ft')}
                                                        className={`px-2 py-1 text-sm transition-colors ${heightUnit === 'ft' ? 'text-text-primary' : 'text-text-secondary'
                                                            }`}
                                                    >
                                                        ft
                                                    </button>
                                                </div>
                                            </div>
                                            <AnimatePresence mode="wait">
                                                {heightUnit === 'ft' ? (
                                                    <motion.div
                                                        key="ft"
                                                        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                        exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                                                        transition={{ duration: 0.3, ease: 'easeOut' }}
                                                        className="flex gap-6"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div className="relative h-12 flex items-center">
                                                                <motion.input
                                                                    key={`height-feet-${heightFeetKey}`}
                                                                    type="number"
                                                                    min="3"
                                                                    max="8"
                                                                    value={heightFeetInput}
                                                                    onChange={(e) => {
                                                                        setHeightFeetInput(e.target.value)
                                                                        const num = parseInt(e.target.value)
                                                                        if (!isNaN(num) && num >= 3 && num <= 8) {
                                                                            setHeightFeet(num)
                                                                        }
                                                                    }}
                                                                    onBlur={(e) => {
                                                                        if (e.target.value === '') {
                                                                            setHeightFeet(3)
                                                                            setHeightFeetInput('3')
                                                                        } else if (parseInt(e.target.value) < 3) {
                                                                            setHeightFeet(3)
                                                                            setHeightFeetInput('3')
                                                                        } else {
                                                                            setHeightFeetInput(heightFeet.toString())
                                                                        }
                                                                    }}
                                                                    initial={heightFeetKey > 0 ? { opacity: 0, y: 20, filter: 'blur(4px)' } : false}
                                                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                                                    className="w-12 bg-transparent text-2xl font-semibold text-text-primary outline-none border-none"
                                                                />
                                                                <span className="text-2xl font-semibold text-text-primary pointer-events-none ml-1">
                                                                    ft
                                                                </span>
                                                            </div>
                                                            <div className="flex flex-col gap-1">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleHeightIncrement('feet')}
                                                                    className="text-text-primary hover:opacity-80 transition-opacity"
                                                                >
                                                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                                                        <path d="M12 8L8 12H16L12 8Z" fill="currentColor" fillOpacity="0.64" />
                                                                    </svg>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleHeightDecrement('feet')}
                                                                    className="text-text-primary hover:opacity-80 transition-opacity"
                                                                >
                                                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                                                        <path d="M12 16L8 12H16L12 16Z" fill="currentColor" fillOpacity="0.64" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="relative h-12 flex items-center">
                                                                <motion.input
                                                                    key={`height-inches-${heightInchesKey}`}
                                                                    type="number"
                                                                    min="0"
                                                                    max="11"
                                                                    value={heightInchesInput}
                                                                    onChange={(e) => {
                                                                        setHeightInchesInput(e.target.value)
                                                                        const num = parseInt(e.target.value)
                                                                        if (!isNaN(num) && num >= 0 && num <= 11) {
                                                                            setHeightInches(num)
                                                                        }
                                                                    }}
                                                                    onBlur={(e) => {
                                                                        if (e.target.value === '') {
                                                                            setHeightInches(0)
                                                                            setHeightInchesInput('0')
                                                                        } else {
                                                                            setHeightInchesInput(heightInches.toString())
                                                                        }
                                                                    }}
                                                                    initial={heightInchesKey > 0 ? { opacity: 0, y: 20, filter: 'blur(4px)' } : false}
                                                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                                                    className="w-12 bg-transparent text-2xl font-semibold text-text-primary outline-none border-none"
                                                                />
                                                                <span className="text-2xl font-semibold text-text-primary pointer-events-none ml-1">
                                                                    inch
                                                                </span>
                                                            </div>
                                                            <div className="flex flex-col gap-1">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleHeightIncrement('inches')}
                                                                    className="text-text-primary hover:opacity-80 transition-opacity"
                                                                >
                                                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                                                        <path d="M12 8L8 12H16L12 8Z" fill="currentColor" fillOpacity="0.64" />
                                                                    </svg>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleHeightDecrement('inches')}
                                                                    className="text-text-primary hover:opacity-80 transition-opacity"
                                                                >
                                                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                                                        <path d="M12 16L8 12H16L12 16Z" fill="currentColor" fillOpacity="0.64" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="cm"
                                                        initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                                                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                        exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                                                        transition={{ duration: 0.3, ease: 'easeOut' }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <div className="relative h-12 flex items-center">
                                                            <motion.input
                                                                key={`height-cm-${heightCmKey}`}
                                                                type="number"
                                                                min="100"
                                                                max="250"
                                                                value={heightCmInput}
                                                                onChange={(e) => {
                                                                    setHeightCmInput(e.target.value)
                                                                    const num = parseInt(e.target.value)
                                                                    if (!isNaN(num) && num >= 100 && num <= 250) {
                                                                        setHeightCm(num)
                                                                    }
                                                                }}
                                                                onBlur={(e) => {
                                                                    if (e.target.value === '') {
                                                                        setHeightCm(100)
                                                                        setHeightCmInput('100')
                                                                    } else if (parseInt(e.target.value) < 100) {
                                                                        setHeightCm(100)
                                                                        setHeightCmInput('100')
                                                                    } else {
                                                                        setHeightCmInput(heightCm.toString())
                                                                    }
                                                                }}
                                                                initial={heightCmKey > 0 ? { opacity: 0, y: 20, filter: 'blur(4px)' } : false}
                                                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                                                className="w-14 bg-transparent text-2xl font-semibold text-text-primary outline-none border-none"
                                                            />
                                                            <span className="text-2xl font-semibold text-text-primary pointer-events-none ml-1">
                                                                cm
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleHeightIncrement('cm')}
                                                                className="text-text-primary hover:opacity-80 transition-opacity"
                                                            >
                                                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                                                    <path d="M12 8L8 12H16L12 8Z" fill="currentColor" fillOpacity="0.64" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => handleHeightDecrement('cm')}
                                                                className="text-text-primary hover:opacity-80 transition-opacity"
                                                            >
                                                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                                                    <path d="M12 16L8 12H16L12 16Z" fill="currentColor" fillOpacity="0.64" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Weight */}
                                        <div className="flex-1 rounded-card bg-[#202020] p-5">
                                            <div className="mb-5 flex items-center justify-between">
                                                <span className="text-lg font-medium text-text-primary">Weight</span>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleWeightUnitChange('lbs')}
                                                        className={`px-2 py-1 text-sm transition-colors ${weightUnit === 'lbs' ? 'text-text-primary' : 'text-text-secondary'
                                                            }`}
                                                    >
                                                        lbs
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleWeightUnitChange(weightUnit === 'kg' ? 'lbs' : 'kg')}
                                                        className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${weightUnit === 'kg' ? 'bg-[#7F56D9]' : 'bg-gray-400/30'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200 ${weightUnit === 'kg' ? 'translate-x-5' : 'translate-x-0'
                                                                }`}
                                                        />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleWeightUnitChange('kg')}
                                                        className={`px-2 py-1 text-sm transition-colors ${weightUnit === 'kg' ? 'text-text-primary' : 'text-text-secondary'
                                                            }`}
                                                    >
                                                        kg
                                                    </button>
                                                </div>
                                            </div>
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={weightKey}
                                                    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                    exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                                    className="flex items-center gap-2"
                                                >
                                                    <div className="relative h-12 flex items-center">
                                                        {weightUnit === 'kg' ? (
                                                            <motion.input
                                                                key={`weight-kg-${weightKgKey}`}
                                                                type="number"
                                                                min="30"
                                                                max="200"
                                                                value={weightKgInput}
                                                                onChange={(e) => {
                                                                    setWeightKgInput(e.target.value)
                                                                    const num = parseInt(e.target.value)
                                                                    if (!isNaN(num) && num >= 30 && num <= 200) {
                                                                        setWeightKg(num)
                                                                    }
                                                                }}
                                                                onBlur={(e) => {
                                                                    if (e.target.value === '') {
                                                                        setWeightKg(30)
                                                                        setWeightKgInput('30')
                                                                    } else if (parseInt(e.target.value) < 30) {
                                                                        setWeightKg(30)
                                                                        setWeightKgInput('30')
                                                                    } else {
                                                                        setWeightKgInput(weightKg.toString())
                                                                    }
                                                                }}
                                                                initial={weightKgKey > 0 ? { opacity: 0, y: 20, filter: 'blur(4px)' } : false}
                                                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                                                className="w-14 bg-transparent text-2xl font-semibold text-text-primary outline-none border-none"
                                                            />
                                                        ) : (
                                                            <motion.input
                                                                key={`weight-lbs-${weightLbsKey}`}
                                                                type="number"
                                                                min="66"
                                                                max="440"
                                                                value={weightLbsInput}
                                                                onChange={(e) => {
                                                                    setWeightLbsInput(e.target.value)
                                                                    const num = parseInt(e.target.value)
                                                                    if (!isNaN(num) && num >= 66 && num <= 440) {
                                                                        setWeightLbs(num)
                                                                    }
                                                                }}
                                                                onBlur={(e) => {
                                                                    if (e.target.value === '') {
                                                                        setWeightLbs(66)
                                                                        setWeightLbsInput('66')
                                                                    } else if (parseInt(e.target.value) < 66) {
                                                                        setWeightLbs(66)
                                                                        setWeightLbsInput('66')
                                                                    } else {
                                                                        setWeightLbsInput(weightLbs.toString())
                                                                    }
                                                                }}
                                                                initial={weightLbsKey > 0 ? { opacity: 0, y: 20, filter: 'blur(4px)' } : false}
                                                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                                                className="w-14 bg-transparent text-2xl font-semibold text-text-primary outline-none border-none"
                                                            />
                                                        )}
                                                        <span className="text-2xl font-semibold text-text-primary pointer-events-none ml-1">
                                                            {weightUnit}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <button
                                                            type="button"
                                                            onClick={handleWeightIncrement}
                                                            className="text-text-primary hover:opacity-80 transition-opacity"
                                                        >
                                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                                                <path d="M12 8L8 12H16L12 8Z" fill="currentColor" fillOpacity="0.64" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={handleWeightDecrement}
                                                            className="text-text-primary hover:opacity-80 transition-opacity"
                                                        >
                                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                                                <path d="M12 16L8 12H16L12 16Z" fill="currentColor" fillOpacity="0.64" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            </AnimatePresence>
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
