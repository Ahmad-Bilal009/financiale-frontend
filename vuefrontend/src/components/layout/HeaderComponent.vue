<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Logo from '@/assets/svg/Logogo.svg'
</script>

<template>
  <nav class="tw-bg-primary">
    <div class="tw-mx-auto tw-max-w-7xl tw-px-2 sm:tw-px-6 lg:tw-px-8">
      <div class="tw-flex tw-h-20 tw-items-center tw-justify-between">
        <div class="tw-flex tw-flex-1 tw-items-center tw-justify-center md:tw-items-stretch md:tw-justify-start">
          <!-- logo -->
          <RouterLink to="/dashboard" class="tw-flex tw-text-white tw-text-glow tw-items-center">
            <Logo  />
            
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>