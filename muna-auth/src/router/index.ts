import { createRouter, createWebHistory } from 'vue-router';
import Signup from '../components/Signup.vue';
import Login from '../components/Login.vue';
import HelloWorld from '../components/HelloWorld.vue';

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/login', component: Login, name:'login' },
  { path: '/signup', component: Signup, name:'signup'}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;