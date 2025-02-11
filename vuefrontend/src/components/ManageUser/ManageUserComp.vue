<script setup lang="ts">
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue'
import TableComp from '@/components/UI/ManageUser/UserComp.vue'
import AddUserButton from '@/components/UI/Button/AddUserbutton.vue'
import UserToggle from '@/components/UI/Toggle-Switch/UserToggle.vue'
import AddUserModel from '@/components/UI/AddUser-Modal/AddUser.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const isModalOpen = ref(false)
const users = ref([]) // ✅ Store fetched users

// ✅ Fetch users from API
const fetchUsers = async () => {
  try {
    console.log("Fetching users..."); // Debugging
    const response = await axios.get('http://localhost:5001/api/admin/users', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })

    if (response.data) {
      console.log("✅ Users Fetched:", response.data); // Debugging
      // ✅ Filter: Admin can only see users with the "user" role
      users.value = response.data
        .filter(user => user.role === "user")
        .map(user => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          isDisabled: user.isDisabled === 1 || user.isDisabled === true // Ensure Boolean value
        }))
    }
  } catch (error) {
    console.error('❌ Failed to fetch users:', error)
  }
}

onMounted(fetchUsers)

// ✅ Open and close modal
const openModal = () => (isModalOpen.value = true)
const closeModal = () => (isModalOpen.value = false)

// ✅ Add User Action
const handleAddUser = async (userData) => {
  try {
    await axios.post('http://localhost:5001/api/admin/users', userData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    fetchUsers() // Refresh users after adding
    closeModal()
  } catch (error) {
    console.error('❌ Failed to add user:', error)
  }
}

// ✅ Toggle user enable/disable
const toggleUserStatus = async (user) => {
  try {
    await axios.put(`http://localhost:5001/api/admin/users/${user.id}/toggle-disable`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    user.isDisabled = !user.isDisabled
  } catch (error) {
    console.error('❌ Failed to update user status:', error)
  }
}

// ✅ Search functionality (Future use)
const search = (value: string) => {
  console.log('🔎 Searching:', value)
}

// ✅ Sorting handler (Future use)
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
