<script setup lang="ts">
import ArrowDownIcon from '@/assets/svg/arrow-down.svg'
import { RouterLink } from 'vue-router'
import ViewEyeIcon from '@/assets/svg/view-eye.svg'
import EditIcon from '@/assets/svg/edit-icon.svg'
import { defineProps, computed } from 'vue'
import userService from '@/services/userService'
import AddUserModel from '@/components/UI/AddUser-Modal/AddUser.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

interface UserData {
  id: number
  name: string
  email: string
  password?: string
  role: string
  isDisabled: boolean
}

const props = defineProps<{
  columns: { key: string; label: string; align: string }[]
  rowData: UserData[]
  onSort: (key: string) => void
  onToggleStatus?: (userId: number) => void  //  Make it optional to prevent errors
  link: string
  variant?: 'default' | 'action'
}>()


const computedVariant = computed(() => props.variant || 'default')

//  Handle sorting
const handleSort = (key: string) => {
  props.onSort(key)
}

const toggleUserStatus = async (user: UserData) => {
  if (!user.id) {
    toast.error("⚠️ Error: User ID is missing!");
    return;
  }

  try {
    console.log(`🔄 Toggling status for user ID: ${user.id}`);

    //  Call API to toggle status
    const response = await userService.toggleUserStatus(user.id);
    toast.success(' User status updated!');

    //  Check if function exists before calling it
    if (props.onToggleStatus) {
      props.onToggleStatus(user.id);
    } else {
      console.warn("⚠️ onToggleStatus is not provided by parent.");
    }

  } catch (error) {
    toast.error(` Failed to update user status: ${error}`);
  }
}


//  Render table cell data
const renderCell = (row: UserData, columnKey: string) => {
  switch (columnKey) {
    case 'name': return row.name
    case 'email': return row.email
    case 'role': return row.role
    case 'password': return row.password
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
          <th class="tw-px-4 tw-py-4 tw-cursor-pointer" @click="handleSort('sr')">
            <div class="tw-flex tw-items-center tw-gap-3.5">
             ID <ArrowDownIcon />
            </div>
          </th>
          <th
            v-for="column in props.columns"
            :key="column.key"
            class="tw-px-4 tw-py-4 tw-cursor-pointer"
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
          <td class="tw-px-4 tw-py-[15px] text-left">{{ index + 1 }}</td>
          <td v-for="column in props.columns" :key="column.key" class="tw-px-4 tw-py-[12px]">
            <!--  Action Buttons -->
            <div v-if="column.key === 'action'" class="tw-flex tw-items-center tw-gap-2">
              <div class="tw-border-[1px] hover:tw-bg-gray-200 tw-border-[#F2F2F2] tw-rounded-[10px] tw-p-2 tw-cursor-pointer">
                <ViewEyeIcon />
              </div>

              <button @click="$emit('editUser', rowData)" class="tw-border-[1px] hover:tw-bg-gray-200 tw-border-[#F2F2F2] tw-rounded-[10px] tw-p-2 tw-cursor-pointer">
                <EditIcon />
              </button>
            </div>

            <!--  Enable/Disable Toggle -->
            <div v-else-if="column.key === 'isDisabled'" class="tw-flex tw-items-center tw-gap-2">
              <v-switch
                :model-value="rowData.isDisabled"
                hide-details
                inset
                :color="rowData.isDisabled ? 'success' : 'success'"
                @change="toggleUserStatus(rowData)"
              />
            </div>

            <div v-else-if="column.key === 'delete' && computedVariant === 'action'">
              <button
                  class="tw-bg-[#FA3D34] hover:tw-bg-[#d92f2d] tw-text-white tw-text-sm tw-px-4 tw-py-2 tw-rounded tw-font-medium tw-ml-2"
                  @click="openModal"
                >
                  Delete
                </button>
            </div>

            <!--  Default Cell Rendering -->
            <div v-else>{{ renderCell(rowData, column.key) }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
