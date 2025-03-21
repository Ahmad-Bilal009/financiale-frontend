<script setup lang="ts">
import ButtonComp from '@/components/UI/Button/ButtonComp.vue'
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue'
import TableComp from '@/components/UI/table/TableComp.vue'
import DeleteModel from '@/components/UI/Delete-Model/DeleteModel.vue'
import productService from '@/services/productServices'
import { useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { useToast } from 'vue-toastification'

// Dependencies
const router = useRouter()
const toast = useToast()

// State Management
const isModalOpen = ref(false)
const selectedProductId = ref<number | null>(null)
const products = ref([])

// Get Logged-In User ID
const user = JSON.parse(localStorage.getItem('user') || '{}')
const userId = user?.id || null

// Fetch Products
const fetchProducts = async () => {
  try {
    const response = await productService.getProducts(userId) // Pass userId
    console.log("API Response:", response)

    products.value = response.map((product: any) => ({
      id: product.id,
      title: product.title,
      organization: product.User?.name || "Unknown Organization",
      location: product.contactDetail?.address || "N/A",
      stage: product.stageOfEntrepreneurship || "N/A",
      status: product.status || "N/A",
      visitorCount: typeof product.visitorCount === 'object'
        ? Object.values(product.visitorCount || {}).reduce((acc: number, count: unknown) => acc + (Number(count) || 0), 0)
        : product.visitorCount || 0,
    }))
  } catch (error) {
    console.error("Error fetching products:", error)
    toast.error("Failed to fetch products")
  }
}


// Computed Property to Check If User Has Products
const hasProducts = computed(() => products.value.length > 0)

// Lifecycle Hook
onMounted(fetchProducts)

// Table Headings
const tableheading = ref([
  { key: 'title', label: 'Título', align: 'center' },
  { key: 'organization', label: 'Organización', align: 'center' },
  { key: 'location', label: 'Ubicación', align: 'center' },
  { key: 'stage', label: 'Etapa', align: 'center' },
  { key: 'status', label: 'Estado', align: 'center' },
  { key: 'visitorCount', label: 'Visitantes', align: 'center' },
  { key: 'action', label: 'Acción', align: 'center' },
])

// Navigation
const addProduct = () => {
  router.push('/products/add')
}

// Search Function
const search = (value: string) => {
  console.log("Searching for:", value)
}

// Sorting Function
const handleSort = (key: string) => {
  console.log(`Sorting by: ${key}`)
}

// Open Delete Modal
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
      <div class="tw-text-[24px] md:tw-text-3xl tw-font-medium">Listado de Productos</div>
      <div class="md:tw-flex tw-gap-5 tw-items-start md:tw-items-center">
        <SearchBar :onSearch="search" placeholder="Buscar aquí..." />
        <div class="tw-flex tw-mt-2 md:tw-mt-0 tw-justify-end tw-items-end">
          <ButtonComp text="+ Agregar Producto" @click="addProduct" />
        </div>
      </div>
    </div>



    <!-- Show Table Only if User Has Products -->
    <div v-if="hasProducts" class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
      <TableComp
        :columns="tableheading"
        :rowData="products"
        @sort="handleSort"
        link="/products"
        variant="action"
        @delete="openModal"
      />
    </div>

    <!-- Show Message If No Products Exist -->
    <div v-else class="tw-text-center tw-text-gray-500 tw-font-medium">
      No products added yet.
    </div>

    <!-- Delete Confirmation Modal -->
    <DeleteModel :isOpen="isModalOpen" @close="handleClose" @delete="deleteProduct" />
  </div>
</template>
