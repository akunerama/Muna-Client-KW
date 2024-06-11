import { createRouter, createWebHistory } from 'vue-router';
// import authRoutes from './authRoutes';
import auth from './auth';
import main from './main';

const isuserLoggedIn = true;

const routes = [
  ...auth,
  ...main,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
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
