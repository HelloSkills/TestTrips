<template>
  <div :class="$style.container">
    <div :class="$style.inputsAll">
      <div :class="$style.placeFrom">
        <img src="/icons/air.svg" alt="air_icon" width="20" height="20">
        <input :class="$style.input" type="text" placeholder="Город вылета" />
      </div>
      <div :class="$style.placeTo">
        <img src="/icons/air.svg" alt="air_icon" width="20" height="20">
        <input :class="$style.input" type="text" placeholder="Город прилёта" />
      </div>
      <div :class="$style.timeFrom">
        <img src="/icons/calendar.svg" alt="calendar_icon" width="20" height="20">
        <Datepicker
            v-model="dateFrom"
            placeholder="Туда"
            :enable-time-picker="false"
            :hide-input-icon="true"
        />
      </div>
      <div :class="$style.timerTo">
        <img src="/icons/calendar.svg" alt="calendar_icon" width="20" height="20">
        <Datepicker
            v-model="dateFrom"
            placeholder="Обратно"
            :enable-time-picker="false"
            :hide-input-icon="true"
        />
      </div>
    </div>
    <div :class="$style.searchBtn">
      <div :class="$style.search">Найти</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue'

const dateFrom = ref(null)
const dateTo = ref(null)
</script>

<style lang="scss" module>
.container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #FFFFFF;
  height: 140px;
  padding: 20px;
}

.inputsAll {
  display: flex;
  flex-direction: row;
  gap: 10px;
  height: 40px;
}

.input {
  all: unset;
  height: 40px;
  cursor: pointer;
}

.placeFrom, .placeTo, .timeFrom, .timerTo {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  background-color: #F6F8FC;
  border-radius: 5px;
  padding: 10px;
}

.searchBtn {
  display: flex;
  justify-content: flex-end;
}

.search {
  background-color: #4361EE;
  height: 40px;
  color: #FFFFFF;
  font-size: 14px;
  line-height: 14px;
  padding: 12px 70px;
  border-radius: 5px;
}

:global(.dp__input) {
  all: unset;
  height: 40px;
  cursor: pointer;
}
</style>