import { createApp } from 'vue'
import './assets/index.css'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'



const app = createApp(App)
app.use(router)
app.mount('#app')
app.use(VueQueryPlugin)