<template>
  <div :class="[$style.container, isAvia ? $style.avia : '']">
    <div :class="$style.wrapper">

      <div :class="[$style.select, isAvia ? $style.aviaSelect : '']" @click="toggleDropdown" ref="selectRef">
        <div :class="[$style.users, isAvia ? $style.aviaUsers : '']">
          {{ textPassengers }}
        </div>
        <img :class="[isOpen ? $style.open : '']" src="/icons/arrow_down.svg" alt="arrow_down_icon" width="20" height="20" />
      </div>

      <div v-if="isOpen" :class="[$style.dropdown, isAvia ? $style.aviadropdown : '']">
        <div
            v-for="user in availableUsers"
            :key="user.id"
            :class="$style.dropdownItem"
            @click="selectUser(user)"
        >
          {{ user.first_name }} {{ user.second_name }}
        </div>
      </div>

    </div>

    <!-- Список выбранных пользователей для модалки -->
    <div v-if="!isAvia">
      <div
          v-for="user in userStore.selectedUsers"
          :key="user.id"
          :class="$style.selectedUsers"
      >
        <div :class="$style.userName">{{ user.first_name }} {{ user.second_name }}</div>
        <img
            :class="$style.icon"
            @click="userStore.deleteUser(user.id)"
            src="/icons/delete.svg"
            alt="delete_icon"
            width="16"
            height="16"
        />
      </div>
    </div>

    <!-- Список выбранных пользователей для авиа -->
    <div v-else :class="$style.selectedUsersAvia">
      <div
          v-for="user in aviaPassengers"
          :key="user.id"
          :class="$style.aviaUserItem"
      >
        <div :class="$style.userName">{{ user.first_name }} {{ user.second_name }}</div>
        <img
            :class="$style.icon"
            @click="userStore.deleteUser(user.id)"
            src="/icons/delete.svg"
            alt="delete_icon"
            width="16"
            height="16"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useTripsStore } from '@/stores/tripsStore'

const route = useRoute()
const tripId = route.params.id as string

const userStore = useUserStore()
const tripsStore = useTripsStore()

const props = defineProps({ isAvia: Boolean })
const isAvia = computed(() => props.isAvia)

const isOpen = ref(false)
const toggleDropdown = () => isOpen.value = !isOpen.value
const closeDropdown = () => isOpen.value = false
defineExpose({ closeDropdown })

const selectRef = ref<HTMLElement | null>(null)

const textPassengers = computed(() => isAvia.value ? 'Выберите пассажира' : 'Выберите сотрудников')

// Список доступных пользователей для дропдауна
const availableUsers = computed(() => {
  const users = isAvia.value && tripId
      ? tripsStore.getUsersForTrip(tripId)
      : userStore.users

  // исключаем уже выбранных
  return users.filter(u => !userStore.selectedUsers.some(sel => sel.id.toString() === u.id.toString()))
})

// Выбранные пользователи для авиа
const aviaPassengers = computed(() => {
  return isAvia.value
      ? userStore.selectedUsers.filter(u =>
          availableUsers.value.some(a => a.id.toString() === u.id.toString()) || // если нужен полный список выбранных, можно убрать условие
          tripsStore.getUsersForTrip(tripId).some(a => a.id.toString() === u.id.toString())
      )
      : []
})

// Выбор пользователя
const selectUser = (user: any) => {
  if (isAvia.value) {
    userStore.selectedUsers = [user] // заменяем массив на выбранного юзера (для выбора пассажира)
    isOpen.value = false
  } else {
    userStore.selectUser(user)
  }
}
</script>

<style lang="scss" module>
.container {
  width: 100%;
  position: relative;
}

.wrapper {
  position: relative;
}

.select {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 10px 12px 15px;
  margin: 20px;
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.dropdown {
  max-height: 288px;
  overflow-y: auto;
  margin: 0 20px;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #dddddd;
}

.aviadropdown {
  margin: 5px 0 0 0;
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 200px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  z-index: 1000;
}

.dropdownItem {
  padding: 10px;
  cursor: pointer;
  width: 100%;
  min-width: 250px;
  &:hover {
    background: #f3f3f3;
  }
}

.selectedUsers {
  height: 40px;
  display: flex;
  align-items: center;
  margin: 20px;
  padding-left: 15px;
  background-color: #ffffff;
  position: relative;
  border-radius: 5px;
}

.selectedUsersAvia {
  position: absolute;
  top: 0;
  left: 105%;
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  max-width: 300px;
  z-index: 1000;
}

.aviaUserItem {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 5px 10px;
  border-radius: 5px;
  position: relative;
  min-width: 250px;
  height: 40px;
}

.icon {
  position: absolute;
  top: -7px;
  right: 5px;
  cursor: pointer;
}

.open {
  transform: rotate(180deg);
}

.avia {
  max-width: 250px;
  width: 100%;
}

.aviaSelect {
  margin: 0;
}

.aviaUsers {
  min-width: 141px;
  font-size: 14px;
  line-height: 14px;
  color: #B3C1D1;
}
</style>
