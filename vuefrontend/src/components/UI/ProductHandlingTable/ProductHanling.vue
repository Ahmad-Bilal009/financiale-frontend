<script setup lang="ts">
import { HandlingColumns, HandlingProducts } from '@/Data/data'
import TableComp from '@/components/UI/ApprovalTable/TableComp.vue'
import { ref } from 'vue'

const activeFilter = ref<string>('default')

const handleSort = (key: string) => {
  console.log(`Sorting by: ${key}`)
}



function rejectProduct(index: number) {
  console.log(`Rejecting product at index: ${index}`)
}
</script>

<template>
    <div class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
      <TableComp
        :columns="HandlingColumns"
        :rowData="HandlingProducts"
        :activeFilter="activeFilter"
        @sort="handleSort"
        link="/products"
        variant="action"

        @reject="rejectProduct"
      />
    </div>
</template>
