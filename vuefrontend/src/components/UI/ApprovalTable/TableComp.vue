<script setup lang="ts">
import ArrowDownIcon from '@/assets/svg/arrow-down.svg'
import { RouterLink } from 'vue-router'
import ViewEyeIcon from '@/assets/svg/view-eye.svg'
import { defineProps, computed, ref } from 'vue'

// Define Props
const props = defineProps<{
  columns: { key: string; label: string; align: string }[]
  rowData: any[] //  Allows numbers (for IDs)
  activeFilter: string
  onSort: (key: string) => void
  onApprove?: (productId: number) => void
  onReject?: (productId: number) => void
  onDelete?: (index: number) => void
  link: string
  variant?: 'default' | 'action'
}>()

const computedVariant = props.variant || 'default'

// Render Cell Content
const renderCell = (row: { [key: string]: string | number }, columnKey: string) => {
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
    case 'visitorCount':
      return row.visitorCount
    case 'status':
      return row.status
    default:
      return ''
  }
}

// Sorting Handler
const handleSort = (key: string) => {
  props.onSort(key)
}

const deleteItem = (index: number) => {
  if (props.onDelete) {
    props.onDelete(index)
  }
}

// Approve Product
const approveItem = (productId: number) => {
  if (props.onApprove) {
    props.onApprove(productId)
  }
}

// Reject Product
const rejectItem = (productId: number) => {
  if (props.onReject) {
    props.onReject(productId)
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
  <div >
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
            v-for="(rowData, index) in paginatedData"
            :key="index"
            class="tw-whitespace-nowrap hover:tw-bg-gray-100 tw-border-b tw-text-sm tw-font-normal tw-text-[#0E0E0E]"
          >
            <!-- Default View -->
            <RouterLink
              v-if="computedVariant === 'default'"
              :to="`${props.link}/view/${rowData.id}`"
              class="tw-contents"
            >
              <td class="tw-px-4 tw-py-[27px] text-left">{{ rowData.id }}</td>
              <td
                v-for="column in props.columns"
                :key="column.key"
                :class="`tw-px-4 tw-py-[27px] text-${column.align}`"
              >
                {{ renderCell(rowData, column.key) }}
              </td>
            </RouterLink>

            <!-- Action Buttons -->
            <template v-else>
              <td class="tw-px-4 tw-py-[27px] text-left">{{ rowData.id }}</td>
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
                    :to="`${props.link}/view/${rowData.id}`"
                    class="tw-border-[1px] hover:tw-bg-gray-200 tw-border-[#F2F2F2] tw-rounded-[10px] tw-p-2 tw-cursor-pointer"
                  >
                    <ViewEyeIcon />
                  </RouterLink>
                </div>

                <!-- Action Buttons: Approve, Reject -->
                <div
                  v-if="column.key === 'action'"
                  class="tw-flex tw-items-center tw-justify-center tw-gap-2"
                >
                  <!-- If Approved, Show Reject Button -->
                  <button
                    v-if="rowData.status === 'approved'"
                    class="tw-bg-[#FA3D34] hover:tw-bg-[#d92f2d] tw-text-white tw-text-sm tw-px-4 tw-py-2 tw-rounded tw-font-medium"
                    @click="rejectItem(Number(rowData.id))"
                  >
                    RECHAZAR
                  </button>

                  <!-- If Rejected, Show Approve Button -->
                  <button
                    v-if="rowData.status === 'rejected'"
                    class="tw-bg-[#0BA5EC] hover:tw-bg-[#0990cc] tw-text-white tw-text-sm tw-px-4 tw-py-2 tw-rounded tw-font-medium"
                    @click="approveItem(Number(rowData.id))"
                  >
                    APROBAR
                  </button>

                  <!-- If Pending, Show Both Approve & Reject -->
                  <template v-if="rowData.status !== 'approved' && rowData.status !== 'rejected'">
                    <button
                      class="tw-bg-[#0BA5EC] hover:tw-bg-[#0990cc] tw-text-white tw-text-sm tw-px-4 tw-py-2 tw-rounded tw-font-medium"
                      @click="approveItem(Number(rowData.id))"
                    >
                      APROBAR
                    </button>
                    <button
                      class="tw-bg-[#FA3D34] hover:tw-bg-[#d92f2d] tw-text-white tw-text-sm tw-px-4 tw-py-2 tw-rounded tw-font-medium tw-ml-2"
                      @click="rejectItem(Number(rowData.id))"
                    >
                      RECHAZAR
                    </button>
                  </template>
                </div>

                <div
                v-if="column.key === 'delete'"
                class="tw-flex tw-items-center tw-justify-center tw-gap-2"
              >
                <button
                  v-if="props.onDelete"
                  @click="deleteItem(Number(rowData.id))"
                  class="tw-bg-[#FA3D34] hover:tw-bg-[#d92f2d] tw-text-white tw-text-sm tw-px-4 tw-py-2 tw-rounded tw-font-medium tw-ml-2"
                >
                  Remove
                </button>
              </div>

                <!-- Default Display -->
                <div v-else>
                  {{ renderCell(rowData, column.key) }}
                </div>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="tw-flex tw-justify-between tw-items-center tw-mt-9">
      <span>Mostrando {{ (currentPage - 1) * itemsPerPage + 1 }} a {{ Math.min(currentPage * itemsPerPage, props.rowData.length) }} elementos</span>

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
