<template>
  <div
      v-html="icons[name]"
      :class="$style.icon"
      :style="`--size: ${size}px`"
  />
</template>

<script setup lang="ts">
import { icons } from '@/images/icons/icons.ts'

interface Props {
  name: keyof typeof icons
  size?: number
}

withDefaults(defineProps<Props>(), {
  size: 20
})
</script>

<style module>
.icon {
  --size: 20px;
  width: var(--size);
  height: var(--size);
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon svg {
  width: var(--size);
  height: var(--size);
}
</style>
