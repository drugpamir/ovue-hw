<script setup>
import User from "@/components/User.vue";
// import {USERS} from "@/components/UserStore.vue";
import {ref} from "vue";

const USERS = ref([
  {
    id: 1,
    firstName: 'Вася',
    lastName: 'Иванов',
    birthDate: new Date(1990, 3, 1)
  },
  {
    id: 2,
    firstName: 'Дмитрий',
    lastName: 'Петров',
    birthDate: new Date(1999, 2, 13)
  },
  {
    id: 3,
    firstName: 'Кузнецова',
    lastName: 'Наталья',
    birthDate: new Date(1995, 5, 21)
  },
])
</script>

<template>
  <div class="wrapper">
    Список пользователей:
  </div>
  <ul class="user-list">
    <li class="user-list__item" v-for="user in USERS" :key="user.id">
      <User
          :first-name="user.firstName"
          :last-name="user.lastName"
          :birth-date="user.birthDate"
      />
    </li>
  </ul>
</template>

<style scoped>
.wrapper {
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
}

.user-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 600px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fafafa;
}

.user-list__item {
  border-bottom: 1px solid #eee;
  padding: 0.8rem 1rem;
}

.user-list__item:last-child {
  border-bottom: none;
}
</style>