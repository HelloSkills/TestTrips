// stores/tripsStore.ts
import { defineStore } from 'pinia'
import type { Trip } from '@/types/types.ts'
import { getTrips } from '@/composables/useJsonServer.ts'

export const useTripsStore = defineStore('trips', {
    state: () => ({
        trips: [] as Trip[]
    }),
    actions: {
        async loadTrips() {
            this.trips = await getTrips()
        }
    }
})