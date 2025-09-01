<template>
  <div v-if="selectedTrip">
    <div v-if="showSearch" :class="$style.title">{{ selectedTrip.name }}</div>
    <SelectedTripItem
        :passengers="passengers"
        :services="services"
        :price="price"
    />

    <div v-if="!isServices && showSearch" :class="$style.list">
      <div>Список услуг пуст</div>
      <div :class="$style.createTravel" @click="goToPage">поиск авиа</div>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { storeToRefs } from 'pinia'
import { useTripStore } from '@/stores/SelectedTripStore.ts'
import SelectedTripItem from "@/components/SelectedTrip/SelectedTripItem.vue"
const isServices = computed(() => tripStore.getServices().length > 0)
const showSearch = computed(() => !route.path.endsWith('/services'))

const tripStore = useTripStore()
const { selectedTrip } = storeToRefs(tripStore)
const price = selectedTrip.value.price
const passengers = selectedTrip.value.passengers
const services = selectedTrip.value.services

import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const goToPage = () => {
  router.push(route.fullPath + '/services')
}
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

.list {
  width: max-content;
  margin: 30px auto 0;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.createTravel {
  color: #4361EE;
  cursor: pointer;
  border-bottom: 1px dashed #4361EE;
}
</style>