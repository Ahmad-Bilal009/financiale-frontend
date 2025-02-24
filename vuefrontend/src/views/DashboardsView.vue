<script setup lang="ts">
import DashboardComponent from '@/components/Dashboard/DashboardComponent.vue'
import { ref } from 'vue'

// Fetch role from localStorage (fallback to 'user')
const user = localStorage.getItem('user');
const currentUserRole = ref(user ? JSON.parse(user).role : 'user');

// Ensure currentUserRole is a string
const userRole = currentUserRole.value || 'user';
</script>

<template>
  <DashboardComponent :userRole="userRole" />
</template>
