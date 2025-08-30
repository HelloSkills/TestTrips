import { ref } from 'vue'
import type { User, AviaVariant, Trip } from "@/types/types"
import axios from "axios"

const BACKEND_URL = "http://localhost:3000"

export const users = ref<User[]>([])
export const aviaVariants = ref<AviaVariant[]>([])
export const trips = ref<Trip[]>([])

// Юзеры
export const getUsers = async () => {
    return users.value = (await axios.get<User[]>(`${BACKEND_URL}/users`)).data
}

// Услуги
export const getAviaVariants = async () => {
    return aviaVariants.value = (await axios.get<AviaVariant[]>(`${BACKEND_URL}/aviaVariants`)).data
}

// Поездки

// Получаем все поездки
export const getTrips = async () => {
    return trips.value = (await axios.get<Trip[]>(`${BACKEND_URL}/trips`)).data
}

// Добавляем новую поездку с полем status
export const postTrip = async (tripData: Omit<Trip, 'id' | 'status'> & { status?: 'new' | 'ended' | null }) => {
    const res = await axios.post<Trip>(`${BACKEND_URL}/trips`, tripData)
    return res.data
}

// composables/useJsonServer.ts
export const updateTripStatus = async (id: number, status: 'new' | 'ended' | null) => {
    const res = await axios.patch<Trip>(`${BACKEND_URL}/trips/${id}`, { status })
    return res.data
}

// Обновляем services поездки (добавляем билет + юзера)
export const patchTripServices = async (tripId: number | string, services: { user: User; ticket: AviaVariant }[]) => {
    const res = await axios.patch<Trip>(`${BACKEND_URL}/trips/${tripId}`, { services })
    return res.data
}