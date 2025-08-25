<script setup lang="ts">
import { getUsers, getAviaVariants, getTrips, postTrip, users, aviaVariants, trips } from "@/composables/useJsonServer.ts"

getUsers()
getAviaVariants()
getTrips()
// postTrip({})
</script>

<template>
<div :class="$style.test">{{users}}</div>
<div :class="$style.test">{{aviaVariants}}</div>
<div :class="$style.test">{{trips}}</div>
</template>

<style lang="scss" module>
//.test{
//  display: flex;
//}
</style>
