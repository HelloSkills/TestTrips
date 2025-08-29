// utils/sortVariants.ts
import type { AviaVariant } from '@/types/types'

export function sortByPrice(variants: AviaVariant[], tripType: 'cheap' | 'expensive'): AviaVariant[] {
    if (!Array.isArray(variants)) return []

    return [...variants].sort((a, b) => {
        if (tripType === 'cheap') {
            return (a.price || 0) - (b.price || 0) // от дешевых к дорогим
        } else {
            return (b.price || 0) - (a.price || 0) // от дорогих к дешевым
        }
    })
}