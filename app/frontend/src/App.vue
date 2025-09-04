<template>
  <AppHeader :selectedTrip="selectedTrip"/>
  <main :class="$style.content">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import AppHeader from "@/components/AppHeader.vue"
import { onMounted } from 'vue'
import { useTripsStore } from '@/stores/TripsStore'
import { storeToRefs } from 'pinia'
import { useSelectedTripStore } from '@/stores/selectedTripStore'

const selectedTripStore = useSelectedTripStore()
const { selectedTrip } = storeToRefs(selectedTripStore)

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
