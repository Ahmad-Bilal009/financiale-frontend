<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Logo from '@/assets/svg/logogo.svg'
import { useRouter } from 'vue-router'

const isAuthenticated = ref(false)
const router = useRouter();

// Check authentication
const checkAuth = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  isAuthenticated.value = !!user
}

onMounted(checkAuth)

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
        <div class="tw-flex tw-flex-1 tw-items-center tw-justify-center md:tw-items-stretch md:tw-justify-start">
          <div class="tw-flex tw-text-white tw-text-glow tw-items-center" @click="handleLogoClick" style="cursor: pointer;">
            <Logo />
          </div>
        </div>

        <!-- Navigation Menu -->
        <div class="tw-hidden md:tw-flex tw-space-x-8 tw-text-white">
          <a href="https://www.mineco.gob.gt/" class="tw-font-medium tw-text-lg tw-text-white hover:tw-text-white">
            Inicio
          </a>

          <a href="https://www.mineco.gob.gt/autoridades" class="tw-font-medium tw-text-lg tw-text-white hover:tw-text-white">
            Autoridades
          </a>

          <a href="#" class="tw-font-medium tw-text-lg tw-text-white hover:tw-text-white">
            Institución
          </a>

          <a href="#" class="tw-font-medium tw-text-lg tw-text-white hover:tw-text-white">
            Información Pública
          </a>

          <a href="https://www.mineco.gob.gt/contactanos" class="tw-font-medium tw-text-lg tw-text-white hover:tw-text-white">
            Contáctanos
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
