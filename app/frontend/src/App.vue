<template>
  <Header :selectedTrip="selectedTrip"/>
  <router-view :class="$style.content"/>
</template>

<script setup lang="ts">
import Header from "@/components/AppHeader.vue"
import { onMounted, ref } from 'vue'
import { getUsers, getAviaVariants, getTrips, postTrip, users, aviaVariants, trips } from "@/composables/useJsonServer.ts"
import { useTripsStore } from '@/stores/tripsStore'

import { storeToRefs } from 'pinia'
import { useTripStore } from '@/stores/SelectedTripStore'
const tripStore = useTripStore()
const { selectedTrip } = storeToRefs(tripStore)

const tripsStore = useTripsStore()

onMounted(() => {
  tripsStore.loadTrips()  // загружаем все поездки через store
})
</script>

<style lang="scss" module>
.content {
  margin-top: 110px;
}
</style>