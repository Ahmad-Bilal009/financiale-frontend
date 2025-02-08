<script setup lang="ts">
import { columnsVariant2, productsVariant2 } from '@/Data/approvaldata'
import TableComp from '@/components/UI/ApprovalTable/TableComp.vue'


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
    <div class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
      <TableComp
        :columns="columnsVariant2"
        :rowData="productsVariant2"
        @sort="handleSort"
        link="/products"
        variant="action"
        @approve="approveProduct"
        @reject="rejectProduct"
      />
    </div>
</template>
