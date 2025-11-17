<script setup>
import User from "@/components/User.vue";
import {USERS} from "@/components/UserStore.js";
import {ref} from "vue";

const userListIsVisible = ref(true)
const toggleUserList = () => userListIsVisible.value = !userListIsVisible.value

</script>

<template>
  <div class="wrapper">
    <span>Список пользователей:</span>
    <button
        class="btn-toggle-list"
        @click=toggleUserList
    >
      {{ userListIsVisible ? "Скрыть" : "Показать" }}
    </button>
  </div>
  <ul v-if="userListIsVisible" class="user-list">
    <li class="user-list__item" v-for="user in USERS" :key="user.id">
      <User
          :first-name="user.firstName"
          :last-name="user.lastName"
          :birth-date="user.birthDate"
      />
    </li>
  </ul>
  <div v-else>Список пользователей скрыт!</div>
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

.btn-toggle-list {
  margin-left: 10px;
  min-width: 80px;
  padding: 0.3rem 0.8rem;
  background-color: #1d4ed8;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.btn-toggle-list:hover {
  background-color: #2563eb;
}
</style>