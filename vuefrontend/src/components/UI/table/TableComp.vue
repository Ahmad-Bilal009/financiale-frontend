<script setup lang="ts">
import ArrowDownIcon from '@/assets/svg/arrow-down.svg'
import { RouterLink } from 'vue-router'
import ViewEyeIcon from '@/assets/svg/view-eye.svg'
import EditIcon from '@/assets/svg/edit-icon.svg'
import DeleteIcon from '@/assets/svg/delete-icon.svg'
import { defineProps, computed, ref } from 'vue'

const props = defineProps<{
  columns: { key: string; label: string; align: string }[]
  rowData: any[]
  onSort: (key: string) => void
  onDelete?: (index: number) => void
  link: string
  variant?: 'default' | 'action'
}>()

const computedVariant = props.variant || 'default'

const renderCell = (row: { [key: string]: string }, columnKey: string) => {
  switch (columnKey) {
    case 'title':
      return row.title
    case 'organization':
      return row.organization
    case 'location':
      return row.location
    case 'stage':
      return row.stage
    case 'status':
      return row.status
    default:
      return 'N/A'
  }
}

const handleSort = (key: string) => {
  props.onSort(key)
}

const deleteItem = (index: number) => {
  if (props.onDelete) {
    props.onDelete(index)
  }
}

const itemsPerPage = 10
const currentPage = ref(1)

// Calculate total pages
const totalPages = computed(() => Math.ceil(props.rowData.length / itemsPerPage))

// Get paginated data
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return props.rowData.slice(start, end)
})

// Change page
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<template>
  <div class="tw-overflow-x-auto">
    <table class="tw-table-auto tw-w-full">
      <thead>
        <tr class="tw-border-b tw-border-[#F1F1F5] tw-text-base tw-font-medium tw-capitalize tw-text-[#8D98AF]">
          <th class="tw-px-4 tw-py-6 tw-cursor-pointer" @click="handleSort('sr')">
            <div class="tw-flex tw-items-center tw-justify-start tw-gap-3.5">
             ID <ArrowDownIcon />
            </div>
          </th>
          <th
            v-for="column in props.columns"
            :key="column.key"
            :class="`tw-px-4 tw-py-6 tw-cursor-pointer tw-text-${column.align}`"
            @click="handleSort(column.key)"
          >
            <div :class="`tw-flex tw-items-center tw-justify-${column.align} tw-gap-3.5`">
              {{ column.label }} <ArrowDownIcon />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(rowData, index) in paginatedData"
          :key="index"
          class="tw-whitespace-nowrap hover:tw-bg-gray-100 tw-border-b tw-border-[#F1F1F5] tw-text-sm tw-font-normal tw-capitalize tw-text-[#0E0E0E]"
        >
          <RouterLink
            v-if="computedVariant === 'default'"
            :to="`${props.link}/view/${rowData.id}`"
            class="tw-contents"
          >
            <td class="tw-px-4 tw-py-[27px] text-left">{{ index + 1 }}</td>
            <td
              v-for="column in props.columns"
              :key="column.key"
              :class="`tw-px-4 tw-py-[27px] text-${column.align}`"
            >
              {{ renderCell(rowData, column.key) }}
            </td>
          </RouterLink>
          <template v-else>
            <td class="tw-px-4 tw-py-[27px] text-left">{{ index + 1 }}</td>
            <td
              v-for="column in props.columns"
              :key="column.key"
              :class="`tw-px-4 tw-py-[27px] text-${column.align}`"
            >
              <template v-if="column.key === 'status'">
                <span
                  class="tw-p-[8px] tw-rounded-[8px] tw-font-semibold tw-text-[12px] tw-uppercase"
                  :class="{
                    'tw-bg-[#D1FCF3] tw-text-[#0C796B] tw-border tw-border-[#18B3A0]': rowData.status?.toLowerCase() === 'approved',
                    'tw-bg-[#FFEDEA] tw-text-[#D21E1E] tw-border tw-border-[#F22424]': rowData.status?.toLowerCase() === 'rejected',
                    'tw-bg-[#D1E5FC] tw-text-[#1849B3] tw-border tw-border-[#1849B3]': rowData.status?.toLowerCase() === 'pending',
                  }"
                >
                  {{ rowData.status ? rowData.status.toUpperCase() : 'N/A' }}
                </span>
              </template>
              <template v-else-if="column.key === 'action'">
                <div class="tw-flex tw-items-center tw-justify-center tw-gap-2">
                  <RouterLink
                    :to="`${props.link}/view/${rowData.id}`"
                    class="tw-border-[1px] hover:tw-bg-gray-200 tw-border-[#F2F2F2] tw-rounded-[10px] tw-p-2 tw-cursor-pointer"
                  >
                    <ViewEyeIcon />
                  </RouterLink>
                  <RouterLink
                    :to="`${props.link}/edit/${rowData.id}`"
                    class="tw-border-[1px] hover:tw-bg-gray-200 tw-border-[#F2F2F2] tw-rounded-[10px] tw-p-2 tw-cursor-pointer"
                  >
                    <EditIcon />
                  </RouterLink>
                  <button
                    v-if="props.onDelete"
                    @click="deleteItem(Number(rowData.id))"
                    class="tw-border-[1px] hover:tw-bg-red-200 tw-border-[#F2F2F2] tw-rounded-[10px] tw-p-2 tw-cursor-pointer"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </template>
              <template v-else>
                {{ rowData[column.key] || 'N/A' }}
              </template>
            </td>
          </template>
        </tr>
      </tbody>

    </table>


    <div class="tw-flex tw-justify-between tw-items-center tw-mt-9">
      <span>Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, props.rowData.length) }} Items</span>

      <div class="tw-flex tw-items-center tw-gap-2">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="tw-p-2 tw-text-[#8D98AF] tw-rounded tw-border tw-bg-white tw-cursor-pointer">
          &lt;
        </button>

        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="['tw-px-3 tw-py-1 tw-rounded', currentPage === page ? 'tw-bg-[#192854] tw-text-white' : ' tw-text-[#8D98AF]']"
        >
          {{ page }}
        </button>

        <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="tw-p-2 tw-text-[#8D98AF] tw-rounded tw-border tw-bg-white tw-cursor-pointer">
          &gt;
        </button>
      </div>
    </div>

  </div>
</template>
