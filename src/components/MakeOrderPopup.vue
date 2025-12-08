<script setup>import { reactive, ref } from 'vue'

const showPopup = ref(false)

const form = reactive({
  fullName: '',
  email: '',
  address: '',
  agreement: false,
})

function submitOrder() {
  alert(`Заказ отправлен:\n${JSON.stringify(form, null, 2)}`)
  showPopup.value = false
  form.fullName = ''
  form.email = ''
  form.address = ''
  form.agreement = false
}
</script>

<template>
  <button @click="showPopup = true">Заказать</button>
  <div v-if="showPopup" class="popup-overlay" @click.self="showPopup = false">
    <div class="popup-content">
      <h2 class="popup-header">Заказ</h2>
      <form @submit.prevent="submitOrder">
        <label class="form-label">
          ФИО:
          <input v-model="form.fullName" type="text" required />
        </label>

        <label class="form-label">
          Email:
          <input v-model="form.email" type="email" required />
        </label>

        <label class="form-label">
          Адрес (город, улица, дом):
          <input v-model="form.address" type="text" required />
        </label>

        <label class="popup-rules">
          <input v-model="form.agreement" type="checkbox" required />
          <span>Согласен с <a href="#">правилами</a></span>
        </label>

        <div class="form-buttons">
          <button type="submit" :disabled="!form.agreement">Отправить</button>
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
  background-color: rgba(0,0,0,0.5);
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
  box-shadow: 0 2px 12px rgba(0,0,0,0.3);
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

.popup-rules {
  display: flex;
  align-items: center; /* В одну строку */
  gap: 0.5rem;
  margin: 1rem 0 1.5rem 0;
  font-weight: 400;
  cursor: pointer;
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