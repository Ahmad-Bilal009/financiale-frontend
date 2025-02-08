<script setup lang="ts">
import SidebarComponent from '../components/layout/SidebarComponent.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="tw-flex tw-flex-col md:tw-flex-row">
    <SidebarComponent />
    <div class="tw-block md:tw-flex-1 tw-ml-0 md:tw-ml-64 tw-overflow-auto tw-px-6">
      <RouterView />
    </div>
  </div>
</template>
