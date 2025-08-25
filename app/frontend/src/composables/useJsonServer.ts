import { ref } from 'vue'
import axios from "axios"

const BACKEND_URL = "http://localhost:3000"

export const users = ref([])
export const aviaVariants = ref([])
export const trips = ref([])

export const getUsers = async () => {
    users.value = (await axios.get(`${BACKEND_URL}/users`)).data
}

export const getAviaVariants = async () => {
    aviaVariants.value = (await axios.get(`${BACKEND_URL}/aviaVariants`)).data
}

export const getTrips = async () => {
    trips.value = (await axios.get(`${BACKEND_URL}/trips`)).data
}

export const useJsonServer = () => ({
    users,
    aviaVariants,
    trips,
    getUsers,
    getAviaVariants,
    getTrips,
})
