<script setup lang="ts">
import ArrowDownIcon from '@/assets/svg/arrow-down.svg'
import { RouterLink } from 'vue-router'
import ViewEyeIcon from '@/assets/svg/view-eye.svg'
import EditIcon from '@/assets/svg/edit-icon.svg'
import { ref } from 'vue'
import AddUserModel from '@/components/UI/AddUser-Modal/AddUser.vue'

interface UserData {
  name: string
  email: string
  password: string
}

const isModalOpen = ref(false)
const modalMode = ref('add') // "add" or "edit"
const selectedUser = ref<UserData | null>(null)

const props = defineProps<{
  columns: { key: string; label: string; align: string }[]
  rowData: { [key: string]: string }[]
  onSort: (key: string) => void
  onDisable?: (index: number) => void
  link: string
  variant?: 'default' | 'action'
}>()

const computedVariant = props.variant || 'default'

const renderCell = (row: { [key: string]: string }, columnKey: string) => {
  switch (columnKey) {
    case 'name':
      return row.name
    case 'email':
      return row.email
    case 'password':
      return row.password
    case 'usertype':
      return row.usertype
    default:
      return ''
  }
}

const handleSort = (key: string) => {
  props.onSort(key)
}

const handleDisableUser = (index: number) => {
  if (props.onDisable) {
    props.onDisable(index)
  }
}

// Open modal for editing a user
const openEditUserModal = (user: UserData) => {
  modalMode.value = 'edit'
  selectedUser.value = user
  isModalOpen.value = true
}

// Close modal
const closeModal = () => {
  isModalOpen.value = false
}

// Save user (add or edit)
const saveUser = (userData: UserData) => {
  console.log('Saving user:', userData)
  closeModal()
}
</script>

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
                <ViewEyeIcon />

                <button
                  @click="
                    openEditUserModal({ name: 'John Doe', email: 'john@example.com', password: '12345678' })
                  "
                  class="tw-text-white tw-px-4 tw-py-2 tw-rounded"
                >
                  <EditIcon />
                </button>
              </div>

              <div
                v-if="column.key === 'disableuser'"
                class="tw-flex tw-items-center tw-justify-center tw-gap-2"
              >
                <v-switch
                  v-model="rowData.disableuser"
                  hide-details
                  inset
                  :color="rowData.disableuser ? 'success' : 'error'"
                  @change="handleDisableUser(index)"
                />
              </div>
              <div v-else>
                {{ renderCell(rowData, column.key) }}
              </div>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
    <AddUserModel
      :isOpen="isModalOpen"
      :mode="modalMode"
      :userData="selectedUser || undefined"
      @close="closeModal"
      @saveUser="saveUser"
    />
  </div>
</template>
