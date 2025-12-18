import { StyleCard } from '@/components/onboarding/CardStack'

// Define style categories with their metadata
const styleCategories = {
    male: [
        { id: 'athleisure', label: 'Athleisure', type: 'Active', occasion: 'Casual', region: 'Global' },
        { id: 'grunge', label: 'Grunge', type: 'Edgy', occasion: 'Casual', region: 'Western' },
        { id: 'minimalist', label: 'Minimalist', type: 'Clean', occasion: 'Everyday', region: 'Global' },
        { id: 'preppy', label: 'Preppy', type: 'Classic', occasion: 'Smart Casual', region: 'Western' },
        { id: 'retro', label: 'Retro', type: 'Vintage', occasion: 'Casual', region: 'Global' },
        { id: 'smart-casual', label: 'Smart Casual', type: 'Refined', occasion: 'Work', region: 'Global' },
        { id: 'streetwear', label: 'Streetwear', type: 'Urban', occasion: 'Street', region: 'Global' },
        { id: 'techwear', label: 'Techwear', type: 'Futuristic', occasion: 'Urban', region: 'Global' },
    ],
    female: [
        { id: 'boho', label: 'Boho', type: 'Free-spirited', occasion: 'Casual', region: 'Global' },
        { id: 'chic-n-polished', label: 'Chic & Polished', type: 'Sophisticated', occasion: 'Formal', region: 'Western' },
        { id: 'cottagecore', label: 'Cottagecore', type: 'Romantic', occasion: 'Casual', region: 'Western' },
        { id: 'glam', label: 'Glam', type: 'Bold', occasion: 'Night', region: 'Global' },
        { id: 'minimalist', label: 'Minimalist', type: 'Clean', occasion: 'Everyday', region: 'Global' },
        { id: 'romantic', label: 'Romantic', type: 'Feminine', occasion: 'Date', region: 'European' },
        { id: 'soft-girl', label: 'Soft Girl', type: 'Sweet', occasion: 'Casual', region: 'Global' },
        { id: 'streetwear', label: 'Streetwear', type: 'Urban', occasion: 'Street', region: 'Global' },
    ],
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

// Generate random style cards based on gender
export function generateStyleCards(gender?: string | null): StyleCard[] {
    let categories: typeof styleCategories.male | typeof styleCategories.female
    let genderPrefix: string

    // Determine which categories to use based on gender
    if (gender === 'man') {
        categories = styleCategories.male
        genderPrefix = 'male'
    } else if (gender === 'woman') {
        categories = styleCategories.female
        genderPrefix = 'female'
    } else {
        // For 'other' or null, shuffle both male and female categories
        const allCategories = [...styleCategories.male, ...styleCategories.female]
        categories = shuffleArray(allCategories).slice(0, 10) // Take 10 random categories
        genderPrefix = 'mixed' // We'll handle this differently
    }

    // Generate cards with random images from each category
    const cards: StyleCard[] = categories.map((category, index) => {
        // Randomly select one of the 4 images for this category
        const imageNumber = Math.floor(Math.random() * 4) + 1

        // Determine the correct image path
        let imagePath: string
        if (genderPrefix === 'mixed') {
            // For mixed gender, we need to check if this category is from male or female list
            const isMaleCategory = styleCategories.male.some(c => c.id === category.id)
            const actualGenderPrefix = isMaleCategory ? 'male' : 'female'
            imagePath = `/images/onboarding/stack/${category.id}-${actualGenderPrefix}-${imageNumber}.png`
        } else {
            imagePath = `/images/onboarding/stack/${category.id}-${genderPrefix}-${imageNumber}.png`
        }

        return {
            id: String(index + 1),
            style: category.label,
            type: category.type,
            occasion: category.occasion,
            region: category.region,
            image: imagePath,
            label: category.label,
            kind: 'style',
        }
    })

    // Shuffle the final deck for random order
    return shuffleArray(cards)
}
