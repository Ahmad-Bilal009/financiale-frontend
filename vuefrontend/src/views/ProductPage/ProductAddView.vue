<script setup lang="ts">
import { ref } from "vue";

const creditGuarantees = ref<string[]>([]);
const geographicCoverage = ref<string[]>([]);

const creditInput = ref("");
const geoInput = ref("");

// Function to add tag dynamically
const addTag = (list: string[], input: string) => {
  if (input.trim()) {
    list.push(input.trim());
    if (input === creditInput.value) {
      creditInput.value = "";
    } else {
      geoInput.value = "";
    }
  }
};

// Function to remove tag
const removeTag = (list: string[], index: number) => {
  list.splice(index, 1);
};
</script>

<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-mt-8 tw-h-[calc(100vh-100px)] tw-p-8">
    <h1 class="tw-text-2xl tw-font-bold tw-mb-10">Add Product</h1>
    <div class="tw-grid tw-grid-cols-2 tw-gap-8 tw-w-full">
      <!-- Basic Information -->
      <div class="tw-p-5  tw-rounded-[16px] -lg tw-bg-white tw-shadow">
        <h2 class="tw-text-lg tw-font-bold tw-mb-4">Basic Information</h2>
        <div class="tw-space-y-4">
          <label class="tw-block tw-font-medium tw-text-[#515151]">Title</label>
          <input type="text" placeholder="Enter Title" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]" />
          <label class="tw-block tw-font-medium tw-text-[#515151]">Description</label>
          <textarea placeholder="Enter Description" class="tw-w-full tw-h-[112px] tw-p-3 border border-[#D2D2D2] tw-rounded-[8px] tw-h-24"></textarea>
          <label class="tw-block tw-font-medium tw-text-[#515151]">Product Information</label>
          <textarea placeholder="Enter Information" class="tw-w-full tw-h-[152px] tw-p-3 border border-[#D2D2D2] tw-rounded-[8px] tw-h-24"></textarea>
          <label class="tw-block tw-font-medium tw-text-[#515151]">Product Type</label>
          <select class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]">
            <option>Select Product Type</option>
          </select>


          <div class="tw-flex tw-flex-col tw-gap-[10px]">
            <label class="tw-block tw-font-medium tw-text-[#515151]">Credit Guarantees</label>
            <div class="tw-flex tw-flex-wrap tw-gap-2 border border-[#D2D2D2] tw-rounded-[8px] tw-p-2">
              <span
                v-for="(tag, index) in creditGuarantees"
                :key="index"
                class="tw-bg-gray-200 tw-text-sm tw-px-2 tw-py-1 tw-rounded-[8px] tw-flex tw-items-center"
              >
                {{ tag }}
                <button @click="() => removeTag(creditGuarantees, index)" class="tw-ml-2 tw-text-gray-600 tw-font-bold">×</button>
              </span>
              <input
                v-model="creditInput"
                type="text"
                placeholder="Enter Keyword"
                class="tw-outline-none border-none tw-w-full"
                @keyup.enter="() => addTag(creditGuarantees, creditInput)"
              />
            </div>
          </div>


          <label class="tw-block tw-font-medium tw-text-[#515151]">Stage of Entrepreneurship</label>
          <select class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]">
            <option>Select Stage of Entrepreneurship</option>
          </select>
          <label class="tw-block tw-font-medium tw-text-[#515151]">Objective of Credit</label>
          <select class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]">
            <option>Select Objective of Credit</option>
          </select>


          <label class="tw-block tw-font-medium tw-text-[#515151]">Benefits for Entrepreneurs and MSMEs</label>
          <input type="text" placeholder="Enter Benefits" class="tw-w-full tw-p-3 border border-[#D2D2D2] border-2 tw-rounded-[8px]" />

          <div class="tw-flex tw-flex-col tw-gap-[10px] tw-mt-4">
            <!-- Geographic Coverage -->
            <label class="tw-block tw-font-medium tw-text-[#515151]">Geographic Coverage</label>
            <div class="tw-flex tw-flex-wrap tw-gap-2 border border-[#D2D2D2] tw-rounded-[8px] tw-p-2">
              <span
                v-for="(tag, index) in geographicCoverage"
                :key="index"
                class="tw-bg-gray-200 tw-text-sm tw-px-2 tw-py-1 tw-rounded-[8px] tw-flex tw-items-center"
              >
                {{ tag }}
                <button @click="removeTag(geographicCoverage, index)" class="tw-ml-2 tw-text-gray-600 tw-font-bold">×</button>
              </span>
              <input
                v-model="geoInput"
                type="text"
                placeholder="Enter Keyword"
                class="tw-outline-none border-none tw-w-full"
                @keyup.enter="addTag(geographicCoverage, geoInput)"
              />
            </div>
          </div>

        </div>
      </div>



      <div class="tw-flex tw-h-full tw-flex-col tw-gap-8">
        <!-- Requirements -->
        <div class="tw-p-5 tw-rounded-[16px] -lg tw-bg-white tw-shadow">
          <h2 class="tw-text-lg tw-font-bold tw-mb-4">Requirements</h2>
          <label class="tw-block tw-font-medium tw-text-[#515151]">Requirements</label>
          <textarea placeholder="Enter Requirements" class="tw-w-full tw-h-[162px] tw-p-3 border border-[#D2D2D2] tw-rounded-[8px] tw-h-36"></textarea>
        </div>

        <!-- Contact Details -->
        <div class="tw-p-5 tw-h-full tw-rounded-[16px] -lg tw-bg-white tw-shadow tw-flex tw-flex-col">
          <h2 class="tw-text-lg tw-font-bold tw-mb-4">Contact Details</h2>
          <div class="tw-space-y-4 tw-flex-grow">
            <label class="tw-block tw-font-medium tw-text-[#515151]">Contact Name</label>
            <input type="text" placeholder="Enter Name" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]" />

            <label class="tw-block tw-font-medium tw-text-[#515151]">Phone</label>
            <input type="text" placeholder="Enter Phone" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]" />

            <label class="tw-block tw-font-medium tw-text-[#515151]">Email</label>
            <input type="email" placeholder="Enter Email" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]" />

            <label class="tw-block tw-font-medium tw-text-[#515151]">Address</label>
            <input type="text" placeholder="Enter Address" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]" />
          </div>

          <!-- Button Positioned at the Bottom -->
          <div class="tw-w-full tw-flex tw-justify-end tw-mt-auto">
            <button
              class="tw-bg-[#24B2E3] tw-text-white tw-px-[28px] tw-py-[18px] tw-rounded-[13px] tw-shadow hover:tw-bg-[#1A90C3]"
            >
              + Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
