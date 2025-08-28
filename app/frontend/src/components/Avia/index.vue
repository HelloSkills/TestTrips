<template>
  <div :class="$style.container">
    <SelectUsers :isAvia="true" :class="aviaSelect"/>
  </div>
</template>

<script setup lang="ts">

import SelectUsers from "@/components/Drawer/SelectUsers.vue"
</script>

<style lang="scss" module>
.container {
  width: 840px;
  margin: 58px auto 0;
}


</style>