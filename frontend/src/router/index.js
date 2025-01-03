import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: () => import('@/views/AdminDashboard.vue'),
    // meta: { requiresAuth: true, role: 'admin' },
  }



];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;