<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

// **Props to receive active state from parent**
const props = defineProps({
  activeFilter: Boolean
});

// **Emit event to parent**
const emit = defineEmits(["update:activeFilter"]);

// **Function to toggle setting state**
const toggleSetting = (state: boolean) => {
  emit("update:activeFilter", state); // Emit event with updated state
};
</script>

<template>
  <div class="tw-flex tw-gap-2 tw-bg-white tw-rounded-[10px] tw-p-2">
    <!-- Change Password Button -->
    <button
      :class="[
        'tw-text-base tw-font-medium tw-rounded-[6px] tw-capitalize tw-px-5 tw-py-1',
        activeFilter ? 'tw-bg-[#24B2E3] tw-text-white' : 'tw-bg-transparent tw-text-gray-400',
      ]"
      @click="toggleSetting(true)"
    >
      Change Password
    </button>

    <!-- Button Links -->
    <button
      :class="[
        'tw-text-base tw-font-medium tw-rounded-[6px] tw-capitalize tw-px-5 tw-py-1',
        !activeFilter ? 'tw-bg-[#24B2E3] tw-text-white' : 'tw-bg-transparent tw-text-gray-400',
      ]"
      @click="toggleSetting(false)"
    >
      Button Links
    </button>
  </div>
</template>
