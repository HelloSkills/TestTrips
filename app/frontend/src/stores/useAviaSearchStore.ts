import { defineStore } from 'pinia'
import type { AviaVariant } from '@/types/types.ts'

export const useAviaSearchStore = defineStore('aviaSearch', {
    state: () => ({
        variants: [] as AviaVariant[],
        filteredVariants: [] as AviaVariant[],
        tripType: 'cheap' as 'cheap' | 'expensive',
        searchCompleted: false,
        isLoading: false, // <-- добавляем флаг загрузки
        filters: {
            placeFrom: '',
            placeTo: '',
            dateFrom: null as string | null,
            dateTo: null as string | null
        }
    }),
    actions: {
        setVariants(items: AviaVariant[]) {
            this.variants = items
        },

        clearSearch() {
            this.variants = []
            this.filteredVariants = []
            this.searchCompleted = false
            this.filters = { placeFrom: '', placeTo: '', dateFrom: null, dateTo: null }
            this.isLoading = false
        },

        setLoading(val: boolean) {
            this.isLoading = val
        },

        sortVariants(type: 'cheap' | 'expensive') {
            this.tripType = type
            this.filteredVariants.sort((a, b) =>
                type === 'cheap' ? a.price - b.price : b.price - a.price
            )
        },

        setFilters(filters: { placeFrom: string; placeTo: string; dateFrom: string | null; dateTo: string | null }) {
            this.filters = { ...filters }
            this.applyFilters()
        },

        applyFilters() {
            this.filteredVariants = this.variants.filter(v => {

                // Фильтр по городам
                const matchFrom = this.filters.placeFrom
                    ? v.placeFrom.toLowerCase().trim() === this.filters.placeFrom.toLowerCase().trim()
                    : true

                const matchTo = this.filters.placeTo
                    ? v.placeTo.toLowerCase().trim() === this.filters.placeTo.toLowerCase().trim()
                    : true

                // Фильтр по датам (строчное сравнение)
                let matchDateFrom = true
                let matchDateTo = true

                if (this.filters.dateFrom) {
                    matchDateFrom = v.dateFrom.trim() === this.filters.dateFrom.trim()
                }

                if (this.filters.dateTo) {
                    matchDateTo = v.dateTo.trim() === this.filters.dateTo.trim()
                }

                return matchFrom && matchTo && matchDateFrom && matchDateTo
            })

            // Сортировка по типу
            this.sortVariants(this.tripType)

            // Флаг завершённого поиска
            this.searchCompleted = this.filteredVariants.length > 0
        }
    }
})
