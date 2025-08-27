import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/main.scss'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()



app.use(router)
app.use(pinia)
app.mount('#app')