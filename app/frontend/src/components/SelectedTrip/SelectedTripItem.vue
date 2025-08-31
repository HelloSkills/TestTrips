<template>
  <div v-if="!isServicesPage" :class="$style.container" v-for="service in services" :key="service.id">
    <div :class="$style.ticketInfo">
      <div :class="$style.infoAir">
        <div :class="$style.ticketWrap">
          <div :class="$style.fromTo">{{ service.ticket.placeFrom }} ➝ {{ service.ticket.placeTo }}</div>
        </div>
        <div :class="$style.provider">
          Перевозчик {{ service.ticket.provider }}
        </div>
      </div>
      <div :class="$style.wrapInfo">
        <div :class="$style.date">
          <div :class="$style.dateFrom">
            {{ formatDate(service.ticket.dateFrom) }}
          </div>
          <div :class="$style.time">
            {{ service.ticket.timeFrom }} - {{ service.ticket.timerTo }}
          </div>
        </div>
        <div :class="$style.price">
          {{ formatPrice(service.ticket.price) }}
        </div>
      </div>
    </div>
    <div :class="$style.passenger">
      <div :class="$style.name">
        {{ service.user.second_name }} {{ service.user.last_name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Passenger, Services } from "@/types/types.ts"
import { formatPrice } from "@/utils/price.ts"
import { formatDate } from "@/utils/date.ts"
import { useRoute } from 'vue-router'
import { computed } from "vue";
const route = useRoute()

defineProps<{
  price: number
  passengers: Passenger[]
  services: Services[]
}>()


const isServicesPage = computed(() => {
  return route.path.endsWith('/services')
})
</script>

<style lang="scss" module>
.container {
  width: 840px;
  margin: 0 auto 20px;
  padding: 20px;
  background: white;
  border-radius: 10px;
}

.infoAir {
  margin-bottom: 20px;
}

.ticketWrap {
  display: flex;
  gap: 4px;
  margin-bottom: 5px;
}

.fromTo {
  font-size: 16px;
  line-height: 16px;
  font-weight: 600;
}

.provider {
  color: #B3C1D1;
  font-size: 14px;
}

.wrapInfo {
  display: flex;
  justify-content: space-between;
}

.date {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.time {
  font-size: 12px;
}

.dateFrom, .price {
  font-weight: 600;
  font-size: 14px;
}

.passenger {
  height: 50px;
  width: 800px;
  padding: 10px;
  background: #F6F8FC;
  margin: 20px auto 0;
  border-radius: 5px;
}

.name {
  height: 30px;
  font-size: 12px;
  font-weight: 400;
  border-radius: 5px;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  min-width: max-content;
  width: 186px;
}
</style>