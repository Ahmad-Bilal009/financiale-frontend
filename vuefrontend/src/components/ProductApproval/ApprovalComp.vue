<script setup lang="ts">
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue'
import TableComp from '@/components/UI/ApprovalTable/TableComp.vue'
import ToggleComp from '@/components/UI/Toggle-Switch/ToggleComp.vue'
import { onMounted, ref, computed } from 'vue'
import userService from '@/services/userService'
import productService from '@/services/productServices'
import { useToast } from "vue-toastification"
import visitorService from '@/services/visitorServices'
import { watch } from 'vue'

const toast = useToast()
const selectedProductId = ref<number | null>(null)

// ** State Management **
const selectVisitors = ref('all') // Default visitor filter
const selectedOrganization = ref('all') // Default organization filter
const products = ref<Product[]>([])
const activeFilter = ref('all') // Default: Show all products


const fetchSortedVisitors = async () => {
  try {
    const response = await visitorService.getSortedVisitors(selectVisitors.value);
    console.log("Fetched Visitors:", response.data);
  } catch (error) {
    toast.error(`Error fetching visitors: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

watch(selectVisitors, fetchSortedVisitors);

// Fetch initial visitors on component mount
onMounted(fetchSortedVisitors);
// ** Visitors & Organization Options **
const Visitors = ref([
  { key: 'all', label: 'Todos' },
  { key: 'today', label: 'Hoy' },
  { key: 'thisweek', label: 'Esta Semana' },
  { key: 'thismonth', label: 'Este Mes' },
])

const availableOrganizations = ref<{ key: string; label: string }[]>([
  { key: 'all', label: 'Todas' }
])

// ** Table Headers **
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

  return columns
})

// ** Types **
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

// ** Fetch Products **
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

// ** Computed: Filtered Products **
const filteredProducts = computed(() => {
  return products.value
    .filter(product =>
      (activeFilter.value === 'all' || product.status === activeFilter.value) &&
      (selectedOrganization.value === 'all' || product.organization === selectedOrganization.value)
    )
    .map(product => ({
      id: product.id.toString(),
      title: product.title,
      location: product.location || "N/A",
      userId: product.userId?.toString() || "N/A",
      contactDetail: product.contactDetail?.address || "N/A",
      stage: product.stage || "N/A",
      status: product.status,
      visitorCount: product.visitorCount || 0,
      createdAt: product.createdAt || "N/A",
      organization: product.organization || "N/A",
    }))
})

// ** Handle Filter Change (Approved/Rejection) **
const handleFilterChange = (filter: string) => {
  activeFilter.value = filter
}

// ** Approve Product Function **
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

// ** Reject Product Function **
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

// ** Search Functionality **
const search = (query: string) => {
  console.log("Searching for:", query);
}

// ** Lifecycle Hook **
onMounted(fetchProducts)

// Define the handleSort method
const handleSort = (sortKey: string) => {
  console.log("Sorting by:", sortKey); // Log the sortKey instead of query
  // Add your sorting logic here
};
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

    <!-- Filters (Only Show When Approved is Selected) -->
    <div v-if="activeFilter === 'approved'" class="tw-gap-[18px] tw-flex tw-justify-end">
      <div class="tw-flex tw-flex-col tw-gap-2 tw-w-full md:tw-w-auto">
        <select v-model="selectVisitors" class="tw-bg-white tw-w-40 tw-shadow tw-rounded-[8px] tw-p-2">
          <option v-for="option in Visitors" :key="option.key" :value="option.key">{{ option.label }}</option>
        </select>
      </div>

      <div class="tw-flex tw-flex-col tw-gap-2 tw-w-full md:tw-w-auto">
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
    />
      <p v-else class="tw-text-center tw-text-gray-500 tw-font-medium">No hay productos disponibles</p>
    </div>
  </div>
</template>
