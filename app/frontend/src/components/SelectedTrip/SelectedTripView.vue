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
      <div
          :class="[$style.createTravel, searchOff && $style.searchOff]"
          @click="goToPage()"
      >
        <span :class="[searchOff && $style.searchOff]">поиск авиа</span>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import SelectedTripItem from "@/components/SelectedTrip/SelectedTripItem.vue"
import { computed } from "vue"
import { storeToRefs } from 'pinia'
import { useTripStore } from '@/stores/SelectedTripStore.ts'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const tripStore = useTripStore()
const toast = useToast()
const { selectedTrip } = storeToRefs(tripStore)
const price = selectedTrip.value.price
const passengers = selectedTrip.value.passengers
const services = selectedTrip.value.services

const route = useRoute()
const router = useRouter()

const isServices = computed(() => tripStore.getServices().length > 0)
const showSearch = computed(() => !route.path.endsWith('/services'))
const searchOff = computed(() => tripStore.selectedTrip?.status === 'ended')

const goToPage = () => {

  if (tripStore.selectedTrip?.status === 'ended') {
    toast.info('Поездка завершена, услуги недоступны')
    return
  }

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
  color: var(--color-blue);
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
  color: var(--color-blue);
  cursor: pointer;
  border-bottom: 1px dashed var(--color-blue);
}

.searchOff {
  color: gray;
  opacity: 0.6;
  border-bottom: none;
}
</style>