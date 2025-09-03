<template>
  <label v-if="label" :class="labelClass">
    <input
        :type="type"
        :name="name"
        :value="value"
        :checked="isChecked"
        :placeholder="placeholder"
        :class="className"
        @input="onInput"
        @keyup.enter="$emit('enter')"
        @focus="$emit('focus')"
        @change="$emit('change', ($event.target as HTMLInputElement).value)"
    />
    {{ label }}
  </label>

  <input
      v-else
      :type="type"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder"
      :class="className"
      @input="onInput"
      @keyup.enter="$emit('enter')"
      @focus="$emit('focus')"
      @change="$emit('change', ($event.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface UiInputProps {
  modelValue?: string | number
  type?: string
  placeholder?: string
  className?: string | string[]
  name?: string
  value?: string | number
  label?: string
  labelClass?: string | string[]
}

interface UiInputEmits {
  (e: 'update:modelValue', value: string | number): void
  (e: 'enter'): void
  (e: 'focus'): void
  (e: 'change', value: string | number): void
}

const props = defineProps<UiInputProps>()
const emit = defineEmits<UiInputEmits>()

const isChecked = computed(() => props.type === 'radio' && props.modelValue === props.value)

function onInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  emit('update:modelValue', val)
}
</script>
