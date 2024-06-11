import { createRouter, createWebHistory } from 'vue-router';
import Signup from '../components/Signup.vue';
import Login from '../components/Login.vue';
import HelloWorld from '../components/HelloWorld.vue';
import NotFound from '../components/404notfound.vue';
import DataManager from '../components/DataManager.vue'
import Form from '../components/Form.vue'

const isuserLoggedIn = true;

const routes = [
  { path: '/', component: HelloWorld, name: 'HelloWorld', meta: { needsAuth: true } },
  { path: '/login', component: Login, name: 'login' },
  { path: '/signup', component: Signup, name: 'signup' },
  { path: '/datamanager', component: DataManager, name: 'datamanager'},
  { path: '/form', component: Form, name: 'form' },
  { path: '/:pathName(.*)', component: NotFound, name: 'notfound' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.needsAuth) {
    if (isuserLoggedIn) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});

export default router;