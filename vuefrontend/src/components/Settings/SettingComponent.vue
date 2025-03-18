<script setup lang="ts">
import { ref } from "vue";
import SettingToggle from "@/components/UI/Toggle-Switch/SettingToggle.vue";
import ButtonLinksView from "@/views/ButtonLinksView.vue";
import ChnagePasswordView from "@/views/ChnagePasswordView.vue";

// **Reactive state to track toggle status**
const activeFilter = ref(true); // Default: Show "Change Password View"

// **Function to handle toggle status change**
const handleToggleChange = (status: boolean) => {
  activeFilter.value = status;
  console.log("Toggle Changed:", status); // Debugging
};
</script>

<template>
  <div class="tw-p-6">
    <div class="tw-flex tw-justify-between">
      <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">Configuración</h2>

      <!-- Toggle Component (Switch between Change Password & Button Links) -->
      <SettingToggle :activeFilter="activeFilter" @update:activeFilter="handleToggleChange" />
    </div>

    <!-- Conditionally render views -->
    <div v-if="activeFilter">
      <ChnagePasswordView />
    </div>
    <div v-else>
      <ButtonLinksView />
    </div>
  </div>
</template>
