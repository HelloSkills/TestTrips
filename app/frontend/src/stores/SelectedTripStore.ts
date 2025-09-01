import { defineStore } from 'pinia'
import type { Trip, User, AviaVariant } from '@/types/types.ts'
import { ref } from 'vue'
import { useJsonServer } from '@/composables/useJsonServer.ts'

export const useTripStore = defineStore('trip', () => {
    const { patchTripServices } = useJsonServer()

    const selectedTrip = ref<Trip | null>(null)

    const selectTrip = (trip: Trip) => {
        selectedTrip.value = trip
    }

    const clearTrip = () => {
        selectedTrip.value = null
    }

    const getServices = () => {
        return selectedTrip.value?.services || []
    }

    // Добавляем сервис локально и пушим на бэк с обновлением price
    const addService = async (user: User, ticket: AviaVariant) => {
        if (!selectedTrip.value) throw new Error('Сначала выберите поездку!')

        const newService = { user, ticket }

        // пушим локально
        selectedTrip.value.services.push(newService)

        // обновляем локальную цену
        selectedTrip.value.price += ticket.price

        try {
            // пушим на бэк с price
            const updatedTrip = await patchTripServices(
                selectedTrip.value.id,
                selectedTrip.value.services,
                selectedTrip.value.price
            )

            // синхронизация с сервером
            selectedTrip.value.services = updatedTrip.services
            selectedTrip.value.price = updatedTrip.price
        } catch (err) {
            console.error('Ошибка при добавлении сервиса:', err)
            throw err
        }

        return newService
    }

    return {
        selectedTrip,
        selectTrip,
        clearTrip,
        getServices,
        addService
    }
})
