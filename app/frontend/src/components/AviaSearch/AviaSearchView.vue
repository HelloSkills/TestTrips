<template>
  <div :class="$style.container">
    <div v-if="!aviaSearchStore.isLoading && aviaSearchStore.searchCompleted" :class="$style.title">
      Найдено <span :class="$style.length">{{ aviaSearchStore.filteredVariants.length }}</span> вариантов
    </div>
    <div v-else-if="aviaSearchStore.isLoading" :class="$style.titleSkeleton">
      <div :class="[$style.skeleton, $style.titleBlock]"></div>
    </div>
    <div v-else :class="$style.title">
      Поиск вариантов
    </div>

    <div v-if="!aviaSearchStore.isLoading && aviaSearchStore.filteredVariants.length > 0" :class="$style.options">
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
    <div v-else-if="aviaSearchStore.isLoading" :class="$style.optionsSkeleton">
      <div :class="[$style.skeleton, $style.optionsBlock]"></div>
    </div>

    <div v-if="aviaSearchStore.isLoading" :class="$style.skeletonList">
      <AviaSkeleton v-for="n in 5" :key="'skeleton-' + n"/>
    </div>

    <div v-else>
      <AviaSearchItem :variants="aviaSearchStore.filteredVariants"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AviaSearchItem from '@/components/AviaSearch/AviaSearchItem.vue'
import AviaSkeleton from '@/components/Avia/AviaSkeleton.vue'
import { useAviaSearchStore } from '@/stores/useAviaSearchStore.ts'
import { useJsonServer } from '@/composables/useJsonServer'

const aviaSearchStore = useAviaSearchStore()
const { getAviaVariants } = useJsonServer()

const onChange = async () => {
  aviaSearchStore.setLoading(true)
  await new Promise(resolve => setTimeout(resolve, 300))
  aviaSearchStore.sortVariants(aviaSearchStore.tripType)
  aviaSearchStore.setLoading(false)
}

onMounted(async () => {
  aviaSearchStore.setLoading(true)
  try {
    const items = await getAviaVariants()
    aviaSearchStore.setVariants(items)
    aviaSearchStore.applyFilters()
  } catch (err) {
    console.error('Ошибка загрузки вариантов:', err)
  } finally {
    aviaSearchStore.setLoading(false)
  }
})
</script>

<style lang="scss" module>
.container {
  width: 840px;
  display: flex;
  flex-direction: column;
  margin: auto;
}

.title, .titleSkeleton {
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 26px;
}

.length {
  color: var(--color-blue);
}

.options, .optionsSkeleton {
  width: 420px;
  height: 40px;
  background-color: var(--color-white);
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 12px 20px;
  margin-bottom: 30px;
}

.optionsSkeleton {
  padding: 0;
}

.labels {
  display: flex;
  gap: 5px;
  font-weight: 400;
  font-size: 14px;
}

.skeleton {
  background: linear-gradient(
          90deg,
          #e0e0e0 25%,
          #f8f8f8 50%,
          #e0e0e0 75%
  );
  background-size: 250% 100%;
  border-radius: 4px;
  animation: shimmer 1.2s linear infinite, pulse 2s ease-in-out infinite;
  animation-delay: var(--delay, 0s);
  animation-fill-mode: both;
}

/* Скелетоны для заголовка и фильтров */
.titleBlock {
  width: 300px;
  height: 30px;
}

.optionsBlock {
  width: 420px;
  height: 40px;
  border-radius: 10px;
}

@keyframes shimmer {
  0% { background-position: -100% 0; }
  100% { background-position: 100% 0; }
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; filter: brightness(0.95); }
  50% { opacity: 1; filter: brightness(1.05); }
}
</style>
