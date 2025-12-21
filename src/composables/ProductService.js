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

export async function createProduct(product) {
    loading.value = true;
    try {
        const response = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(product)
        });
        if (response.ok) {
            products.value = await response.json().then(p => [...products.value, p]);
        } else {
            error.value = `Ошибка создания продукта (код ответа ${response.status})`;
        }
    } catch (err) {
        error.value = `Неизвестная ошибка при создании продуктов: ${err.message}`;
    } finally {
        loading.value = false;
    }
}