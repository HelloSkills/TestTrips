<template>
  <div :class="$style.container">
    <SelectUsers :isAvia="true"/>
    <SelectAvia/>
    <AviaSearch v-if="aviaSearchStore.searchCompleted"/>
  </div>
</template>

<script setup lang="ts">

import SelectUsers from "@/components/Drawer/SelectUsers.vue"
import SelectAvia from "@/components/Avia/SelectAvia.vue"
import AviaSearch from "@/components/AviaSearch/index.vue"

import { useAviaSearchStore } from '@/stores/useAviaSearchStore.ts'
const aviaSearchStore = useAviaSearchStore()
</script>

<style lang="scss" module>
.container {
  width: max-content;
  margin: 58px auto 0;
}


</style>