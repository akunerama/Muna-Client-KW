import Home from '@/views/Home.vue';
import Dashboard from '@/views/Dashboard.vue';
import DataManager from '@/views/DataManager.vue';
import Report from '@/views/Report.vue';
import Schedule from '@/views/Schedule.vue';
import Form from '@/views/Form.vue';
import NotFound from '@/components/404notfound.vue';
import DataSchedule from '@/views/DataSchedule.vue';

export default [
  { path: '/home', component: Home, name: 'home', meta: { needsAuth: true } },
  { path: '/dashboard', component: Dashboard, name: 'dashboard', meta: { needsAuth: true } },
  { path: '/dataschedule', component: DataSchedule, name: 'dataschedule', meta: { needsAuth: true } },
  { path: '/datamanager', component: DataManager, name: 'datamanager', meta: { needsAuth: true } },
  { path: '/schedule', component: Schedule, name: 'schedule', meta: { needsAuth: true } },
  { path: '/report', component: Report, name: 'report', meta: { needsAuth: true } },
  { path: '/form', component: Form, name: 'form', meta: { needsAuth: true } },
  { path: '/:pathMatch(.*)*', component: NotFound, name: 'notfound',  meta: { hideSidebar: true } },
];
