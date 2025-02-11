<script setup lang="ts">
import { ref, onMounted, defineProps, computed } from 'vue'
import TableComp from '@/components/UI/table/TableComp.vue'
import ApprovalTableComp from '@/components/UI/ApprovalTable/TableComp.vue'
import UserTableComp from '@/components/UI/ManageUser/UserComp.vue'
import { columns, products as productsData } from '@/Data/data'
import { columnsVariant3, productsVariant3 as allProductsVariant3 } from '@/Data/approvaldata'
import axios from 'axios'

//  Receive `userRole` as a prop from the parent component
const props = defineProps({
  userRole: {
    type: String,
    default: 'user', // Default role
  },
})

const products = ref(productsData)
const users = ref([]) // Store fetched users for Admin

//  Fetch users from API (Only Admin Role)
const fetchUsers = async () => {
  if (props.userRole === 'admin') {
    try {
      console.log('Fetching users for admin...'); // Debugging
      const response = await axios.get('http://localhost:5001/api/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })

      if (response.data) {
        console.log(' Users Fetched:', response.data); // Debugging
        // Filter: Admin can only see users with the "user" role
        users.value = response.data.filter(user => user.role === 'user')
      }
    } catch (error) {
      console.error(' Failed to fetch users:', error)
    }
  }
}

onMounted(fetchUsers)

// Pre-slice the products array to limit to 5 rows
const limitedProducts = computed(() => products.value.slice(0, 5))
const user = computed(() => users.value.slice(0, 5)) // Filtered users for Admin
const limitedProductsVariant3 = computed(() => allProductsVariant3.slice(0, 5))

const items = ref([
  { title: 'Total Products', number: 243444 },
  { title: 'Created Today', number: 40 },
  { title: 'Created this Week', number: 59 },
  { title: 'Created this Month', number: 20004 },
])

const visitorsAndProduct = ref([
  { title: 'Total Products', number: 243444 },
  { title: 'Total Visitors', number: 40 },
  { title: 'Total Users', number: 59 },
])

const handleSort = (key: string) => {
  console.log(`Sorting by: ${key}`)
}
</script>

<template>
  <div class="tw-mt-8 tw-flex tw-flex-col tw-gap-6">
    <!-- 🎯 User Dashboard -->
    <template v-if="userRole === 'user'">
      <div class="tw-flex tw-bg-white tw-text-[#171725] tw-items-center tw-px-6 tw-rounded-[20px] tw-py-4 tw-gap-8">
        <div v-for="(item, index) in items" :key="index" class="tw-flex-1">
          <div class="tw-text-base tw-font-medium">{{ item.title }}</div>
          <div class="tw-text-[26px] tw-font-semibold">{{ item.number }}</div>
        </div>
      </div>

      <!-- Products Table (User-Accessible) -->
      <div class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
        <div class="tw-flex tw-justify-between tw-items-center">
          <div class="tw-text-xl tw-font-medium">Products</div>
          <RouterLink to="/products" class="tw-text-base tw-font-medium hover:tw-underline tw-text-[#0171EA]">
            View all
          </RouterLink>
        </div>
        <TableComp :columns="columns" :rowData="limitedProducts" @sort="handleSort" link="/products" />
      </div>
    </template>

    <!-- Admin Dashboard (Shows only Users) -->
    <template v-else-if="userRole === 'admin'">
      <div class="tw-flex tw-bg-white tw-text-[#171725] tw-items-center tw-px-6 tw-rounded-[20px] tw-py-4 tw-gap-8">
        <div v-for="(item, index) in visitorsAndProduct" :key="index" class="tw-flex-1">
          <div class="tw-text-base tw-font-medium">{{ item.title }}</div>
          <div class="tw-text-[26px] tw-font-semibold">{{ item.number }}</div>
        </div>
      </div>

      <!-- Product Approval Table -->
      <div class="tw-flex tw-flex-col tw-mb-8 tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
        <div class="tw-flex tw-justify-between tw-items-center">
          <div class="tw-text-xl tw-font-medium">Product Approval</div>
          <RouterLink to="/product-approval" class="tw-text-base tw-font-medium hover:tw-underline tw-text-[#0171EA]">
            View all
          </RouterLink>
        </div>
        <ApprovalTableComp :columns="columnsVariant3" :rowData="limitedProductsVariant3" @sort="handleSort" link="/products" variant="action" />
      </div>

      <!-- Manage Users (Filtered for Admin) -->
      <div class="tw-flex tw-flex-col tw-mb-8 tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
        <div class="tw-flex tw-justify-between tw-items-center">
          <div class="tw-text-xl tw-font-medium">Manage Users</div>
          <RouterLink to="/manage-users" class="tw-text-base tw-font-medium hover:tw-underline tw-text-[#0171EA]">
            View all
          </RouterLink>
        </div>
        <UserTableComp
        :columns="[
          { key: 'name', label: 'Name', align: 'left' },
          { key: 'email', label: 'Email', align: 'left' },
          { key: 'password', label: 'Password', align: 'center' },
          { key: 'action', label: 'Actions', align: 'center' },
          { key: 'isDisabled', label: 'Status', align: 'center' },
        ]"
        :rowData="user"
        @sort="handleSort"
        @toggleStatus="toggleUserStatus"
        link="/manage-users"
        variant="action"
      />
      </div>
    </template>
  </div>
</template>
