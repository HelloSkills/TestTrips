import { ref } from 'vue'
import axios from "axios"

const BACKEND_URL = "http://localhost:3000"

export function useJsonServer() {
    // GET
    const users = ref([])
    const aviaVariants = ref([])
    const trips = ref([])

    const getUsers = async () => {
        users.value = (await axios.get(`${BACKEND_URL}/users`)).data
    }

    const getAviaVariants = async () => {
        aviaVariants.value = (await axios.get(`${BACKEND_URL}/aviaVariants`)).data
    }

    const getTrips = async () => {
        trips.value = (await axios.get(`${BACKEND_URL}/trips`)).data
    }



    return {
        users,
        aviaVariants,
        trips,
        getUsers,
        getAviaVariants,
        getTrips,
    }
}