<script setup lang="ts">
import CardsComponent from './CardsComponent.vue'
import { ref } from 'vue'

interface Option {
  key: string
  label: string
}

// Separate states for each dropdown
const selectedProductType = ref<Option>({ key: 'all', label: 'All' })
const selectedStage = ref<Option>({ key: 'all', label: 'All' })
const selectedOrganization = ref<Option>({ key: 'all', label: 'All' })
const selectedLocation = ref<Option>({ key: 'all', label: 'All' })

// Options for dropdowns
const productTypeOptions = ref<Option[]>([
  { key: 'all', label: 'All' },
  { key: 'credit', label: 'Credit' },
  { key: 'factoring', label: 'Factoring' },
  { key: 'fintech', label: 'Fintech' },
  { key: 'bank', label: 'Bank Guarantee' },
])

const stageOptions = ref<Option[]>([
  { key: 'all', label: 'All' },
  { key: 'startup', label: 'Startup' },
  { key: 'growth', label: 'Growth' },
])

const organizationOptions = ref<Option[]>([
  { key: 'all', label: 'All' },
  { key: 'private', label: 'Private' },
  { key: 'government', label: 'Government' },
])

const locationOptions = ref<Option[]>([
  { key: 'all', label: 'All' },
  { key: 'us', label: 'United States' },
  { key: 'uk', label: 'United Kingdom' },
  { key: 'ca', label: 'Canada' },
])

const handleDropdownSelect = (option: Option, type: string) => {
  console.log(`Selected ${type}:`, option)
}
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
      <CardsComponent />
    </div>
  </div>
</template>
