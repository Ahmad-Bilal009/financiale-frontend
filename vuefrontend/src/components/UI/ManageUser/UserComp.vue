<script setup lang="ts">
import ArrowDownIcon from '@/assets/svg/arrow-down.svg'
import { RouterLink } from 'vue-router'
import ViewEyeIcon from '@/assets/svg/view-eye.svg'
import EditIcon from '@/assets/svg/edit-icon.svg'
import { ref, defineProps, computed } from 'vue'
import axios from 'axios'
import AddUserModel from '@/components/UI/AddUser-Modal/AddUser.vue'

interface UserData {
  id: number
  name: string
  email: string
  password?: string
  role: string
  isDisabled: boolean
}

const isModalOpen = ref(false)
const modalMode = ref<'add' | 'edit'>('add')
const selectedUser = ref<UserData | null>(null)

const props = defineProps<{
  columns: { key: string; label: string; align: string }[]
  rowData: UserData[]
  onSort: (key: string) => void
  link: string
  variant?: 'default' | 'action'
}>()

const computedVariant = computed(() => props.variant || 'default')

// ✅ Handle sorting
const handleSort = (key: string) => {
  props.onSort(key)
}

// ✅ Open modal for editing a user
const openEditUserModal = (user: UserData) => {
  modalMode.value = 'edit'
  selectedUser.value = user
  isModalOpen.value = true
}

// ✅ Close modal
const closeModal = () => {
  isModalOpen.value = false
}

// ✅ Save user (Add or Edit)
const saveUser = (userData: UserData) => {
  console.log('Saving user:', userData)
  closeModal()
}

// ✅ Toggle user enable/disable
const handleDisableUser = async (user: UserData) => {
  try {
    await axios.put(`http://localhost:5001/api/admin/users/${user.id}/toggle-disable`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })

    user.isDisabled = !user.isDisabled
  } catch (error) {
    console.error('❌ Failed to update user status:', error)
  }
}

// ✅ Render table cell data
const renderCell = (row: UserData, columnKey: string) => {
  switch (columnKey) {
    case 'name': return row.name
    case 'email': return row.email
    case 'role': return row.role
    case 'isDisabled': return row.isDisabled ? 'Disabled' : 'Active'
    default: return ''
  }
}
</script>

<template>
  <div class="tw-overflow-x-auto">
    <table class="tw-table-auto tw-w-full">
      <thead>
        <tr class="tw-border-b tw-text-base tw-font-medium tw-capitalize tw-text-[#8D98AF]">
          <th class="tw-px-4 tw-py-6 tw-cursor-pointer" @click="handleSort('sr')">
            <div class="tw-flex tw-items-center tw-gap-3.5">
              Sr# <ArrowDownIcon />
            </div>
          </th>
          <th
            v-for="column in props.columns"
            :key="column.key"
            class="tw-px-4 tw-py-6 tw-cursor-pointer"
            @click="handleSort(column.key)"
          >
            <div class="tw-flex tw-items-center tw-gap-3.5">
              {{ column.label }} <ArrowDownIcon />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(rowData, index) in props.rowData"
          :key="rowData.id"
          class="tw-border-b tw-text-sm tw-font-normal tw-text-[#0E0E0E]"
        >
          <td class="tw-px-4 tw-py-[27px] text-left">{{ index + 1 }}</td>
          <td v-for="column in props.columns" :key="column.key" class="tw-px-4 tw-py-[27px]">
            <!-- ✅ Action Buttons -->
            <div v-if="column.key === 'action'" class="tw-flex tw-items-center tw-gap-2">
              <ViewEyeIcon />
              <button @click="openEditUserModal(rowData)" class="tw-text-white tw-px-4 tw-py-2 tw-rounded">
                <EditIcon />
              </button>
            </div>

            <!-- ✅ Enable/Disable Toggle -->
            <div v-else-if="column.key === 'isDisabled'" class="tw-flex tw-items-center tw-gap-2">

              <v-switch
                  v-model="rowData.isDisabled"
                  hide-details
                  inset
                  :color="rowData.isDisabled ? 'success' : 'error'"
                  :checked="rowData.isDisabled"
                  @change="handleDisableUser(rowData)"
                />
            </div>

            <!-- ✅ Default Cell Rendering -->
            <div v-else>{{ renderCell(rowData, column.key) }}</div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- ✅ User Add/Edit Modal -->
    <AddUserModel
      :isOpen="isModalOpen"
      :mode="modalMode"
      :userData="selectedUser || undefined"
      @close="closeModal"
      @saveUser="saveUser"
    />
  </div>
</template>
