import { defineStore } from 'pinia'
import type { Trip } from '@/types/types.ts'

export const useTripStore = defineStore('trip', {
    state: () => ({
        selectedTrip: null as Trip | null
    }),
    actions: {
        selectTrip(trip: Trip) {
            this.selectedTrip = trip
        },
        clearTrip() {
            this.selectedTrip = null
        }
    }
})