<script setup>
import {onMounted, ref} from "vue";
import Product from "@/components/Product.vue";
import SearchProduct from "@/components/SearchProduct.vue";
import {error, fetchProducts, loading, products} from "@/components/ProductService.js";

onMounted(fetchProducts)

const filteredProducts = ref(products.value)

function onSearchProduct(productTitle, productMinPrice, productMaxPrice) {
  filteredProducts.value = products.value.filter((p) =>
      (!productTitle.value.length || p.value === productTitle.value)
      && p.value > productMinPrice.value
      && p.value < productMaxPrice.value)
}
</script>

<template>
  <SearchProduct @searchProduct="onSearchProduct"/>
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