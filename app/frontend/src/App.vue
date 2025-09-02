<template>
  <AppHeader :selectedTrip="selectedTrip"/>
  <main :class="$style.content">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue"
import { onMounted } from 'vue'
import { useTripsStore } from '@/stores/tripsStore'
import { storeToRefs } from 'pinia'
import { useTripStore } from '@/stores/SelectedTripStore'

const tripStore = useTripStore()
const { selectedTrip } = storeToRefs(tripStore)

const tripsStore = useTripsStore()

onMounted(() => {
  tripsStore.loadTrips()
})
</script>

<style lang="scss" module>
.content {
  margin-top: 110px;
  margin-bottom: 50px;
}
</style>
