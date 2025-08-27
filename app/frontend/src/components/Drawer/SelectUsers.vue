<template>
  <div :class="$style.container">
    <div :class="$style.select" @click="toggleDropdown">
      <div :class="$style.users">Выберите сотрудников</div>
      <img :class="[isOpen ? $style.open : '']" src="/icons/arrow_down.svg" alt="arrow_down_icon" width="20" height="20" />
    </div>

    <div v-if="isOpen" :class="$style.dropdown">
      <div
          v-for="user in userStore.availableUsers"
          :key="user.id"
          :class="$style.dropdownItem"
          @click="userStore.selectUser(user)"
      >
        {{ user.first_name }} {{ user.second_name }}
      </div>
    </div>

    <div
        :class="$style.selectedUsers"
        v-for="user in userStore.selectedUsers"
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"

import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
onMounted(() => {
  userStore.loadUsers()
})

const isOpen = ref(false)
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
</script>

<style lang="scss" module>
.container {
  width: 100%;
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

.icon {
  position: absolute;
  top: -7px;
  right: 5px;
  cursor: pointer;
}

.open {
  transform: rotate(180deg);
}
</style>
