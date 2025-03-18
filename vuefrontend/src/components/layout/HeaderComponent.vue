<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Logo from '@/assets/svg/logogo.svg'

const isAuthenticated = ref(false)
const activeLink = ref('Inicio') // Default active link

// Check authentication
const checkAuth = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  isAuthenticated.value = !!user
}

onMounted(checkAuth)

const handleLogoClick = () => {
  if (isAuthenticated.value) {
    window.location.href = '/dashboard'
  } else {
    window.location.href = '/login'
  }
}

// Set the active link when clicked
const setActiveLink = (link: string) => {
  activeLink.value = link
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
          <a
            href="https://www.mineco.gob.gt/"
            @click.prevent="setActiveLink('Inicio')"
            :class="[
              'tw-font-medium tw-text-lg tw-relative tw-pb-2',
              activeLink === 'Inicio' ? 'tw-text-white' : 'tw-text-white hover:tw-text-white'
            ]"
          >
            Inicio
            <span v-if="activeLink === 'Inicio'" class="tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-[3px] tw-bg-blue-500 tw-rounded-md"></span>
          </a>

          <a
            href="https://www.mineco.gob.gt/autoridades"
            @click.prevent="setActiveLink('Autoridades')"
            :class="[
              'tw-font-medium tw-text-lg tw-relative tw-pb-2',
              activeLink === 'Autoridades' ? 'tw-text-white' : 'tw-text-white hover:tw-text-white'
            ]"
          >
            Autoridades
            <span v-if="activeLink === 'Autoridades'" class="tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-[3px] tw-bg-blue-500 tw-rounded-md"></span>
          </a>

          <a
            href="#"
            @click.prevent="setActiveLink('Institución')"
            :class="[
              'tw-font-medium tw-text-lg tw-relative tw-pb-2',
              activeLink === 'Institución' ? 'tw-text-white' : 'tw-text-white hover:tw-text-white'
            ]"
          >
            Institución
            <span v-if="activeLink === 'Institución'" class="tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-[3px] tw-bg-blue-500 tw-rounded-md"></span>
          </a>

          <a
            href="#"
            @click.prevent="setActiveLink('Información Pública')"
            :class="[
              'tw-font-medium tw-text-lg tw-relative tw-pb-2',
              activeLink === 'Información Pública' ? 'tw-text-white' : 'tw-text-white hover:tw-text-white'
            ]"
          >
            Información Pública
            <span v-if="activeLink === 'Información Pública'" class="tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-[3px] tw-bg-blue-500 tw-rounded-md"></span>
          </a>

          <a
            href="https://www.mineco.gob.gt/contactanos"
            @click.prevent="setActiveLink('Contáctanos')"
            :class="[
              'tw-font-medium tw-text-lg tw-relative tw-pb-2',
              activeLink === 'Contáctanos' ? 'tw-text-white' : 'tw-text-white hover:tw-text-white'
            ]"
          >
            Contáctanos
            <span v-if="activeLink === 'Contáctanos'" class="tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-[3px] tw-bg-blue-500 tw-rounded-md"></span>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>
