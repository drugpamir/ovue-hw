<script setup>
import {onMounted, ref} from "vue";
import Product from "@/components/Product.vue";

const products = ref([]);       // массив продуктов
const error = ref(null);        // для ошибок
const loading = ref(true);      // индикатор загрузки

async function fetchProducts() {
  loading.value = true;
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    products.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchProducts)
</script>

<template>
  <p v-if="loading">Загрузка продуктов...</p>
  <p v-if="error">Ошибка: {{ error }}</p>
  <div class="products-grid">
    <Product v-for="product in products" :key="product.id" v-bind="product" />
  </div>
</template>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  padding: 1rem;
}
</style>