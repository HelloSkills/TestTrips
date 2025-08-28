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
            v-for="user in userStore.availableUsers"
            :key="user.id"
            :class="$style.dropdownItem"
            @click="userStore.selectUser(user)"
        >
          {{ user.first_name }} {{ user.second_name }}
        </div>
      </div>

    </div>

    <div v-if="!isAvia"
         v-for="user in userStore.selectedUsers"
         :class="$style.selectedUsers"
         :key="user.id"
    >
      <div :class="$style.userName">
        {{ user.first_name }} {{ user.second_name }}
      </div>
      <img
          :class="$style.icon"
          @click="userStore.deleteUser(user.id)"
          src="/icons/delete.svg"
          alt="delete_icon"
          width="16"
          height="16"
      />
    </div>

    <div v-else :class="$style.selectedUsersAvia">
      <div
          v-for="user in userStore.selectedUsers"
          :key="user.id"
          :class="$style.aviaUserItem"
      >
        <div :class="$style.userName">
          {{ user.first_name }} {{ user.second_name }}
        </div>
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
import {ref, onMounted, computed} from "vue"
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
onMounted(() => {
  userStore.loadUsers()
})

const props = defineProps({
  isAvia: Boolean,
})

const textPassengers = computed(() => {
  return props.isAvia ? 'Выберите пассажира' : 'Выберите сотрудников'
})

const isOpen = ref(false)
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

defineExpose({ closeDropdown })

const selectRef = ref<HTMLElement | null>(null)
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
