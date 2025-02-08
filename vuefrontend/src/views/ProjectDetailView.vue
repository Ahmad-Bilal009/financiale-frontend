<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
const id = route.params.id
</script>

<template>
  <div class="tw-flex tw-flex-col tw-items-center tw-mt-4 tw-h-[calc(100vh-100px)]">
    <h1 class="tw-text-2xl tw-font-bold tw-mb-10">Project Detail {{ id }}</h1>
    <div class="tw-flex tw-gap-2">
      <RouterLink to="/" class="tw-bg-primary tw-text-white tw-px-4 tw-py-2 tw-rounded-md"
        >Home</RouterLink
      >
      <RouterLink to="/dashboard" class="tw-bg-primary tw-text-white tw-px-4 tw-py-2 tw-rounded-md"
        >Dashboard</RouterLink
      >
    </div>
  </div>
</template>
