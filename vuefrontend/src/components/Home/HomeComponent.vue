<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CardsComponent from './CardsComponent.vue'
import productService from '@/services/productServices'

interface Option {
  key: string
  label: string
}

// ** State Variables **
const selectedProductType = ref<Option>({ key: 'all', label: 'All' })
const selectedStage = ref<Option>({ key: 'all', label: 'All' })
const selectedOrganization = ref<Option>({ key: 'all', label: 'All' })
const selectedLocation = ref<Option>({ key: 'all', label: 'All' })
const products = ref<any[]>([]) // Holds all products from API
const userOrganizations = ref<Record<string, string>>({}) // Store userId to organization mapping

// ** Fetch Products from API **
const fetchProducts = async () => {
  try {
    const response = await productService.getProducts()
    products.value = response || []

    // Extract userId to organization mapping directly from products
    products.value.forEach(product => {
      userOrganizations.value[product.userId] = product.organization || 'Unknown'
    })
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

// ** Compute Unique Options for Filters **
const productTypeOptions = computed(() => {
  const types = new Set(products.value.map(product => product.productType))
  return [{ key: 'all', label: 'All' }, ...Array.from(types).map(type => ({ key: type, label: type }))]
})

const stageOptions = computed(() => {
  const stages = new Set(products.value.map(product => product.stageOfEntrepreneurship))
  return [{ key: 'all', label: 'All' }, ...Array.from(stages).map(stage => ({ key: stage, label: stage }))]
})

const organizationOptions = computed(() => {
  const orgs = new Set(products.value.map(product => product.User?.name || 'Unknown'))
  return [{ key: 'all', label: 'All' }, ...Array.from(orgs).map(org => ({ key: org, label: org }))]
})

const locationOptions = computed(() => {
  const cities = new Set(
    products.value
      .map(product => {
        const addressParts = product.contactDetail?.address.split(',')
        return addressParts && addressParts.length > 1 ? addressParts[1].trim() : ''
      })
      .filter(city => city !== '') // Remove empty values
  )
  return [{ key: 'all', label: 'All' }, ...Array.from(cities).map(city => ({ key: city, label: city }))]
})


// ** Compute Filtered Products **
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const productOrg = userOrganizations.value[product.userId] || 'Unknown'
    const city = product.address?.split(',')[1]?.trim() || ''

    return (
      (selectedProductType.value.key === 'all' || product.productType === selectedProductType.value.key) &&
      (selectedStage.value.key === 'all' || product.stageOfEntrepreneurship === selectedStage.value.key) &&
      (selectedOrganization.value.key === 'all' || productOrg === selectedOrganization.value.key) &&
      (selectedLocation.value.key === 'all' || city === selectedLocation.value.key)
    )
  })
})

// ** Fetch Data on Mount **
onMounted(fetchProducts)
</script>

<template>
  <div class="tw-mt-12 tw-flex tw-flex-col tw-gap-4">
    <!-- Header -->
    <div class="tw-text-[25px] tw-font-medium tw-leading-[48px] tw-text-primary md:tw-text-[40px]">
      Navegador Financiero
    </div>
    <div class="tw-text-[16px] tw-font-normal tw-leading-[32px] tw-text-black">
      Encuentra opciones de financiamiento para tu negocio.
    </div>

    <!-- Dropdown Filters -->
    <div class="tw-flex tw-flex-col tw-gap-6">
      <div class="tw-flex tw-flex-wrap tw-gap-4 tw-justify-between md:tw-justify-end">

        <!-- Product Type Dropdown -->
        <div class="tw-flex tw-flex-col tw-gap-2 tw-w-full md:tw-w-auto">
          <label class="tw-text-[12px] md:tw-text-[14px] tw-font-medium tw-leading-[20px] tw-text-dark-gray">
            Tipo de Producto
          </label>
          <select v-model="selectedProductType" class="tw-w-full md:tw-min-w-[150px] lg:tw-min-w-[180px] tw-bg-white tw-shadow tw-rounded-[8px] tw-p-2">
            <option v-for="option in productTypeOptions" :key="option.key" :value="option">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Stage Dropdown -->
        <div class="tw-flex tw-flex-col tw-gap-2 tw-w-full md:tw-w-auto">
          <label class="tw-text-[12px] md:tw-text-[14px] tw-font-medium tw-leading-[20px] tw-text-dark-gray">
            Etapa
          </label>
          <select v-model="selectedStage" class="tw-w-full md:tw-min-w-[150px] lg:tw-min-w-[180px] tw-bg-white tw-shadow tw-rounded-[8px] tw-p-2">
            <option v-for="option in stageOptions" :key="option.key" :value="option">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Organization Dropdown -->
        <div class="tw-flex tw-flex-col tw-gap-2 tw-w-full md:tw-w-auto">
          <label class="tw-text-[12px] md:tw-text-[14px] tw-font-medium tw-leading-[20px] tw-text-dark-gray">
            Organización
          </label>
          <select v-model="selectedOrganization" class="tw-w-full md:tw-min-w-[150px] lg:tw-min-w-[180px] tw-bg-white tw-shadow tw-rounded-[8px] tw-p-2">
            <option v-for="option in organizationOptions" :key="option.key" :value="option">
              {{ option.label }}
            </option>
          </select>
        </div>

        <!-- Location Dropdown -->
        <div class="tw-flex tw-flex-col tw-gap-2 tw-w-full md:tw-w-auto">
          <label class="tw-text-[12px] md:tw-text-[14px] tw-font-medium tw-leading-[20px] tw-text-dark-gray">
            Ubicación
          </label>
          <select v-model="selectedLocation" class="tw-w-full md:tw-min-w-[150px] lg:tw-min-w-[180px] tw-bg-white tw-shadow tw-rounded-[8px] tw-p-2">
            <option v-for="option in locationOptions" :key="option.key" :value="option">
              {{ option.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Cards Section -->
    <div class="tw-mt-6">
      <CardsComponent :products="filteredProducts" />
    </div>
  </div>
</template>
