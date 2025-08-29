<template>
  <div :class="[$style.overlay, modelValue ? $style.open : '']" @click.self="close">
    <div :class="[$style.drawer, modelValue ? $style.open : '']">
      <div :class="$style.container">
        <div :class="$style.wrap">
          <div :class="$style.title">
            <div :class="$style.create">Создание поездки</div>
            <img :class="$style.close" src="/icons/close.svg" alt="close_icon" @click="close">
          </div>
          <div :class="$style.name">
            <input
                v-model="nameTrip"
                type="text"
                placeholder="Введите название поездки"
                :class="$style.inputSearch"
                @keyup.enter="createTrip"
            >
          </div>
          <SelectUsers ref="selectUsersRef"/>
        </div>
        <div :class="$style.createTrip">
          <div :class="$style.createBtn" @click="createTrip">Создать</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SelectUsers from "@/components/Drawer/SelectUsers.vue"

const selectUsersRef = ref<InstanceType<typeof SelectUsers> | null>(null)

const nameTrip = ref('')

import { useTripsStore } from "@/stores/tripsStore.ts"
const tripStore = useTripsStore()

import { storeToRefs } from 'pinia'

import { useUserStore } from "@/stores/userStore.ts"
import { useRouter } from "vue-router"
const router = useRouter()
const userStore = useUserStore()
const { selectedUsers } = storeToRefs(userStore)

import { useTripStore } from '@/stores/selectedTripStore'
const selectedTripStore = useTripStore()
const createTrip = async () => {
  if (nameTrip.value.length === 0) {
    alert('Необходимо указать название поездки')
    return
  }
  if (selectedUsers.value.length === 0) {
    alert('Необходимо указать хотя бы 1 участника поездки')
    return
  }

  const trip = await tripStore.createTrip({
    name: nameTrip.value,
    price: 0,
    passengers: selectedUsers.value,
    services: [],
    status: 'new'
  })

  close()
  selectedTripStore.selectTrip(trip)
  router.push(`/trip/${trip.id}`) // selectedTrip уже установлен в сторе
}

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])
const close = () => {
  emit('update:modelValue', false)
  userStore.clearSelectedUsers()
  nameTrip.value = ''
  selectUsersRef.value?.closeDropdown()
}

</script>

<style lang="scss" module>

.container {
  width: 400px;
  height: 100%;
  background-color: #F6F8FC;
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
  color: #000000;
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
  cursor: pointer;
}

// Стили overlay
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.4);
  z-index: 1000;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.overlay.open {
  opacity: 1;
  pointer-events: all;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background-color: #F6F8FC;
  transform: translateX(100%); // уезжает полностью вправо за экран
  transition: transform 0.7s cubic-bezier(0.25, 1, 0.5, 1);
  z-index: 1010;
}

.drawer.open {
  transform: translateX(0); // выезжает на экран
}
</style>