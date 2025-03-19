<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import productService from "@/services/productServices";
import visitorServices from "@/services/visitorServices";
import AppBreadcrumb from "../UI/Breadcrumb.vue"
import ConnectModal from "../UI/Connect-Model/ConnectModel.vue";






const getIcon = (key: string) => {
  const iconMap: Record<string, string> = {
    "Nombre de Contacto": "/profile.png",
    "Teléfono": "/call.png",
    "Correo Electrónico": "/sms.png",
    "Dirección": "/location.png"
  };
  return iconMap[key] || "/icons/default.png"; // Default icon fallback
};
// ** State Variables **
const route = useRoute();
const product = ref<any>(null);
const isModalOpen = ref(false);

const fetchProductDetails = async () => {
  try {
    const productId = route.params.id; // Get product ID from URL
    if (!productId) {
      console.error("Product ID not found in route params!");
      return;
    }

    const productIdArray = Array.isArray(productId) ? productId : [productId];
    const productIdNumber = parseInt(productIdArray[0], 10);

    const response = await productService.getProductById(productIdNumber);
    product.value = {
      ...response,
      organization: response.User?.name || "Unknown Organization",
    };
  } catch (error) {
    console.error("Failed to fetch product details:", error);
  }
};

const incrementVisitorCount = async () => {
  if (!product.value || !product.value.id) return;

  try {
    await visitorServices.incrementVisitor(product.value.id);
    product.value.visitorCount = (product.value.visitorCount || 0) + 1; // Optimistic UI update
    console.log("Visitor count updated successfully!");
  } catch (error) {
    console.error("Failed to update visitor count:", error);
  }
};

// ** Open Modal & Increase Visitor Count **
const handleMoreInfo = async () => {
  console.log("Opening Modal...");
  isModalOpen.value = true;
  await incrementVisitorCount(); // Increment visitor count on modal open
};

// ** Close Modal Function **
const closeModal = () => {
  console.log("Closing Modal...");
  isModalOpen.value = false;
};

// ** Fetch Data When Component Mounts **
onMounted(fetchProductDetails);


</script>

<template>
  <div class="tw-mt-12 tw-mb-12 tw-flex tw-flex-col tw-gap-6" v-if="product">

    <AppBreadcrumb :items="[
      { label: 'Home', path: '/' },
      { label: 'Products', path: '/' },
      { label: product.id, path: '#' } // Current page, no link
    ]" />
    <!-- Header Section -->
    <div class="tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-5">
      <!-- Bank Logo -->
      <div class="tw-border-[1.5px] tw-border-gray-200 tw-rounded-[21px]">
        <img
          class="tw-w-[120px] sm:tw-w-[140px] tw-h-[140px] tw-rounded-[21px] tw-object-contain"
          src="../../assets/img/no-user-image.png"
          alt="Product Logo"
        />
      </div>

      <!-- Title & Description -->
      <div class="tw-flex tw-flex-col tw-text-center">
        <span class="tw-text-[#070707] tw-text-[16px]">{{ product.User.name || "Unknown Organization" }}</span>
        <h1 class="tw-text-[#192854] tw-text-[32px] sm:tw-text-[40px] tw-font-bold">
          {{ product.title || "No Title Available" }}
        </h1>
      </div>

      <p class="tw-text-[#515151] tw-text-[14px] sm:tw-text-[16px] tw-max-w-[800px]">
        {{ product.description || "No description available." }}
      </p>

      <!-- Button -->
      <div class="tw-w-full tw-flex tw-justify-center">
        <button
          class="tw-bg-[#24B2E3] tw-flex tw-items-center tw-justify-center tw-text-[#FFFFFF] tw-gap-[12px] tw-text-sm tw-font-medium tw-py-3 tw-px-6 tw-rounded-full"
          @click="handleMoreInfo()"
        >
          <span>Conectar</span>
          <div class="tw-flex tw-items-center tw-justify-center tw-w-8 tw-h-8 tw-bg-white tw-text-[#24B2E3] tw-rounded-full">
            <img class="tw-w-[20px] tw-h-[20px]" src="../../../public/Group 21.png" alt="arrow-right">
          </div>
        </button>
      </div>
    </div>

    <!-- Responsive Layout -->
    <div class="tw-mt-10 tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6">
      <!-- Left Column -->
      <div class="md:tw-col-span-2 tw-flex tw-flex-col tw-gap-6">
        <div class="tw-bg-white tw-shadow-md tw-border-[1.5px] tw-rounded-[24px] tw-gap-[13px] tw-p-[24px]">
          <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">Información</h4>
          <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]">
            {{ product.productInformation || "No additional information available." }}
          </p>
        </div>

        <div class="tw-flex tw-flex-col tw-bg-white tw-shadow-md tw-border-[1.5px] tw-rounded-[24px] tw-gap-[13px] tw-p-[24px]">
          <div v-for="(value, key) in {
            'Tipo de Producto': product.productType,
            'Garantías de Crédito': product.creditGuarantees,
            'Etapa del Emprendimiento': product.stageOfEntrepreneurship,
            'Objetivo del Crédito': product.objectiveOfCredit,
            'Beneficios para Emprendedores y MIPYMEs': product.benefitsOfEntrepreneurship
          }" :key="key" class="tw-flex tw-flex-col tw-gap-[1px]">
            <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">{{ key }}</h4>
            <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]">
              {{ value || "Not specified" }}
            </p>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[13px]">
            <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">Cobertura Geográfica</h4>
            <div class="tw-flex tw-flex-wrap tw-gap-[7px]">
              <span v-for="(tag, index) in product.geographicCoverage" :key="index"
                class="tw-text-[12px] tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="tw-flex tw-flex-col tw-gap-6">
        <div class="tw-border tw-rounded-[24px] tw-p-6 tw-bg-white tw-shadow-md">
          <h4 class="tw-text-[20px] tw-font-medium mb-4">Detalles de Contacto</h4>

          <div class="tw-flex tw-flex-col tw-gap-4">
            <div
              v-for="(value, key) in {
                'Nombre de Contacto': product.contactDetail?.name,
                'Teléfono': product.contactDetail?.phone,
                'Correo Electrónico': product.contactDetail?.email,
                'Dirección': product.contactDetail?.address
              }"
              :key="key"
              class="tw-flex tw-items-start tw-gap-4"
            >
              <img class="tw-w-[40px] tw-h-[40px]" :src="getIcon(key)" alt="icon" />
              <div>
                <p class="tw-font-semibold">{{ key }}</p>
                <p>{{ value || "Not provided" }}</p>
              </div>
            </div>
          </div>
        </div>


        <!-- Requirements -->
        <div class="tw-bg-white tw-shadow-md tw-border tw-rounded-[24px] tw-p-6">
          <h4 class="tw-text-[20px] tw-font-medium">Requisitos</h4>
          <ul class="tw-list-disc tw-pl-5 tw-mt-2 tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]">
            <li v-for="(req, index) in product.requirement?.split(',')" :key="index">{{ req }}</li>
          </ul>
        </div>
      </div>
    </div>

    <ConnectModal :isOpen="isModalOpen" @close="closeModal" />
  </div>
</template>
