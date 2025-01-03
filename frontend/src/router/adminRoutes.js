export default [
    {
      path: '/admin-dashboard',
      name: 'AdminDashboard',
      component: () => import('@/views/AdminDashboard.vue'),
      meta: { requiresAuth: true, role: 'admin' },
    },
  ];