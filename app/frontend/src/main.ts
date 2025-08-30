import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/main.scss'
import router from './router'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(Toast, {
    maxToasts: 8,
    timeout: 2174,
    position: "top-right",
});

app.use(router)
app.use(pinia)
app.mount('#app')