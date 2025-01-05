import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "../views/AdminLayout.vue";
import StudentLayout from "../views/StudentLayout.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
  {
    path: "/admin-dashboard",
    name: "AdminDashboard",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "AdminDashboardContent",
        component: () => import("../views/adminViews/AdminDashboard.vue"),
      },
    ],
  },
  {
    path: "/users",
    name: "Users",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "UsersList",
        component: () => import("../views/adminViews/UsersView.vue"),
      },
    ],
  },
  {
    path: "/test",
    name: "Test",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "TestSubjectsList",
        component: () => import("../views/adminViews/TestView.vue"),
      },
    ],
  },
  {
    path: "/admins",
    name: "Admins",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "AdminsList",
        component: () => import("../views/adminViews/UserAdminView.vue"),
      },
    ],
  },
  {
    path: "/professors",
    name: "Professors",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "ProfesorsList",
        component: () => import("../views/adminViews/ProfessorAdminView.vue"),
      },
    ],
  },
  {
    path: "/students",
    name: "Students",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "StudentsList",
        component: () => import("../views/adminViews/StudentAdminView.vue"),
      },
    ],
  },

  {
    path: "/test/:id",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "testDetail",
        component: () => import("../views/adminViews/TestDetailView.vue"),
        props: true,
        key: (route) => route.params.id,
      },
    ],
  },
  {
    path: "/reports",
    name: "reports",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "reportsList",
        component: () => import("../views/adminViews/reportListView.vue"),
      },
    ],
  },

  {
    path: "/student-dashboard",
    name: "StudentDashboard",
    component: StudentLayout,
    children: [
      {
        path: "",
        name: "StudentDashboardContent",
        component: () => import("../views/StudentViews/StudentDashboard.vue"),
      },
    ],
  },
  {
    path: "/subjects",
    name: "SubjectList",
    component: StudentLayout,
    children: [
      {
        path: "",
        name: "SubjectContent",
        component: () => import("../views/StudentViews/Subject.vue"),
      },
    ],
  },
  {
    path: "/subjects",
    name: "SubjectList",
    component: StudentLayout,
    children: [
      {
        path: "",
        name: "SubjectContent",
        component: () => import("../views/StudentViews/Subject.vue"),
      },
    ],
  },
  {
    path: "/subjectTest/:subjectId",
    name: "SubjectTest",
    component: StudentLayout,
    children: [
      {
        path: "",
        name: "subjectTestContent",
        component: () => import("../views/StudentViews/SubjectTest.vue"),
        props: true,
        key: (route) => route.params.id,
      },
    ],
  },
  {
    path: "/exam/:examId",
    name: "Exam",
    component: StudentLayout,
    children: [
      {
        path: "",
        name: "Examresponse",
        component: () => import("../views/StudentViews/ExamView.vue"),
        props: true,
        key: (route) => route.params.id,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
