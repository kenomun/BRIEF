import { createRouter, createWebHistory } from 'vue-router';
import AdminLayout from '../views/AdminLayout.vue';  // Importa tu Layout

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminLayout,  // Usa el Layout para envolver el contenido
    children: [
      {
        path: '',
        name: 'AdminDashboardContent',
        component: () => import('../views/adminViews/AdminDashboard.vue'),
      },
    ],
  },
  {
    path: '/student-dashboard',
    name: 'StudentDashboard',
    component: AdminLayout,  // Usa el Layout para envolver el contenido
    children: [
      {
        path: '',
        name: 'StudentDashboardContent',
        component: () => import('../views/StudentViews/StudentDashboard.vue'),
      },
    ],
  },
  {
    path: '/users',
    name: 'Users',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'UsersList',
        component: () => import('../views/adminViews/UsersView.vue'),
      },
    ],
  },
  {
    path: '/subjects',
    name: 'Subjects',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'SubjectsList',
        component: () => import('../views/adminViews/SubjectsView.vue'),
      },
    ],
  },
  {
    path: '/admins',
    name: 'Admins',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'AdminsList',
        component: () => import('../views/adminViews/UserAdminView.vue'),
      },
    ],
  },
  {
    path: '/professors',
    name: 'Professors',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'ProfesorsList',
        component: () => import('../views/adminViews/ProfessorAdminView.vue'),
      },
    ],
  },
  {
    path: '/students',
    name: 'Students',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'StudentsList',
        component: () => import('../views/adminViews/StudentAdminView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
