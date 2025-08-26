<template>
  <div v-if="selectedTrip">
    <div :class="$style.title">{{ selectedTrip.name }}</div>
    <Item
        :passengers="passengers"
        :services="services"
        :price="price"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTripStore } from '@/stores/SelectedTripStore.ts'
import Item from "@/components/SelectedTrip/item.vue"

const tripStore = useTripStore()
const { selectedTrip } = storeToRefs(tripStore)
const price = selectedTrip.value.price
const passengers = selectedTrip.value.passengers
const services = selectedTrip.value.services
</script>


<style lang="scss" module>
.title {
  text-align: center;
  margin: 50px auto 30px;
  min-width: 840px;
  font-weight: 700;
  font-size: 26px;
  color: #4361EE;
}
</style>