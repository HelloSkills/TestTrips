<template>
  <div :class="$style.container">
    <div :class="$style.inputsAll">
      <div :class="[$style.placeFrom, errors.placeFrom.show ? $style.error : '']">
        <div :class="$style.icon">
          <UiSvg name="air" />
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
         <UiSvg name="air" />
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

      <div :class="$style.timeFrom">
        <div  :class="$style.icon">
          <UiSvg name="calendar" />
        </div>
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

      <div :class="$style.timerTo">
        <div :class="$style.icon">
          <UiSvg name="calendar" />
        </div>
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
import '@vuepic/vue-datepicker/dist/main.css'
import Datepicker from '@vuepic/vue-datepicker'
import UiSvg from '@/components/Ui/UiSvg.vue'
import UiButton from '@/components/Ui/UiButton.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAviaSearchStore } from '@/stores/useAviaSearchStore.ts'
import { useJsonServer } from '@/composables/useJsonServer.ts'
import { formatDateForFilter } from '@/utils/date.ts'
import { useUserStore } from '@/stores/userStore.ts'
import { useToast } from 'vue-toastification'

interface IError {
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

const errors = ref<{ placeFrom: IError; placeTo: IError }>({
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
  flex: 1;
}

.placeFrom,
.placeTo,
.timeFrom,
.timerTo {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  background-color: var(--color-gray);
  border-radius: 5px;
  padding: 10px;
  border: 1px solid transparent;
}

.icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.searchBtn {
  display: flex;
  justify-content: flex-end;
}

.search {
  background-color: var(--color-blue);
  height: 40px;
  color: var(--color-white);
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

/* Ошибка */
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
