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

// Function to track visitors and fetch website stats
const trackVisitor = async () => {
  if (!sessionStorage.getItem("visited")) {
    sessionStorage.setItem("visited", "true");

    try {
      const response = await fetch("http://localhost:5001/api/visitorstats/visitor");
      const data = await response.json();
      console.log("Stats:", data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  } else {
    try {
      const response = await fetch("http://localhost:5001/api/visitorstats/visitor");
      const data = await response.json();
      console.log("Stats:", data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }
};



onMounted(() => {
  trackVisitor();
});
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>
