import {ref} from "vue";

export const products = ref([])

export const error = ref(null);
export const loading = ref(true);

export async function fetchProducts() {
    loading.value = true;
    try {
        // const response = await fetch('https://fakestoreapi.com/products');
        const response = await fetch('https://dummyjson.com/products');
        if (response.ok) {
            products.value = await response.json().then(p => p.products ?? p);
        } else {
            error.value = `Ошибка загрузки продуктов (код ответа ${response.status})`;
        }
    } catch (err) {
        error.value = `Неизвестная ошибка при загрузке продуктов: ${err.message}`;
    } finally {
        loading.value = false;
    }
}