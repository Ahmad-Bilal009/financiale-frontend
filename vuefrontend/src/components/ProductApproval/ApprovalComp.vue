<script setup lang="ts">
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue'
import { columnsVariant3, productsVariant3 } from '@/Data/approvaldata'
import TableComp from '@/components/UI/ApprovalTable/TableComp.vue'
import ToggleComp from '@/components/UI/Toggle-Switch/ToggleComp.vue'
import DeleteModal from '@/components/UI/Delete-Model/DeleteModel.vue'
import { ref } from 'vue'

const isDeleteModalOpen = ref(false)

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
}

const deleteProduct = () => {
  console.log('Deleting product')
}

function search(value: string) {
  console.log(value)
}

const handleSort = (key: string) => {
  console.log(`Sorting by: ${key}`)
}

function approveProduct(index: number) {
  console.log(`Approving product at index: ${index}`)
}

function rejectProduct(index: number) {
  console.log(`Rejecting product at index: ${index}`)
}
</script>

<template>
  <div class="tw-flex tw-flex-col tw-mb-12 tw-mt-12 tw-gap-12">
    <!-- header -->
    <div class="tw-flex tw-justify-between tw-items-center">
      <div class="tw-text-3xl tw-font-medium">Product Approvals</div>
      <div class="tw-flex tw-gap-5 tw-items-center">
        <SearchBar :onSearch="search" placeholder="Search here..." />
        <ToggleComp />
      </div>
    </div>

    <!-- header -->

    <!-- Content -->
    <div class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
      <TableComp
        :columns="columnsVariant3"
        :rowData="productsVariant3"
        @sort="handleSort"
        link="/products"
        variant="action"
        @approve="approveProduct"
        @reject="rejectProduct"
      />
    </div>
    <DeleteModal :isOpen="isDeleteModalOpen" @close="closeDeleteModal" @delete="deleteProduct" />
  </div>
</template>
