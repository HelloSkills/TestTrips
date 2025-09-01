<template>
  <Header :selectedTrip="selectedTrip"/>
  <main :class="$style.content">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import Header from "@/components/AppHeader.vue"
import { onMounted } from 'vue'
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
  margin-bottom: 50px;
}
</style>
