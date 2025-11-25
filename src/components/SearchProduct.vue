<script setup>
import {ref} from "vue";

const productTitle = ref('')
const productMinPrice = ref(0)
const productMaxPrice = ref(1E100)

const emit = defineEmits(['onFilterChange'])

function searchProduct(productTitle, productMinPrice, productMaxPrice) {
  emit("onFilterChange", productTitle, productMinPrice, productMaxPrice);
}
</script>

<template>
  <input type="search" v-model="productTitle" @change="searchProduct" name="title" id="product-title-input"
         placeholder="Product name to search">
  <input type="number" v-model="productMinPrice" @change="searchProduct" name="min-price" id="product-min-price-input">
  <input type="number" v-model="productMaxPrice" @change="searchProduct" name="max-price" id="product-max-price-input">
</template>

<style scoped>

</style>