<script setup lang="ts">
import { defineProps, defineEmits, ref, computed } from 'vue'
import { useToast } from "vue-toastification";
import dashboardService from '@/services/dashboardService';

const toast = useToast();

// Props
const { isOpen } = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

// Emits
const emit = defineEmits(['close']);

// **Action State**
const selectedAction = ref("");
const inputValue = ref("");

// **Available Actions**
const actions = [
  { label: "Send Email", value: "email" },
  { label: "Visit Website", value: "website" },
  { label: "Send WhatsApp Message", value: "whatsapp" },
  { label: "Call Number", value: "call" },
];

// **Dynamically Set Placeholder and Input Type**
const inputPlaceholder = computed(() => {
  switch (selectedAction.value) {
    case "email":
      return "Enter Email Address";
    case "website":
      return "Enter Website URL";
    case "whatsapp":
      return "Enter WhatsApp Link";
    case "call":
      return "Enter Phone Number";
    default:
      return "Enter Details";
  }
});

// **Submit Action and Track Click Count**
const handleSubmit = async () => {
  if (!selectedAction.value || !inputValue.value) {
    toast.error("Please select an action and enter a value!");
    return;
  }

  try {
    // Track Click in Database for Dashboard Statistics
    await dashboardService.trackClick(selectedAction.value);

    // Perform Action (Redirect, Open Email, etc.)
    if (selectedAction.value === "email") {
      window.location.href = `mailto:${inputValue.value}`;
    } else if (selectedAction.value === "website") {
      window.open(inputValue.value, "_blank");
    } else if (selectedAction.value === "whatsapp") {
      window.open(inputValue.value, "_blank");
    } else if (selectedAction.value === "call") {
      window.location.href = `tel:${inputValue.value}`;
    }

    toast.success("Action performed successfully!");
    emit("close"); // Close Modal
  } catch (error) {
    console.error("❌ Error tracking click:", error);
    toast.error("Failed to perform action.");
  }
};

// **Close Modal**
const handleClose = () => {
  emit("close");
};
</script>

<template>
  <div
    v-if="isOpen"
    class="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center "
  >
    <div
      class="tw-bg-white tw-p-4 sm:tw-p-9 tw-rounded-lg tw-w-[300px] tw-min-h-[290px] sm:tw-w-[428px]"
    >
      <!-- Header -->
      <div class="tw-flex tw-justify-center tw-items-center tw-mb-6">
        <h2 class="tw-text-2xl tw-font-medium tw-text-[#070707]">Choose an Action</h2>
      </div>

      <!-- Action Selection -->
      <div class="tw-flex tw-flex-col tw-gap-4 tw-items-center tw-mb-[25px]">
        <label class="tw-font-medium">Select Action:</label>
        <select v-model="selectedAction" class="tw-w-full tw-p-2 tw-border tw-rounded">
          <option value="" disabled>Select Action</option>
          <option v-for="(action, index) in actions" :key="index" :value="action.value">
            {{ action.label }}
          </option>
        </select>

        <!-- Dynamic Input Field -->
        <input
          v-if="selectedAction"
          v-model="inputValue"
          :placeholder="inputPlaceholder"
          class="tw-w-full tw-p-2 tw-border tw-rounded"
        />
      </div>

      <!-- Buttons -->
      <div class="tw-flex tw-justify-center tw-gap-2">
        <button
          @click="handleClose"
          class="tw-bg-[#ECECEC] tw-text-[#515151] tw-text-sm tw-min-w-[124px] tw-py-2 tw-rounded-md"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          class="tw-bg-[#24B2E3] tw-text-white tw-text-sm tw-min-w-[124px] tw-py-2 tw-rounded-md"
        >
          Proceed
        </button>
      </div>
    </div>
  </div>
</template>
