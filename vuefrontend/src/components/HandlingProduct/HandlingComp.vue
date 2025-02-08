<script setup lang="ts">
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue'
import { HandlingColumns, HandlingProducts } from '@/Data/data'
import HandlingTableComp from '@/components/UI/ProductHandlingTable/HandlingTableComp.vue'

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
      </div>
    </div>
    <!-- header -->

    <!-- Content -->
    <div class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
      <HandlingTableComp
        :columns="HandlingColumns"
        :rowData="HandlingProducts"
        @sort="handleSort"
        link="/products"
        variant="action"
        @approve="approveProduct"
        @reject="rejectProduct"
      />
    </div>
  </div>
</template>
