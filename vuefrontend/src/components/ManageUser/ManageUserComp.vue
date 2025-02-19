<script setup lang="ts">
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue'
import TableComp from '@/components/UI/ManageUser/UserComp.vue'
import AddUserButton from '@/components/UI/Button/AddUserbutton.vue'
import UserToggle from '@/components/UI/Toggle-Switch/UserToggle.vue'
import AddUserModel from '@/components/UI/AddUser-Modal/AddUser.vue'
import { ref, onMounted, computed } from 'vue'
import userService from '@/services/userService'
import { useToast } from 'vue-toastification'

const isModalOpen = ref(false)
const modalMode = ref<'add' | 'edit' | 'view'>('add')
const selectedUser = ref(null) // Store selected user for editing
const users = ref([]) // Store fetched users
const activeFilter = ref(true) // ✅ Default: Show all users
const toast = useToast()

// **Fetch Users**
const fetchUsers = async () => {
  try {
    const data = await userService.getUsers()
    users.value = data.filter(user => user.role === 'user').map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      isDisabled: user.isDisabled === 1 || user.isDisabled === true,
    }))
  } catch (error) {
    toast.error('No se pudieron obtener los usuarios')
  }
}

// ✅ **Filter users based on toggle state**
const filteredUsers = computed(() => {
  return activeFilter.value ? users.value : users.value.filter(user => user.isDisabled)
})

// **Handle toggle status from UserToggle**
const handleToggleStatus = (status: boolean) => {
  activeFilter.value = status
  console.log("🔄 Cambio de alternancia:", status ? "Todos los usuarios" : "Usuarios deshabilitados")
}

// **Open Add User Modal**
const openAddUserModal = () => {
  selectedUser.value = null
  modalMode.value = 'add'
  isModalOpen.value = true
}

// **Open Edit User Modal**
const openEditUserModal = (user) => {
  selectedUser.value = user
  modalMode.value = 'edit'
  isModalOpen.value = true
}


// **Open View User Modal** (NEW FUNCTIONALITY 🚀)
const openViewUserModal = (user) => {
  selectedUser.value = user
  modalMode.value = 'view'
  isModalOpen.value = true
}
// **Close Modal**
const closeModal = () => (isModalOpen.value = false)

// **Handle User Save**
const handleUserSave = async (userData, userId) => {
  try {
    await userService.saveUser(userData, userId)
    toast.success('¡Usuario guardado con éxito!')
    fetchUsers() // Refresh users after action
  } catch (error) {
    toast.error(error.response?.data?.message || 'No se pudo guardar el usuario')
  }
}

// **Search functionality**
const search = (value: string) => {
  console.log('🔎 Buscando:', value)
}

// **Sorting handler**
const handleSort = (key: string) => {
  console.log(`Ordenando por: ${key}`)
}

onMounted(fetchUsers)
</script>

<template>
  <div class="tw-flex tw-flex-col tw-mb-12 tw-mt-12 tw-gap-12">
    <!-- Encabezado -->
    <div class="md:tw-flex tw-justify-between md:tw-items-center">
      <div class="tw-text-[24px] md:tw-text-3xl tw-font-medium">Gestionar Usuarios</div>
      <div class="md:tw-flex tw-gap-5 tw-items-start md:tw-items-center">
        <SearchBar :onSearch="search" placeholder="Buscar aquí..." />
        <div class="tw-flex tw-mt-2 md:tw-mt-0 tw-gap-4 tw-items-center">
          <!-- ✅ Escuchar cambios en la alternancia -->
          <UserToggle @toggleStatus="handleToggleStatus" />
          <AddUserButton text="+ Agregar Usuario" @click="openAddUserModal" />
        </div>
      </div>
    </div>

    <!-- Tabla de Usuarios -->
    <div class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
      <TableComp
        :columns="[
          { key: 'name', label: 'Nombre', align: 'left' },
          { key: 'email', label: 'Correo Electrónico', align: 'left' },
          { key: 'password', label: 'Contraseña', align: 'center' },
          { key: 'action', label: 'Acciones', align: 'center' },
          { key: 'isDisabled', label: 'Estado', align: 'center' },
          { key: 'totalVisitors', label: 'Total de visitantes', align: 'center' },
          { key: 'deleteProduct', label: 'Eliminar Productos', align: 'center' },
        ]"
        :rowData="filteredUsers"
        @sort="handleSort"
        @editUser="openEditUserModal"
        @viewUser="openViewUserModal"
        @delete="handleDeleteUser"
        link="/manage-users"
        variant="action"
      />
    </div>

    <!-- Modal Agregar / Editar Usuario -->
    <AddUserModel
      :isOpen="isModalOpen"
      :mode="modalMode"
      :userData="selectedUser"
      @close="closeModal"
      @saveUser="handleUserSave"
    />
  </div>
</template>
