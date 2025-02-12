<script setup lang="ts">
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue'
import TableComp from '@/components/UI/ManageUser/UserComp.vue'
import AddUserButton from '@/components/UI/Button/AddUserbutton.vue'
import UserToggle from '@/components/UI/Toggle-Switch/UserToggle.vue'
import AddUserModel from '@/components/UI/AddUser-Modal/AddUser.vue'
import { ref, onMounted } from 'vue'
import userService from '@/services/userService'
import { useToast } from 'vue-toastification'

const toast = useToast()
const isModalOpen = ref(false)
const users = ref([])

// Fetch users from API
const fetchUsers = async () => {
  try {
    const data = await userService.getUsers()
    users.value = data.filter(user => user.role === 'user').map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      password: user.password,
      isDisabled: user.isDisabled === 1 || user.isDisabled === true,
    }))
  } catch (error) {
    toast.error('Failed to fetch users')
  }
}

onMounted(fetchUsers)

// Open and close modal
const openModal = () => (isModalOpen.value = true)
const closeModal = () => (isModalOpen.value = false)

// Add User Action
const handleAddUser = async (userData) => {
  try {
    await userService.saveUser(userData)
    toast.success('User added successfully')
    fetchUsers()
    closeModal()
  } catch (error) {
    toast.error('Failed to add user')
  }
}



// Search functionality
const search = (value: string) => {
  console.log('Searching:', value)
}

// Sorting handler
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
        <AddUserButton text="+ Add User" @click="openModal" />
      </div>
    </div>

    <!-- User Table -->
    <div class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
      <TableComp
        :columns="[
          { key: 'name', label: 'Name', align: 'left' },
          { key: 'email', label: 'Email', align: 'left' },
          { key: 'password', label: 'Password', align: 'left' },
          { key: 'action', label: 'Actions', align: 'center' },
          { key: 'isDisabled', label: 'Status', align: 'center' },
        ]"
        :rowData="users"
        @sort="handleSort"
        @toggleStatus="toggleUserStatus"
        link="/manage-users"
        variant="action"
      />
    </div>

    <!-- Add User Modal -->
    <AddUserModel :isOpen="isModalOpen" mode="add" @close="closeModal" @saveUser="handleAddUser" />
  </div>
</template>
