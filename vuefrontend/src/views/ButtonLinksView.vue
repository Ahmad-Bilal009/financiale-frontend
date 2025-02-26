<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import contactInfoService from "@/services/contactInfoService"; // Import API service

const toast = useToast();
const isEditing = ref(false); // Track editing state
const user = JSON.parse(localStorage.getItem("user") || "{}"); // Get logged-in user
const userId = user?.id || null; // Extract userId

// **Reactive State for Contact Info**
const contactInfo = ref<{ whatsapp: string; website: string; contact: string; email: string }>({
  whatsapp: "",
  website: "",
  contact: "",
  email: "",
});

// **Validation Functions**
const isValidURL = (url: string) => /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(url);
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhoneNumber = (number: string) => /^\+?[0-9\s-]+$/.test(number);
const isValidWhatsAppGroup = (link: string) => link.includes("chat.whatsapp.com");

// **Function to Fetch Contact Info**
const fetchContactInfo = async () => {
  if (!userId) {
    toast.error("User not logged in!");
    return;
  }

  try {
    const response = await contactInfoService.getContactInfo(userId);
    if (response) {
      contactInfo.value = { ...response }; // Populate fields
    }
  } catch (error) {
    toast.error("Failed to load contact information.");
  }
};

// **Function to Save Contact Info**
const saveContactInfo = async () => {
  if (!userId) {
    toast.error("User not logged in!");
    return;
  }

  // **Validations**
  if (contactInfo.value.whatsapp && !isValidWhatsAppGroup(contactInfo.value.whatsapp)) {
    toast.error("Invalid WhatsApp group link.");
    return;
  }
  if (contactInfo.value.website && !isValidURL(contactInfo.value.website)) {
    toast.error("Invalid website URL.");
    return;
  }
  if (contactInfo.value.contact && !isValidPhoneNumber(contactInfo.value.contact)) {
    toast.error("Invalid contact number.");
    return;
  }
  if (contactInfo.value.email && !isValidEmail(contactInfo.value.email)) {
    toast.error("Invalid email address.");
    return;
  }

  try {
    await contactInfoService.updateContactInfo(userId, contactInfo.value);
    toast.success("Contact info updated successfully!");
    isEditing.value = false; // Exit edit mode
  } catch (error) {
    toast.error("Failed to save contact information.");
  }
};

// **Enable Editing Mode**
const enableEdit = () => {
  isEditing.value = true;
};

// **Cancel Editing Mode**
const cancelEdit = () => {
  isEditing.value = false;
  fetchContactInfo(); // Reset data
};

// **Fetch Data on Page Load**
onMounted(fetchContactInfo);
</script>

<template>
  <div class="tw-p-6 tw-bg-white tw-shadow-md tw-rounded-[20px] tw-mt-10">
    <h2 class="tw-text-2xl tw-font-semibold tw-mb-4">Contact Information</h2>

    <!-- Display Contact Info -->
    <div v-if="!isEditing">
      <div class="tw-mb-4">
        <label class="tw-font-medium tw-text-gray-700">WhatsApp Group:</label>
        <p class="tw-text-gray-900">{{ contactInfo.whatsapp || "Not Provided" }}</p>
      </div>

      <div class="tw-mb-4">
        <label class="tw-font-medium tw-text-gray-700">Website:</label>
        <p class="tw-text-gray-900">{{ contactInfo.website || "Not Provided" }}</p>
      </div>

      <div class="tw-mb-4">
        <label class="tw-font-medium tw-text-gray-700">Contact Number:</label>
        <p class="tw-text-gray-900">{{ contactInfo.contact || "Not Provided" }}</p>
      </div>

      <div class="tw-mb-4">
        <label class="tw-font-medium tw-text-gray-700">Email:</label>
        <p class="tw-text-gray-900">{{ contactInfo.email || "Not Provided" }}</p>
      </div>

      <!-- Edit Info Button -->
      <button @click="enableEdit" class="tw-bg-[#24B2E3] tw-text-white tw-font-semibold tw-py-2 tw-px-6 tw-rounded-lg">
        Edit Info
      </button>
    </div>

    <!-- Edit Contact Info Form -->
    <div v-else>
      <div class="tw-mb-4">
        <label class="tw-font-medium tw-text-gray-700">WhatsApp Group Link</label>
        <input v-model="contactInfo.whatsapp" type="text" class="tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-lg" />
      </div>

      <div class="tw-mb-4">
        <label class="tw-font-medium tw-text-gray-700">Website Link</label>
        <input v-model="contactInfo.website" type="text" class="tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-lg" />
      </div>

      <div class="tw-mb-4">
        <label class="tw-font-medium tw-text-gray-700">Contact Number</label>
        <input v-model="contactInfo.contact" type="text" class="tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-lg" />
      </div>

      <div class="tw-mb-4">
        <label class="tw-font-medium tw-text-gray-700">Email Address</label>
        <input v-model="contactInfo.email" type="text" class="tw-w-full tw-px-4 tw-py-2 tw-border tw-rounded-lg" />
      </div>

      <!-- Save and Cancel Buttons -->
      <div class="tw-flex tw-gap-4">
        <button @click="saveContactInfo" class="tw-bg-[#24B2E3] tw-text-white tw-font-semibold tw-py-2 tw-px-6 tw-rounded-lg">
          Save Info
        </button>
        <button @click="cancelEdit" class="tw-bg-gray-400 tw-text-white tw-font-semibold tw-py-2 tw-px-6 tw-rounded-lg">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
