<script setup lang="ts">
import { getUsers, getAviaVariants, getTrips, postTrip, users, aviaVariants, trips } from "@/composables/useJsonServer.ts"

getUsers()
getAviaVariants()
getTrips()
// postTrip({})
</script>

<template>
<div :class="$style.test1">{{users}}</div>
<div :class="$style.test2">{{aviaVariants}}</div>
<div :class="$style.test3">{{trips}}</div>
</template>

<style lang="scss" module>
.test1 {
  background: green;
  color: white;
}
.test2 {
  background: blue;
  color: white;
}
.test3 {
  background: violet;
  color: white;
}
</style>
