<template>
  <div :class="$style.container">
    <DrawerView v-model="modalStore.drawerOpen" />
    <div :class="$style.wrap">
      <div :class="$style.logo" @click="goToPage('trips')">
        <UiSvg name="logo" size="40"/>
      </div>

      <div v-if="isAviaPage">
        <router-link v-if="selectedTrip" :to="`/trip/${selectedTrip.id}`" :class="$style.backTrip">
          вернуться в поездку
        </router-link>
      </div>

      <div v-else-if="isSelected" :class="[$style.avia, tripStore.selectedTrip?.status === 'ended' ? $style.disabled : '']">
        <div
            @click="handleAviaClick"
        >
         <div :class="$style.icon">
           <UiSvg name="air" />
         </div>
        </div>
      </div>

      <div v-else :class="$style.travel">
        <router-link to="/" :class="$style.logo">
          <div :class="$style.icon">
            <UiSvg name="suitcase" />
          </div>
        </router-link>
        <div :class="$style.createTravel" @click="createTrip">Создать поездку</div>
      </div>
    </div>

    <div :class="$style.wrapper">
      <!-- Если поездка выбрана -->
      <template v-if="isSelected && !isAviaPage && route.name === 'SelectedTrip'">
        <!-- Если поездка завершена -->
        <div
            v-if="showBackLink"
            :class="$style.backTrip"
            @click="goToPage('trips')"
        >
          Вернуться к списку поездок
        </div>

        <!-- Если поездка новая -->
        <div
            v-else
            :class="$style.endTrip"
            @click="endTrip"
        >
          завершить поездку
        </div>
      </template>

      <div :class="$style.user">
        <span :class="$style.name">AA</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DrawerView from '@/components/Drawer/DrawerView.vue'
import UiSvg from '@/components/UI/UiSvg.vue'
import { computed } from "vue"
import type { Trip } from "@/types/types.ts"
import { useTripStore } from '@/stores/SelectedTripStore.ts'
import { useTripsStore } from "@/stores/tripsStore.ts"
import { useModalStore } from '@/stores/modal'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const tripStore = useTripStore()
const tripsStore = useTripsStore()
const modalStore = useModalStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()

interface Props {
  selectedTrip: Trip | null
}

const props = defineProps<Props>()

const isAviaPage = computed(() => route.name === 'Avia' || route.name === 'Services')
const isSelected = computed(() => !!props.selectedTrip)

const goToPage = (page: string) => {
  if (page === 'services' && tripStore.selectedTrip) {
    router.push(`/trip/${tripStore.selectedTrip.id}/services`)
  }

  if (page === 'trips') {
    tripStore.clearTrip()
    router.push(`/`)
  }
}

const handleAviaClick = () => {
  if (tripStore.selectedTrip?.status === 'ended') {
    toast.info('Поездка завершена, услуги недоступны')
    return
  }
  goToPage('services')
}

const endTrip = async () => {
  if (!tripStore.selectedTrip) return
  await tripsStore.setTripStatus(tripStore.selectedTrip.id, 'ended')
  toast.success(`Поездка успешно завершена`)
}

const createTrip = () => {
  modalStore.toggleDrawer()
}

const showBackLink = computed(() => {
  return tripStore.selectedTrip?.status === 'ended' && route.name === 'SelectedTrip'
})
</script>

<style lang="scss" module>
.container {
  width: 100%;
  min-width: 840px;
  margin: 0 auto;
  height: 60px;
  padding: 10px 94px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: var(--color-white);
  color: var(--color-blue);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
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
  background: var(--color-gray);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 0;
  cursor: pointer;
}

.disabled {
  cursor: default;
  opacity: 0.3;
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
  background: var(--color-blue);
  color: var(--color-white);
  padding: 7px 30px;
  border-radius: 5px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
  cursor: pointer;
}

.user {
  width: 36px;
  height: 36px;
  min-width: 36px;
  min-height: 36px;
  background: var(--color-blue);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.name {
  color: var(--color-white);
}

.backTrip {
  padding: 7px 30px;
  font-size: 14px;
  line-height: 14px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: var(--color-gray);
  color: var(--color-black);
  cursor: pointer;
}
</style>
