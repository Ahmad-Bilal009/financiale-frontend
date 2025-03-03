<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import productService from "@/services/productServices";
import { useToast } from "vue-toastification";

const toast = useToast();
const route = useRoute();
const router = useRouter();

// Check if it's Edit Mode (if productId exists)
const productId = route.params.id ? Number(route.params.id) : null;
const isEditing = ref(!!productId); // Detect Edit Mode

// Product form state
const productForm = ref({
  title: "",
  description: "",
  productInformation: "",
  productType: "",
  creditGuarantees: "",
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
  status: "pending",
});

const geoInput = ref("");

// ** Fetch Product Details for Edit Mode **
const fetchProductDetails = async () => {
  if (!productId) return;

  try {
    const product = await productService.getProductById(productId);
    if (product) {
      productForm.value = {
        ...product,
        contactDetail: {
          name: product.contactDetail?.name || "", // Ensure fields are initialized
          email: product.contactDetail?.email || "",
          phone: product.contactDetail?.phone || "",
          address: product.contactDetail?.address || "",
        }
      }; // Populate Form with API Data
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    toast.error("Failed to load product details.");
  }
};

// ** Add Tag to Geographic Coverage **
const addTag = () => {
  if (geoInput.value.trim() && !productForm.value.geographicCoverage.includes(geoInput.value.trim())) {
    productForm.value.geographicCoverage.push(geoInput.value.trim());
    geoInput.value = ""; // Clear input after adding tag
  }
};

// ** Remove Tag from Geographic Coverage **
const removeTag = (index: number) => {
  productForm.value.geographicCoverage.splice(index, 1);
};

// ** Submit Product (Create or Update) **
const submitProduct = async () => {
  try {
    // Validation
    if (!productForm.value.title || !productForm.value.description || !productForm.value.productType || !productForm.value.requirement) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (isEditing.value) {
      // ** Update Existing Product **
      if (productId !== null) { // Check if productId is not null
        await productService.saveProduct(productForm.value, productId);
        toast.success("Product updated successfully!");
      } else {
        toast.error("Product ID is invalid.");
      }
    } else {
      // ** Create New Product **
      await productService.saveProduct(productForm.value);
      toast.success("Product added successfully!");
    }

    router.push("/products"); // Redirect after submission
  } catch (error) {
    console.error("API Error:", error);
    toast.error("An error occurred while saving the product.");
  }
};

// Fetch product details if in edit mode
onMounted(fetchProductDetails);
</script>

<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-mt-8 tw-h-[calc(100vh-100px)] tw-p-8">
    <h1 class="tw-text-2xl tw-font-bold tw-mb-10">
      {{ isEditing ? "Edit Product" : "Add Product" }}
    </h1>
    <div class="tw-grid tw-grid-cols-2 tw-gap-8 tw-w-full">
      <!-- Basic Information -->
      <div class="tw-p-5 tw-rounded-[16px] -lg tw-bg-white tw-shadow">
        <h2 class="tw-text-lg tw-font-bold tw-mb-4">Información Básica</h2>
        <div class="tw-space-y-4">

          <div class="tw-flex tw-flex-col tw-gap-[10px]">
            <label class="tw-block tw-font-medium tw-text-[#515151]">Título</label>
            <input v-model="productForm.title" type="text" placeholder="Enter Title" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]" />
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[10px]">
            <label class="tw-block tw-font-medium tw-text-[#515151]">Descripción</label>
            <textarea v-model="productForm.description" placeholder="Enter Description" class="tw-w-full tw-h-[112px] tw-p-3 border border-[#D2D2D2] tw-rounded-[8px] tw-h-24"></textarea>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[10px]">
            <label class="tw-block tw-font-medium tw-text-[#515151]">Información del Producto</label>
            <textarea v-model="productForm.productInformation" placeholder="Enter Information" class="tw-w-full tw-h-[152px] tw-p-3 border border-[#D2D2D2] tw-rounded-[8px] tw-h-24"></textarea>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[10px]">
            <label class="tw-block tw-font-medium tw-text-[#515151]">Tipo de Producto</label>
            <select v-model="productForm.productType" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]">
              <option value="">Select Product Type</option>
              <option value="Type1">Type1</option>
              <option value="Type2">Type2</option>
              <option value="Type3">Type3</option>
            </select>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[10px]">
            <label class="tw-block tw-font-medium tw-text-[#515151]">Garantías de Crédito</label>
            <input v-model="productForm.creditGuarantees" type="text" placeholder="Enter Title" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]" />
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[10px]">
            <label class="tw-block tw-font-medium tw-text-[#515151]">Etapa del Emprendimiento</label>
            <select v-model="productForm.stageOfEntrepreneurship" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]">
              <option value="">Select Type</option>
              <option value="Startup">Startup</option>
              <option value="Growth">Growth</option>
              <option value="Mature">Mature</option>
            </select>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[10px]">
            <label class="tw-block tw-font-medium tw-text-[#515151]">Objetivo del Crédito</label>
            <select v-model="productForm.objectiveOfCredit" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]">
              <option value="">Select Objective of Credit</option>
              <option value="Expansion">Expansion</option>
              <option value="Inventory">Inventory</option>
              <option value="Working Capital">Working Capital</option>
            </select>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[10px]">
            <label class="tw-block tw-font-medium tw-text-[#515151]">Beneficios para Emprendedores y MIPYMEs</label>
            <input v-model="productForm.benefitsOfEntrepreneurship" type="text" placeholder="Enter Title" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]" />
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[10px] tw-mt-4">
            <label class="tw-block tw-font-medium tw-text-[#515151]">Cobertura Geográfica</label>
            <div class="tw-flex tw-flex-wrap tw-gap-2 border border-[#D2D2D2] tw-rounded-[8px] tw-p-2">
              <span
                v-for="(tag, index) in productForm.geographicCoverage"
                :key="index"
                class="tw-bg-gray-200 tw-text-sm tw-px-2 tw-py-1 tw-rounded-[8px] tw-flex tw-items-center"
              >
                {{ tag }}
                <button @click="removeTag(index)" class="tw-ml-2 tw-text-gray-600 tw-font-bold">×</button>
              </span>
              <input
                v-model="geoInput"
                type="text"
                placeholder="Enter Keyword"
                class="tw-outline-none border-none tw-w-full"
                @keyup.enter="addTag()"
              />
            </div>
          </div>

        </div>
      </div>

      <div class="tw-flex tw-h-full tw-flex-col tw-gap-8">
        <!-- Requirements -->
        <div class="tw-p-5 tw-rounded-[16px] -lg tw-bg-white tw-shadow">
          <h2 class="tw-text-lg tw-font-bold tw-mb-4">Requisitos</h2>
          <label class="tw-block tw-font-medium tw-text-[#515151]">Requisitos</label>
          <textarea v-model="productForm.requirement" placeholder="Enter Requirements" class="tw-w-full tw-h-[162px] tw-p-3 border border-[#D2D2D2] tw-rounded-[8px] tw-h-36"></textarea>
        </div>

        <!-- Contact Details -->
        <div class="tw-p-5 tw-h-full tw-rounded-[16px] -lg tw-bg-white tw-shadow tw-flex tw-flex-col">
          <h2 class="tw-text-lg tw-font-bold tw-mb-4">Detalles de Contacto</h2>
          <div class="tw-space-y-4 tw-flex-grow">
            <label class="tw-block tw-font-medium tw-text-[#515151]">Nombre de Contacto:</label>
            <input v-model="productForm.contactDetail.name" type="text" placeholder="Enter Name" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]" />

            <label class="tw-block tw-font-medium tw-text-[#515151]">Teléfono</label>
            <input v-model="productForm.contactDetail.phone" type="text" placeholder="Enter Phone" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]" />

            <label class="tw-block tw-font-medium tw-text-[#515151]">Correo Electrónico</label>
            <input v-model="productForm.contactDetail.email" type="email" placeholder="Enter Email" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]" />

            <label class="tw-block tw-font-medium tw-text-[#515151]">Dirección</label>
            <input v-model="productForm.contactDetail.address" type="text" placeholder="Enter Address" class="tw-w-full tw-p-3 border border-[#D2D2D2] tw-rounded-[8px]" />
          </div>

          <!-- Button Positioned at the Bottom -->
          <div class="tw-w-full tw-flex tw-justify-end tw-mt-auto">
            <button
              class="tw-bg-[#24B2E3] tw-text-white tw-px-[28px] tw-py-[18px] tw-rounded-[13px] tw-shadow hover:tw-bg-[#1A90C3]"
              @click="submitProduct"
            >
              {{ isEditing ? "Actualizar Producto" : "Agregar Producto" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
