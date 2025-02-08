<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Logo from '@/assets/svg/Logo.svg'
import Dashboard from '@/assets/svg/dashboard.svg'
import Products from '@/assets/svg/product.svg'
import Settings from '@/assets/svg/setting.svg'
import Logout from '@/assets/svg/logout.svg'
import Approval from '@/assets/svg/copy-success.svg'
import User from '@/assets/svg/profile.svg'
import Tag from '@/assets/svg/tag.svg'

// 1) Example: Keep track of the current user's role.
const userRole = ref<'admin' | 'superadmin' | 'user'>('admin') // or fetch from API, store, etc.

// 2) Extend routes with a 'roles' array specifying which roles can see it.
const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: Dashboard,
    roles: ['admin', 'superadmin', 'user'], // Everyone can see
  },
  {
    path: '/products',
    name: 'Products',
    icon: Products,
    roles: ['admin', 'superadmin', 'user'], // Only admin or superadmin can see
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: Settings,
    roles: ['admin', 'superadmin', 'user'],
  },
  {
    path: '/product-approval',
    name: 'Product Approvals',
    icon: Approval,
    roles: ['admin', 'superadmin', 'user'],
  },

  {
    path: '/manage-users',
    name: 'Manage Users',
    icon: User,
    roles: ['admin', 'superadmin', 'user'],
  },

  {
    path: '/super-admin-manage-users',
    name: 'Manage Users',
    icon: User,
    roles: ['admin', 'superadmin', 'user'],
  },

  {
    path: '/product-handling',
    name: 'Product Handling',
    icon: Tag,
    roles: ['admin', 'superadmin', 'user'],
  },
]

const currentRoute = useRoute()
const isDrawerOpen = ref(false)

// 3) Computed property to filter routes based on the user’s role:
const accessibleRoutes = computed(() => {
  return routes.filter((route) => route.roles.includes(userRole.value))
})

function toggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value
}

function closeDrawer() {
  isDrawerOpen.value = false
}

function isActiveRoute(routePath: string) {
  return currentRoute.path.startsWith(routePath)
}
</script>

<template>
  <nav
    class="tw-bg-primary tw-flex-col tw-h-[100vh] tw-text-white tw-w-64 tw-py-5 tw-hidden md:tw-flex tw-fixed"
  >
    <div class="tw-flex tw-items-center tw-gap-3 tw-px-6 tw-mb-[50px]">
      <RouterLink to="/" class="tw-flex tw-items-center tw-gap-3">
        <Logo />
        <span class="tw-text-xl tw-font-bold">Ministerio de</span>
      </RouterLink>
    </div>

    <!-- 4) Use accessibleRoutes in the v-for -->
    <div class="tw-flex-1 tw-pl-6 tw-overflow-auto">
      <div v-for="route in accessibleRoutes" :key="route.path" class="tw-relative">
        <RouterLink
          :to="route.path"
          class="tw-flex tw-text-glow tw-items-center tw-font-normal tw-text-base tw-gap-2 tw-p-2"
        >
          <component :is="route.icon" />
          <span>{{ route.name }}</span>
        </RouterLink>
        <div
          v-if="isActiveRoute(route.path)"
          class="tw-absolute tw-right-0 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-h-10 tw-w-[6.1px] tw-bg-white tw-rounded-l-full"
        ></div>
      </div>
    </div>

    <div class="tw-mt-auto tw-px-6">
      <RouterLink
        to="/login"
        class="tw-flex tw-items-center tw-text-glow tw-font-normal tw-text-base tw-gap-2 tw-p-2"
      >
        <Logout />
        <span class="">Logout</span>
      </RouterLink>
    </div>
  </nav>

  <!-- Drawer for smaller screens -->
  <div
    class="md:tw-hidden tw-fixed tw-top-0 tw-left-0 tw-h-full tw-bg-primary tw-text-white tw-w-[280px] tw-transform tw-transition-transform"
    :class="{ 'tw-translate-x-0': isDrawerOpen, '-tw-translate-x-full': !isDrawerOpen }"
  >
    <div class="tw-flex tw-items-center tw-gap-3 tw-px-4 tw-mt-2 tw-mb-6">
      <!-- Close button inside the drawer -->
      <button @click="toggleDrawer" class="tw-ml-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="tw-h-8 tw-w-8 tw-text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <RouterLink
      to="/dashboard"
      class="tw-flex tw-pl-6 tw-mb-4 tw-items-center tw-gap-3"
      @click="closeDrawer"
    >
      <span class="tw-text-xl tw-font-bold">Ministerio de</span>
    </RouterLink>

    <div class="tw-flex-1 tw-pl-6 tw-overflow-auto">
      <!-- Use the same accessibleRoutes for the mobile drawer -->
      <div v-for="route in accessibleRoutes" :key="route.path" class="tw-relative">
        <RouterLink
          :to="route.path"
          class="tw-flex tw-text-glow tw-items-center tw-font-normal tw-text-base tw-gap-2 tw-p-2"
          @click="closeDrawer"
        >
          <component :is="route.icon" />
          <span>{{ route.name }}</span>
        </RouterLink>
        <div
          v-if="isActiveRoute(route.path)"
          class="tw-absolute tw-right-0 tw-top-1/2 tw-transform -tw-translate-y-1/2 tw-h-10 tw-w-[6.1px] tw-bg-white tw-rounded-l-full"
        ></div>
      </div>
    </div>

    <div class="tw-mt-auto tw-px-6">
      <RouterLink
        to="/login"
        class="tw-flex tw-items-center tw-text-glow tw-font-normal tw-text-base tw-gap-2 tw-p-2"
        @click="closeDrawer"
      >
        <Logout />
        <span class="">Logout</span>
      </RouterLink>
    </div>
  </div>

  <!-- Hamburger icon for toggling the drawer -->
  <div class="tw-flex md:tw-hidden tw-items-center tw-gap-2 tw-bg-primary tw-py-2.5 tw-px-4">
    <button @click="toggleDrawer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="tw-h-8 tw-w-8 tw-text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>
    <span class="tw-text-xl tw-font-bold tw-text-white">Ministerio de</span>
  </div>
</template>
