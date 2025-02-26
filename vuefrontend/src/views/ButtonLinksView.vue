<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "vue-toastification";

const toast = useToast();

// Define reactive state for links
const links = ref({
  whatsapp: "",
  website: "",
  contact: "",
  otherLinks: [] as string[], // Store additional links
});

const newOtherLink = ref(""); // Store temporary input for other links

// Function to validate URLs
const isValidURL = (url: string) => {
  return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(url);
};

// Function to add other links
const addOtherLink = () => {
  if (!isValidURL(newOtherLink.value)) {
    toast.error("Invalid URL format. Please enter a valid link.");
    return;
  }
  links.value.otherLinks.push(newOtherLink.value);
  newOtherLink.value = ""; // Clear input after adding
};

// Function to remove a link from the otherLinks array
const removeOtherLink = (index: number) => {
  links.value.otherLinks.splice(index, 1);
};

</script>

<template>
  <div class="tw-p-6 tw-bg-white tw-shadow-md tw-rounded-lg">
    <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">Add Your Links</h2>

    <!-- WhatsApp Link -->
    <div class="tw-mb-4">
      <label class="tw-font-medium tw-text-gray-700">WhatsApp Link</label>
      <input
        v-model="links.whatsapp"
        type="text"
        placeholder="Enter WhatsApp link"
        class="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-mt-1"
      />
    </div>

    <!-- Website Link -->
    <div class="tw-mb-4">
      <label class="tw-font-medium tw-text-gray-700">Website Link</label>
      <input
        v-model="links.website"
        type="text"
        placeholder="Enter Website link"
        class="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-mt-1"
      />
    </div>

    <!-- Contact Link -->
    <div class="tw-mb-4">
      <label class="tw-font-medium tw-text-gray-700">Contact Link</label>
      <input
        v-model="links.contact"
        type="text"
        placeholder="Enter Contact link"
        class="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg tw-mt-1"
      />
    </div>

    <!-- Other Links -->
    <div class="tw-mb-4">
      <label class="tw-font-medium tw-text-gray-700">Email Links</label>
      <div class="tw-flex tw-gap-2">
        <input
          v-model="newOtherLink"
          type="text"
          placeholder="Enter other link"
          class="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg"
        />
      </div>
    </div>
  </div>
</template>
