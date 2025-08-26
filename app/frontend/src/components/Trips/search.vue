<template>
  <div :class="$style.container">
    <div :class="$style.trips">Поездки</div>
    <div :class="$style.search">
      <div :class="$style.wrap">
        <img src="/icons/search.svg" alt="search_icon" width="20" height="20" />
        <input
            type="text"
            placeholder="Введите название поездки или её номер"
            :class="$style.inputSearch"
        >
      </div>
      <button @click="search" :class="$style.btnSearch">Найти</button>
    </div>
<!--  <div :class="$style.list">-->
<!--    <div>Список поездок пуст</div>-->
<!--    <a href="" :class="$style.createTravel">создать поездку</a>-->
<!--  </div>-->
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" module>
.container {
  margin-bottom: 30px;
}

.trips {
  font-weight: 700;
  font-size: 26px;
  margin-top: 50px;
  margin-bottom: 20px;
}

.search {
  height: 54px;
  display: flex;
  gap: 20px;
}

.wrap {
  display: flex;
  gap: 10px;
  width: 690px;
  min-width: 690px;
  align-items: center;
  justify-content: start;
  padding-left: 20px;
  border-radius: 5px;
  background: #FFFFFF;
}

.inputSearch {
  all: unset;
  width: 100%;

  &::placeholder {
    color: #9ca3af;
    font-size: 14px;
    font-weight: 400;
    line-height: 100%;
  }
}

.btnSearch {
  all: unset;
  width: 137px;
  height: 54px;
  background: #4361EE;
  color: #FFFFFF;
  font-size: 14px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.list {
  width: max-content;
  margin: 30px auto 0;
  font-size: 16px;
  line-height: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
</style>