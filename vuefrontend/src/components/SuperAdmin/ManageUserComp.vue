<script setup lang="ts">
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue';
import TableComp from '@/components/UI/ManageUser/UserComp.vue';
import AddUserButton from '@/components/UI/Button/AddUserbutton.vue';
import UserToggle from '@/components/UI/Toggle-Switch/UserToggle.vue';
import AddUserModel from '@/components/UI/AddUser-Modal/AddUser.vue';
import { ref, onMounted } from 'vue';
import userService from '@/services/userService';
import { useToast } from 'vue-toastification';

// **Types**
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  isDisabled: boolean;
}

const isModalOpen = ref(false);
const modalMode = ref<'add' | 'edit'>('add'); // Track add or edit mode
const selectedUser = ref<Record<string, any> | undefined>(undefined); // Store selected user for editing
const users = ref<User[]>([]); // Store fetched users
const toast = useToast();

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

onMounted(fetchUsers);

// **Open Add User Modal**
const openAddUserModal = () => {
  selectedUser.value = undefined; // Reset selected user
  modalMode.value = 'add';
  isModalOpen.value = true;
};

// **Open Edit User Modal**
const openEditUserModal = (user: User) => { // ✅ Fix implicit `any` type
  selectedUser.value = user;
  modalMode.value = 'edit';
  isModalOpen.value = true;
};

// **Close Modal**
const closeModal = () => {
  isModalOpen.value = false;
};

// **Handle Save User**
const handleUserSave = async (userData: User, userId?: number) => { // ✅ Fix implicit `any` types
  try {
    await userService.saveUser(userData, userId);
    toast.success('User saved successfully!');
    fetchUsers(); // Refresh users after action
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message || 'Failed to save user');
    } else {
      toast.error('Failed to save user');
    }
  }
};

// **Toggle User Status**
const toggleUserStatus = async (userId: number) => {
  try {
    await userService.toggleUserStatus(userId);
    toast.success('User status updated!');
    fetchUsers(); // Refresh user list
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message || 'Failed to update user status');
    } else {
      toast.error('Failed to update user status');
    }
  }
};

// **Search functionality (Future use)**
const search = (value: string) => {
  console.log('🔎 Searching:', value);
};

// **Sorting handler (Future use)**
const handleSort = (key: string) => {
  console.log(`Sorting by: ${key}`);
};
</script>

<template>
  <div class="tw-flex tw-flex-col tw-mb-12 tw-mt-12 tw-gap-12">
    <!-- Header -->
    <div class="md:tw-flex tw-justify-between md:tw-items-center">
      <div class="tw-text-[24px] md:tw-text-3xl tw-font-medium">Manage Users</div>
      <div class="md:tw-flex tw-gap-5 tw-items-start md:tw-items-center">
        <SearchBar :onSearch="search" placeholder="Search here..." />
        <div class="tw-flex tw-mt-2 md:tw-mt-0 tw-gap-4 tw-items-center">
          <UserToggle />
          <AddUserButton text="+ Add User" @click="openAddUserModal" />
        </div>
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
          { key: 'isDisabled', label: 'Status', align: 'center' }
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
