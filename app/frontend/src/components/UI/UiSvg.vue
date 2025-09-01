<script setup lang="ts">
import { defineProps, computed } from 'vue'

// Пропс name определяет, какой SVG показывать
interface IProps {
  name: string
}
const props = defineProps<IProps>()

// Импорт всех SVG через ?raw
import LogoSvg from '@/images/logo.svg?raw'
import AirSvg from '@/images/icons/air.svg?raw'
import ArrowDownSvg from '@/images/icons/arrow_down.svg?raw'
import CalendarSvg from '@/images/icons/calendar.svg?raw'
import CloseSvg from '@/images/icons/close.svg?raw'
import DeleteSvg from '@/images/icons/delete.svg?raw'
import SearchSvg from '@/images/icons/search.svg?raw'
import SuitcaseSvg from '@/images/icons/suitcase.svg?raw'

// Объект "имя -> SVG как строка"
const iconsMap: Record<string, string> = {
  logo: LogoSvg,
  air: AirSvg,
  arrow_down: ArrowDownSvg,
  calendar: CalendarSvg,
  close: CloseSvg,
  delete: DeleteSvg,
  search: SearchSvg,
  suitcase: SuitcaseSvg
}

// Выбираем нужный SVG
const svgContent = computed(() => iconsMap[props.name] || '')
</script>

<template>
  <div v-html="svgContent"></div>
</template>
