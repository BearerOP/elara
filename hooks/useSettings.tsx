'use client'

import { useState, useEffect, useCallback } from 'react'

export interface UserSettings {
    // User & Preferences
    purpose: string | null // What brings you to Elara
    gender: string | null
    colorAnalysis: string | null
    bodyShape: string | null
    age: string | null
    heightUnit: 'ft' | 'cm'
    weightUnit: 'kg' | 'lbs'
    heightFeet: number
    heightInches: number
    heightCm: number
    weightKg: number
    weightLbs: number
    fitPreference: string | null

    // Style Preferences
    preferredVibes: string[]
    preferredBrands: string[]
    budgetRange: string | null

    // Social Connections
    instagramUrl: string
    tiktokUrl: string

    // Location & Weather
    location: string
    temperatureUnit: 'celsius' | 'fahrenheit'

    // Privacy & Security
    profileVisibility: string | null
    wardrobeAccess: string | null
    notifications: string | null
}

const defaultSettings: UserSettings = {
    purpose: null,
    gender: null,
    colorAnalysis: null,
    bodyShape: null,
    age: null,
    heightUnit: 'ft',
    weightUnit: 'kg',
    heightFeet: 6,
    heightInches: 3,
    heightCm: 190,
    weightKg: 60,
    weightLbs: 132,
    fitPreference: null,
    preferredVibes: [],
    preferredBrands: [],
    budgetRange: null,
    instagramUrl: '',
    tiktokUrl: '',
    location: '',
    temperatureUnit: 'celsius',
    profileVisibility: null,
    wardrobeAccess: null,
    notifications: null,
}

export function useSettings() {
    const [settings, setSettings] = useState<UserSettings>(defaultSettings)
    const [isLoaded, setIsLoaded] = useState(false)

    // Load from localStorage on mount - sync with onboarding data
    useEffect(() => {
        const storedOnboarding = localStorage.getItem('onboardingData')
        const storedSettings = localStorage.getItem('userSettings')

        if (storedSettings) {
            try {
                setSettings(JSON.parse(storedSettings))
            } catch (e) {
                console.error('Failed to parse settings:', e)
            }
        } else if (storedOnboarding) {
            // Migrate from onboarding data if settings don't exist yet
            try {
                const onboardingData = JSON.parse(storedOnboarding)
                setSettings({
                    purpose: onboardingData.step1?.selectedOptions?.[0] || null,
                    gender: onboardingData.step2?.selectedGender || null,
                    colorAnalysis: onboardingData.step3?.selectedBodyShape || null,
                    bodyShape: null,
                    age: onboardingData.step4?.selectedAge || null,
                    heightUnit: onboardingData.step5?.heightUnit || 'ft',
                    weightUnit: onboardingData.step5?.weightUnit || 'kg',
                    heightFeet: onboardingData.step5?.heightFeet || 6,
                    heightInches: onboardingData.step5?.heightInches || 3,
                    heightCm: onboardingData.step5?.heightCm || 190,
                    weightKg: onboardingData.step5?.weightKg || 60,
                    weightLbs: onboardingData.step5?.weightLbs || 132,
                    fitPreference: onboardingData.step5?.selectedFit || null,
                    preferredVibes: onboardingData.step6?.selectedVibes || [],
                    preferredBrands: onboardingData.step7?.selectedBrands || [],
                    budgetRange: onboardingData.step8?.budgetRange || null,
                    instagramUrl: onboardingData.step9?.instagramUrl || '',
                    tiktokUrl: onboardingData.step9?.tiktokUrl || '',
                    location: onboardingData.step10?.location || '',
                    temperatureUnit: onboardingData.step10?.temperatureUnit || 'celsius',
                    profileVisibility: null,
                    wardrobeAccess: null,
                    notifications: null,
                })
            } catch (e) {
                console.error('Failed to migrate onboarding data:', e)
            }
        }
        setIsLoaded(true)
    }, [])

    // Save to localStorage whenever settings change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('userSettings', JSON.stringify(settings))
        }
    }, [settings, isLoaded])

    const updateSetting = useCallback(<K extends keyof UserSettings>(
        key: K,
        value: UserSettings[K]
    ) => {
        setSettings((prev) => ({
            ...prev,
            [key]: value,
        }))
    }, [])

    const updateSettings = useCallback((updates: Partial<UserSettings>) => {
        setSettings((prev) => ({
            ...prev,
            ...updates,
        }))
    }, [])

    const resetSettings = useCallback(() => {
        setSettings(defaultSettings)
        localStorage.removeItem('userSettings')
    }, [])

    return {
        settings,
        updateSetting,
        updateSettings,
        resetSettings,
        isLoaded,
    }
}
