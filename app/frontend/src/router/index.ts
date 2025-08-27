import { createRouter, createWebHistory } from 'vue-router'
import Trips from "@/components/Trips/index.vue"
import SelectedTrip from '@/components/SelectedTrip/index.vue'
import Drawer from '@/components/Drawer/index.vue'

const routes = [
    { path: '/', name: 'Trips', component: Trips },
    { path: '/drawer', component: Drawer },
    { path: '/trip/:id', name: 'SelectedTrip', component: SelectedTrip }
]

// TODO надо сделать асинхронный компонент (лейзи загрузку)

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router