<script setup lang="ts">
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue'
import HandlingTableComp from '@/components/UI/ProductHandlingTable/HandlingTableComp.vue'
import productService from '@/services/productServices'
import userService from '@/services/userService'
import { ref, onMounted, computed } from 'vue'
import { useToast } from "vue-toastification"

const toast = useToast();
const products = ref([]);
const usersMap = ref<Record<number, string>>({});

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

// **Computed property to filter only rejected products**
const rejectedProducts = computed(() => {
  return products.value.filter(product => product.status === "rejected");
});

// **Search functionality**
const search = (value: string) => {
  console.log("Consulta de búsqueda:", value);
};

// **Sorting functionality**
const handleSort = (key: string) => {
  console.log(`Ordenando por: ${key}`);
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
