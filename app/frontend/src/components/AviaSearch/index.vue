<template>
 <div :class="$style.container">
   <div v-if="searchLength" :class="$style.title">
     Найдено <span :class="$style.length"> {{searchLength}} </span> вариантов
   </div>
   <div v-else :class="$style.title">
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

   <Item
       :variants="filteredVariants"
       :tripType="tripType"
   />
 </div>
</template>

<script setup lang="ts">
import Item from '@/components/AviaSearch/item.vue'
import { computed, onMounted, ref} from 'vue'
import { aviaVariants, getAviaVariants} from '@/composables/useJsonServer.ts'
import type { AviaVariant } from "@/types/types.ts"
import { sortByPrice } from '@/utils/sortVariants.ts'
const tripType = ref<'cheap' | 'expensive'>('cheap')
const variants = ref<AviaVariant[]>([])

const filteredVariants = computed(() => sortByPrice(variants.value, tripType.value))
const onChange = () => {
  console.log('Выбрано tripType.value', tripType.value)
}
const searchLength = ref(0)

onMounted(async () => {
  await getAviaVariants()
  variants.value = aviaVariants.value
  searchLength.value = variants.value.length
  console.log('variantsValue', variants.value)
  console.log('searchLength.value', searchLength.value)
})
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