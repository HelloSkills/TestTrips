<template>
  <div :class="$style.container">
    <DrawerSelect :isAvia="true"/>
    <AviaSelect/>
  </div>
</template>

<script setup lang="ts">
import DrawerSelect from "@/components/Drawer/DrawerSelect.vue"
import AviaSelect from "@/components/Avia/AviaSelect.vue"
</script>

<style lang="scss" module>
.container {
  width: max-content;
  margin: 58px auto 0;
}
</style>