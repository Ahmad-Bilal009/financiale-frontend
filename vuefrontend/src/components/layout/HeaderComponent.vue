<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import Logo from '@/assets/svg/logogo.svg'


const router = useRouter()
const isAuthenticated = ref(false)


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
      <div class="tw-flex tw-h-20 tw-items-center tw-justify-between">
        <div class="tw-flex tw-flex-1 tw-items-center tw-justify-center md:tw-items-stretch md:tw-justify-start">
          <div class="tw-flex tw-text-white tw-text-glow tw-items-center" @click="handleLogoClick" style="cursor: pointer;">
            <Logo />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
