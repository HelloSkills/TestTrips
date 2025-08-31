import { createRouter, createWebHistory } from 'vue-router'
import Trips from "@/components/Trips/Trips.vue"
import SelectedTrip from '@/components/SelectedTrip/SelectedTrip.vue'
import Drawer from '@/components/Drawer/Drawer.vue'
import Avia from '@/components/Avia/Avia.vue'
import AviaSearch from '@/components/AviaSearch/AviaSearch.vue'

const routes = [
    { path: '/', name: 'Trips', component: Trips },
    { path: '/drawer', name: 'Drawer', component: Drawer },
    {
        path: '/trip/:id',
        name: 'SelectedTrip',
        component: SelectedTrip,
        children: [
            {
                path: 'services',
                name: 'Avia',
                component: Avia
            }
        ]
    },
    { path: '/services', name: 'Services', component: AviaSearch}
]

// TODO надо сделать асинхронный компонент (лейзи загрузку)

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router