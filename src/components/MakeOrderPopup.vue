<script setup>
import {ref} from 'vue'
import {ErrorMessage, Field, useForm} from "vee-validate"
import * as yup from 'yup'
import {makeOrder} from "@/composables/OrderService.js";

const showPopup = ref(false)

const schema = yup.object({
  lastName: yup.string()
      .min(2, 'Фамилия должна содержать минимум 2 символа')
      .required('ФИО обязательно'),
  firstName: yup.string()
      .min(2, 'Имя должно содержать минимум 2 символа')
      .required('ФИО обязательно'),
  middleName: yup.string()
      .optional(),
  email: yup.string()
      .email('Email должен быть корректным')
      .required('Email обязателен'),
  address: yup.string()
      .min(11, 'Адрес должен содержать минимум 11 символов')
      .required('Адрес обязателен'),
  agreement: yup.string()
      .required('Необходимо согласиться с правилами')
})

const initialValues = {firstName: '', lastName : '', middleName: '', email: '', address: '', agreement: false}

const {handleSubmit, resetForm, meta} = useForm({
  validationSchema: schema,
  initialValues,
})

const onSubmit = handleSubmit(async (formValues) => {
  await makeOrder(formValues)
  closePopup()
})

const resetFormData = () => {
  resetForm({values: initialValues})  // Сбрасывает значения + ошибки
}

async function openPopup() {
  showPopup.value = true
  resetFormData()
}

function closePopup() {
  showPopup.value = false
}
</script>

<template>
  <button @click="openPopup">Заказать</button>

  <div v-if="showPopup" class="popup-overlay" @click.self="closePopup">
    <div class="popup-content">
      <h2 class="popup-header">Данные для заказа</h2>
      <form @submit="onSubmit">
        <label class="form-label">
          Фамилия:
          <Field name="lastName" type="text"/>
          <ErrorMessage name="lastName" class="error"/>
        </label>
        <label class="form-label">
          Имя:
          <Field name="firstName" type="text"/>
          <ErrorMessage name="firstName" class="error"/>
        </label>
        <label class="form-label">
          Отчество:
          <Field name="middleName" type="text"/>
          <ErrorMessage name="middleName" class="error"/>
        </label>

        <label class="form-label">
          Email:
          <Field name="email" type="email"/>
          <ErrorMessage name="email" class="error"/>
        </label>

        <label class="form-label">
          Адрес:
          <Field name="address" type="text"/>
          <ErrorMessage name="address" class="error"/>
        </label>

        <label class="popup-rules">
          <Field name="agreement" type="checkbox" value="false"/>
          <span>Согласен с правилами</span>
          <ErrorMessage name="agreement" class="error"/>
        </label>

        <div class="form-buttons">
          <button type="submit" :disabled="!meta.valid">Отправить</button>
          <button type="button" @click="closePopup">Закрыть</button>
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
  width: 550px;
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

.popup-rules {
  display: flex;
  align-items: center; /* В одну строку */
  gap: 0.5rem;
  margin: 1rem 0 1.5rem 0;
  font-weight: 400;
  cursor: pointer;
}

.error {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
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