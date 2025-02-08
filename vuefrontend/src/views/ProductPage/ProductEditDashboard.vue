<script setup lang="ts">
import { ref } from "vue";

// Form Data
const formData = ref({
  title: "Sample Product Title",
  description: "Sample description about the product.",
  productInfo: "Detailed information about the product goes here.",
  productType: "Credit",
  creditGuarantees: ["Trust", "Mortgage"],
  entrepreneurshipStage: "Startup",
  creditObjective: "Working Capital",
  benefits: "Provides financial support to MSMEs.",
  geographicCoverage: ["USA", "Canada"],
  requirements: "Sample requirements for the product.",
  contactName: "John Doe",
  phone: "+123456789",
  email: "john.doe@example.com",
  address: "123 Business Street, City, Country",
});

// Inputs for adding tags
const creditGuaranteeInput = ref("");
const geographicCoverageInput = ref("");

// Add tag function
const addTag = (list: string[], input: string) => {
  if (input.trim() !== "") {
    list.push(input.trim());
    if (list === formData.value.creditGuarantees) creditGuaranteeInput.value = "";
    else geographicCoverageInput.value = "";
  }
};

// Remove tag function
const removeTag = (list: string[], index: number) => {
  list.splice(index, 1);
};

// Save changes function (placeholder for API integration)
const saveChanges = () => {
  console.log("Saved Data:", formData.value);
  alert("Changes saved successfully!");
};
</script>

<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-mt-8 tw-h-[calc(100vh-100px)] tw-p-8">
    <h1 class="tw-text-2xl tw-font-bold tw-mb-10">Edit Product Details</h1>
    <div class="tw-grid tw-grid-cols-2 tw-gap-8 tw-w-full">
      <!-- Basic Information -->
      <div class="tw-p-5 tw-rounded-[16px] -lg tw-bg-white tw-shadow">
        <h2 class="tw-text-lg tw-font-bold tw-mb-4">Basic Information</h2>
        <div class="tw-space-y-4">
          <label class="tw-block tw-font-medium tw-text-[#515151]">Title</label>
          <input
            v-model="formData.title"
            type="text"
            placeholder="Enter Title"
            class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]"
          />

          <label class="tw-block tw-font-medium tw-text-[#515151]">Description</label>
          <textarea
            v-model="formData.description"
            placeholder="Enter Description"
            class="tw-w-full tw-h-[112px] tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]"
          ></textarea>

          <label class="tw-block tw-font-medium tw-text-[#515151]">Product Information</label>
          <textarea
            v-model="formData.productInfo"
            placeholder="Enter Information"
            class="tw-w-full tw-h-[152px] tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]"
          ></textarea>

          <label class="tw-block tw-font-medium tw-text-[#515151]">Product Type</label>
          <select
            v-model="formData.productType"
            class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]"
          >
            <option value="Credit">Credit</option>
            <option value="Loan">Loan</option>
            <option value="Grant">Grant</option>
          </select>

          <!-- Credit Guarantees -->
          <div class="tw-flex tw-flex-col tw-gap-[10px]">
            <label class="tw-block tw-font-medium tw-text-[#515151]">Credit Guarantees</label>
            <div class="tw-flex tw-flex-wrap tw-gap-2 border border-[#D2D2D2] tw-rounded-[8px] tw-p-2">
              <span
                v-for="(tag, index) in formData.creditGuarantees"
                :key="index"
                class="tw-bg-gray-200 tw-text-sm tw-px-2 tw-py-1 tw-rounded-[8px] tw-flex tw-items-center"
              >
                {{ tag }}
                <button @click="removeTag(formData.creditGuarantees, index)" class="tw-ml-2 tw-text-gray-600 tw-font-bold">×</button>
              </span>
              <input
                v-model="creditGuaranteeInput"
                type="text"
                placeholder="Enter Keyword"
                class="tw-outline-none border-none tw-w-full"
                @keyup.enter="addTag(formData.creditGuarantees, creditGuaranteeInput)"
              />
            </div>
          </div>

          <label class="tw-block tw-font-medium tw-text-[#515151]">Stage of Entrepreneurship</label>
          <select
            v-model="formData.entrepreneurshipStage"
            class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]"
          >
            <option value="Startup">Startup</option>
            <option value="Growth">Growth</option>
            <option value="Maturity">Maturity</option>
          </select>

          <label class="tw-block tw-font-medium tw-text-[#515151]">Objective of Credit</label>
          <select
            v-model="formData.creditObjective"
            class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]"
          >
            <option value="Working Capital">Working Capital</option>
            <option value="Expansion">Expansion</option>
          </select>

          <label class="tw-block tw-font-medium tw-text-[#515151]">Benefits for Entrepreneurs and MSMEs</label>
          <input
            v-model="formData.benefits"
            type="text"
            placeholder="Enter Benefits"
            class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]"
          />

          <!-- Geographic Coverage -->
          <div class="tw-flex tw-flex-col tw-gap-[10px] tw-mt-4">
            <label class="tw-block tw-font-medium tw-text-[#515151]">Geographic Coverage</label>
            <div class="tw-flex tw-flex-wrap tw-gap-2 border border-[#D2D2D2] tw-rounded-[8px] tw-p-2">
              <span
                v-for="(tag, index) in formData.geographicCoverage"
                :key="index"
                class="tw-bg-gray-200 tw-text-sm tw-px-2 tw-py-1 tw-rounded-[8px] tw-flex tw-items-center"
              >
                {{ tag }}
                <button @click="removeTag(formData.geographicCoverage, index)" class="tw-ml-2 tw-text-gray-600 tw-font-bold">×</button>
              </span>
              <input
                v-model="geographicCoverageInput"
                type="text"
                placeholder="Enter Keyword"
                class="tw-outline-none border-none tw-w-full"
                @keyup.enter="addTag(formData.geographicCoverage, geographicCoverageInput)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Requirements and Contact Details -->
      <div class="tw-flex tw-h-full tw-flex-col tw-gap-8">
        <!-- Requirements -->
        <div class="tw-p-5 tw-rounded-[16px] -lg tw-bg-white tw-shadow">
          <h2 class="tw-text-lg tw-font-bold tw-mb-4">Requirements</h2>
          <textarea
            v-model="formData.requirements"
            placeholder="Enter Requirements"
            class="tw-w-full tw-h-[162px] tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]"
          ></textarea>
        </div>

        <!-- Contact Details -->
        <div class="tw-p-5 tw-h-full tw-rounded-[16px] -lg tw-bg-white tw-shadow tw-flex tw-flex-col">
          <h2 class="tw-text-lg tw-font-bold tw-mb-4">Contact Details</h2>
          <div class="tw-space-y-4 tw-flex-grow">
            <label class="tw-block tw-font-medium tw-text-[#515151]">Contact Name</label>
            <input
              v-model="formData.contactName"
              type="text"
              placeholder="Enter Name"
              class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]"
            />

            <label class="tw-block tw-font-medium tw-text-[#515151]">Phone</label>
            <input
              v-model="formData.phone"
              type="text"
              placeholder="Enter Phone"
              class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]"
            />

            <label class="tw-block tw-font-medium tw-text-[#515151]">Email</label>
            <input
              v-model="formData.email"
              type="email"
              placeholder="Enter Email"
              class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]"
            />

            <label class="tw-block tw-font-medium tw-text-[#515151]">Address</label>
            <input
              v-model="formData.address"
              type="text"
              placeholder="Enter Address"
              class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]"
            />
          </div>

          <!-- Save Changes Button -->
          <div class="tw-w-full tw-flex tw-justify-end tw-mt-auto">
            <button
              @click="saveChanges"
              class="tw-bg-[#24B2E3] tw-text-white tw-px-[28px] tw-py-[18px] tw-rounded-[13px] tw-shadow hover:tw-bg-[#1A90C3]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
