<template>
  <div :class="$style.container" v-for="trip in tripsStore.filteredTrips" :key="trip.id">
    <!-- Блок с ценой -->
    <div v-if="trip.price > 0" :class="$style.withPrice">
      <div :class="$style.wrap">
        <div :class="$style.info">
          <div v-if="trip.status" :class="[$style.label, trip.status === 'new' ? $style.new : $style.ended]">
            {{ trip.status === 'new' ? 'Новая' : 'Завершённая' }}
          </div>
          <div :class="$style.date">#{{ trip.id }} от {{ getEarliestDate(trip.services) }} </div>
          <div :class="$style.price">{{ formatPrice(trip.price) }}</div>
        </div>
        <div :class="$style.nameTravel">
          {{ trip.name }}
        </div>
      </div>
      <div :class="$style.wrapItem" v-for="services in trip.services" :key="services.user.id">
        <div :class="$style.ticketInfo">
          <div :class="$style.ticketWrap">
            <div :class="$style.uiSvg">
              <UiSvg name="air" size="14"/>
            </div>
            <div :class="$style.price">{{ formatPrice(services.ticket.price) }}</div>
            <div :class="$style.fromTo">{{ services.ticket.placeFrom }} ➝ {{ services.ticket.placeTo }}</div>
          </div>
        </div>
        <div :class="$style.name">{{ services.user.second_name }} {{ services.user.last_name }}</div>
      </div>
      <div :class="$style.toTravel" @click="goToTrip(trip)">
        Перейти к поездке ➝
      </div>
    </div>

    <!-- Блок без цены -->
    <div v-else :class="$style.withoutPrice">
      <div :class="$style.wrapElse">
        <div :class="$style.info">
          <div v-if="trip.status" :class="[$style.label, trip.status === 'new' ? $style.new : $style.ended]">
            {{ trip.status === 'new' ? 'Новая' : 'Завершённая' }}
          </div>
          <div :class="$style.date">#{{ trip.id }}</div>
        </div>
        <div :class="$style.nameTravel">
          {{ trip.name }}
        </div>
      </div>
      <div :class="$style.toTravel" @click="goToTrip(trip)">
        Перейти к поездке ➝
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Trip } from "@/types/types.ts"
import { getEarliestDate } from "@/utils/formatDate.ts"
import { formatPrice } from "@/utils/formatPrice.ts"
import { useRouter } from 'vue-router'
import { useTripsStore } from '@/stores/tripsStore'
import { useTripStore } from '@/stores/selectedTripStore'
import UiSvg from "@/components/UI/UiSvg.vue"

const router = useRouter()
const tripsStore = useTripsStore()
const selectedTripStore = useTripStore()

const goToTrip = (trip: Trip) => {
  selectedTripStore.selectTrip(trip)
  router.push(`/trip/${trip.id}`)
}
</script>

<style lang="scss" module>
.container {
  width: 840px;
  height: max-content;
  margin-top: 20px;
  background-color: var(--color-white);
  border-radius: 10px;
}

.wrap {
  padding: 0 20px 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #DDE2EB;
}

.wrapElse {
  padding: 0 20px;
}

.wrapItem {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--color-gray);
  margin: 10px 20px;
  padding: 10px;
  border-radius: 5px;
}

.info {
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.label {
  position: absolute;
  width: max-content;
  height: 20px;
  padding: 4px 30px;
  color: var(--color-white);
  font-size: 12px;
  line-height: 12px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: -20px;
}

.new {
  background-color: var(--color-blue);
}

.ended {
  background-color: #00B300;
}

.date {
  color: #B3C1D1;
}

.price {
  color: var(--color-blue);
  font-size: 14px;
  line-height: 14px;
}

.fromTo {
  font-size: 14px;
  line-height: 14px;
  font-weight: 600;
}

.name {
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
}

.nameTravel {
  padding-top: 10px;
}

.ticketInfo {
  display: flex;
}

.ticketWrap {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 14px;
  line-height: 14px;
}

.toTravel {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  margin-top: 20px;
  border-top: 1px solid #DDE2EB;
  color: var(--color-blue);
  cursor: pointer;
}

.uiSvg {
  color: var(--color-blue);
}
</style>
