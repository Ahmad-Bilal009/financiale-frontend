<script setup lang="ts">
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue'
import HandlingTableComp from '@/components/UI/ProductHandlingTable/HandlingTableComp.vue'
import productService from '@/services/productServices'
import userService from '@/services/userService'
import { ref, onMounted, computed } from 'vue'
import { useToast } from "vue-toastification"

const toast = useToast();
const products = ref<Product[]>([]);
const usersMap = ref<Record<number, string>>({});

// Define the Product interface
interface Product {
  id: number;
  title: string;
  userId?: number;
  contactDetail?: { address: string };
  stageOfEntrepreneurship?: string;
  status: string; // Ensure this is included
  createdAt?: string;
  organization?: string;
  location?: string;
  stage?: string;
  // Add other relevant properties as needed
}

const tableheading = ref([
  { key: 'title', label: 'Título', align: 'center' },
  { key: 'organization', label: 'Organización', align: 'center' },
  { key: 'location', label: 'Ubicación', align: 'center' },
  { key: 'stage', label: 'Etapa', align: 'center' },
  { key: 'view', label: 'Ver', align: 'center' },
  { key: 'action', label: 'Acción', align: 'center' },
]);

const fetchUsers = async () => {
  try {
    const userResponse = await userService.getUsers();
    usersMap.value = userResponse.reduce((map: any, user: any) => {
      map[user.id] = user.name;
      return map;
    }, {});
  } catch (error) {
    toast.error("No se pudieron obtener los usuarios");
  }
};

const fetchProducts = async () => {
  try {
    await fetchUsers();
    const response = await productService.getProducts();
    products.value = response.map((product: any) => ({
      id: product.id,
      title: product.title,
      organization: usersMap.value[product.userId] || "N/A",
      location: product.contactDetail?.address || "N/A",
      stage: product.stageOfEntrepreneurship || "N/A",
      status: product.status,
      createdAt: product.createdAt ? new Date(product.createdAt).toISOString().split("T")[0] : "N/A",
    }));
  } catch (error) {
    toast.error("No se pudieron obtener los productos");
  }
};

// Computed property to filter only rejected products
const rejectedProducts = computed(() => {
  return products.value.filter(product => product.status === "rejected").map(product => ({
    id: product.id.toString(),
    title: product.title,
    organization: product.organization || "N/A",
    location: product.location || "N/A",
    stage: product.stage || "N/A",
    status: product.status,
    createdAt: product.createdAt || "N/A",
  }));
});

// Search functionality
const search = (value: string) => {
  console.log("Consulta de búsqueda:", value);
};

// Sorting functionality
const handleSort = (key: string) => {
  console.log(`Ordenando por: ${key}`);
};

// Define rejectProduct
const rejectProduct = (productId: number) => {
  console.log(`Rejecting product with ID: ${productId}`);
  // Implement the logic to reject the product here, e.g., make an API call
};

// Define approveProduct
const approveProduct = (productId: number) => {
  console.log(`Approving product with ID: ${productId}`);
  // Implement the logic to approve the product here, e.g., make an API call
};

onMounted(fetchProducts);
</script>

<template>
  <div class="tw-flex tw-flex-col tw-mb-12 tw-mt-12 tw-gap-12">
    <!-- Encabezado -->
    <div class="md:tw-flex tw-justify-between md:tw-items-center">
      <div class="tw-text-[24px] md:tw-text-3xl tw-font-medium">Productos Rechazados</div>
      <div class="md:tw-flex tw-gap-5 tw-items-start md:tw-items-center">
        <SearchBar :onSearch="search" placeholder="Buscar aquí..." />
      </div>
    </div>

    <!-- Contenido -->
    <div class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
      <HandlingTableComp
        :columns="tableheading"
        :rowData="rejectedProducts"
        @sort="handleSort"
        link="/products"
        variant="action"
        @approve="approveProduct"
        @reject="rejectProduct"
      />
    </div>
  </div>
</template>
