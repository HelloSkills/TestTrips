<template>
  <div v-if="selectedTrip">
    <div>{{ selectedTrip.name }}</div>
    <div>Цена: {{ selectedTrip.price }} ₽</div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTripStore } from '@/stores/SelectedTripStore'

const tripStore = useTripStore()
const { selectedTrip } = storeToRefs(tripStore)
</script>


<style lang="scss" module>
//.container {
//  width: 100%;
//}
</style>