<template>
  <div :class="$style.container">
    <div :class="$style.inputsAll">
      <!-- Город вылета -->
      <div :class="$style.placeFrom">
        <img src="/icons/air.svg" alt="air_icon" width="20" height="20">
        <input
            v-model="placeFrom"
            :class="$style.input"
            type="text"
            placeholder="Город вылета"
            @keyup.enter="searchAir"
        />
      </div>

      <!-- Город прилёта -->
      <div :class="$style.placeTo">
        <img src="/icons/air.svg" alt="air_icon" width="20" height="20">
        <input
            v-model="placeTo"
            :class="$style.input"
            type="text"
            placeholder="Город прилёта"
            @keyup.enter="searchAir"
        />
      </div>

      <!-- Дата туда -->
      <div :class="$style.timeFrom">
        <img src="/icons/calendar.svg" alt="calendar_icon" width="20" height="20">
        <Datepicker
            v-model="dateFrom"
            placeholder="Туда"
            :enable-time-picker="false"
            :hide-input-icon="true"
            :locale="'ru'"
            :auto-apply="true"
            format="dd-MM-yyyy"
            @keyup.enter="searchAir"
        />
      </div>

      <!-- Дата обратно -->
      <div :class="$style.timerTo">
        <img src="/icons/calendar.svg" alt="calendar_icon" width="20" height="20">
        <Datepicker
            v-model="dateTo"
            placeholder="Обратно"
            :enable-time-picker="false"
            :hide-input-icon="true"
            :locale="'ru'"
            :auto-apply="true"
            format="dd-MM-yyyy"
            @keyup.enter="searchAir"
        />
      </div>
    </div>

    <!-- Кнопка поиска -->
    <div :class="$style.searchBtn">
      <div :class="$style.search" @click="searchAir">Найти</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useRouter } from "vue-router"
import { ref } from 'vue'
import { useAviaSearchStore } from '@/stores/useAviaSearchStore.ts'
import { getAviaVariants } from '@/composables/useJsonServer.ts'
import { formatDateForFilter } from '@/utils/date.ts'
import { useUserStore } from "@/stores/userStore.ts"

const userStore = useUserStore()
const router = useRouter()

import { useToast } from 'vue-toastification'
const toast = useToast()

// Реактивные поля
const placeFrom = ref('')
const placeTo = ref('')
const dateFrom = ref<Date | null>(null)
const dateTo = ref<Date | null>(null)

const aviaSearchStore = useAviaSearchStore()

// Функция поиска
const searchAir = async () => {
  if (!userStore.selectedUsers.length) {
    toast.info('Необходимо выбрать хотя бы 1 пассажира')
    return
  }

  // включаем скелетон
  aviaSearchStore.setLoading(true)

  // сразу переходим на страницу услуг
  router.push(`/services`)

  // запускаем загрузку в фоне
  try {
    const items = await getAviaVariants()
    aviaSearchStore.setVariants(items)

    const dateFromStr = dateFrom.value ? formatDateForFilter(dateFrom.value) : null
    const dateToStr = dateTo.value ? formatDateForFilter(dateTo.value) : null

    aviaSearchStore.setFilters({
      placeFrom: placeFrom.value.trim().toLowerCase(),
      placeTo: placeTo.value.trim().toLowerCase(),
      dateFrom: dateFromStr,
      dateTo: dateToStr
    })
  } catch (err) {
    console.error('Ошибка загрузки вариантов:', err)
  } finally {
    // выключаем скелетон после загрузки
    aviaSearchStore.setLoading(false)
  }
}
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
  cursor: pointer;
}

:global(.dp__input) {
  all: unset;
  height: 40px;
  cursor: pointer;
}
</style>
