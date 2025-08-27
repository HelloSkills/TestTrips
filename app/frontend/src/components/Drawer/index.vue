<template>
  <div :class="$style.container">
    <div :class="$style.wrap">
      <div :class="$style.title">
        <div :class="$style.create">
          Создание поездки
        </div>
        <img :class="$style.close" src="/icons/close.svg" alt="close_icon">
      </div>
      <div :class="$style.name">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Введите название поездки"
            :class="$style.inputSearch"
            @keyup.enter="search"
        >
      </div>
      <SelectUsers/>
    </div>
    <div :class="$style.createTrip">
      <div :class="$style.createBtn">
        Создать
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SelectUsers from "@/components/Drawer/SelectUsers.vue";
const searchQuery = ref('')
const search = () => {
  console.log('searchQuery.value', searchQuery.value)
}
</script>

<style lang="scss" module>

.container {
  width: 400px;
  height: 855px; // потом уберём
  background-color: #F6F8FC;
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.title {
  height: 60px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #FFFFFF;
  border-bottom: 1px solid #B3C1D1;
}

.create {
  font-size: 14px;
  line-height: 14px;
  font-weight: 500;
}

.name {
  display: flex;
  justify-content: center;
  color: #B3C1D1;
  margin: 27px 0;
}

.inputSearch {
  all: unset;
  border-bottom: 1px solid transparent;
  width: 174px;
  color: black;

  &::placeholder {
    color: #9ca3af;
    font-size: 14px;
    font-weight: 400;
    line-height: 100%;
  }

  &:focus {
    border-bottom: 1px solid #4361EE;
  }
}

.inputSearch, .close {
  cursor: pointer;
}

.createTrip {
  border-top: 1px solid #B3C1D1;
  height: 60px;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
}

.createBtn {
  width: 150px;
  height: 40px;
  margin-left: 20px;
  padding: 12px 47px;
  background-color: #4361EE;
  color: #FFFFFF;
  font-size: 14px;
  line-height: 14px;
  border-radius: 5px;
}
</style>