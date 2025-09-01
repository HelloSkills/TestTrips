<template>
  <button
      :class="[$style.button, sizeClass, colorClass]"
      @click="$emit('click')"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { computed, useCssModule } from 'vue'

const props = defineProps<{
  text: string
  size?: 'small' | 'medium' | 'large' | 'xxl'
  color?: 'blue' | 'gray'
}>()

defineEmits(['click'])

// теперь у нас есть $style
const $style = useCssModule()

const sizeClass = computed(() => {
  switch (props.size) {
    case 'small': return $style.small
    case 'medium': return $style.medium
    case 'large': return $style.large
    case 'xxl': return $style.xxl
    default: return $style.medium
  }
})

const colorClass = computed(() => {
  switch (props.color) {
    case 'gray': return $style.gray
    default: return $style.blue
  }
})
</script>

<style lang="scss" module>
.button {
  all: unset;
  font-size: 14px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s;
}

/* Размеры */
.small {
  width: 100px;
  height: 40px;
}

.medium {
  width: 130px;
  height: 54px;
}

.large {
  width: 150px;
  height: 40px;
}

.xxl {
  width: 180px;
  height: 40px;
}

/* Цвета */
.blue {
  background: var(--color-blue);
  color: var(--color-white);
}

.gray {
  background: var(--color-gray);
  color: var(--color-black);
}

.button:hover {
  opacity: 0.9;
}
</style>
