<template>
  <div :class="$style.container">
    <Search/>
    <Item :trips="props.trips"/>
  </div>
</template>

<script setup lang="ts">
import type { Trip } from "@/types/types.ts"
import Search from "@/components/Trips/search.vue"
import Item from "@/components/Trips/item.vue"

const props = defineProps<{
  trips: Trip[]
}>()

console.log('props', props.trips)
</script>

<style lang="scss" module>
.container {
  width: 840px;
  min-width: 840px;
  margin: auto;
}

</style>