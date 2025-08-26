import { createRouter, createWebHistory } from 'vue-router'
import Trips from "@/components/Trips/index.vue"
import SelectedTrip from '@/components/SelectedTrip/index.vue'

const routes = [
    { path: '/', name: 'Trips', component: Trips },
    { path: '/trip/:id', name: 'SelectedTrip', component: SelectedTrip }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router