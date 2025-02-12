<script setup lang="ts">
import { ref } from "vue";
import productServices from "@/services/productService";
import { useToast } from "vue-toastification";

const toast = useToast();

const productForm = ref({
  image: "",
  title: "",
  description: "",
  productInformation: "",
  productType: "",
  creditGuarantees: [] as string[],
  stageOfEntrepreneurship: "",
  objectiveOfCredit: "",
  benefitsOfEntrepreneurship: "",
  geographicCoverage: [] as string[],
  requirement: "",
  contactDetail: {
    name: "",
    email: "",
    phone: "",
    address: "",
  },
  status: "pending", // Default status
});

const creditInput = ref("");
const geoInput = ref("");

// Image Upload
const imagePreview = ref<string | null>(null);

const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      imagePreview.value = reader.result as string;
      productForm.value.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
};

// Function to add tags dynamically
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

//  Submit Form (Add Product)
const submitProduct = async () => {
  try {
    await productService.saveProduct(productForm.value);
    toast.success("Product added successfully!");

    // Reset form after success
    productForm.value = {
      image: "",
      title: "",
      description: "",
      productInformation: "",
      productType: "",
      creditGuarantees: [],
      stageOfEntrepreneurship: "",
      objectiveOfCredit: "",
      benefitsOfEntrepreneurship: "",
      geographicCoverage: [],
      requirement: "",
      contactDetail: {
        name: "",
        email: "",
        phone: "",
        address: "",
      },
      status: "pending",
    };
    imagePreview.value = null;
  } catch (error) {
    toast.error(`Failed to add product: ${error}`);
  }
};
</script>

<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-mt-8 tw-h-[calc(100vh-100px)] tw-p-8">
    <h1 class="tw-text-2xl tw-font-bold tw-mb-10">Add Product</h1>
    <div class="tw-grid tw-grid-cols-2 tw-gap-8 tw-w-full">
      <!-- Basic Information -->
      <div class="tw-p-5 tw-rounded-[16px] tw-bg-white tw-shadow">
        <h2 class="tw-text-lg tw-font-bold tw-mb-4">Basic Information</h2>
        <div class="tw-space-y-4">
          <label class="tw-block tw-font-medium tw-text-[#515151]">Upload Image</label>
          <input type="file" @change="handleImageUpload" accept="image/*" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]" />
          <img v-if="imagePreview" :src="imagePreview" class="tw-w-40 tw-h-40 tw-mt-2 tw-rounded-lg" />

          <label class="tw-block tw-font-medium tw-text-[#515151]">Title</label>
          <input v-model="productForm.title" type="text" placeholder="Enter Title" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]" />

          <label class="tw-block tw-font-medium tw-text-[#515151]">Description</label>
          <textarea v-model="productForm.description" placeholder="Enter Description" class="tw-w-full tw-h-[112px] tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]"></textarea>

          <label class="tw-block tw-font-medium tw-text-[#515151]">Product Information</label>
          <textarea v-model="productForm.productInformation" placeholder="Enter Information" class="tw-w-full tw-h-[152px] tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]"></textarea>

          <label class="tw-block tw-font-medium tw-text-[#515151]">Product Type</label>
          <select v-model="productForm.productType" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]">
            <option value="">Select Product Type</option>
            <option value="Type1">Type1</option>
            <option value="Type2">Type2</option>
            <option value="Type3">Type3</option>
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


          <div class="tw-flex tw-flex-col tw-gap-[10px]">
            <label class="tw-block tw-font-medium tw-text-[#515151]">Stage of Entrepreneurship</label>
            <select class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]">
              <option>Select Stage of Entrepreneurship</option>
            </select>
            <label class="tw-block tw-font-medium tw-text-[#515151]">Objective of Credit</label>
            <select class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]">
              <option>Select Objective of Credit</option>
            </select>
          </div>


          <div class="tw-flex tw-flex-col tw-gap-[10px]">
            <label class="tw-block tw-font-medium tw-text-[#515151]">Benefits for Entrepreneurs and MSMEs</label>
            <input type="text" placeholder="Enter Benefits" class="tw-w-full tw-p-3 border border-[#D2D2D2] border-2 tw-rounded-[8px]" />
          </div>

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
        <div class="tw-p-5 tw-rounded-[16px] tw-bg-white tw-shadow">
          <h2 class="tw-text-lg tw-font-bold tw-mb-4">Requirements</h2>
          <label class="tw-block tw-font-medium tw-text-[#515151]">Requirements</label>
          <textarea v-model="productForm.requirement" placeholder="Enter Requirements" class="tw-w-full tw-h-[162px] tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]"></textarea>
        </div>

        <div class="tw-p-5 tw-h-full tw-rounded-[16px] tw-bg-white tw-shadow tw-flex tw-flex-col">
          <h2 class="tw-text-lg tw-font-bold tw-mb-4">Contact Details</h2>
          <div class="tw-space-y-4 tw-flex-grow">
            <label class="tw-block tw-font-medium tw-text-[#515151]">Contact Name</label>
            <input v-model="productForm.contactDetail.name" type="text" placeholder="Enter Name" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]" />

            <label class="tw-block tw-font-medium tw-text-[#515151]">Phone</label>
            <input v-model="productForm.contactDetail.phone" type="text" placeholder="Enter Phone" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]" />

            <label class="tw-block tw-font-medium tw-text-[#515151]">Email</label>
            <input v-model="productForm.contactDetail.email" type="email" placeholder="Enter Email" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]" />

            <label class="tw-block tw-font-medium tw-text-[#515151]">Address</label>
            <input v-model="productForm.contactDetail.address" type="text" placeholder="Enter Address" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]" />
          </div>

          <div class="tw-w-full tw-flex tw-justify-end tw-mt-auto">
            <button @click="submitProduct" class="tw-bg-[#24B2E3] tw-text-white tw-px-[28px] tw-py-[18px] tw-rounded-[13px] tw-shadow hover:tw-bg-[#1A90C3]">
              + Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
