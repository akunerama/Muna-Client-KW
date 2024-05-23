import { createRouter, createWebHistory } from 'vue-router';
import Signup from './components/Signup.vue';
import Login from './components/Login.vue';
import HelloWorld from './components/HelloWorld.vue';

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