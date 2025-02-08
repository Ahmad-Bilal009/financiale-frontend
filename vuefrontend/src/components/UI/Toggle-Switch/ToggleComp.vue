<script setup lang="ts">
import { ref } from 'vue'

// State to manage which button is active
const isApproved = ref(true)

// Function to toggle the state
const toggleApproval = (state: boolean) => {
  isApproved.value = state
}
</script>

<template>
  <div class="tw-flex tw-gap-2 tw-bg-white tw-rounded-[10px] tw-p-2">
    <!-- Approved Button -->
    <button
      :class="[
        'tw-text-base tw-font-medium tw-rounded-[6px] tw-capitalize tw-px-5 tw-py-1',
        isApproved ? 'tw-bg-[#24B2E3] tw-text-white' : 'tw-bg-transparent tw-text-gray-400',
      ]"
      @click="toggleApproval(true)"
    >
      Approved
    </button>

    <!-- Rejected Button -->
    <button
      :class="[
        'tw-text-base tw-font-medium tw-rounded-[6px] tw-capitalize tw-px-5 tw-py-1',
        !isApproved ? 'tw-bg-[#24B2E3] tw-text-white' : 'tw-bg-transparent tw-text-gray-400',
      ]"
      @click="toggleApproval(false)"
    >
      Rejected
    </button>
  </div>
</template>
