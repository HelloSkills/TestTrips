<template>
  <div :class="$style.container">
    <!-- Заголовок -->
    <div v-if="!aviaSearchStore.isLoading && !aviaSearchStore.isLoading" :class="$style.title">
      <span v-if="aviaSearchStore.searchCompleted">
        Найдено <span :class="$style.length">{{ aviaSearchStore.filteredVariants.length }}</span> вариантов
      </span>
      <span v-else>
        Поиск вариантов
      </span>
    </div>

    <!-- Опции сортировки -->
    <div :class="[$style.options, !aviaSearchStore.isLoading ? '' : $style.loading]">
      <label :class="$style.labels">
        <input
            type="radio"
            name="sort"
            value="cheap"
            v-model="aviaSearchStore.tripType"
            @change="onChange"
        />
        Сначала дешёвые
      </label>

      <label :class="$style.labels">
        <input
            type="radio"
            name="sort"
            value="expensive"
            v-model="aviaSearchStore.tripType"
            @change="onChange"
        />
        Сначала дорогие
      </label>
    </div>

    <!-- Скелетоны при загрузке -->
    <div v-if="aviaSearchStore.isLoading" :class="$style.skeleton">
      <Skeleton v-for="n in 5" :key="'skeleton-' + n" />
    </div>

    <!-- Список билетов -->
    <div v-else>
      <Item
          :variants="aviaSearchStore.filteredVariants"
          :tripType="aviaSearchStore.tripType"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Item from '@/components/AviaSearch/item.vue'
import Skeleton from '@/components/Avia/Skeleton.vue'
import { getAviaVariants } from '@/composables/useJsonServer.ts'
import { useAviaSearchStore } from '@/stores/useAviaSearchStore.ts'

const aviaSearchStore = useAviaSearchStore()

// Сортировка с показом скелетонов
const onChange = async () => {
  aviaSearchStore.setLoading(true)

  // имитация асинхронной сортировки, если сортировка мгновенная, можно убрать setTimeout
  await new Promise(resolve => setTimeout(resolve, 300))

  aviaSearchStore.sortVariants(aviaSearchStore.tripType)
  aviaSearchStore.setLoading(false)
}

// Загрузка данных при монтировании
onMounted(async () => {
  aviaSearchStore.setLoading(true)
  const items = await getAviaVariants()
  aviaSearchStore.setVariants(items)
  aviaSearchStore.applyFilters()
  aviaSearchStore.setLoading(false)
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

.loading {
  margin-top: 100px;
}

.labels {
  display: flex;
  gap: 5px;
  font-weight: 400;
  font-size: 14px;
}

//.skeleton {
//  margin-top: 170px;
//}

</style>
