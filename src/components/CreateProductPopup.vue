<script setup>
import {ref} from "vue";
import * as yup from "yup";
import {ErrorMessage, Field, useForm} from "vee-validate";
import {createProduct} from "@/composables/ProductService.js";

const showPopup = ref(false)

const categories = ['unknown', 'beauty', 'fragrances', 'furniture', 'groceries']
const schema = yup.object({
  title: yup.string()
      .min(4, 'Название товара должно содержать минимум 4 символа')
      .required('Название товара обязательно'),
  price: yup.number()
      .min(0, 'Цена не может быть отрицательной')
      .max(100_000, 'Товар не может быть дороже 1 млн руб.')
      .required('Цена должна быть указана'),
  description: yup.string()
      .min(10, 'Описание должно содержать минимум 10 символов')
      .required('Описание товара обязательно'),
  category: yup.string()
      .lowercase()
      .oneOf(categories, `Варианты категорий: ${categories.join(', ')}`)
      .required(`Одна из категорий должна быть указана: ${categories.join(', ')}`)
})

const initialValues = {title: '', price: 0, description: '', category: 'unknown'}

const {handleSubmit, resetForm, meta} = useForm({
  validationSchema: schema,
  initialValues,
})

const onSubmit = handleSubmit(async (formValues) => {
  const createdProduct = await createProduct(formValues)
  console.log(`created product: ${createdProduct}`)
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
  <button @click="openPopup">Создать</button>

  <div v-if="showPopup" class="popup-overlay" @click.self="closePopup">
    <div class="popup-content">
      <h2 class="popup-header">Создание товара</h2>
      <form @submit="onSubmit">
        <label class="form-label">
          Название:
          <Field name="title" type="text"/>
          <ErrorMessage name="title" class="error"/>
        </label>

        <label class="form-label">
          Цена:
          <Field name="price" type="number"/>
          <ErrorMessage name="price" class="error"/>
        </label>

        <label class="form-label">
          Описание:
          <Field name="description" type="text"/>
          <ErrorMessage name="description" class="error"/>
        </label>

        <label class="form-label">
          Категория:
          <Field name="category" type="text"/>
          <ErrorMessage name="category" class="error"/>
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