<template>
  <Header/>
  <Trips v-if="trips.length" :trips="trips"/>
<!--<div :class="$style.test">{{users}}</div>-->
<!--<div :class="$style.test">{{aviaVariants}}</div>-->
<!--<div :class="$style.test">{{trips}}</div>-->
</template>

<script setup lang="ts">
import Header from "@/components/header.vue"
import Trips from "@/components/Trips/index.vue"
import { onMounted, ref } from 'vue'
import { getUsers, getAviaVariants, getTrips, postTrip, users, aviaVariants, trips } from "@/composables/useJsonServer.ts"

getUsers()
getAviaVariants()
getTrips()
// postTrip({})

onMounted(async () => {
  await getTrips()
})
</script>

<style lang="scss" module>
//.test{
//  display: flex;
//}
</style>
