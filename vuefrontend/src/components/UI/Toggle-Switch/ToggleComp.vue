<script setup lang="ts">
import { ref } from 'vue'

// State to track which button is active
const activeFilter = ref('all')

// Function to toggle the selected filter
const toggleFilter = (filter: string) => {
  activeFilter.value = filter
}
</script>

<template>
  <div class="tw-flex tw-gap-2 tw-justify-center tw-bg-white tw-rounded-[10px] tw-p-2">
    <!-- All Button -->
    <button
      :class="[
        'tw-text-base tw-font-medium tw-rounded-[6px] tw-capitalize tw-px-8 md:tw-px-5 tw-py-1',
        activeFilter === 'all' ? 'tw-bg-[#24B2E3] tw-text-white' : 'tw-bg-transparent tw-text-gray-400',
      ]"
      @click="toggleFilter('all')"
    >
      All
    </button>

    <!-- Approved Button -->
    <button
      :class="[
        'tw-text-base tw-font-medium tw-rounded-[6px] tw-capitalize tw-px-8 md:tw-px-5 tw-py-1',
        activeFilter === 'approved' ? 'tw-bg-[#24B2E3] tw-text-white' : 'tw-bg-transparent tw-text-gray-400',
      ]"
      @click="toggleFilter('approved')"
    >
      Approved
    </button>

    <!-- Rejected Button -->
    <button
      :class="[
        'tw-text-base tw-font-medium tw-rounded-[6px] tw-capitalize tw-px-8 md:tw-px-5 tw-py-1',
        activeFilter === 'rejected' ? 'tw-bg-[#24B2E3] tw-text-white' : 'tw-bg-transparent tw-text-gray-400',
      ]"
      @click="toggleFilter('rejected')"
    >
      Rejected
    </button>
  </div>
</template>
