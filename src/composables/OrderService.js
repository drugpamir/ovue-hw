import {ref} from "vue"
import axios from "axios"
import {useRouter} from "vue-router";

export const error = ref(null)
export const loading = ref(true)

const api = axios.create({
    baseURL: 'https://httpbin.org',
    headers: {'Content-Type': 'application/json'},
});

export async function makeOrder(order) {
    try {
        loading.value = true
        error.value = null
        const {data} = await api.post("/post", order)
        console.log(data)
        const router = useRouter()
        router.push("/")
    } catch (err) {
        error.value = `Ошибка отправки заказа ${err.response?.status}`
    } finally {
        loading.value = false;
    }
}