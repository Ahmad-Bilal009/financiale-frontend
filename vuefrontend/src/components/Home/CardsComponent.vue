<script setup lang="ts">
import { ref, onMounted } from 'vue'
import productService from '@/services/productServices' // Product API
import visitorServices from '@/services/visitorServices'
import { useRouter } from 'vue-router'
import defaultuser from '../../assets/img/no-user-image.png'
import { BASE_URL } from '@/config' // Adjust the path as necessary

const router = useRouter()
const products = ref<Product[]>([]) // Store products

interface User {
  id: number
  name: string
  image: string | null // Define the structure of the User object
}

interface Product {
  id: number
  title: string
  userImage: string
  productType?: string
  organization?: string
  description?: string
  geographicCoverage?: string[]
  User?: User
  status: string
}

// Fetch Products & Attach User Data
const fetchProducts = async () => {
  try {
    // Fetch only approved products from the backend
    const response = await productService.getProducts()

    if (!Array.isArray(response)) {
      console.error('Invalid response format:', response)
      return
    }

    // Filter only approved products from the response
    const approvedProducts = response.filter((product: Product) => product.status === 'approved')

    // Map response to include organization name & user image
    products.value = approvedProducts.map((product: Product) => ({
      ...product,
      organization: product.User?.name || 'Unknown Organization',
      userImage: product.User?.image ? `${BASE_URL}${product.User.image}` : defaultuser, // Ensure full URL
    }))
  } catch (error) {
    console.error('Failed to fetch products:', error)
  }
}

// Fetch Data on Component Mount
onMounted(async () => {
  await fetchProducts() // Then fetch products
})

const handleMoreInfo = async (productId: number) => {
  if (!productId || Number.isNaN(productId)) {
    console.error('Error: Invalid or missing Product ID!', { productId })
    return
  }

  try {
    await visitorServices.incrementVisitor(productId) // Ensure this function is properly handled
    await router.push(`/CardInfo/${productId}`) // Await to ensure navigation is handled correctly
  } catch (error) {
    console.error('Failed to increment visitor count:', error)
  }
}
</script>

<template>
  <div class="tw-flex tw-justify-center tw-flex-wrap tw-gap-[20px] tw-mb-[40px]">
    <!-- Loop through fetched products -->
    <div
      v-for="product in products"
      :key="product.id"
      class="tw-border tw-justify-between tw-flex tw-flex-col tw-p-4 tw-gap-[13px] tw-rounded-[24px] tw-border-[1.5px] tw-w-[400px] tw-border-gray-200 hover:tw-border-[#1570EF] tw-shadow tw-bg-white tw-overflow-hidden"
    >
      <!-- Header with User Image and Organization -->
      <div>
        <div class="tw-flex tw-items-center tw-justify-between">
          <div class="tw-border-[1.5px] tw-border-gray-200 tw-rounded-[12px]">
            <img
              class="tw-w-[80px] tw-h-[80px] tw-rounded-[12px] tw-object-contain"
              :src="product.userImage"
              alt="User Image"
            />
          </div>
          <span
            class="tw-bg-[#24B2E3] tw-text-[12px] tw-text-white tw-text-xs tw-font-medium tw-py-[12px] tw-px-[16px] tw-rounded-[124px]"
          >
            {{ product.productType || 'No Category' }}
          </span>
        </div>
        <h4 class="tw-text-gray-500 tw-text-sm mb-1 mt-4">{{ product.organization }}</h4>
        <h2 class="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-3">
          {{ product.title || 'No Title Available' }}
        </h2>
        <p class="tw-text-[14px] tw-h-[144px] tw-text-[#515151] tw-font-[350] tw-mb-4">
          {{ product.description || 'No description available.' }}
        </p>
      </div>

      <!-- Body with Product Details -->
      <div class="p-4 tw-justify-between tw-flex tw-flex-col">
        <!-- Tags Section -->
        <div
          class="tw-py-[12px] tw-flex-wrap tw-gap-[7px] tw-border-t tw-border-[#F4F4F4] tw-border-b tw-flex"
        >
          <span
            v-for="tag in product.geographicCoverage"
            :key="tag"
            class="tw-text-[12px] tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]"
          >
            {{ tag }}
          </span>
        </div>

        <!-- "Más Información" Button -->
        <div class="tw-border-gray-200 tw-p-4 tw-text-center">
          <div
            class="tw-bg-white tw-cursor-pointer tw-border tw-border-[#24B2E3] hover:tw-bg-[#24B2E3] hover:tw-text-white tw-text-[#24B2E3] tw-text-sm tw-font-medium tw-py-2 tw-px-2 tw-rounded-[12px]"
            @click="handleMoreInfo(product.id)"
          >
            Más información
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
