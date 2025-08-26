<template>
  <Header/>
  <router-view />
</template>

<script setup lang="ts">
import Header from "@/components/header.vue"
import Trips from "@/components/Trips/index.vue"
import SelectedTrip from "@/components/SelectedTrip.vue"
import { onMounted, ref } from 'vue'
import { getUsers, getAviaVariants, getTrips, postTrip, users, aviaVariants, trips } from "@/composables/useJsonServer.ts"
import { useTripsStore } from '@/stores/tripsStore'

// getUsers()
// getAviaVariants()
// postTrip({})

const tripsStore = useTripsStore()

onMounted(() => {
  tripsStore.loadTrips()  // загружаем все поездки через store
})
</script>

<style lang="scss" module>
//.test{
//  display: flex;
//}
</style>
