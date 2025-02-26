<script setup lang="ts">
import { RouterView } from 'vue-router';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DefaultLayout from './layouts/DefaultLayout.vue';
import DashboardLayout from './layouts/DashboardLayout.vue';
import HeaderLayout from './layouts/HeaderLayout.vue';

const router = useRouter();

// Determine layout based on route metadata
const layout = computed(() => {
  const route = router.currentRoute.value;
  if (route.meta.layout === 'DefaultLayout') {
    return DefaultLayout;
  } else if (route.meta.layout === 'HeaderLayout') {
    return HeaderLayout;
  } else {
    return DashboardLayout;
  }
});


</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
