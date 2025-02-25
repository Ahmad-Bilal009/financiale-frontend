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
const selectedUser = ref<User | null>(null) // Allow selectedUser to be either User or null
const users = ref<User[]>([]) // Store fetched users with correct typing
const activeFilter = ref(true) // Default: Show all users
const toast = useToast()

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isDisabled: boolean;
  role: string;
  // Add other relevant properties as needed
}

interface Product {
  id: number;
  title: string;
  userId?: number;
  contactDetail?: { address: string };
  stageOfEntrepreneurship?: string;
  status: string;
  createdAt?: string;
  // Add other relevant properties as needed
}

// **Fetch Users**
const fetchUsers = async () => {
  try {
    const data = await userService.getUsers()
    users.value = data.filter((user: User) => user.role === 'user').map((user: User) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      isDisabled: user.isDisabled,
    }))
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'No se pudieron obtener los usuarios'
    toast.error(errorMessage)
  }
}

// **Filter users based on toggle state**
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
const openEditUserModal = (user: User) => {
  selectedUser.value = user
  modalMode.value = 'edit'
  isModalOpen.value = true
}

// **Open View User Modal** (NEW FUNCTIONALITY 🚀)
const openViewUserModal = (user: User) => {
  selectedUser.value = user
  modalMode.value = 'view'
  isModalOpen.value = true
}

// **Close Modal**
const closeModal = () => (isModalOpen.value = false)

// **Handle User Save**
const handleUserSave = async (userData: User, userId: number) => {
  try {
    await userService.saveUser(userData, userId)
    toast.success('¡Usuario guardado con éxito!')
    fetchUsers() // Refresh users after action
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'No se pudo guardar el usuario'
    toast.error(errorMessage)
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

// **Handle Delete User**
const handleDeleteUser = async (userId: number) => {
  try {
    console.log("Deleting user with ID:", userId);
    // Implement the logic to delete the user here, e.g., make an API call
    await userService.deleteUser(userId);
    toast.success('¡Usuario eliminado con éxito!');
    fetchUsers(); // Refresh users after deletion
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'No se pudo eliminar el usuario';
    toast.error(errorMessage);
  }
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
          <!-- Escuchar cambios en la alternancia -->
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
        :activeFilter="activeFilter"
      />
    </div>

    <!-- Modal Agregar / Editar Usuario -->
    <AddUserModel
      :isOpen="isModalOpen"
      :mode="modalMode"
      :userData="selectedUser || {}"
      @close="closeModal"
      @saveUser="handleUserSave"
    />
  </div>
</template>
