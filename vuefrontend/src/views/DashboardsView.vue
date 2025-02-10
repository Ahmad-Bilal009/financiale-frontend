<script setup lang="ts">
import DashboardComponent from '@/components/Dashboard/DashboardComponent.vue'
import { ref } from 'vue'

// ✅ Fetch role from localStorage (fallback to 'user')
const currentUserRole = ref(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).role : 'user')
</script>

<template>
  <DashboardComponent :userRole="currentUserRole" />
</template>
