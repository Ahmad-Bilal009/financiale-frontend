<script setup lang="ts">
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue'
import TableComp from '@/components/UI/ManageUser/UserComp.vue'
import AddUserButton from '@/components/UI/Button/AddUserbutton.vue'
import UserToggle from '@/components/UI/Toggle-Switch/UserToggle.vue'
import AddUserModel from '@/components/UI/AddUser-Modal/AddUser.vue'
import { ref, onMounted } from 'vue'
import userService from '@/services/userService'
import { useToast } from 'vue-toastification'

const isModalOpen = ref(false)
const modalMode = ref<'add' | 'edit'>('add') // Track add or edit mode
const selectedUser = ref(null) // Store selected user for editing
const users = ref([]) // Store fetched users
const toast = useToast()

const fetchUsers = async () => {
  try {
    users.value = await userService.getUsers();

  } catch (error) {
    toast.error(error.response?.data?.message || 'Error fetching users');
  }
};


onMounted(fetchUsers)

//  Open Add User Modal
const openAddUserModal = () => {
  selectedUser.value = null // Reset selected user
  modalMode.value = 'add'
  isModalOpen.value = true
}

//  Open Edit User Modal
const openEditUserModal = (user) => {
  selectedUser.value = user
  modalMode.value = 'edit'
  isModalOpen.value = true
}

//  Close Modal
const closeModal = () => (isModalOpen.value = false)

const handleUserSave = async (userData, userId) => {
  try {
    await userService.saveUser(userData, userId);
    toast.success(' User saved successfully!');
    fetchUsers(); // Refresh users after action
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to save user');
  }
};


onMounted(fetchUsers)



//  Search functionality (Future use)
const search = (value: string) => {
  console.log('🔎 Searching:', value)
}

//  Sorting handler (Future use)
const handleSort = (key: string) => {
  console.log(`Sorting by: ${key}`)
}
</script>

<template>
  <div class="tw-flex tw-flex-col tw-mb-12 tw-mt-12 tw-gap-12">
    <!-- Header -->
    <div class="tw-flex tw-justify-between tw-items-center">
      <div class="tw-text-3xl tw-font-medium">Manage Users</div>
      <div class="tw-flex tw-gap-5 tw-items-center">
        <SearchBar :onSearch="search" placeholder="Search here..." />
        <UserToggle />
        <AddUserButton text="+ Add User" @click="openAddUserModal" />
      </div>
    </div>

    <!-- User Table -->
    <div class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
      <TableComp
        :columns="[
          { key: 'name', label: 'Name', align: 'left' },
          { key: 'email', label: 'Email', align: 'left' },
          { key: 'role', label: 'Role', align: 'center' },
          { key: 'action', label: 'Actions', align: 'center' },
          { key: 'isDisabled', label: 'Status', align: 'center' },
        ]"
        :rowData="users"
        @sort="handleSort"
        @toggleStatus="toggleUserStatus"
        @editUser="openEditUserModal"
        link="/manage-users"
        variant="action"
      />
    </div>

    <!-- Add / Edit User Modal -->
    <AddUserModel
      :isOpen="isModalOpen"
      :mode="modalMode"
      :userData="selectedUser"
      @close="closeModal"
      @saveUser="handleUserSave"
    />
  </div>
</template>
