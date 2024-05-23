import { createApp } from 'vue'
import './assets/index.css'
import App from './App.vue'
import router from './router'

createApp(App).mount('#app')
App.use(router)
