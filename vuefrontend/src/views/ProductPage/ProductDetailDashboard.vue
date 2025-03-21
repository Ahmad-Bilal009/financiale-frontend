<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import productService from "@/services/productServices";
import { useToast } from "vue-toastification";

// **Dependencies**
const route = useRoute();
const toast = useToast();
const user = JSON.parse(localStorage.getItem("user") || "{}");
const isAdmin = user?.role === "admin";
// **Reactive State for Product Data**
const product = ref<any>(null);

// **Fetch Product Details from API**
const fetchProductDetails = async () => {
  try {
    const productId = route.params.id;
    if (!productId) {
      return;
    }

    const response = await productService.getProductById(Number(productId));
    product.value = response;
  } catch (err) {
    toast.error("❌ Failed to load product details.");
  }
};

// **Approve Product**
const approveProduct = async () => {
  try {
    await productService.updateProductStatus(product.value.id, "approved");
    toast.success(" Product approved successfully!");
    fetchProductDetails();
  } catch (err) {
    toast.error("❌ Failed to approve product.");
  }
};

// **Reject Product**
const rejectProduct = async () => {
  try {
    await productService.updateProductStatus(product.value.id, "rejected");
    toast.success("🚫 Product rejected successfully!");
    fetchProductDetails();
  } catch (err) {
    toast.error("❌ Failed to reject product.");
  }
};

// **Fetch Data When Component Mounts**
onMounted(fetchProductDetails);
</script>




<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-mt-8 tw-h-[calc(100vh-100px)] tw-p-8">
    <h1 class="tw-text-2xl tw-font-bold tw-mb-10">Detalles del Producto</h1>

    <div class="tw-mb-[40px] tw-flex tw-flex-row tw-gap-[20px] tw-justify-center">
      <div class="tw-w-[65%] tw-flex tw-flex-col tw-gap-[20px]">
        <div
          class="tw-bg-white tw-shadow-md tw-border-[1.5px] tw-rounded-[24px] tw-gap-[13px] tw-p-[24px]"
        >
          <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">Título</h4>
          <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]">
            {{ product?.title || "N/A" }}
          </p>
        </div>

        <div
          class="tw-bg-white tw-shadow-md tw-border-[1.5px] tw-rounded-[24px] tw-gap-[13px] tw-p-[24px]"
        >
          <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">Descripción</h4>
          <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]">
            {{ product?.description || "N/A" }}
          </p>
        </div>

        <div
          class="tw-bg-white tw-shadow-md tw-border-[1.5px] tw-rounded-[24px] tw-gap-[13px] tw-p-[24px]"
        >
          <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">Información</h4>
          <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]">
            {{ product?.productInformation || "N/A" }}
          </p>
        </div>

        <div
          class="tw-bg-white tw-flex tw-flex-col tw-shadow-md tw-border-[1.5px] tw-rounded-[24px] tw-gap-[13px] tw-p-[24px]"
        >
          <div class="tw-flex tw-flex-col tw-gap-[13px]">
            <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">Tipo de Producto</h4>
            <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]">
              {{ product?.productType || "N/A" }}
            </p>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[13px]">
            <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">Garantías de Crédito</h4>
            <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]">
              {{ product?.creditGuarantees || "N/A" }}
            </p>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[13px]">
            <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">
              Etapa del Emprendimiento
            </h4>
            <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]">{{ product?.stageOfEntrepreneurship || "N/A" }}</p>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[13px]">
            <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">Objetivo del Crédito</h4>
            <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]">
              {{ product?.objectiveOfCredit || "N/A" }}
            </p>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[13px]">
            <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">
              Beneficios para Emprendedores y MIPYMEs
            </h4>
            <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]">
              {{ product?.benefitsOfEntrepreneurship || "N/A" }}
            </p>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[13px]">
            <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">Cobertura Geográfica</h4>
            <div class="tw-flex tw-flex-row tw-gap-[7px]">
              <span
                v-for="(location, index) in product?.geographicCoverage || []"
                :key="index"
                class="tw-text-[12px] tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]"
              >
                {{ location }}
              </span>

            </div>
          </div>
        </div>
      </div>

      <div class="tw-w-[35%] tw-flex tw-flex-col tw-gap-[20px]">
        <div
          class="tw-border-[1.5px] tw-rounded-[24px] tw-gap-[13px] tw-p-[24px] tw-bg-white tw-shadow-md"
        >
          <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500] mb-[16px]">Detalles de Contacto</h4>

          <div class="tw-flex tw-flex-col tw-gap-[32px] tw-mt-[24px]">
            <!-- Contact Name -->
            <div class="tw-flex tw-items-start tw-gap-[10px] mb-[16px]">
              <div
                class="tw-flex tw-items-center tw-justify-center tw-w-[51px] tw-h-[51px] tw-rounded-full tw-bg-gray-100"
              >
                <img class="tw-bg-gray-100" src="../../../public/profile.png" alt="" />
              </div>
              <div>
                <p class="tw-font-semibold tw-text-gray-800">Nombre de Contacto:</p>
                <p class="tw-text-gray-600">{{ product?.contactDetail?.name || "N/A" }}</p>
              </div>
            </div>

            <!-- Phone -->
            <div class="tw-flex tw-items-start tw-gap-[10px] mb-[16px]">
              <div
                class="tw-flex tw-items-center tw-justify-center tw-w-[51px] tw-h-[51px] tw-rounded-full tw-bg-gray-100"
              >
                <img class="tw-bg-gray-100" src="../../../public/call.png" alt="" />
              </div>
              <div>
                <p class="tw-font-semibold tw-text-gray-800">Teléfono:</p>
                <p class="tw-text-gray-600">{{ product?.contactDetail?.phone || "N/A" }}</p>
              </div>
            </div>

            <!-- Email -->
            <div class="tw-flex tw-items-start tw-gap-[10px] mb-[16px]">
              <div
                class="tw-flex tw-items-center tw-justify-center tw-w-[51px] tw-h-[51px] tw-rounded-full tw-bg-gray-100"
              >
                <img class="tw-bg-gray-100" src="../../../public/sms.png" alt="" />
              </div>
              <div>
                <p class="tw-font-semibold tw-text-gray-800">Correo Electrónico:</p>
                <p class="tw-text-gray-600">{{ product?.contactDetail?.email || "N/A" }}</p>
              </div>
            </div>

            <!-- Address -->
            <div class="tw-flex tw-items-start tw-gap-[10px]">
              <div
                class="tw-flex tw-items-center tw-justify-center tw-w-[51px] tw-h-[51px] tw-rounded-full tw-bg-gray-100"
              >
                <img class="tw-bg-gray-100" src="../../../public/location.png" alt="" />
              </div>

              <div>
                <p class="tw-font-semibold tw-text-gray-00">Dirección:</p>
                <p class="tw-text-gray-600">{{ product?.contactDetail?.address || "N/A" }}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="tw-bg-white tw-shadow-md tw-border-[1.5px] tw-rounded-[24px] tw-gap-[13px] tw-p-[24px]"
        >
          <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">Requisitos</h4>
          <ul
            class="tw-list-disc tw-pl-5 tw-mt-2 tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]"
          >
          {{ product?.requirement || "N/A" }}
          </ul>
          <div v-if="isAdmin" class="tw-flex tw-justify-end tw-mt-[24px] tw-flex-row tw-gap-[10px]">
            <button
              @click="rejectProduct"
              class="tw-bg-[#FA3D34] tw-text-white tw-px-7 tw-py-3 tw-rounded-[13px] tw-capitalize"
            >
            Rechazar
            </button>
            <button
              @click="approveProduct"
              class="tw-bg-[#24B2E3] tw-text-white tw-px-7 tw-py-3 tw-rounded-[13px] tw-capitalize"
            >
            Aprobado
            </button>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>
