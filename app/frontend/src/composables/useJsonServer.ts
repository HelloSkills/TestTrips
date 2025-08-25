import { ref } from 'vue'
import axios from "axios"

const BACKEND_URL = "http://localhost:3000"

export const users = ref([])
export const aviaVariants = ref([])
export const trips = ref([])

// Получаем всех юзеров
export const getUsers = async () => {
    users.value = (await axios.get(`${BACKEND_URL}/users`)).data
}

// Получаем все услуги
export const getAviaVariants = async () => {
    aviaVariants.value = (await axios.get(`${BACKEND_URL}/aviaVariants`)).data
}

// Получаем все путёвки
export const getTrips = async () => {
    trips.value = (await axios.get(`${BACKEND_URL}/trips`)).data
}
