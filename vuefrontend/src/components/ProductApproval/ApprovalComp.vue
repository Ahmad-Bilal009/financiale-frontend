<script setup lang="ts">
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue'
import TableComp from '@/components/UI/ApprovalTable/TableComp.vue'
import ToggleComp from '@/components/UI/Toggle-Switch/ToggleComp.vue'
import DeleteModal from '@/components/UI/Delete-Model/DeleteModel.vue'
import { onMounted, ref, computed } from 'vue'
import userService from '@/services/userService'
import productService from '@/services/productServices'
import { useToast } from "vue-toastification"

const toast = useToast()
const isDeleteModalOpen = ref(false)
const selectedProductId = ref<number | null>(null)

//  State Management
const selectVisitors = ref({ key: 'all', label: 'Todos' })
const selectedOrganization = ref({ key: 'all', label: 'Todas' })
const products = ref<Product[]>([])
const activeFilter = ref('all') // Default: show all products

// Visitors & Organization Options
const Visitors = ref([
  { key: 'all', label: 'Todos' },
  { key: 'today', label: 'Hoy' },
  { key: 'thisweek', label: 'Esta Semana' },
  { key: 'thismonth', label: 'Este Mes' },
])

const Organization = ref([
  { key: 'all', label: 'Todas' },
  { key: 'bantrab', label: 'Bantrab' },
  { key: 'zarkab', label: 'Zarkab' },
  { key: 'tsmc', label: 'TSMC' },
])

// Table Headers (Dynamic)
const tableheading = computed(() => {
  const columns = [
    { key: 'title', label: 'Título', align: 'center' },
    { key: 'location', label: 'Ubicación', align: 'center' },
    { key: 'organization', label: 'Organización', align: 'center' },
    { key: 'stage', label: 'Etapa', align: 'center' },
    { key: 'view', label: 'Ver', align: 'center' },
    { key: 'createdAt', label: 'Creado el', align: 'center' },
    { key: 'action', label: 'Acción', align: 'center' },
  ]

  if (activeFilter.value === 'approved') {
    columns.push({ key: 'ProductVisit', label: 'Visitantes', align: 'center' })
  }

  return columns
})

// Define types for user and product
interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  userId?: number;
  contactDetail?: { address: string };
  stageOfEntrepreneurship?: string;
  stage: string;
  status: string;
  createdAt?: string;
  organization?: string;
  location?: string;
}

// Fetch Products
const fetchProducts = async () => {
  try {
    const userResponse = await userService.getUsers()
    if (!userResponse || !Array.isArray(userResponse)) {
      throw new Error(`Respuesta de usuario inválida: ${JSON.stringify(userResponse)}`)
    }

    const usersMap = userResponse.reduce((map: Record<number, string>, user: User) => {
      if (user?.id) map[user.id] = user.name
      return map
    }, {})

    const response = await productService.getProducts()
    if (!response || !Array.isArray(response)) {
      throw new Error(`Respuesta de productos inválida: ${JSON.stringify(response)}`)
    }

    products.value = response.map((product: Product) => ({
      id: product.id,
      title: product.title,
      organization: product.userId ? usersMap[product.userId] || "N/A" : "N/A",
      location: product.contactDetail?.address || "N/A",
      stage: product.stageOfEntrepreneurship || "N/A",
      status: product.status,
      createdAt: product.createdAt ? new Date(product.createdAt).toISOString().split("T")[0] : "N/A",
    }))
  } catch (error) {
    // Type assertion to ensure error is an instance of Error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    toast.error(`Error al obtener productos: ${errorMessage}`);
  }
}

// Computed: Filtered Products
const filteredProducts = computed(() => {
  return products.value.map(product => ({
    id: product.id.toString(),
    title: product.title,
    location: product.location || "N/A",
    userId: product.userId?.toString() || "N/A",
    contactDetail: product.contactDetail?.address || "N/A",
    stage: product.stage || "N/A",
    status: product.status,
    createdAt: product.createdAt || "N/A",
    organization: product.organization || "N/A",
  }));
});


const handleFilterChange = (filter: string) => {
  console.log("Filtro cambiado a:", filter)
  activeFilter.value = filter
}


const search = (query: string) => {
  console.log("Searching for:", query);
}

// Approve Product Function
const approveProduct = async (productId: number) => {
  try {
    console.log("Approving product with ID:", productId);
    await productService.updateProductStatus(productId, 'approved');
    toast.success("Product approved successfully!");
    fetchProducts(); // Refresh the product list
  } catch (error) {
    console.error("Error approving product:", error);
    toast.error("Failed to approve product.");
  }
}

// Reject Product Function
const rejectProduct = async (productId: number) => {
  try {
    console.log("Rejecting product with ID:", productId);
    await productService.updateProductStatus(productId, 'rejected');
    toast.success("Product rejected successfully!");
    fetchProducts(); // Refresh the product list
  } catch (error) {
    console.error("Error rejecting product:", error);
    toast.error("Failed to reject product.");
  }
}

// Open Delete Modal Function
const openDeleteModal = (productId: number) => {
  console.log("Opening delete modal for product with ID:", productId);
  selectedProductId.value = productId;
  isDeleteModalOpen.value = true;
}

// Handle Sort Function
const handleSort = (key: string) => {
  console.log(`Sorting by ${key}`);
  // Implement the sorting logic here
}

// Close Delete Modal Function
const closeDeleteModal = () => {
  console.log("Closing delete modal");
  isDeleteModalOpen.value = false;
  selectedProductId.value = null;
}

// Delete Product Function
const deleteProduct = () => {
  if (selectedProductId.value !== null) {
    console.log("Deleting product with ID:", selectedProductId.value);
    // Implement the logic to delete the product here, e.g., make an API call
    isDeleteModalOpen.value = false;
    selectedProductId.value = null;
  } else {
    console.error("No product selected for deletion");
  }
}

// On Component Mount
onMounted(fetchProducts)
</script>


<template>
  <div class="tw-flex tw-flex-col tw-mb-12 tw-mt-12 tw-gap-12">
    <!-- Encabezado -->
    <div class="md:tw-flex tw-justify-between md:tw-items-center">
      <div class="tw-text-[24px] md:tw-text-3xl tw-font-medium">Aprobaciones de Productos</div>
      <div class="md:tw-flex tw-gap-5 tw-items-start md:tw-items-center">
        <SearchBar :onSearch="search" placeholder="Buscar aquí..." />
        <ToggleComp class="tw-mt-2 md:tw-mt-0" @filterChange="handleFilterChange"/>
      </div>
    </div>

    <!-- Filtros para Productos Aprobados -->
    <div v-if="activeFilter === 'approved'" class="tw-gap-[18px] tw-flex tw-justify-end">
      <div class="tw-flex tw-flex-col tw-gap-2 tw-w-full md:tw-w-auto">
        <label class="tw-text-[12px] md:tw-text-[15px] tw-font-medium tw-text-dark-gray">Seleccionar Visitantes</label>
        <select v-model="selectVisitors" class="tw-bg-white tw-w-40 tw-shadow tw-rounded-[8px] tw-p-2">
          <option v-for="option in Visitors" :key="option.key" :value="option">{{ option.label }}</option>
        </select>
      </div>

      <div class="tw-flex tw-flex-col tw-gap-2 tw-w-full md:tw-w-auto">
        <label class="tw-text-[12px] md:tw-text-[15px] tw-font-medium tw-text-dark-gray">Seleccionar Organización</label>
        <select v-model="selectedOrganization" class="tw-bg-white tw-w-40 tw-shadow tw-rounded-[8px] tw-p-2">
          <option v-for="option in Organization" :key="option.key" :value="option">{{ option.label }}</option>
        </select>
      </div>
    </div>

    <!-- Tabla -->
    <div class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
    <TableComp v-if="filteredProducts.length" :columns="tableheading" :rowData="filteredProducts"
        @sort="handleSort"
        link="/products"
        variant="action"
        :activeFilter="activeFilter"
        @approve="approveProduct"
        @reject="rejectProduct"
        @delete="openDeleteModal"
    />
    <p v-else class="tw-text-center tw-text-gray-500 tw-font-medium">No hay productos disponibles</p>
    </div>

    <DeleteModal :isOpen="isDeleteModalOpen" @close="closeDeleteModal" @delete="deleteProduct" />
  </div>
</template>
