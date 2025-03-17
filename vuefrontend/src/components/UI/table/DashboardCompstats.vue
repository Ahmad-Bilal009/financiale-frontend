<script setup lang="ts">
import ArrowDownIcon from '@/assets/svg/arrow-down.svg'
import { defineProps, computed, ref } from 'vue'

const props = defineProps<{
  columns: { key: string; label: string; align: string }[]
  rowData: any[]
  onSort: (key: string) => void
  link: string
  variant?: 'default' | 'action'
}>()



const renderCell = (row: { [key: string]: any }, columnKey: string) => {
  return row[columnKey] || '0'
}

const handleSort = (key: string) => {
  props.onSort(key)
}

const itemsPerPage = 5
const currentPage = ref(1)
const totalPages = computed(() => Math.ceil(props.rowData.length / itemsPerPage))
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return props.rowData.slice(start, start + itemsPerPage)
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<template>
  <div >
    <div class="tw-overflow-x-auto">
      <table class="tw-table-auto tw-w-full">
        <thead>
          <tr class="tw-border-b tw-border-[#F1F1F5] tw-text-base tw-font-medium tw-text-[#8D98AF]">
            <th class="tw-px-4 tw-py-6 tw-cursor-pointer" @click="handleSort('id')">
              <div class="tw-flex tw-items-center tw-gap-3.5"> ID <ArrowDownIcon /> </div>
            </th>
            <th v-for="column in props.columns" :key="column.key" class="tw-px-4 tw-py-6 tw-cursor-pointer" @click="handleSort(column.key)">
              <div class="tw-flex tw-items-center tw-gap-3.5"> {{ column.label }} <ArrowDownIcon /> </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in paginatedData" :key="index" class="tw-border-b tw-border-[#F1F1F5]">
            <td class="tw-px-4 tw-py-[27px]">{{ index + 1 }}</td>
            <td v-for="column in props.columns" :key="column.key" class="tw-px-4 tw-py-[27px]">
              {{ renderCell(row, column.key) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="tw-flex tw-justify-between tw-mt-9">
      <span>Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, props.rowData.length) }} Items</span>
      <div class="tw-flex tw-gap-2">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="tw-p-2 tw-border tw-rounded">&lt;</button>
        <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="['tw-px-3 tw-py-1 tw-rounded', currentPage === page ? 'tw-bg-[#192854] tw-text-white' : 'tw-text-[#8D98AF]']">
          {{ page }}
        </button>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="tw-p-2 tw-border tw-rounded">&gt;</button>
      </div>
    </div>
  </div>
</template>
