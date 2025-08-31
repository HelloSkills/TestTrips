// stores/tripsStore.ts
import { defineStore } from 'pinia'
import type { Trip } from '@/types/types.ts'
import { getTrips, postTrip, updateTripStatus } from '@/composables/useJsonServer.ts'

export const useTripsStore = defineStore('trips', {
    state: () => ({
        trips: [] as Trip[],
        filteredTrips: [] as Trip[],
        selectedTrip: null as Trip | null
    }),

    actions: {
        async loadTrips() {
            const trips = await getTrips()
            this.trips = trips.map(t => ({ ...t, status: t.status ?? null }))
            this.filteredTrips = [...this.trips]
        },

        filterTrips(query: string) {
            if (!query) {
                this.filteredTrips = this.trips
                return
            }
            this.filteredTrips = this.trips.filter(trip =>
                trip.name.toLowerCase().includes(query.toLowerCase()) ||
                trip.id.toString().includes(query)
            )
        },

        async createTrip(newTrip: Omit<Trip, 'id'>) {
            const createdTrip = await postTrip({ ...newTrip, status: 'new' })
            this.trips.push(createdTrip)
            this.filteredTrips.push(createdTrip)
            return createdTrip
        },

        async setTripStatus(id: number, status: 'new' | 'ended' | null) {
            const updatedTrip = await updateTripStatus(id, status)
            const trip = this.trips.find(t => t.id === id)
            if (trip) trip.status = updatedTrip.status
            if (this.selectedTrip?.id === id) this.selectedTrip.status = updatedTrip.status
        },

        getUsersForTrip(id: string | number) {
            const trip = this.trips.find(trip => trip.id.toString() === id.toString())
            return trip ? trip.passengers : []
        },

        selectTrip(trip: Trip) {
            this.selectedTrip = trip
        },

        clearSearch() {
            this.filterTrips('')
        }
    }
})
