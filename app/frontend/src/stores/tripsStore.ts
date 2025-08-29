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

    // getters: {
    //     // Получаем метку статуса для поездки
    //     statusLabel: (state) => (trip: Trip) => {
    //         if (trip.status === 'ended') return 'Завершённая'
    //         if (trip.status === 'new') return 'Новая'
    //         return ''
    //     }
    // },

    actions: {
        // Загрузка поездок
        async loadTrips() {
            const trips = await getTrips()
            this.trips = trips.map(t => ({ ...t, status: t.status ?? null }))
            this.filteredTrips = [...this.trips]
        },

        // Фильтрация поездок по названию или id
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

        // Создание новой поездки с присвоением статуса 'new' и пушем на бэк
        async createTrip(newTrip: Omit<Trip, 'id'>) {
            const createdTrip = await postTrip({ ...newTrip, status: 'new' })

            this.trips.push(createdTrip)
            this.filteredTrips.push(createdTrip)

            return createdTrip
        },

        // Изменение статуса поездки и пуш на бэк
        async setTripStatus(id: number, status: 'new' | 'ended' | null) {
            // обновляем на бэке
            const updatedTrip = await updateTripStatus(id, status)

            // обновляем локально
            const trip = this.trips.find(t => t.id === id)
            if (trip) trip.status = updatedTrip.status

            // обновляем выбранную поездку
            if (this.selectedTrip?.id === id) this.selectedTrip.status = updatedTrip.status
        },

        // Получить участников поездки
        getUsersForTrip(id: string | number) {
            const trip = this.trips.find(trip => trip.id.toString() === id.toString())
            const users = trip ? trip.passengers : []
            console.log(`Участники поездки ${id}:`, users)
            return users
        },

        // Установить выбранную поездку
        selectTrip(trip: Trip) {
            this.selectedTrip = trip
        },

        clearSelectedTrip() {
            this.selectedTrip = null
        }
    }
})
