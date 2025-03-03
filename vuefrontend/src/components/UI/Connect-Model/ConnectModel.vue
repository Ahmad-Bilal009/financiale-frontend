<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import contactInfoService from "@/services/contactInfoService";
import dashboardService from "@/services/dashboardService";

// Import Images
import websiteIcon from '../../../../public/webisteimage.png';
import whatsappIcon from '../../../../public/whatsappimage.png';
import phoneIcon from '../../../../public/phoneimage.avif';
import emailIcon from '../../../../public/emailimage.avif';

const toast = useToast();

// Props
defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

// Emits
const emit = defineEmits(["close"]);

// Reactive state for contact information
const contactInfo = ref({
  whatsapp: "",
  website: "",
  contact: "",
  email: "",
});

// State to control phone number visibility
const showPhoneNumber = ref(false);

// **Fetch Contact Info from API**
const fetchContactInfo = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
    if (!userId) {
      toast.error("User not logged in!");
      return;
    }
    const response = await contactInfoService.getContactInfo(userId);
    if (response) {
      contactInfo.value = response;
    }
  } catch (error) {
    console.error("Error fetching contact info:", error);
    toast.error("Failed to load contact information.");
  }
};

// **Track Click and Perform Action**
const handleClick = async (type: string, link: string) => {
  try {
    if (!link) {
      toast.error("This information is not provided!");
      return;
    }

    // Track Click in Dashboard
    await dashboardService.trackClick(type);

    // Perform Action
    if (type === "phone") {
      showPhoneNumber.value = !showPhoneNumber.value; // Toggle phone number visibility
    } else {
      window.open(type === "email" ? `mailto:${link}` : link, "_blank");
    }
  } catch (error) {
    console.error("Error tracking click:", error);
    toast.error("Failed to perform action.");
  }
};

// Fetch Contact Info on Component Mount
onMounted(fetchContactInfo);
</script>

<template>
  <div
    v-if="isOpen"
    class="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center"
  >
    <div
      class="tw-bg-white tw-p-6 tw-rounded-lg tw-w-[300px] sm:tw-w-[500px] tw-text-center"
    >
      <h2 class="tw-text-2xl tw-font-medium tw-text-[#070707] tw-mb-6">
        Contact Options
      </h2>

      <div class="tw-flex tw-justify-center tw-gap-6 tw-mt-8 tw-mb-8">
        <!-- WhatsApp -->
        <img
          :src="whatsappIcon"
          alt="WhatsApp"
          class="tw-w-[50px] tw-h-[50px] tw-bg-white tw-cursor-pointer"
          @click="handleClick('whatsapp', contactInfo.whatsapp)"
        />

        <!-- Website -->
        <img
          :src="websiteIcon"
          alt="Website"
          class="tw-w-[50px] tw-h-[50px] tw-cursor-pointer"
          @click="handleClick('website', contactInfo.website)"
        />

        <!-- Email -->
        <img
          :src="emailIcon"
          alt="Email"
          class="tw-w-[50px] tw-h-[50px] tw-cursor-pointer"
          @click="handleClick('email', contactInfo.email)"
        />

        <!-- Phone -->
        <img
          :src="phoneIcon"
          alt="Phone"
          class="tw-w-[50px] tw-h-[50px] tw-cursor-pointer"
          @click="handleClick('phone', contactInfo.contact)"
        />
      </div>

      <!-- Display Phone Number Only When Clicked -->
      <div v-if="showPhoneNumber" class="tw-text-lg tw-font-semibold tw-text-[#24B2E3]">
        📞 {{ contactInfo.contact || "Not Provided" }}
      </div>

      <!-- Close Button -->
      <button
        @click="emit('close')"
        class="tw-bg-[#ECECEC] tw-text-[#515151] tw-text-sm tw-min-w-[124px] tw-py-2 tw-rounded-md tw-mt-8"
      >
        Close
      </button>
    </div>
  </div>
</template>
