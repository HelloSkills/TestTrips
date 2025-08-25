<template>
<div :class="$style.container">
    <div :class="$style.wrap">
      <a href="" :class="$style.logo"><img src="/images/logo.svg" width="40" height="40" alt="logo"></a>
      <div :class="$style.travel">
        <a href="" :class="$style.logo"><img src="/icons/suitcase.svg" alt="suitcase_logo"></a>
        <a href="" :class="$style.createTravel">Создать поездку</a>
      </div>
    </div>

    <a href="" :class="$style.user">
      <span :class="$style.name">AA</span>
    </a>

</div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" module>
.container {
  width: 100%;
  min-width: 840px;
  max-width: 1440px;
  margin: 0 auto;
  height: 60px;
  padding: 10px 94px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  color: #4361EE;
}

.wrap {
  height: 40px;
  display: flex;
  gap: 20px;
  align-items: center;
}

.logo {
  line-height: 0;
}

.travel {
  height: 20px;
  display: flex;
  gap: 15px;
  align-items: center;
}

.createTravel {
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
}

.user {
  width: 36px;
  height: 36px;
  min-width: 36px;
  min-height: 36px;
  background: #4361EE;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.name {
  color: #FFFFFF;
}
</style>