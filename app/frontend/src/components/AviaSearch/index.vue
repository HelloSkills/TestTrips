<template>
  <div :class="$style.container">
    <div v-if="aviaSearchStore.searchCompleted" :class="$style.title">
      Найдено <span :class="$style.length"> {{ aviaSearchStore.filteredVariants.length }} </span> вариантов
    </div>
    <div v-else :class="$style.title">
      Поиск вариантов
    </div>
    <div :class="$style.options">
      <label :class="$style.labels">
        <input type="radio" name="sort" value="cheap" v-model="aviaSearchStore.tripType" @change="onChange" />
        Сначала дешёвые
      </label>

      <label :class="$style.labels">
        <input type="radio" name="sort" value="expensive" v-model="aviaSearchStore.tripType" @change="onChange" />
        Сначала дорогие
      </label>
    </div>

    <Item
        :variants="aviaSearchStore.filteredVariants"
        :tripType="aviaSearchStore.tripType"
    />
  </div>
</template>


<script setup lang="ts">
import Item from '@/components/AviaSearch/item.vue'
import { onMounted } from 'vue'
import { getAviaVariants } from '@/composables/useJsonServer.ts'
import { useAviaSearchStore } from '@/stores/useAviaSearchStore.ts'

const aviaSearchStore = useAviaSearchStore()

// Сортировка по выбранному типу
const onChange = () => {
  aviaSearchStore.sortVariants(aviaSearchStore.tripType)
  console.log('Выбрано tripType.value', aviaSearchStore.tripType)
}

// Загрузка данных при монтировании
onMounted(async () => {
  const items = await getAviaVariants()
  aviaSearchStore.setVariants(items)
  aviaSearchStore.applyFilters()
})
</script>


<style lang="scss" module>
.container {
  width: 840px;
  display: flex;
  flex-direction: column;
  margin: auto;
}

.title {
  margin-top: 50px;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 26px;
}

.length {
  color: #4361EE;
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
  font-weight: 400;
  font-size: 14px;
}
</style>