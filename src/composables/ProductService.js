import {ref} from "vue";
import axios from "axios";

export const products = ref([])

export const error = ref(null);
export const loading = ref(true);

const api = axios.create({
    baseURL: 'https://dummyjson.com', //'https://fakestoreapi.com'
    headers: { 'Content-Type': 'application/json' }
});

export async function fetchProducts() {
    try {
        loading.value = true;
        error.value = null
        const { data } = await api.get("/products")
        products.value = data.products || []
    } catch (err) {
        error.value = `Ошибка загрузки продуктов ${err.response?.status}`;
    } finally {
        loading.value = false;
    }
}

export async function createProduct(product) {
    try {
        loading.value = true;
        error.value = null
        const { data } = await api.put("/products/add", product);
        products.value = [...products.value, data];
    } catch (err) {
        error.value = `Ошибка создания продукта ${err.response?.status}`;
    } finally {
        loading.value = false;
    }
}