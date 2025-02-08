<script setup lang="ts">
import ButtonComp from '@/components/UI/Button/ButtonComp.vue'
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue'
import { columnsVariant2, productsVariant2 } from '@/Data/data'
import TableComp from '@/components/UI/table/TableComp.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import DeleteModel from '@/components/UI/Delete-Model/DeleteModel.vue'
import { ref } from 'vue'
// Reactive state to control modal visibility
const isModalOpen = ref(false)

// Function to open the modal
function openModal() {
  isModalOpen.value = true
}

// Function to handle the 'close' event
function handleClose() {
  isModalOpen.value = false
}

// Function to handle the 'delete' event
function handleDelete() {
  console.log('Item deleted')
  // Add logic to delete the item here
  isModalOpen.value = false
}



function addProduct() {
  router.push('/products/add')
  console.log('add product')
}

function search(value: string) {
  console.log(value)
}

const handleSort = (key: string) => {
  console.log(`Sorting by: ${key}`)
}

function deleteProduct(index: number) {
  console.log(`Deleting yes item at index: ${index}`)
  openModal()
}
</script>

<template>
  <div class="tw-flex tw-flex-col tw-mt-12 tw-gap-12">
    <!-- header -->
    <div class="tw-flex tw-justify-between tw-items-center">
      <div class="tw-text-3xl tw-font-medium">Product Listings</div>
      <div class="tw-flex tw-gap-5 tw-items-center">
        <SearchBar :onSearch="search" placeholder="Search here..." />
        <ButtonComp text="+ Add Product" @click="addProduct" />
      </div>
    </div>
    <!-- header -->

    <!-- Content -->
    <div class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
      <TableComp
        :columns="columnsVariant2"
        :rowData="productsVariant2"
        @sort="handleSort"
        link="/products"
        variant="action"
        @delete="deleteProduct"
      />
    </div>

    <DeleteModel :isOpen="isModalOpen" @close="handleClose" @delete="handleDelete" />
    <!-- Content -->
    <!-- <ButtonComp text="Get 4-digit code" variant="darkBlue" width="w-[361px]" @click="addProduct" /> -->
  </div>
</template>
