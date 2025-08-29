<template>
 <div :class="$style.container">
   <div :class="$style.title">
     Поиск вариантов
   </div>
   <div :class="$style.options">
     <label :class="$style.labels">
       <input type="radio" name="sort" value="cheap" v-model="tripType" @click="onChange" />
       Сначала дешёвые
     </label>

     <label :class="$style.labels">
       <input type="radio" name="sort" value="expensive" v-model="tripType" @click="onChange" />
       Сначала дорогие
     </label>
   </div>

   <Item/>
 </div>
</template>

<script setup lang="ts">
import Item from '@/components/AviaSearch/item.vue'
import { ref } from 'vue'
const tripType = ref('cheap')
const onChange = () => {
  console.log('Выбрано', tripType.value)
}
</script>/

<style lang="scss" module>
.container {
  width: 840px;
}

.title {
  margin-top: 50px;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 26px;
}

.options {
  width: 420px;
  height: 40px;
  background-color: #FFFFFF;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 20px;
  margin-bottom: 30px;
}

.labels {
  display: flex;
  gap: 5px;
}
</style>