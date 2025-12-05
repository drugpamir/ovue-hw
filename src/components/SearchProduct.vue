<script setup>
import {ref, watch} from "vue";

const productTitle = ref('')
const productMinPrice = ref(0)
const productMaxPrice = ref(1E5)

const emit = defineEmits(['onFilterChange'])

watch(
    [productTitle, productMinPrice, productMaxPrice],
    ([title, minPrice, maxPrice]) => emit("onFilterChange", {title, minPrice, maxPrice}),
    {
      immediate: true,
    }
)
</script>

<template>
  <input type="search" v-model="productTitle"
         name="title" id="product-title-input"
         placeholder="Product name to search"
  >
  <input type="number" v-model="productMinPrice" min="0" max="10000"
         name="min-price" id="product-min-price-input"
  >
  <input type="number" v-model="productMaxPrice"
         name="max-price" id="product-max-price-input"
  >
</template>

<style scoped>

</style>