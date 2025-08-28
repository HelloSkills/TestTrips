<template>
<div :class="$style.container">
  <Drawer v-model="modalStore.drawerOpen" />
    <div :class="$style.wrap">
      <router-link to="/" :class="$style.logo">
        <img src="/images/logo.svg" @click="goToPage('trips')" width="40" height="40" alt="logo">
      </router-link>
      <div v-if="isAviaPage">
        <router-link v-if="selectedTrip" :to="`/trip/${selectedTrip.id}`" :class="$style.backTrip">
          вернуться в поездку
        </router-link>
      </div>

      <div v-else-if="isSelected" :class="$style.avia">
        <div @click="goToPage('trips')">
          <img src="/icons/air.svg" alt="air_logo" width="20" height="20" :class="$style.icon">
        </div>
      </div>

      <div v-else :class="$style.travel">
        <router-link to="/" :class="$style.logo">
          <img src="/icons/suitcase.svg" alt="suitcase_logo">
        </router-link>
        <div :class="$style.createTravel" @click="createTrip">Создать поездку</div>
      </div>
    </div>

    <div :class="$style.wrapper">
      <div v-if="isSelected && !isAviaPage" :class="$style.endTrip" @click="endTrip">
        завершить поездку
      </div>
      <router-link to="/" :class="$style.user">
        <span :class="$style.name">AA</span>
      </router-link>
    </div>
</div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import type { Trip } from "@/types/types.ts"
import Drawer from '@/components/Drawer/index.vue'

import { useTripStore } from '@/stores/SelectedTripStore.ts'
const tripStore = useTripStore()

import { useModalStore } from '@/stores/modal'
const modalStore = useModalStore()

import {useRoute, useRouter} from 'vue-router'
const route = useRoute()
const router = useRouter()

const isAviaPage = computed(() => route.name === 'Avia')

const props = defineProps<{
  selectedTrip: Trip | null
}>()

const isSelected = computed(() => !!props.selectedTrip)

const goToPage = (page) => {
  tripStore.clearTrip()

  if (page === 'avia') {
    router.push(`/avia`)
  }

  if (page === 'trips') {
    router.push(`/`)
  }

}

const endTrip = () => {
  console.log('Завершаем поездку - надо обработать и добавлять лейбл')
}

const createTrip = () => {
  modalStore.toggleDrawer()
}
</script>

<style lang="scss" module>
.container {
  width: 100%;
  min-width: 840px;
  max-width: 1440px;
  margin: 0 auto;
  height: 60px;
  padding: 10px 94px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  color: #4361EE;
}

.wrap {
  height: 40px;
  display: flex;
  gap: 20px;
  align-items: center;
}

.logo {
  line-height: 0;
}

.travel {
  height: 20px;
  display: flex;
  gap: 15px;
  align-items: center;
}

.avia {
  width: 30px;
  height: 30px;
  background: #F6F8FC;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
}

.icon {
  margin-left: 1px;
}

.createTravel {
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  cursor: pointer;
}

.wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
}

.endTrip {
  height: 30px;
  background: #4361EE;
  color: #FFFFFF;
  padding: 7px 30px;
  border-radius: 5px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
}

.user {
  width: 36px;
  height: 36px;
  min-width: 36px;
  min-height: 36px;
  background: #4361EE;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.name {
  color: #FFFFFF;
}

.backTrip {
  padding: 7px 30px;
  font-size: 14px;
  line-height: 14px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: #F6F8FC;
  color: #050505;
}
</style>