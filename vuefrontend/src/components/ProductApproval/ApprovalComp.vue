<script setup lang="ts">
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue'
import TableComp from '@/components/UI/ApprovalTable/TableComp.vue'
import ToggleComp from '@/components/UI/Toggle-Switch/ToggleComp.vue'
import DeleteModal from '@/components/UI/Delete-Model/DeleteModel.vue'
import { onMounted, ref } from 'vue'
import userService from '@/services/userService'
import productService from '@/services/productServices'
import { useToast } from "vue-toastification"
import DropdownUI from '../UI/Dropdown/DropdownUI.vue'

const toast = useToast();
const isDeleteModalOpen = ref(false);
const selectedProductId = ref<number | null>(null);
const selectVisitors = ref<Option>({ key: 'all', label: 'All' })
const selectedOrganization = ref<Option>({ key: 'all', label: 'All' })
const products = ref([]);




const Visitors = ref<Option[]>([
  { key: 'all', label: 'All' },
  { key: 'today', label: 'Today' },
  { key: 'thisweek', label: 'This Week' },
  { key: 'thismonth', label: 'This Month' },
])

const Organization = ref<Option[]>([
  { key: 'all', label: 'All' },
  { key: 'bantrab', label: 'Bantrab' },
  { key: 'zarkab', label: 'Zarkab' },
  { key: 'tsmc', label: 'TSMC' },
])


//Table headers
const tableheading = ref([
  { key: 'title', label: 'Title', align: 'center' },
  { key: 'organization', label: 'Organization', align: 'center' },
  { key: 'location', label: 'Location', align: 'center' },
  { key: 'stage', label: 'Stage', align: 'center' },
  { key: 'view', label: 'View', align: 'center' },
  { key: 'ProductVisit' , label:'Visitors' , align: 'center' },
  { key: 'connects', label:'Connect' , align: 'center' },
  { key: 'createdAt', label: 'Created on', align: 'center' },
  { key: 'action', label: 'Action', align: 'center' },
]);

const fetchProducts = async () => {
  try {
    const userResponse = await userService.getUsers();

    if (!userResponse || !Array.isArray(userResponse)) {
      throw new Error(`Invalid user response: ${JSON.stringify(userResponse)}`);
    }

    // Mapping user ID to organization name
    const usersMap = userResponse.reduce((map: Record<number, string>, user: any) => {
      if (user?.id) map[user.id] = user.name;
      return map;
    }, {});
    const response = await productService.getProducts();

    if (!response || !Array.isArray(response)) {
      throw new Error(`Invalid product response: ${JSON.stringify(response)}`);
    }

    // Map product data and include organization name from usersMap
    products.value = response
      .filter((product: any) => product.status !== "rejected")
      .map((product: any) => ({
        id: product.id,
        title: product.title,
        organization: product.userId ? usersMap[product.userId] || "N/A" : "N/A",
        location: product.contactDetail?.address || "N/A",
        stage: product.stageOfEntrepreneurship || "N/A",
        status: product.status,
        createdAt: product.createdAt
          ? new Date(product.createdAt).toISOString().split("T")[0]
          : "N/A",
      }));
  } catch (error) {
    toast.error(`Failed to fetch products: ${error.message}`);
  }
};



onMounted(fetchProducts);

// **Handle Product Approval
const approveProduct = async (productId: number) => {
  try {
    await productService.updateProductStatus(productId, { status: "approved" });
    toast.success("Product approved successfully!");
    fetchProducts();
  } catch (error) {
    toast.error("Failed to approve product");
  }
};

// **Handle Product Rejection**
const rejectProduct = async (productId: number) => {
  try {
    await productService.updateProductStatus(productId, { status: "rejected" });
    toast.success("Product rejected successfully!");
    fetchProducts();
  } catch (error) {
    toast.error("Failed to reject product");
  }
};

// **Open Delete Modal
const openDeleteModal = (productId: number) => {
  selectedProductId.value = productId;
  isDeleteModalOpen.value = true;
};

// Close Delete Modal
const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  selectedProductId.value = null;
};

// Handle Product Deletion
const deleteProduct = async () => {
  if (!selectedProductId.value) return;
  try {
    await productService.deleteProduct(selectedProductId.value);
    toast.success("Product deleted successfully!");
    isDeleteModalOpen.value = false;
    fetchProducts(); // Refresh products
  } catch (error) {
    toast.error("Failed to delete product");
  }
};

// **Search functionality**
const search = (value: string) => {
  console.log("Search query:", value);
};

// **Sorting functionality**
const handleSort = (key: string) => {
  console.log(`Sorting by: ${key}`);
};


const handleDropdownSelect = (option: Option, type: string) => {
  console.log(`Selected ${type}:`, option)
}
</script>

<template>
  <div class="tw-flex tw-flex-col tw-mb-12 tw-mt-12 tw-gap-12">
    <!-- header -->
    <div class="md:tw-flex tw-justify-between md:tw-items-center">
      <div class="tw-text-[24px] md:tw-text-3xl tw-font-medium">Product Approvals</div>
      <div class="md:tw-flex tw-gap-5 tw-items-start md:tw-items-center">
        <SearchBar :onSearch="search" placeholder="Search here..." />
        <ToggleComp class="tw-mt-2 md:tw-mt-0" />
      </div>
    </div>

    <div class="tw-gap-[13px] tw-flex tw-justify-end ">
      <div class="tw-flex tw-flex-col tw-gap-2 tw-w-full md:tw-w-auto">
        <label class="tw-text-[12px] md:tw-text-[18px]  tw-font-medium tw-leading-[20px] tw-text-dark-gray">
          Select Visitors
        </label>
        <select v-model="selectVisitors" class="tw-w-full md:tw-min-w-[150px] lg:tw-min-w-[180px] tw-bg-white tw-shadow tw-rounded-[8px] tw-p-2">
          <option v-for="option in Visitors" :key="option.key" :value="option">
            {{ option.label }}
          </option>
        </select>
      </div>

      <div class="tw-flex tw-flex-col  tw-gap-2 tw-w-full md:tw-w-auto">
        <label class="tw-text-[12px] md:tw-text-[18px]  tw-font-medium tw-leading-[20px] tw-text-dark-gray">
          Select Organization
        </label>
        <select v-model="selectedOrganization" class="tw-w-full md:tw-min-w-[150px] lg:tw-min-w-[180px] tw-bg-white tw-shadow tw-rounded-[8px] tw-p-2">
          <option v-for="option in Organization" :key="option.key" :value="option">
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>

    <!-- Content -->
    <div class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
      <TableComp
        :columns="tableheading"
        :rowData="products"
        @sort="handleSort"
        link="/products"
        variant="action"
        @approve="approveProduct"
        @reject="rejectProduct"
        @delete="openDeleteModal"
      />
    </div>

    <!-- Delete Confirmation Modal -->
    <DeleteModal :isOpen="isDeleteModalOpen" @close="closeDeleteModal" @delete="deleteProduct" />
  </div>
</template>
