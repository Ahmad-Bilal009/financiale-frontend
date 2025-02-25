<script setup lang="ts">
import ArrowDownIcon from '@/assets/svg/arrow-down.svg'
import { RouterLink } from 'vue-router'
import ViewEyeIcon from '@/assets/svg/view-eye.svg'

// **Define Props**
const props = defineProps<{
  columns: { key: string; label: string; align: string }[]
  rowData: { [key: string]: string }[]
  activeFilter: string
  onSort: (key: string) => void
  onDelete?: (index: number) => void
  onApprove?: (index: number) => void
  link: string
  variant?: 'default' | 'action'
}>()

const computedVariant = props.variant || 'default'

// **Render Cell Content**
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
    case 'createdAt':
      return row.createdAt
    case 'status': // Ensure the status column is used
      return row.status
    default:
      return ''
  }
}

// **Sorting Handler**
const handleSort = (key: string) => {
  props.onSort(key)
}

// **Approve Handler**
const approveItem = (index: number) => {
  if (props.onApprove) {
    props.onApprove(index)
  }
}

// **Reject (Delete) Handler**
const deleteItem = (index: number) => {
  if (props.onDelete) {
    props.onDelete(index)
  }
}
</script>

---

### **Fixed Template**
```vue
<template>
  <div class="tw-overflow-x-auto">
    <table class="tw-table-auto tw-w-full">
      <thead>
        <tr class="tw-border-b tw-text-base tw-font-medium tw-capitalize tw-text-[#8D98AF]">
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
          v-for="(rowData, index) in props.rowData"
          :key="index"
          class="tw-whitespace-nowrap hover:tw-bg-gray-100 tw-border-b tw-text-sm tw-font-normal tw-text-[#0E0E0E]"
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
              :class="`tw-px-1 tw-py-[27px] text-${column.align}`"
            >
              <!-- View Button -->
              <div
                v-if="column.key === 'view'"
                class="tw-flex tw-items-center tw-justify-center tw-gap-2"
              >
                <RouterLink
                  :to="`${props.link}/view/${index}`"
                  class="tw-border-[1px] hover:tw-bg-gray-200 tw-border-[#F2F2F2] tw-rounded-[10px] tw-p-2 tw-cursor-pointer"
                >
                  <ViewEyeIcon />
                </RouterLink>
              </div>

              <!-- Approve & Reject Buttons (Dynamic) -->
              <div
                v-if="column.key === 'action'"
                class="tw-flex tw-items-center tw-justify-center tw-gap-2"
              >
                <!-- "All" Filter: Show Correct Buttons Based on Status -->
                <template v-if="props.activeFilter === 'all'">
                  <button
                    v-if="rowData.status === 'approved'"
                    class="tw-bg-[#FA3D34] hover:tw-bg-[#d92f2d] tw-text-white tw-text-sm tw-px-4 tw-py-2 tw-rounded tw-font-medium"
                    @click="deleteItem(index)"
                  >
                    RECHAZAR
                  </button>
                  <button
                    v-if="rowData.status === 'rejected'"
                    class="tw-bg-[#0BA5EC] hover:tw-bg-[#0990cc] tw-text-white tw-text-sm tw-px-4 tw-py-2 tw-rounded tw-font-medium"
                    @click="approveItem(index)"
                  >
                    APROBAR
                  </button>
                  <template v-if="rowData.status !== 'approved' && rowData.status !== 'rejected'">
                    <button
                      class="tw-bg-[#0BA5EC] hover:tw-bg-[#0990cc] tw-text-white tw-text-sm tw-px-4 tw-py-2 tw-rounded tw-font-medium"
                      @click="approveItem(index)"
                    >
                      APROBAR
                    </button>
                    <button
                      class="tw-bg-[#FA3D34] hover:tw-bg-[#d92f2d] tw-text-white tw-text-sm tw-px-4 tw-py-2 tw-rounded tw-font-medium tw-ml-2"
                      @click="deleteItem(index)"
                    >
                      RECHAZAR
                    </button>
                  </template>
                </template>

                <!-- "Approved" Filter: Show ONLY "Reject" -->
                <button
                  v-if="props.activeFilter === 'approved'"
                  class="tw-bg-[#FA3D34] hover:tw-bg-[#d92f2d] tw-text-white tw-text-sm tw-px-4 tw-py-2 tw-rounded tw-font-medium"
                  @click="deleteItem(index)"
                >
                  RECHAZAR
                </button>

                <!-- "Rejected" Filter: Show ONLY "Approve" -->
                <button
                  v-if="props.activeFilter === 'rejected'"
                  class="tw-bg-[#0BA5EC] hover:tw-bg-[#0990cc] tw-text-white tw-text-sm tw-px-4 tw-py-2 tw-rounded tw-font-medium"
                  @click="approveItem(index)"
                >
                  APROBAR
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
