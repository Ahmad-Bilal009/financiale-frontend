<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Logo from '@/assets/svg/logogo.svg'
import Dashboard from '@/assets/svg/dashboard.svg'
import Products from '@/assets/svg/product.svg'
import Settings from '@/assets/svg/setting.svg'
import Logout from '@/assets/svg/logout.svg'
import Approval from '@/assets/svg/copy-success.svg'
import User from '@/assets/svg/profile.svg'
import Tag from '@/assets/svg/tag.svg'

// 🎯 Accept `userRole` as a prop, default to 'user'
const props = defineProps({
  userRole: {
    type: String,
    default: 'user',
  },
})

const currentRoute = useRoute()
const isDrawerOpen = ref(false)

// 📌 Define routes with role-based access control
const routes = [
  { path: '/dashboard', name: 'Panel de Control', icon: Dashboard, roles: ['admin', 'user'] },
  { path: '/products', name: 'Productos', icon: Products, roles: ['user'] },
  { path: '/settings', name: 'Configuraciones', icon: Settings, roles: ['user'] },
  { path: '/product-approval', name: 'Manejo de Productos', icon: Approval, roles: ['admin'] },
  { path: '/manage-users', name: 'Gestionar Usuarios', icon: User, roles: ['admin'] },
  { path: '/super-admin-manage-users', name: 'Gestionar Usuarios', icon: User, roles: ['superadmin'] },
  { path: '/organization-stats', name: 'Organization Stats', icon: Settings, roles: ['admin'] },
]

// 🔥 Filter routes dynamically based on user role
const accessibleRoutes = computed(() => {
  return routes.filter((route) => route.roles?.includes(props.userRole))
})

// 🔄 Navigation controls
const toggleDrawer = () => (isDrawerOpen.value = !isDrawerOpen.value)
const closeDrawer = () => (isDrawerOpen.value = false)
const isActiveRoute = (routePath: string) => currentRoute.path.startsWith(routePath)
</script>

<template>
  <div>
    <nav class="tw-bg-primary tw-z-[20] tw-flex-col tw-h-[100vh] tw-text-white tw-w-64 tw-py-5 tw-hidden md:tw-flex tw-fixed">
      <div class="tw-flex tw-items-center tw-gap-3 tw-px-6 tw-mb-[50px]">
        <RouterLink to="/" class="tw-flex tw-items-center tw-gap-3">
          <Logo class="tw-w-40 tw-h-20" />
        </RouterLink>
      </div>

      <div class="tw-flex-1 tw-pl-6 tw-overflow-auto">
        <template v-if="accessibleRoutes.length">
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
        </template>
        <div v-else class="tw-text-center tw-text-gray-300 tw-py-4">No hay rutas accesibles</div>
      </div>

      <div class="tw-mt-auto tw-px-6">
        <RouterLink to="/login" class="tw-flex tw-items-center tw-text-glow tw-font-normal tw-text-base tw-gap-2 tw-p-2">
          <Logout />
          <span>Cerrar sesión</span>
        </RouterLink>
      </div>
    </nav>

    <!-- Mobile Drawer -->
    <div
      class="md:tw-hidden tw-fixed tw-z-50 tw-top-0 tw-left-0 tw-h-full tw-bg-primary tw-text-white tw-w-[280px] tw-transform tw-transition-transform"
      :class="{ 'tw-translate-x-0': isDrawerOpen, '-tw-translate-x-full': !isDrawerOpen }"
    >
      <div class="tw-flex tw-items-center tw-gap-3 tw-px-4 tw-mt-2 tw-mb-6">
        <button @click="toggleDrawer" class="tw-ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-8 tw-w-8 tw-text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <RouterLink to="/dashboard" class="tw-flex tw-pl-6 tw-mb-4 tw-items-center tw-gap-3" @click="closeDrawer">
        <span class="tw-text-xl tw-font-bold">Ministerio de</span>
      </RouterLink>

      <div class="tw-flex-1 tw-pl-6 tw-overflow-auto">
        <template v-if="accessibleRoutes.length">
          <div v-for="route in accessibleRoutes" :key="route.path" class="tw-relative">
            <RouterLink
              :to="route.path"
              class="tw-flex tw-text-glow tw-items-center tw-font-normal tw-text-base tw-gap-2 tw-p-2"
              @click="closeDrawer"
            >
              <component :is="route.icon" />
              <span>{{ route.name }}</span>
            </RouterLink>
          </div>
        </template>
        <div v-else class="tw-text-center tw-text-gray-300 tw-py-4">No hay rutas accesibles</div>
      </div>

      <div class="tw-mt-auto tw-px-6">
        <RouterLink to="/login" class="tw-flex tw-items-center tw-text-glow tw-font-normal tw-text-base tw-gap-2 tw-p-2" @click="closeDrawer">
          <Logout />
          <span>Cerrar sesión</span>
        </RouterLink>
      </div>
    </div>

    <!-- Mobile Drawer Toggle -->
    <div class="tw-flex md:tw-hidden  tw-items-center tw-gap-2 tw-bg-primary tw-py-2.5 tw-px-4">
      <button @click="toggleDrawer">
        <svg xmlns="http://www.w3.org/2000/svg" class="tw-h-8 tw-w-8 tw-text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
  </div>
</template>
