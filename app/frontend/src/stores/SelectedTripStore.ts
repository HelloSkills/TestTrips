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
            return this.selectedTrip?.services || []
        },

        // Добавляем сервис локально и пушим на бэк с обновлением price
        async addService(user: User, ticket: AviaVariant) {
            if (!this.selectedTrip) throw new Error('Сначала выберите поездку!')

            const newService = { user, ticket }

            // пушим локально
            this.selectedTrip.services.push(newService)

            // обновляем локальную цену
            this.selectedTrip.price += ticket.price

            // пушим на бэк с price
            const updatedTrip = await patchTripServices(
                this.selectedTrip.id,
                this.selectedTrip.services,
                this.selectedTrip.price
            )

            // синхронизация с сервером
            this.selectedTrip.services = updatedTrip.services
            this.selectedTrip.price = updatedTrip.price

            return newService
        }
    }
})
