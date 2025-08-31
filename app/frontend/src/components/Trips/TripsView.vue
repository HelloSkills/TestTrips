<template>
  <div :class="$style.container" >
    <TripsSearch/>
    <TripsItem/>
  </div>
</template>

<script setup lang="ts">
import TripsSearch from "@/components/Trips/TripsSearch.vue"
import TripsItem from "@/components/Trips/TripsItem.vue"
</script>

<style lang="scss" module>
.container {
  width: 840px;
  min-width: 840px;
  margin: auto;
}

</style>