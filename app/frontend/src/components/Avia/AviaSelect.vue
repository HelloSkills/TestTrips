<template>
  <div :class="$style.container">
    <div :class="$style.inputsAll">
      <div :class="[$style.placeFrom, errors.placeFrom.show ? $style.error : '']">
        <div :class="$style.icon">
          <UiSvg name="air" size="14"/>
        </div>
        <input
            v-model="placeFrom"
            :class="[$style.input, errors.placeFrom.shake ? $style.shake : '']"
            type="text"
            placeholder="Город вылета"
            @focus="onFocus('placeFrom')"
            @keyup.enter="searchAir"
        />
      </div>

      <div :class="[$style.placeTo, errors.placeTo.show ? $style.error : '']">
        <div :class="$style.icon">
          <UiSvg name="air" size="14"/>
        </div>
        <input
            v-model="placeTo"
            :class="[$style.input, errors.placeTo.shake ? $style.shake : '']"
            type="text"
            placeholder="Город прилёта"
            @focus="onFocus('placeTo')"
            @keyup.enter="searchAir"
        />
      </div>
      <div :class="$style.datepicker">
        <UiDatepicker
            v-model="dateFrom"
            placeholder="Туда"
            @enter="searchAir"
        />
      </div>

      <div :class="$style.datepicker">
        <UiDatepicker
            v-model="dateTo"
            placeholder="Обратно"
            @enter="searchAir"
        />
      </div>
    </div>

    <div :class="$style.searchBtn">
      <UiButton
          text="Найти"
          size="xxl"
          color="blue"
          @click="searchAir"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UiSvg from '@/components/UI/UiSvg.vue'
import UiButton from '@/components/UI/UiButton.vue'
import UiDatepicker from '@/components/UI/UiDatepicker.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAviaSearchStore } from '@/stores/useAviaSearchStore.ts'
import { useJsonServer } from '@/composables/useJsonServer.ts'
import { formatDateForFilter } from '@/utils/formatDate.ts'
import { useUserStore } from '@/stores/userStore.ts'
import { useToast } from 'vue-toastification'

interface Error {
  show: boolean
  shake: boolean
}

const { getAviaVariants } = useJsonServer()

const userStore = useUserStore()
const router = useRouter()
const aviaSearchStore = useAviaSearchStore()
const toast = useToast()

const placeFrom = ref('')
const placeTo = ref('')
const dateFrom = ref<Date | null>(null)
const dateTo = ref<Date | null>(null)

const errors = ref<{ placeFrom: Error; placeTo: Error }>({
  placeFrom: { show: false, shake: false },
  placeTo: { show: false, shake: false }
})

const onFocus = (field: 'placeFrom' | 'placeTo') => {
  errors.value[field].show = false
  errors.value[field].shake = false
}

const searchAir = async () => {
  if (!userStore.selectedUsers.length) {
    toast.info('Необходимо выбрать хотя бы 1 пассажира')
    return
  }

  let hasError = false
  if (!placeFrom.value.trim()) {
    errors.value.placeFrom.show = true
    errors.value.placeFrom.shake = true
    hasError = true
  }
  if (!placeTo.value.trim()) {
    errors.value.placeTo.show = true
    errors.value.placeTo.shake = true
    hasError = true
  }
  if (hasError) {
    toast.warning('Необходимо указать город вылета и прилёта')
    return
  }

  if (dateFrom.value && dateTo.value && dateFrom.value > dateTo.value) {
    toast.warning('Дата прилёта не может быть ранее даты вылета')
    dateTo.value = null
    return
  }

  aviaSearchStore.setLoading(true)
  router.push('/services')

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
    toast.error('Ошибка загрузки данных')
  } finally {
    aviaSearchStore.setLoading(false)
  }
}
</script>

<style lang="scss" module>
.container {
  max-width: 840px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: var(--color-white);
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
  width: 100%;
  font-size: 14px;
  line-height: 14px;
}

.input::placeholder {
  color: #B3C1D1;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
}

.placeFrom,
.placeTo {
  max-width: 205px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  background-color: var(--color-gray);
  border-radius: 5px;
  padding: 10px;
  border: 1px solid transparent;
}

.datepicker {
  max-width: 180px;
  caret-color: transparent;
}

.icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4361EE;
}

.searchBtn {
  display: flex;
  justify-content: flex-end;
}

.error {
  border: 1px solid red !important;
}

/* Шейк */
@keyframes shake {
  0%, 100% { transform: translateX(0) }
  20%, 60% { transform: translateX(-4px) }
  40%, 80% { transform: translateX(4px) }
}

.shake {
  animation: shake 0.3s ease;
}
</style>
