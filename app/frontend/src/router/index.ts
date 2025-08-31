import { createRouter, createWebHistory } from 'vue-router'
import TripsView from "@/components/Trips/TripsView.vue"
import SelectedTripView from '@/components/SelectedTrip/SelectedTripView.vue'
import DrawerView from '@/components/Drawer/DrawerView.vue'
import AviaView from '@/components/Avia/AviaView.vue'
import AviaSearchView from '@/components/AviaSearch/AviaSearchView.vue'

const routes = [
    { path: '/', name: 'Trips', component: TripsView },
    { path: '/drawer', name: 'Drawer', component: DrawerView },
    {
        path: '/trip/:id',
        name: 'SelectedTrip',
        component: SelectedTripView,
        children: [
            {
                path: 'services',
                name: 'Avia',
                component: AviaView
            }
        ]
    },
    { path: '/services', name: 'Services', component: AviaSearchView}
]

// TODO надо сделать асинхронный компонент (лейзи загрузку)

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router