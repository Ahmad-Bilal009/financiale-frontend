<script setup lang="ts">
import SidebarComponent from '../components/layout/SidebarComponent.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'

// ✅ Fetch user role from localStorage (fallback to 'user' if not logged in)
const currentUserRole = ref(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).role : 'user')
</script>

<template>
  <div class="tw-flex tw-flex-col md:tw-flex-row">
    <!-- ✅ Pass the userRole as a prop -->
    <SidebarComponent :userRole="currentUserRole" />

    <div class="tw-block md:tw-flex-1 tw-ml-0 md:tw-ml-64 tw-overflow-auto tw-px-6">
      <RouterView />
    </div>
  </div>
</template>
