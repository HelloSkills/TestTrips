<template>
  <div :class="$style.container">
    <Search/>
    <Item/>
  </div>
</template>

<script setup lang="ts">
import Search from "@/components/Trips/search.vue"
import Item from "@/components/Trips/item.vue"
</script>

<style lang="scss" module>
.container {
  width: 840px;
  min-width: 840px;
  margin: auto;
}

</style>