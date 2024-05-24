import { createRouter, createWebHistory } from 'vue-router';
import Signup from './Signup.vue';
import Login from './Login.vue';
import HelloWorld from './src/components/HelloWorld.vue';

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/login', component: Login, name:'login' },
  { path: '/signup', component: Signup, name:'signup'},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;