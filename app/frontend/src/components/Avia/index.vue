<template>
  <div :class="$style.container">
    <SelectUsers :isAvia="true"/>
    <SelectAvia/>
  </div>
</template>

<script setup lang="ts">

import SelectUsers from "@/components/Drawer/SelectUsers.vue"
import SelectAvia from "@/components/Avia/SelectAvia.vue"
</script>

<style lang="scss" module>
.container {
  width: max-content;
  margin: 58px auto 0;
}


</style>