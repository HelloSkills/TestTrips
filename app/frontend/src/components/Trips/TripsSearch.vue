<template>
  <div :class="$style.container">
    <div :class="$style.trips">Поездки</div>
    <div :class="$style.search">
      <div :class="$style.wrap">
        <div :class="$style.uiSvg">
          <UiSvg name="search"/>
        </div>
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Введите название поездки или её номер"
            :class="$style.inputSearch"
            @keyup.enter="search"
        >
      </div>
      <UiButton text="Найти" size="medium" color="blue" @click="search" />
    </div>
    <div v-if="!isTrips" :class="$style.list">
      <div>Список поездок пуст</div>
      <div :class="$style.createTravel" @click="createTrip">создать поездку</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiSvg from '@/components/UI/UiSvg.vue'
import UiButton from '@/components/UI/UiButton.vue'
import { ref, computed, onBeforeUnmount } from 'vue'
import { useTripsStore } from '@/stores/tripsStore'
import { useModalStore } from '@/stores/modal.ts'

const tripsStore = useTripsStore()
const modalStore = useModalStore()
const searchQuery = ref('')

const isTrips = computed(() => tripsStore.trips && tripsStore.trips.length > 0)

const search = () => tripsStore.filterTrips(searchQuery.value)
const createTrip = () => modalStore.toggleDrawer()

onBeforeUnmount(() => {
  tripsStore.clearSearch()
  searchQuery.value = ''
})
</script>

<style lang="scss" module>
.container {
  margin-bottom: 30px;
}

.trips {
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 20px;
}

.search {
  height: 54px;
  display: flex;
  gap: 20px;
}

.wrap {
  display: flex;
  gap: 10px;
  width: 690px;
  min-width: 690px;
  align-items: center;
  justify-content: start;
  padding-left: 20px;
  border-radius: 5px;
  background: var(--color-white);
}

.inputSearch {
  all: unset;
  width: 100%;
  border-bottom: 1px solid transparent;

  &::placeholder {
    color: #9ca3af;
    font-size: 14px;
    font-weight: 400;
    line-height: 100%;
  }

  &:focus {
    border-bottom: 1px solid var(--color-blue);
    width: 265px;
  }
}

.btnSearch {
  all: unset;
  width: 137px;
  height: 54px;
  background: var(--color-blue);
  color: var(--color-white);
  font-size: 14px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
}

.uiSvg {
  color: var(--color-blue);
}
</style>