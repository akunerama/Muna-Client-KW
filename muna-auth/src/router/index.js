import { createRouter, createWebHistory } from 'vue-router';
import Signup from './src/components/Signup.vue';
import Login from './src/components/Login.vue';
import HelloWorld from './src/components/HelloWorld.vue';
import axios from 'axios';

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;