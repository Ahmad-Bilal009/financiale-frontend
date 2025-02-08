<script setup lang="ts">
import { SuperAdmincolumns, SuperAdminproducts } from '@/Data/User'
import TableComp from '@/components/UI/ManageUser/UserComp.vue'

const handleSort = (key: string) => {
  console.log(`Sorting by: ${key}`)
}
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
    <TableComp
      :columns="SuperAdmincolumns"
      :rowData="SuperAdminproducts"
      @sort="handleSort"
      variant="action"
      link="/super-admin-manage-users"
    />
  </div>
</template>
