<template>
  <Header/>
  <Trips v-if="trips.length > 0" :trips="trips"/>
  <SelectedTrip />
<!--  <router-view />-->
</template>

<script setup lang="ts">
import Header from "@/components/header.vue"
import Trips from "@/components/Trips/index.vue"
import SelectedTrip from "@/components/SelectedTrip.vue"
import { onMounted, ref } from 'vue'
import { getUsers, getAviaVariants, getTrips, postTrip, users, aviaVariants, trips } from "@/composables/useJsonServer.ts"


getUsers()
getAviaVariants()
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
