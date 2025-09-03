<template>
  <div :class="[$style.container, isAvia ? $style.avia : '']">
    <div :class="$style.wrapper">

      <div :class="[$style.select, isAvia ? $style.aviaSelect : '']" @click="toggleDropdown()" ref="selectRef">
        <div :class="[$style.users, isAvia ? $style.aviaUsers : '']">
          {{ textPassengers }}
        </div>
       <div :class="[$style.arrow, isOpen ? $style.open : '']">
         <UiSvg name="arrow_down" />
       </div>
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

    <div v-if="!isAvia">
      <div
          v-for="user in userStore.selectedUsers"
          :key="user.id"
          :class="$style.selectedUsers"
      >
        <div :class="$style.userName">{{ user.first_name }} {{ user.second_name }}</div>
       <div :class="$style.icon" @click="userStore.deleteUser(user.id)">
         <UiSvg name="delete" />
       </div>
      </div>
    </div>

    <div v-else :class="$style.selectedUsersAvia">
      <div
          v-for="user in aviaPassengers"
          :key="user.id"
          :class="$style.aviaUserItem"
      >
        <div :class="$style.userName">{{ user.first_name }} {{ user.second_name }}</div>
        <div :class="$style.icon" @click="userStore.deleteUser(user.id)">
          <UiSvg name="delete" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useTripsStore } from '@/stores/tripsStore'
import UiSvg from '@/components/UI/UiSvg.vue'

interface Props {
  isAvia: boolean
}

const props = defineProps<Props>()

const isAvia = computed(() => props.isAvia)

const route = useRoute()
const tripId = route.params.id as string

const userStore = useUserStore()
const tripsStore = useTripsStore()

const isOpen = ref(false)
const toggleDropdown = () => isOpen.value = !isOpen.value
const closeDropdown = () => isOpen.value = false
defineExpose({ closeDropdown })

const selectRef = ref<HTMLElement | null>(null)

const textPassengers = computed(() => isAvia.value ? 'Выберите пассажира' : 'Выберите сотрудников')

const availableUsers = computed(() => {
  const users = isAvia.value && tripId
      ? tripsStore.getUsersForTrip(tripId)
      : userStore.users
  return users.filter(u => !userStore.selectedUsers.some(sel => sel.id.toString() === u.id.toString()))
})

const aviaPassengers = computed(() => {
  return isAvia.value
      ? userStore.selectedUsers.filter(u =>
          availableUsers.value.some(a => a.id.toString() === u.id.toString()) ||
          tripsStore.getUsersForTrip(tripId).some(a => a.id.toString() === u.id.toString())
      )
      : []
})

const selectUser = (user: any) => {
  if (isAvia.value) {
    userStore.selectedUsers = [user]
    isOpen.value = false
  } else {
    userStore.selectUser(user)
    isOpen.value = false
  }
}

onMounted(() => {
  if (route.path === '/') {
    userStore.loadUsers()
  }
})
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

.users {
  color: #d7d7d7;
}

.dropdown {
  max-height: 288px;
  overflow-y: auto;
  margin: 0 20px;
  background: var(--color-white);
  border-radius: 5px;
  border: 1px solid #dddddd;
  color: var(--color-black);
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
  background-color: var(--color-white);
  color: var(--color-black);
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
  background-color: var(--color-white);
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

.arrow,
.open {
  color: #B3C1D1;
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
