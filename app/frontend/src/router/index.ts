import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'Trips', component: () => import("@/components/Trips/TripsView.vue") },
    {
        path: '/trip/:id',
        name: 'SelectedTrip',
        component: () => import('@/components/SelectedTrip/SelectedTripView.vue'),
        children: [
            {
                path: 'services',
                name: 'Avia',
                component: () => import('@/components/Avia/AviaView.vue')
            }
        ]
    },
    { path: '/services', name: 'Services', component: () => import('@/components/AviaSearch/AviaSearchView.vue')}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router