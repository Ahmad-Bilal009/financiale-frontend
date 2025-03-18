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
}



// **Fetch Users**
const fetchUsers = async () => {
  try {
    const response = await userService.getUsers();
    users.value = response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message || 'Error fetching users');
    } else {
      toast.error('Error fetching users');
    }
  }
};

// **Filter users based on toggle state**
const filteredUsers = computed(() => {
  return activeFilter.value ? users.value : users.value.filter(user => user.isDisabled);
});

// **Handle toggle status from UserToggle**
const handleToggleStatus = (status: boolean) => {
  activeFilter.value = status;
  console.log("🔄 Toggle Change:", status ? "All Users" : "Disabled Users");
};

// **Open Add User Modal**
const openAddUserModal = () => {
  selectedUser.value = null;
  modalMode.value = 'add';
  isModalOpen.value = true;
};

// **Open Edit User Modal**
const openEditUserModal = (user: User) => {
  selectedUser.value = user;
  modalMode.value = 'edit';
  isModalOpen.value = true;
};

// **Open View User Modal**
const openViewUserModal = (user: User) => {
  selectedUser.value = user;
  modalMode.value = 'view';
  isModalOpen.value = true;
};

// **Close Modal**
const closeModal = () => (isModalOpen.value = false);

// **Handle User Save**
const handleUserSave = async (userData: User, userId: number) => {
  try {
    await userService.saveUser(userData, userId);
    toast.success('User saved successfully!');
    fetchUsers(); // Refresh users after action
  } catch (error) {
    toast.error("Failed to save user");
  }
};

// **Search functionality**
const search = (value: string) => {
  console.log('🔎 Searching:', value);
};

// **Sorting handler**
const handleSort = (key: string) => {
  console.log(`Sorting by: ${key}`);
};

// **Handle Delete User**
const handleDeleteUser = async (userId: number) => {
  try {
    console.log("Deleting user with ID:", userId);
    await userService.deleteUser(userId);
    toast.success('User deleted successfully!');
    fetchUsers();
  } catch (error) {
    toast.error("Failed to delete user");
  }
};

onMounted(fetchUsers);
</script>

<template>
  <div class="tw-flex tw-flex-col tw-mb-12 tw-mt-12 tw-gap-12">
    <!-- Header -->
    <div class="md:tw-flex tw-justify-between md:tw-items-center">
      <div class="tw-text-[24px] md:tw-text-3xl tw-font-medium">Gestionar Usuarios</div>
      <div class="md:tw-flex tw-gap-5 tw-items-start md:tw-items-center">
        <SearchBar :onSearch="search" placeholder="Buscar aquí..." />
        <div class="tw-flex tw-mt-2 md:tw-mt-0 tw-gap-4 tw-items-center">
          <!-- Toggle for filtering users -->
          <UserToggle @toggleStatus="handleToggleStatus" />
          <AddUserButton text="+ Agregar Usuario" @click="openAddUserModal" />
        </div>
      </div>
    </div>

    <!-- User Table -->
    <div class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
      <TableComp
        :columns="[
          { key: 'name', label: 'Nombre', align: 'left' },
          { key: 'email', label: 'Correo Electrónico', align: 'left' },
          { key: 'password', label: 'Contraseña', align: 'center' },
          {key: 'role', label: 'Rol', align: 'center' },
          { key: 'action', label: 'Acciones', align: 'center' },
          { key: 'isDisabled', label: 'Estado', align: 'center' },
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

    <!-- Add/Edit User Modal -->
    <AddUserModel
      :isOpen="isModalOpen"
      :mode="modalMode"
      :userData="selectedUser || {}"
      @close="closeModal"
      @saveUser="handleUserSave"
    />
  </div>
</template>
