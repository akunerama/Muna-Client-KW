import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import DataManager from './../views/DataManager.vue'
import Report from './../views/Report.vue'


const router = createRouter({
    history: createWebHistory(),
        routes: [
            {
                path: '/',
                component: Home
            },
            {
                path: '/dashboard',
                component: Dashboard
            },
            {
                path: '/datamanager',
                component: DataManager
            },
            {
                path: '/report',
                component: Report
            },
        ]
})

export default router