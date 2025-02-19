<script setup lang="ts">
import ArrowDownIcon from '@/assets/svg/arrow-down.svg'
import { RouterLink } from 'vue-router'
import ViewEyeIcon from '@/assets/svg/view-eye.svg'
import EditIcon from '@/assets/svg/edit-icon.svg'
import DeleteIcon from '@/assets/svg/delete-icon.svg' // ✅ Ensure correct import
import { defineProps, computed } from 'vue'
import userService from '@/services/userService'
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
  onDelete?: (index: number) => void
  onToggleStatus?: (userId: number) => void
  link: string
  variant?: 'default' | 'action'
}>()

const computedVariant = computed(() => props.variant || 'default')

// Handle Sorting
const handleSort = (key: string) => {
  props.onSort(key)
}

// Toggle User Status
const toggleUserStatus = async (user: UserData) => {
  if (!user.id) {
    toast.error("⚠️ Error: ¡Falta el ID de usuario!")
    return
  }

  try {
    console.log(`🔄 Cambiando estado para el usuario ID: ${user.id}`)
    await userService.toggleUserStatus(user.id)
    toast.success('✅ ¡Estado del usuario actualizado!')

    if (props.onToggleStatus) {
      props.onToggleStatus(user.id)
    } else {
      console.warn("⚠️ onToggleStatus no fue proporcionado por el padre.")
    }
  } catch (error) {
    toast.error(`❌ No se pudo actualizar el estado del usuario: ${error}`)
  }
}

// Render Cell Data
const renderCell = (row: UserData, columnKey: string) => {
  switch (columnKey) {
    case 'name': return row.name
    case 'email': return row.email
    case 'role': return row.role
    case 'password': return row.password
    case 'isDisabled': return row.isDisabled ? 'Deshabilitado' : 'Activo'
    default: return ''
  }
}

// Delete Item
const deleteItem = (index: number) => {
  if (props.onDelete) {
    props.onDelete(index)
  } else {
    console.warn("⚠️ La función onDelete falta en el componente padre.")
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
              <button @click="$emit('viewUser', rowData)" class="border hover:tw-bg-gray-200 border-[#F2F2F2] tw-rounded-[10px] tw-p-2 tw-cursor-pointer">
                <ViewEyeIcon />
              </button>

              <button @click="$emit('editUser', rowData)" class="border hover:tw-bg-gray-200  tw-rounded-[10px] tw-p-2 tw-cursor-pointer"  style="border: 5px solid red">
                <EditIcon />
              </button>

              <button
                @click="deleteItem(index)"
                class="border tw-justify-center hover:tw-bg-red-200 tw-border-[#F2F2F2] tw-rounded-[10px] tw-p-2 tw-cursor-pointer"
              >
                <DeleteIcon />
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

            <!--  Enable/Disable Toggle -->
            <div v-else-if="column.key === 'deleteProduct'" class="tw-flex tw-items-center tw-gap-2 ">
              <button
                  class="tw-bg-[#FA3D34] hover:tw-bg-[#d92f2d] tw-text-white tw-text-sm tw-px-4 tw-py-2 tw-rounded tw-font-medium"
                  @click="deleteItem(index)"
                >
                  Eliminar
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
