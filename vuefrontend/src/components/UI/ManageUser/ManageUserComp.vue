<script setup lang="ts">
import { columnsVariant2, productsVariant2 } from '@/Data/User'
import TableComp from '@/components/UI/ManageUser/UserComp.vue'

const handleSort = (key: string) => {
  console.log(`Sorting by: ${key}`)
}
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
    <TableComp
      :columns="columnsVariant2"
      :rowData="productsVariant2"
      @sort="handleSort"
      variant="action"
      link="/manage-users"
    />
  </div>
</template>
