<template>
  <div class="tw-overflow-x-auto">
    <table class="tw-table-auto tw-w-full">
      <thead class="">
        <tr
          class="tw-border-b tw-border-[#F1F1F5] tw-text-base tw-font-medium tw-capitalize tw-text-[#8D98AF]"
        >
          <th class="tw-px-4 tw-py-6 tw-cursor-pointer" @click="handleSort('sr')">
            <div class="tw-flex tw-items-center tw-justify-start tw-gap-3.5">
              Sr# <ArrowDownIcon />
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
          v-for="(rowData, index) in props.rowData"
          :key="index"
          class="tw-whitespace-nowrap hover:tw-bg-gray-100 tw-border-b tw-border-[#F1F1F5] tw-text-sm tw-font-normal tw-capitalize tw-text-[#0E0E0E]"
        >
          <RouterLink
            v-if="computedVariant === 'default'"
            :to="`${props.link}/view/${index}`"
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
              <div
                v-if="column.key === 'action'"
                class="tw-flex tw-items-center tw-justify-center tw-gap-2"
              >
                <RouterLink
                  :to="`${props.link}/view/${index}`"
                  class="tw-border-[1px] hover:tw-bg-gray-200 tw-border-[#F2F2F2] tw-rounded-[10px] tw-p-2 tw-cursor-pointer"
                >
                  <ViewEyeIcon />
                </RouterLink>
                <RouterLink
                  :to="`${props.link}/edit/${index}`"
                  class="tw-border-[1px] hover:tw-bg-gray-200 tw-border-[#F2F2F2] tw-rounded-[10px] tw-p-2 tw-cursor-pointer"
                >
                  <EditIcon />
                </RouterLink>
                <button
                  v-if="props.onDelete"
                  @click="deleteItem(index)"
                  class="tw-border-[1px] hover:tw-bg-red-200 tw-border-[#F2F2F2] tw-rounded-[10px] tw-p-2 tw-cursor-pointer"
                >
                  <DeleteIcon />
                </button>
              </div>
              <div v-else>
                {{ renderCell(rowData, column.key) }}
              </div>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import ArrowDownIcon from '@/assets/svg/arrow-down.svg'
import { RouterLink } from 'vue-router'
import ViewEyeIcon from '@/assets/svg/view-eye.svg'
import EditIcon from '@/assets/svg/edit-icon.svg'
import DeleteIcon from '@/assets/svg/delete-icon.svg'

const props = defineProps<{
  columns: { key: string; label: string; align: string }[]
  rowData: { [key: string]: string }[]
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
</script>
 