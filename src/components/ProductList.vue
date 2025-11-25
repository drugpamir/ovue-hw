<script setup>
import {onMounted} from "vue";
import Product from "@/components/Product.vue";
import {error, fetchProducts, loading, products} from "@/components/ProductService.js";

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