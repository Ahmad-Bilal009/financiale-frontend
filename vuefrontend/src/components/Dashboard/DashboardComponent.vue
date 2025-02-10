<script setup lang="ts">
import { ref, onMounted, defineProps, computed } from 'vue'
import TableComp from '@/components/UI/table/TableComp.vue'
import { columnsVariant3, productsVariant3 as allProductsVariant3 } from '@/Data/approvaldata'
import ApprovalTableComp from '@/components/UI/ApprovalTable/TableComp.vue'
import { columns, products as productsData } from '@/Data/data'
import { columnsVariant2, productsVariant2 as allProductsVariant2 } from '@/Data/User'
import UserTableComp from '@/components/UI/ManageUser/UserComp.vue'

// ✅ Receive `userRole` as a prop from the parent component
const props = defineProps({
  userRole: {
    type: String,
    default: 'user', // Default role
  },
})

const products = ref(productsData)

// ✅ Pre-slice the products array to limit to 5 rows
const limitedProducts = computed(() => products.value.slice(0, 5))
const limitedProductsVariant2 = computed(() => allProductsVariant2.slice(0, 5))
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

    <!-- 🎯 Admin Dashboard -->
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

      <!-- Manage Users -->
      <div class="tw-flex tw-flex-col tw-mb-8 tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
        <div class="tw-flex tw-justify-between tw-items-center">
          <div class="tw-text-xl tw-font-medium">Manage Users</div>
          <RouterLink to="/manage-users" class="tw-text-base tw-font-medium hover:tw-underline tw-text-[#0171EA]">
            View all
          </RouterLink>
        </div>
        <UserTableComp :columns="columnsVariant2" :rowData="limitedProductsVariant2" @sort="handleSort" variant="action" link="/manage-users" />
      </div>
    </template>
  </div>
</template>
