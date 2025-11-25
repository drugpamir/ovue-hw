<script setup>
import {computed} from "vue";

const props = defineProps({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
})

const priceRounded = computed(() => props.price.toFixed(2))
</script>

<template>
  <div class="product-card">
    <div class="product-info">
      <h3 class="product-title">{{ title }}</h3>
      <p class="product-category">{{ category }}</p>
      <p class="product-price">{{ priceRounded }}₽</p>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
  transition: box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 1rem;
}

.product-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #222;
  text-align: center;
  margin: 0;
}

.product-category {
  font-size: 0.9rem;
  color: #888;
  margin: 0;
  text-transform: capitalize;
  text-align: center;
}

.product-price {
  font-size: 1.2rem;
  font-weight: 700;
  color: #148;
  text-align: center;
  margin-top: 0.5rem;
}
</style>