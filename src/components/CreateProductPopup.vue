<script setup>
import {reactive, ref} from "vue";

const showPopup = ref(false)

const form = reactive({
  title: 'no title',
  price: 0,
  description: '',
  category: 'unknown',
})

const emit = defineEmits(['onCreated'])

function inputDataIsValid() {
  return form.title.length > 5 && form.price > 0 && form.description.length > 10 && form.category > 3
}

function onSubmit() {
  emit('onCreated', {
    title: form.title,
    price: form.price,
    category: form.category,
    description: form.description
  })
  showPopup.value = false
  form.title = 'no title'
  form.price = 0
  form.description = ''
  form.category = 'unknown'
}
</script>

<template>
  <button @click="showPopup = true">Создать</button>
  <div v-if="showPopup" class="popup-overlay" @click.self="showPopup = false">
    <div class="popup-content">
      <h2 class="popup-header">Товар</h2>
      <form @submit.prevent="onSubmit">
        <label class="form-label">
          ФИО:
          <input v-model="form.title" type="text" required/>
        </label>

        <label class="form-label">
          Цена:
          <input v-model="form.price" type="number" required/>
        </label>

        <label class="form-label">
          Описание:
          <input v-model="form.description" type="text" required/>
        </label>

        <label class="form-label">
          Категория:
          <input v-model="form.category" type="text" required/>
        </label>

        <div class="form-buttons">
          <button type="submit" :disabled="!inputDataIsValid">Отправить</button>
          <button type="button" @click="showPopup = false">Закрыть</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  width: 350px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.popup-header {
  text-align: center;
  color: #333;
  font-size: 1.5rem;
}

.form-label {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2rem;
  font-weight: 500;
}

.form-label input {
  margin-top: 0.3rem;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.form-buttons {
  display: flex;
  gap: 0.8rem;
  justify-content: center;
}

.form-buttons button {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.form-buttons button[type="submit"] {
  background: #28a745;
  color: white;
}

.form-buttons button[type="submit"]:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.form-buttons button[type="button"] {
  background: #6c757d;
  color: white;
}
</style>