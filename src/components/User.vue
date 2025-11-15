<script setup>
import {computed, ref} from "vue";

const user = defineProps({
  firstName: String,
  lastName: String,
  birthDate: Date,
})

const age = computed(() => {
  const secs = (Date.now() - user.birthDate) / 1000
  return Math.floor(secs / 86400 / 365.25)
})

const showAddInfo = ref(false)

const onUsernameMouseEnter = ref(false)

function handleShowAddInfo() {
  showAddInfo.value = !showAddInfo.value
}
</script>

<template>
  <div class="user">
    <span
        :class="{ user_name: true, user_name__on_mouse_enter: onUsernameMouseEnter }"
        @mouseenter="onUsernameMouseEnter=true"
        @mouseleave="onUsernameMouseEnter=false"
    >
      {{ lastName }} {{ firstName }}
    </span>
    <span v-show="showAddInfo">
      Дата рождения: {{ birthDate.toLocaleDateString() }}, возраст: {{ age }})
    </span>
    <button
        class="btn-toggle"
        @click=handleShowAddInfo
    >
      {{ showAddInfo ? "Скрыть" : "Показать" }}
    </button>
  </div>
</template>

<style scoped>
.user {
  display: flex;
  justify-content: space-between;
  gap: 0.4rem;
}

.user_name {
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 0.3rem;
}

.user_name__on_mouse_enter {
  color: darkgreen;
}

.btn-toggle {
  background-color: #1d4ed8;
  border: none;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  width: fit-content;
  transition: background-color 0.3s;
}

.btn-toggle:hover {
  background-color: #2563eb;
}
</style>