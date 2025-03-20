<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Logo from '@/assets/svg/logogo.svg'
import { useRouter } from 'vue-router'

const isAuthenticated = ref(false)
const router = useRouter()
const isDrawerOpen = ref(false)

// Check authentication
const checkAuth = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  isAuthenticated.value = !!user
}

onMounted(checkAuth)

const toggleDrawer = () => (isDrawerOpen.value = !isDrawerOpen.value)
const closeDrawer = () => (isDrawerOpen.value = false)

const handleLogoClick = () => {
  if (isAuthenticated.value) {
    router.push('/dashboard')
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <nav class="tw-bg-primary">
    <div class="tw-mx-auto tw-max-w-7xl tw-px-2 sm:tw-px-6 lg:tw-px-8">
      <div class="tw-flex tw-h-24 tw-items-center tw-justify-between">
        <!-- Logo -->
        <div
          class="tw-flex tw-flex-1 tw-items-center tw-justify-between md:tw-items-stretch md:tw-justify-start"
        >
          <div
            class="tw-flex tw-text-white tw-text-glow tw-items-center"
            @click="handleLogoClick"
            style="cursor: pointer"
          >
            <Logo />
          </div>
          <!-- Mobile Drawer Toggle -->
          <div
            class="tw-flex md:tw-hidden tw-items-center tw-gap-2 tw-bg-primary tw-py-2.5 tw-px-4"
          >
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
          </div>
        </div>

        <!-- Navigation Menu -->
        <div class="md:tw-flex tw-hidden tw-space-x-8 tw-text-white">
          <a
            href="https://www.mineco.gob.gt/"
            class="tw-font-medium tw-text-lg tw-text-white hover:tw-text-white"
          >
            Inicio
          </a>

          <a
            href="https://www.mineco.gob.gt/autoridades"
            class="tw-font-medium tw-text-lg tw-text-white hover:tw-text-white"
          >
            Autoridades
          </a>

          <a href="#" class="tw-font-medium tw-text-lg tw-text-white hover:tw-text-white">
            Institución
          </a>

          <a href="#" class="tw-font-medium tw-text-lg tw-text-white hover:tw-text-white">
            Información Pública
          </a>

          <a
            href="https://www.mineco.gob.gt/contactanos"
            class="tw-font-medium tw-text-lg tw-text-white hover:tw-text-white"
          >
            Contáctanos
          </a>
        </div>

        <!--  -->
        <!-- Mobile Drawer -->
        <div
          class="md:tw-hidden tw-fixed tw-z-50 tw-top-0 tw-left-0 tw-h-full tw-bg-primary tw-text-white tw-w-[280px] tw-transform tw-transition-transform"
          :class="{ 'tw-translate-x-0': isDrawerOpen, '-tw-translate-x-full': !isDrawerOpen }"
        >
          <div class="tw-flex tw-items-center tw-gap-3 tw-px-4 tw-mt-2 tw-mb-6">
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

          <!-- navigation -->
          <div class="tw-flex tw-flex-col tw-gap-4 tw-p-4">
            <a
              href="https://www.mineco.gob.gt/"
              class="tw-font-medium tw-text-lg tw-text-white hover:tw-text-white"
            >
              Inicio
            </a>

            <a
              href="https://www.mineco.gob.gt/autoridades"
              class="tw-font-medium tw-text-lg tw-text-white hover:tw-text-white"
            >
              Autoridades
            </a>

            <a href="#" class="tw-font-medium tw-text-lg tw-text-white hover:tw-text-white">
              Institución
            </a>

            <a href="#" class="tw-font-medium tw-text-lg tw-text-white hover:tw-text-white">
              Información Pública
            </a>

            <a
              href="https://www.mineco.gob.gt/contactanos"
              class="tw-font-medium tw-text-lg tw-text-white hover:tw-text-white"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
