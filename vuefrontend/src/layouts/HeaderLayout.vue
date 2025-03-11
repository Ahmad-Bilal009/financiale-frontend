<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
</script>

<template>
  <div>
    <HeaderComponent />
    <RouterView class="tw-mx-auto tw-max-w-7xl tw-px-2 tw-sm:tw-px-6 tw-lg:tw-px-8" />
  </div>
</template>

