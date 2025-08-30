import { defineStore } from 'pinia'
import type { Trip, User, AviaVariant } from '@/types/types.ts'
import { patchTripServices } from '@/composables/useJsonServer.ts'

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
        },
        getServices() {
            return this.selectedTrip ? this.selectedTrip.services : []
        },

        // Добавляем сервис локально и пушим на бэк
        async addService(user: User, ticket: AviaVariant) {
            if (!this.selectedTrip) throw new Error('Сначала выберите поездку!')

            const newService = { user, ticket }

            // локально
            this.selectedTrip.services.push(newService)

            // пуш на бэк
            const updatedTrip = await patchTripServices(this.selectedTrip.id, this.selectedTrip.services)

            // синхронизируем локальный объект с сервером
            this.selectedTrip.services = updatedTrip.services

            return newService
        }
    }
})
