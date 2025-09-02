<template>
  <div :class="$style.datepickerWrapper">
    <div :class="$style.icon">
      <UiSvg name="calendar" />
    </div>
    <Datepicker
        v-model="selectedDate"
        :placeholder="placeholder"
        :enable-time-picker="false"
        :hide-input-icon="true"
        :locale="locale"
        :auto-apply="true"
        :format="format"
        @keyup.enter="$emit('enter')"
    />
  </div>
</template>

<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'
import Datepicker from '@vuepic/vue-datepicker'
import UiSvg from '@/components/UI/UiSvg.vue'
import { computed } from 'vue'

interface Props {
  modelValue: Date | null
  placeholder?: string
  format?: string
  locale?: string
  showIcon?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: Date | null): void
  (e: 'enter'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()


// Необходимо для изменения инпута в родителе
const selectedDate  = computed({
  get: () => props.modelValue,
  set: (value: Date | null) => emits('update:modelValue', value)
})

const placeholder = props.placeholder || ''
const format = props.format || 'dd-MM-yyyy'
const locale = props.locale || 'ru'
</script>

<style lang="scss" module>
.datepickerWrapper {
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: var(--color-gray);
  border-radius: 5px;
  padding: 10px;
  border: 1px solid transparent;
  height: 40px;
  font-size: 14px;
  line-height: 14px;
}

.icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

:global(.dp__input) {
  all: unset;
  height: 40px;
  cursor: pointer;
  width: 100%;
}

:global(.dp__input::placeholder) {
  color: rgb(162, 170, 190);
}
</style>
