<template>
  <!-- Скелетоны -->
  <AviaSkeleton v-if="aviaSearchStore.isLoading" v-for="n in 5" :key="'skeleton-' + n" />

  <!-- Список билетов с виртуальным скроллом -->
  <div v-else-if="variants.length > 0" :class="$style.listContainer">
    <DynamicScroller
        :items="variants"
        :min-item-size="220"
        key-field="id"
        :page-mode="true"
        :buffer="100"
    >
      <template #default="{ item, active }">
        <DynamicScrollerItem
            :item="item"
            :active="active"
            :size-dependencies="[]"
            :class="$style.container"
        >
          <div>
            <div :class="$style.wrapper">

              <!-- Информация о билете -->
              <div :class="$style.ticketInfo">
                <div :class="$style.name">
                  Перевозчик: {{ item.provider }}
                </div>
                <div :class="$style.dateTime">
                  <div :class="$style.dateFrom">
                    <div :class="$style.time">{{ item.timeFrom }}</div>
                    <div :class="$style.date">{{ formatDayMonth(item.dateFrom) }}</div>
                  </div>

                  <div :class="$style.cityInfo">
                    <div :class="$style.cities">
                      <div :class="$style.cityFrom">{{ item.placeFrom }}</div>
                      <div :class="$style.cityTo">{{ item.placeTo }}</div>
                    </div>
                    <div :class="$style.line"></div>
                    <div :class="$style.iata">
                      <div :class="$style.iataFrom">{{ item.iataFrom }}</div>
                      <div :class="$style.iataTo">{{ item.iataTo }}</div>
                    </div>
                  </div>

                  <div :class="$style.dateTo">
                    <div :class="$style.time">{{ item.timerTo }}</div>
                    <div :class="$style.date">{{ formatDayMonth(item.dateTo) }}</div>
                  </div>
                </div>
              </div>

              <!-- Бронь -->
              <div :class="$style.booking">
                <div :class="$style.bookBtn" @click="openConfirmModal(item)">
                  Забронировать от {{ formatPrice(item.price) }}
                </div>
              </div>

            </div>
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>

  <!-- Нет результатов -->
  <div v-else>
    <span :class="$style.noVariant">Нет подходящих вариантов</span>
    <div :class="$style.searchBack" @click="searchBack">назад к поиску</div>
  </div>

  <!-- Модалка подтверждения -->
  <UiModalConfirm
      :isOpen="isModalOpen"
      message="Вы точно хотите забронировать?"
      @confirm="handleConfirm"
      @cancel="handleCancel"
  />
</template>

<script setup lang="ts">
import type { AviaVariant } from "@/types/types.ts"
import { formatPrice } from '@/utils/price.ts'
import { formatDayMonth } from '@/utils/date.ts'
import { useUserStore } from '@/stores/userStore'
import { useTripStore } from '@/stores/SelectedTripStore'
import { useAviaSearchStore } from '@/stores/useAviaSearchStore'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import AviaSkeleton from '@/components/Avia/AviaSkeleton.vue'
import UiModalConfirm from '@/components/UI/UiModalConfirm.vue'
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

interface IProps {
  variants: AviaVariant[]
}
defineProps<IProps>();
const userStore = useUserStore()
const tripStore = useTripStore()
const aviaSearchStore = useAviaSearchStore()
const router = useRouter()
const toast = useToast()

const selectedUser = computed(() => userStore.selectedUsers[0] || null)

const isModalOpen = ref(false)
const ticketToBook = ref<AviaVariant | null>(null)

const openConfirmModal = (ticket: AviaVariant) => {
  ticketToBook.value = ticket
  isModalOpen.value = true
}

const handleConfirm = async () => {
  isModalOpen.value = false
  if (!selectedUser.value || !ticketToBook.value) {
    console.warn('Пользователь не выбран или билет не задан!')
    return
  }

  await tripStore.addService(selectedUser.value, ticketToBook.value)

  if (tripStore.selectedTrip) {
    router.push(`/trip/${tripStore.selectedTrip.id}`)
  }
  toast.success('Поездка успешно забронирована')
}

const handleCancel = () => {
  isModalOpen.value = false
}

const searchBack = () => {
  router.push(`/trip/${tripStore.selectedTrip.id}/services`)
}
</script>

<style lang="scss" module>
.listContainer {
  width: 840px;
  margin: 0 auto;
}

.container {
  width: 100%;
  height: 220px;
}


.wrapper {
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100%;
  background-color: var(--color-white);
  border-radius: 10px;
}

.ticketInfo {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #cbd1da;
  margin-left: -20px;
  margin-right: -20px;
  padding-left: 20px;
  padding-right: 20px;
  flex: 1;
}

.name {
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
}

.dateTime {
  display: flex;
  align-items: center;
  gap: 50px;
  margin: 15px 0 20px;
}

.dateFrom, .dateTo {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cityInfo {
  width: 580px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cityFrom, .cityTo {
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
}

.cities, .iata {
  display: flex;
  justify-content: space-between;
}

.iata {
  color: var(--color-blue);
  font-weight: 700;
}

.time {
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
}

.date {
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
}

.line {
  width: 580px;
  height: 5px;
  background-color: #B3C1D1;
  border-radius: 5px;
}

.booking {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}

.bookBtn {
  color: var(--color-white);
  background-color: var(--color-blue);
  width: 250px;
  height: 40px;
  border-radius: 5px;
  padding: 12px 30px;
  font-weight: 400;
  font-size: 14px;
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.noVariant {
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}

.searchBack {
  color: var(--color-blue);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
}
</style>