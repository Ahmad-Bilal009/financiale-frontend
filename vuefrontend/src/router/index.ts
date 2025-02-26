import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        layout: 'HeaderLayout',
      },
    },
    {
      path: '/project-detail/:id',
      name: 'project-detail',
      component: () => import('../views/ProjectDetailView.vue'),
      meta: {
        layout: 'HeaderLayout',
      },
    },
    {
      path: "/CardInfo/:id",
      name: 'info',
      component: () => import('../views/CompanyInfo.vue'),
      meta: {
        layout: 'HeaderLayout',
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardsView.vue'),
      meta: {
        layout: 'DashboardLayout',
      },
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductPage/ProductsView.vue'),
      meta: {
        layout: 'DashboardLayout',
      },
    },
    {
      path: '/products/view/:id',
      name: 'product-detail',
      component: () => import('../views/ProductPage/ProductDetailDashboard.vue'),
      meta: {
        layout: 'DashboardLayout',
      },
    },
    {
      path: '/products/add',
      name: 'product-add',
      component: () => import('../views/ProductPage/ProductAddView.vue'),
      meta: {
        layout: 'DashboardLayout',
      },
    },
    {
      path: '/products/edit/:id',
      name: 'product-edit',
      component: () => import('../views/ProductPage/ProductEditDashboard.vue'),
      meta: {
        layout: 'DashboardLayout',
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../components/Settings/SettingComponent.vue'),
      meta: {
        layout: 'DashboardLayout',
      },
    },
    {
      path: '/product-approval',
      name: 'product-approval',
      component: () => import('../views/ProductPage/ProductApprovalView.vue'),
      meta: {
        layout: 'DashboardLayout',
      },
    },
    {
      path: '/manage-users',
      name: 'manage-users',
      component: () => import('../views/ManageUser/ManageUserView.vue'),
      meta: {
        layout: 'DashboardLayout',
      },
    },
    {
      path: '/super-admin-manage-users',
      name: 'super-admin-manage-users',
      component: () => import('../components/SuperAdmin/ManageUserComp.vue'),
      meta: {
        layout: 'DashboardLayout',
      },
    },
    {
      path: '/product-handling',
      name: 'product-handling',
      component: () => import('../components/HandlingProduct/HandlingComp.vue'),
      meta: {
        layout: 'DashboardLayout',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        layout: 'DefaultLayout',
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue'),
      meta: {
        layout: 'DefaultLayout',
      },
    },
  ],
})

export default router
