// src/router/auth.js
import Login from '@/components/Login.vue';
import Signup from '@/components/Signup.vue';

export default [
  { path: '/', component: Login, name: 'login', meta: { hideSidebar: true } },
  { path: '/signup', component: Signup, name: 'signup', meta: { hideSidebar: true } },
];
