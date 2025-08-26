<template>
  <div :class="$style.container" v-for="trip in props.trips" :key="trip.id">
    <div :class="$style.wrap">
      <div :class="$style.info">
        <div :class="$style.date">#{{ trip.id }} от {{ getEarliestDate(trip.services) }} </div>
        <div :class="$style.price">{{ formatPrice(trip.price) }}</div>
      </div>
      <div :class="$style.nameTravel">
        {{trip.name}}
      </div>
    </div>
    <div :class="[$style.wrapItem]" v-for="services in trip.services">
      <div :class="$style.ticketInfo">
        <div :class="$style.ticketWrap">
          <img src="/icons/air.svg" alt="avia_icon" width="14" height="14">
          <div :class="$style.price">{{ formatPrice(services.ticket.price) }}</div>
          <div :class="$style.fromTo">{{ services.ticket.placeFrom }} ➝ {{ services.ticket.placeTo }}</div>
        </div>
      </div>
      <div :class="$style.name">{{ services.user.second_name }} {{ services.user.last_name }}</div>
    </div>
    <div :class="$style.toTravel"><a href="">Перейти к поездке ➝</a></div>
  </div>
</template>

<script setup lang="ts">
import type { Trip } from "@/types/types.ts"
import { getEarliestDate } from "@/utils/date.ts"
import { formatPrice } from "@/utils/price.ts"

const props = defineProps<{
  trips: Trip[]
}>()

</script>

<style lang="scss" module>
.container {
  width: 840px;
  height: max-content;
  margin-top: 30px;
  background-color: #FFFFFF;
  //padding: 0 20px;
  border-radius: 10px;
}

.wrap {
  padding: 0 20px 20px;
  border-bottom: 1px solid #DDE2EB;
}

.wrapItem {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #F6F8FC;
  margin: 20px;
  padding: 10px;
  border-radius: 5px;
}
.info {
  padding-top: 30px;
  display: flex;
  justify-content: space-between;
}

.date {
  color: #B3C1D1;
}

.price {
  color: #4361EE;
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
  gap: 5px;
  height: 14px;
  line-height: 14px;
}

.toTravel {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  border-top: 1px solid #DDE2EB;
}
</style>