import axios from "axios"
import { ref } from 'vue'
import type { User, AviaVariant, Trip } from "@/types/types"

const BACKEND_URL = "http://localhost:3000"

export function useJsonServer() {
    const users = ref<User[]>([])
    const aviaVariants = ref<AviaVariant[]>([])
    const trips = ref<Trip[]>([])

    // Юзеры
    const getUsers = async () => {
        try {
            const res = await axios.get<User[]>(`${BACKEND_URL}/users`)
            users.value = res.data
            return users.value
        } catch (error) {
            console.error('Ошибка при загрузке пользователей:', error)
            return []
        }
    }

    // Услуги
    const getAviaVariants = async () => {
        try {
            const res = await axios.get<AviaVariant[]>(`${BACKEND_URL}/aviaVariants`)
            aviaVariants.value = res.data
            return aviaVariants.value
        } catch (error) {
            console.error('Ошибка при загрузке авиа-услуг:', error)
            return []
        }
    }

    // Поездки
    const getTrips = async () => {
        try {
            const res = await axios.get<Trip[]>(`${BACKEND_URL}/trips`)
            trips.value = res.data
            return trips.value
        } catch (error) {
            console.error('Ошибка при загрузке поездок:', error)
            return []
        }
    }

    // Добавляем новую поездку
    const postTrip = async (tripData: Omit<Trip, 'id' | 'status'> & { status?: 'new' | 'ended' | null }) => {
        try {
            const res = await axios.post<Trip>(`${BACKEND_URL}/trips`, tripData)
            return res.data
        } catch (error) {
            console.error('Ошибка при создании поездки:', error)
            return null
        }
    }

    // Обновляем статус поездки
    const updateTripStatus = async (id: number, status: 'new' | 'ended' | null) => {
        try {
            const res = await axios.patch<Trip>(`${BACKEND_URL}/trips/${id}`, { status })
            return res.data
        } catch (error) {
            console.error(`Ошибка при обновлении статуса поездки ${id}:`, error)
            return null
        }
    }

    // Обновляем услуги поездки (добавляем билет + юзера, обновляем price)
    const patchTripServices = async (
        tripId: number | string,
        services: { user: User; ticket: AviaVariant }[],
        price: number
    ) => {
        try {
            const res = await axios.patch<Trip>(`${BACKEND_URL}/trips/${tripId}`, { services, price })
            return res.data
        } catch (error) {
            console.error(`Ошибка при обновлении услуг поездки ${tripId}:`, error)
            return null
        }
    }

    return {
        users,
        aviaVariants,
        trips,
        getUsers,
        getAviaVariants,
        getTrips,
        postTrip,
        updateTripStatus,
        patchTripServices
    }
}
