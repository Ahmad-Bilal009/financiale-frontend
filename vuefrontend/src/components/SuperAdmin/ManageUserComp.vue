<script setup lang="ts">
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue'
import { SuperAdmincolumns, SuperAdminproducts } from '@/Data/User'
import AddUserButton from '@/components/UI/Button/AddUserbutton.vue'
import AdminManageUser from '@/components/UI/ManageUser/AdminManageUser.vue'
import UserToggle from '@/components/UI/Toggle-Switch/UserToggle.vue'
import { ref } from 'vue'
import AddUserModel from '@/components/UI/AddUser-Modal/AddUser.vue'

const isModalOpen = ref(false)

function openModal() {
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

const handleAddUser = () => {
  openModal()
}

function search(value: string) {
  console.log(value)
}

const handleSort = (key: string) => {
  console.log(`Sorting by: ${key}`)
}
</script>

<template>
  <div class="tw-flex tw-flex-col tw-mb-12 tw-mt-12 tw-gap-12">
    <!-- header -->
    <div class="tw-flex tw-justify-between tw-items-center">
      <div class="tw-text-3xl tw-font-medium">Manage Users</div>
      <div class="tw-flex tw-gap-5 tw-items-center">
        <SearchBar :onSearch="search" placeholder="Search here..." />
        <UserToggle />
        <AddUserButton text="+ Add User" @click="handleAddUser" />
      </div>
    </div>
    <!-- header -->

    <!-- Content -->
    <div class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
      <AdminManageUser
        :columns="SuperAdmincolumns"
        :rowData="SuperAdminproducts"
        @sort="handleSort"
        variant="action"
      />
    </div>
    <AddUserModel :isOpen="isModalOpen" mode="add" @close="closeModal" @saveUser="handleAddUser" />
  </div>
</template>
