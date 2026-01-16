<script setup>
import {computed, onMounted, reactive} from "vue";
import Product from "@/components/Product.vue";
import SearchProduct from "@/components/SearchProduct.vue";
import {createProduct, error, fetchProducts, loading, products} from "@/composables/ProductService.js";
import MakeOrderPopup from "@/components/MakeOrderPopup.vue";
import CreateProductPopup from "@/components/CreateProductPopup.vue";

onMounted(fetchProducts)

const filters = reactive({
  productTitle: '',
  productMinPrice: 0,
  productMaxPrice: 100000
})

function onSearchProduct({title, minPrice, maxPrice}) {
  filters.productTitle = title
  filters.productMinPrice = minPrice
  filters.productMaxPrice = maxPrice
}

const filteredProducts = computed(() => {
  if (!products.value.length) {
    return []
  }
  return products.value.filter((p) =>
      (!filters.productTitle || p.title.toLowerCase().includes(filters.productTitle.toLowerCase())) &&
      (p.price >= filters.productMinPrice) &&
      (p.price <= filters.productMaxPrice)
  )
})

async function onProductCreated(ev) {
  const createdProduct = await createProduct(ev)
  console.log(`created product: ${createdProduct}`)
}
</script>

<template>
  <SearchProduct @onFilterChange="onSearchProduct"/>
  <MakeOrderPopup/>
  <CreateProductPopup @createProduct="onProductCreated($event)"/>
  <p v-if="loading">Загрузка продуктов...</p>
  <p v-if="error">Ошибка: {{ error }}</p>
  <div v-if="filteredProducts.length" class="products-grid">
    <Product v-for="product in filteredProducts" :key="product.id" v-bind="product"/>
  </div>
  <p v-else-if="!loading">Список продуктов пуст!</p>
</template>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  padding: 1rem;
}
</style>