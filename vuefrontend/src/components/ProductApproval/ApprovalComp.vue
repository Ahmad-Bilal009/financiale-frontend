<script setup lang="ts">
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue'
import TableComp from '@/components/UI/ApprovalTable/TableComp.vue'
import ToggleComp from '@/components/UI/Toggle-Switch/ToggleComp.vue'
import { onMounted, ref, computed } from 'vue'
import userService from '@/services/userService'
import productService from '@/services/productServices'
import { useToast } from "vue-toastification"
import DeleteModel from '@/components/UI/Delete-Model/DeleteModel.vue'
const toast = useToast()
const selectedProductId = ref<number | null>(null)

//  State Management
const isModalOpen = ref(false)
const selectedOrganization = ref('all') // Default organization filter
const products = ref<Product[]>([])
const activeFilter = ref('approved') // Default: Show all products




const availableOrganizations = ref<{ key: string; label: string }[]>([
  { key: 'approved', label: 'Aprobados' }
])

//  Table Headers
const tableheading = computed(() => {
  const columns = [
    { key: 'title', label: 'Título', align: 'center' },
    { key: 'location', label: 'Ubicación', align: 'center' },
    { key: 'organization', label: 'Organización', align: 'center' },
    { key: 'stage', label: 'Etapa', align: 'center' },
    { key: 'view', label: 'View', align: 'center' },
    { key: 'createdAt', label: 'Creado el', align: 'center' },
    { key: 'action', label: 'Acción', align: 'center' }
  ]

  if (activeFilter.value === 'approved') {
    columns.push({ key: 'visitorCount', label: 'Visitantes', align: 'center' })
  }

  if (activeFilter.value === 'rejected') {
    columns.push({ key: 'delete', label: 'Eliminar', align: 'center' });
  }
  return columns
})

//  Types
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
  visitorCount?: number;
}

//  Fetch Products
const fetchProducts = async () => {
  try {
    const userResponse = await userService.getUsers()
    if (!userResponse || !Array.isArray(userResponse)) {
      throw new Error(`Invalid user response: ${JSON.stringify(userResponse)}`)
    }

    const usersMap = userResponse.reduce((map: Record<number, string>, user: User) => {
      if (user?.id) map[user.id] = user.name
      return map
    }, {})

    const response = await productService.getProducts()
    if (!response || !Array.isArray(response)) {
      throw new Error(`Invalid product response: ${JSON.stringify(response)}`)
    }

    const productData = response.map((product: Product) => ({
      id: product.id,
      title: product.title,
      organization: product.userId ? usersMap[product.userId] || "N/A" : "N/A",
      location: product.contactDetail?.address || "N/A",
      stage: product.stageOfEntrepreneurship || "N/A",
      status: product.status,
      visitorCount: product.visitorCount || 0,
      createdAt: product.createdAt ? new Date(product.createdAt).toISOString().split("T")[0] : "N/A",
    }))

    products.value = productData

    // Extract unique organizations dynamically
    const uniqueOrganizations = Array.from(new Set(productData.map(p => p.organization)))
    availableOrganizations.value = [{ key: 'all', label: 'Todas' }, ...uniqueOrganizations.map(org => ({ key: org, label: org }))]

  } catch (error) {
    toast.error(`Error fetching products: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

//  Computed: Filtered Products
const filteredProducts = computed(() => {
  return products.value
    .filter(product => {
      // Ensure filters work properly
      const matchesStatus = activeFilter.value === 'all' || product.status?.toLowerCase() === activeFilter.value.toLowerCase();
      const matchesOrganization = selectedOrganization.value === 'all' || product.organization?.toLowerCase() === selectedOrganization.value.toLowerCase();

      return matchesStatus && matchesOrganization;
    })
    .map(product => ({
      id: product.id?.toString() || "N/A",
      title: product.title || "N/A",
      location: product.location || "N/A",
      userId: product.userId?.toString() || "N/A",
      contactDetail: product.contactDetail?.address || "N/A",
      stage: product.stage || "N/A",
      status: product.status || "N/A",
      visitorCount: typeof product.visitorCount === 'object'
        ? Object.values(product.visitorCount || {}).reduce((acc: number, count: unknown) => acc + (Number(count) || 0), 0) // Sum visitor count
        : product.visitorCount || 0,
      createdAt: product.createdAt ? new Date(product.createdAt).toLocaleDateString() : "N/A", // Format date
      organization: product.organization || "N/A",
    }));
});


//  Handle Filter Change (Approved/Rejection)
const handleFilterChange = (filter: string) => {
  activeFilter.value = filter
}

//  Approve Product Function
const approveProduct = async (productId: number) => {
  console.log("Approving Product ID:", productId); // Debugging Log

  if (!productId || isNaN(productId)) {
    toast.error("Invalid product ID!");
    return;
  }

  try {
    await productService.updateProductStatus(productId, 'approved'); // Corrected API Call
    toast.success("Product approved successfully!");
    fetchProducts(); // Refresh Product List
  } catch (error) {
    toast.error("Failed to approve product.");
  }
}

//  Reject Product Function
const rejectProduct = async (productId: number) => {
  console.log("Rejecting Product ID:", productId); // Debugging Log

  if (!productId || isNaN(productId)) {
    toast.error("Invalid product ID!");
    return;
  }

  try {
    await productService.updateProductStatus(productId, 'rejected'); // Corrected API Call
    toast.success("Product rejected successfully!");
    fetchProducts(); // Refresh Product List
  } catch (error) {
    toast.error("Failed to reject product.");
  }
}

//  Search Functionality
const search = (query: string) => {
  console.log("Searching for:", query);
}

//  Lifecycle Hook
onMounted(fetchProducts)

// Define the handleSort method
const handleSort = (sortKey: string) => {
  console.log("Sorting by:", sortKey); // Log the sortKey instead of query
  // Add your sorting logic here
};

const openModal = (productId: number) => {
  selectedProductId.value = productId
  isModalOpen.value = true
}

// Close Delete Modal
const handleClose = () => {
  isModalOpen.value = false
  selectedProductId.value = null
}

// Delete Product
const deleteProduct = async () => {
  if (!selectedProductId.value) {
    toast.error("No product selected!")
    return
  }

  try {
    await productService.deleteProduct(selectedProductId.value)
    toast.success("Product deleted successfully!")
    handleClose()
    fetchProducts()
  } catch (error) {
    console.error("Error deleting product:", error)
    toast.error("Failed to delete product")
  }
}
</script>

<template>
  <div class="tw-flex tw-flex-col tw-mb-12 tw-mt-12 tw-gap-12">
    <!-- Header -->
    <div class="md:tw-flex tw-justify-between md:tw-items-center">
      <div class="tw-text-[24px] md:tw-text-3xl tw-font-medium">Aprobaciones de Productos</div>
      <div class="md:tw-flex tw-gap-5 tw-items-start md:tw-items-center">
        <SearchBar :onSearch="search" placeholder="Buscar aquí..." />
        <ToggleComp class="tw-mt-2 md:tw-mt-0" @filterChange="handleFilterChange"/>
      </div>
    </div>

    <div v-if="activeFilter === 'approved'" class="tw-gap-[18px] tw-flex tw-justify-end">

      <div class="tw-flex tw-flex-col tw-gap-2 tw-w-full md:tw-w-auto">
        <label class="tw-text-[12px] md:tw-text-[16px] tw-font-medium tw-leading-[20px] tw-text-dark-gray">
          Organización
        </label>
        <select v-model="selectedOrganization" class="tw-bg-white tw-w-40 tw-shadow tw-rounded-[8px] tw-p-2">
          <option v-for="option in availableOrganizations" :key="option.key" :value="option.key">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>

    <!-- Product Table -->
    <div class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
      <TableComp v-if="filteredProducts.length"
        :columns="tableheading"
        :rowData="filteredProducts"
        @sort="handleSort"
        link="/products"
        variant="action"
        :activeFilter="activeFilter"
        @approve="approveProduct"
        @reject="rejectProduct"
        @delete="openModal"
    />
      <p v-else class="tw-text-center tw-text-gray-500 tw-font-medium">No hay productos disponibles</p>
    </div>
    <DeleteModel :isOpen="isModalOpen" @close="handleClose" @delete="deleteProduct" />
  </div>
</template>
