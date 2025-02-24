<script setup lang="ts">
import SidebarComponent from '../components/layout/SidebarComponent.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'

//  Fetch user role from localStorage (fallback to 'user' if not logged in)
const user = localStorage.getItem('user');
const currentUserRole = ref(user ? JSON.parse(user).role : 'user');
const userRole = currentUserRole.value || 'user';
</script>

<template>
  <div class="tw-flex tw-flex-col md:tw-flex-row">
    <!--  Pass the userRole as a prop -->
    <SidebarComponent :userRole="currentUserRole" />

    <div class="tw-block md:tw-flex-1 tw-ml-0 md:tw-ml-64 tw-overflow-auto tw-px-6">
      <RouterView />
    </div>
  </div>
</template>
