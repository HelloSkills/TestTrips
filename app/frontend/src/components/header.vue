<template>
<div :class="$style.container">
    <div :class="$style.wrap">
      <router-link to="/" :class="$style.logo">
        <img src="/images/logo.svg" width="40" height="40" alt="logo">
      </router-link>
      <div v-if="!isSelected" :class="$style.travel">
        <a href="" :class="$style.logo"><img src="/icons/suitcase.svg" alt="suitcase_logo"></a>
        <a href="" :class="$style.createTravel">Создать поездку</a>
      </div>
      <div v-else :class="$style.avia">
        <router-link to="/" @click="goBack">
          <img src="/icons/air.svg" alt="air_logo" width="20" height="20" :class="$style.icon">
        </router-link>
      </div>
    </div>

    <a href="" :class="$style.user">
      <span :class="$style.name">AA</span>
    </a>

</div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useTripStore } from '@/stores/SelectedTripStore.ts'

const tripStore = useTripStore()

const props = defineProps<{
  selectedTrip: object[]
}>()

const isSelected = computed(() => !!props.selectedTrip)

const goBack = () => {
  tripStore.clearTrip()
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
</style>