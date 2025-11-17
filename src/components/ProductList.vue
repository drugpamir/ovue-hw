<script setup>
import {onMounted, ref} from "vue";
import Product from "@/components/Product.vue";

const products = ref([]);
const error = ref(null);
const loading = ref(true);

async function fetchProducts() {
  loading.value = true;
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (response.ok) {
      products.value = await response.json();
    } else {
      error.value = `Ошибка загрузки продуктов (код ответа ${response.status})`;
    }
  } catch (err) {
    error.value = `Неизвестная ошибка при загрузке продуктов: ${err.message}`;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchProducts)
</script>

<template>
  <p v-if="loading">Загрузка продуктов...</p>
  <p v-if="error">Ошибка: {{ error }}</p>
  <div v-if="products.length" class="products-grid">
    <Product v-for="product in products" :key="product.id" v-bind="product"/>
  </div>
  <p v-else>Список продуктов пуст!</p>
</template>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  padding: 1rem;
}
</style>