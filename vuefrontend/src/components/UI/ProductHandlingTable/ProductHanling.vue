<script setup lang="ts">
import TableComp from '@/components/UI/ApprovalTable/TableComp.vue'
import { ref } from 'vue'

// Define active filter
const activeFilter = ref<string>('default')

// Define table columns (Replace with actual columns)
const columns = ref([

])

// Define table data (Replace with actual data)
const rowData = ref([

])

// Sorting handler
const handleSort = (key: string) => {
  console.log(`Sorting by: ${key}`)
}

// Reject product handler
const rejectProduct = (index: number) => {
  console.log(`Rejecting product at index: ${index}`)
}
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
    <TableComp
      :columns="columns"
      :rowData="rowData"
      :activeFilter="activeFilter"
      @sort="handleSort"
      link="/products"
      variant="action"
      @reject="rejectProduct"
    />
  </div>
</template>
