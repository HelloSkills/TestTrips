// stores/tripsStore.ts
import { defineStore } from 'pinia'
import type { Trip } from '@/types/types.ts'
import { getTrips, postTrip } from '@/composables/useJsonServer.ts'

export const useTripsStore = defineStore('trips', {
    state: () => ({
        trips: [] as Trip[],
        filteredTrips: [] as Trip[],
        selectedTrip: null as Trip | null, // выбранная поездка
    }),
    actions: {
        async loadTrips() {
            this.trips = await getTrips()
            this.filteredTrips = [...this.trips] // для фильтрованного списка создаём копию
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
            const createdTrip = await postTrip(newTrip)
            this.trips.push(createdTrip)
            this.filteredTrips.push(createdTrip)
            return createdTrip
        },

        // Получить пользователей конкретной поездки по id
        getUsersForTrip(id: string | number) {
            const trip = this.trips.find(trip => trip.id.toString() === id.toString())
            const users = trip ? trip.passengers : []
            console.log(`Участники поездки ${id}:`, users)
            return users
        },

        // Установить выбранную поездку
        // setSelectedTrip(trip: Trip) {
        //     this.selectedTrip = trip
        // },
        //
        // clearSelectedTrip() {
        //     this.selectedTrip = null
        // }
    }
})
