<template>
  <div :class="$style.container">
    <div :class="$style.select">
      <div :class="$style.users" @click="toggleDropdown">
        Выберите сотрудников
      </div>
      <img src="/icons/arrow_down.svg" alt="arrow_down_icon" width="20" height="20" />
    </div>
    <div :class="$style.selectedUsers" v-for="user in users" :key="user.id">
      <div :class="$style.userName">
        {{ user.second_name }} {{ user.last_name }}
      </div>
      <img :class="$style.icon" @click="deleteUser" src="/icons/delete.svg" alt="delete_icon" width="16" height="16" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const users = ref([
  {
    "id": "1",
    "first_name": "Смирнов",
    "second_name": "Алексей",
    "last_name": "Сергеевич"
  },
  {
    "id": "2",
    "first_name": "Кузнецова",
    "second_name": "Анна",
    "last_name": "Дмитриевна"
  },
  {
    "id": "3",
    "first_name": "Попов",
    "second_name": "Михаил",
    "last_name": "Андреевич"
  },
  {
    "id": "4",
    "first_name": "Соколова",
    "second_name": "Екатерина",
    "last_name": "Владимировна"
  },
  {
    "id": "5",
    "first_name": "Лебедев",
    "second_name": "Никита",
    "last_name": "Александрович"
  },
  {
    "id": "6",
    "first_name": "Морозова",
    "second_name": "Ольга",
    "last_name": "Сергеевна"
  },
  {
    "id": "7",
    "first_name": "Новиков",
    "second_name": "Дмитрий",
    "last_name": "Игоревич"
  },
  {
    "id": "8",
    "first_name": "Федорова",
    "second_name": "Светлана",
    "last_name": "Викторовна"
  },
  {
    "id": "9",
    "first_name": "Михайлов",
    "second_name": "Владимир",
    "last_name": "Петрович"
  },
  {
    "id": "10",
    "first_name": "Алексеева",
    "second_name": "Марина",
    "last_name": "Александровна"
  }
  ])

const deleteUser = () => {
  console.log('Удаляем юзера')
}
</script>

<style lang="scss" module>
.container {
  width: 100%;
  cursor: pointer;
}

.select {
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 10px 12px 15px;
  margin: 20px;
  background-color: #FFFFFF;
  border-radius: 5px;
}

.selectedUsers {
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px;
  padding-left: 15px;
  background-color: #FFFFFF;
  position: relative;
}

.icon {
  position: absolute;
  top: -7px;
  right: 5px;
  cursor: pointer;
}
</style>