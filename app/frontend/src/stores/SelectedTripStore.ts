import { defineStore } from 'pinia'
import type { Trip, User, AviaVariant } from '@/types/types'
import { useJsonServer } from '@/composables/useJsonServer.ts'

export const useSelectedTripStore = defineStore('selectedTrip', {
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

        async addService(user: User, ticket: AviaVariant) {
            if (!this.selectedTrip) throw new Error('Сначала выберите поездку!')

            const newService = { user, ticket }

            // пушим локально
            this.selectedTrip.services.push(newService)

            // обновляем локальную цену
            this.selectedTrip.price += ticket.price

            try {
                const { patchTripServices } = useJsonServer()

                // пушим на бэк с price
                const updatedTrip = await patchTripServices(
                    this.selectedTrip.id,
                    this.selectedTrip.services,
                    this.selectedTrip.price
                )

                // синхронизация с сервером
                this.selectedTrip.services = updatedTrip.services
                this.selectedTrip.price = updatedTrip.price
            } catch (err) {
                console.error('Ошибка при добавлении сервиса:', err)
            }

            return newService
        }
    }
})
