<script setup lang="ts">
import { ref, onMounted, computed, defineProps } from 'vue'
import TableComp from '@/components/UI/table/TableComp.vue'
import ApprovalTableComp from '@/components/UI/ApprovalTable/TableComp.vue'
import UserTableComp from '@/components/UI/ManageUser/UserComp.vue'
import DeleteModel from '@/components/UI/Delete-Model/DeleteModel.vue'
import userService from '@/services/userService'
import visitorService from "@/services/visitorServices";
import productService from '@/services/productServices'
import dashboardService from '@/services/dashboardService'
import { useToast } from "vue-toastification"



const toast = useToast();

const isModalOpen = ref(false)
const selectedProductId = ref<number | null>(null) // Store selected product ID


const user = JSON.parse(localStorage.getItem('user') || '{}')
const userId = user?.id || null
const isAdmin = computed(() => user.role === "admin");


// Receive `userRole` as a prop from the parent component
const props = defineProps({
  userRole: {
    type: String,
    required: true, // Make it required if necessary
  },
})

// Example usage of userRole
const isAdminComputed = computed(() => props.userRole === 'admin');

const products = ref([])
const users = ref([])

// Define the Stats interface
interface Stats {
  totalProducts: number;
  createdToday: number;
  createdThisWeek: number;
  createdThisMonth: number;
  totalUsers: number;
  totalVisitors: number;
  UserVisitors: number;
}

// Update the stats object to use the new interface
const stats = ref<Stats>({
  totalProducts: 0,
  createdToday: 0,
  createdThisWeek: 0,
  createdThisMonth: 0,
  totalUsers: 0,
  totalVisitors: 0,
  UserVisitors: 0,
});

// Define the User interface
interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  isDisabled: boolean;
  image?: string;
  // Add other relevant properties if needed
}

// Define the Product interface
interface Product {
  id: number;
  title: string;
  userId?: number;
  contactDetail?: { address: string };
  stageOfEntrepreneurship?: string;
  stage: string;
  status: string;
  createdAt?: string;
  organization?: string;
  location?: string;
  visitorCount?: number;
}

const fetchProducts = async () => {
  try {
    let usersMap: Record<number, { name: string; image: string | null }> = {};

    // Get logged-in user details (Assuming stored in localStorage)
    const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
    const loggedInUserId = loggedInUser?.id;

    if (!loggedInUserId) {
      toast.error("User not logged in!");
      return;
    }

    // Fetch users if Admin (for organization mapping)
    if (isAdminComputed.value) {
      const userResponse = await userService.getUsers();
      usersMap = userResponse.reduce(
        (map: Record<number, { name: string; image: string | null }>, user: User) => {
          map[user.id] = { name: user.name, image: user.image || null };
          return map;
        },
        {}
      );
    }

    // Fetch products (passing userId if not admin)
    const response = await productService.getProducts(isAdminComputed.value ? undefined : loggedInUserId);
    console.log("API Response (Products):", response);

    // Map user data to products
    products.value = response.map((product: Product) => ({
      id: product.id,
      title: product.title,
      organization: usersMap[product.userId as number]?.name || (isAdminComputed.value ? "N/A" : loggedInUser.name),
      location: product.contactDetail?.address || "N/A",
      stage: product.stageOfEntrepreneurship || "N/A",
      visitorCount: product.visitorCount || 0, // Add visitor count
      status: product.status,
      userId: product.userId || null,
      createdAt: product.createdAt || null,
    }));

    console.log("Filtered Products:", products.value);
  } catch (error) {
    console.error("Error fetching products:", error);
    toast.error("Failed to fetch products");
  }
};


//Fetch Users (Only for Admin)
const fetchUsers = async () => {
  if (isAdminComputed.value) {
    try {
      const data = await userService.getUsers();
      users.value = data.filter((user: User) => user.role === 'user').map((user: User) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isDisabled: Boolean(user.isDisabled),
      }));
    } catch(error) {
      toast.error(`${error}` ||'Failed to fetch users');
    }
  }
}

//Fetch Dashboard Stats (Filtered for User)
const fetchDashboardStats = async () => {
  try {
    const loggedInUser = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = loggedInUser?.id;

    if (!userId) {
      toast.error("User not logged in!");
      return;
    }

    // Fetch general stats
    const response = await dashboardService.getStats();
    const UserVisitorResponse = await visitorService.getUserVisitors(userId);

    // Call total visitors API **only if the user is an admin**
    let totalVisitors = 0;
    if (isAdminComputed.value) {
      try {
        const visitorResponse = await visitorService.getTotalVisitors();
        totalVisitors = visitorResponse.data?.totalVisitors || 0;
      } catch (error) {
        console.error("Error fetching total visitors:", error);
      }
    }

    console.log("User Visitor Stats:", UserVisitorResponse.data, "Dashboard Stats:", response);

    stats.value = {
      totalProducts: 0,
      createdToday: 0,
      createdThisWeek: 0,
      createdThisMonth: 0,
      totalUsers: 0,
      UserVisitors: UserVisitorResponse.data?.totalVisitors || 0,
      ...(isAdminComputed.value && { totalVisitors }), // Only add totalVisitors for admin
      ...response,
    };

    if (!isAdminComputed.value) {
      const userProducts = products.value.filter((product: Product) => String(product.userId) === String(userId));

      stats.value.totalProducts = userProducts.length;
      stats.value.createdToday = userProducts.filter((product: Product) =>
        product.createdAt && new Date(product.createdAt).toDateString() === new Date().toDateString()
      ).length;
      stats.value.createdThisWeek = userProducts.filter((product: Product) =>
        product.createdAt && getWeekNumber(new Date(product.createdAt)) === getWeekNumber(new Date())
      ).length;
      stats.value.createdThisMonth = userProducts.filter((product: Product) =>
        product.createdAt && new Date(product.createdAt).getMonth() === new Date().getMonth()
      ).length;
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    toast.error("Failed to load dashboard statistics");
  }
};


// Utility function to get the week number of a given date
const getWeekNumber = (date: Date) => {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  return Math.ceil(((date.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay() + 1) / 7);
};




onMounted(() => {
  fetchProducts()
  fetchDashboardStats()
  fetchUsers()

})

// Computed Properties for Data Display
const hasProducts = computed(() => products.value.length > 0)
const limitedProducts = computed(() => products.value.slice(0, 5))
const limitedUsers = computed(() => users.value.slice(0, 5))

// Dashboard Summary Items
const items = computed(() => [
  { title: 'Total de Productos', number: stats.value.totalProducts },
  { title: 'Creados Hoy', number: stats.value.createdToday },
  { title: 'Creados esta Semana', number: stats.value.createdThisWeek },
  { title: 'Creados este Mes', number: stats.value.createdThisMonth },
  { title: 'Visitantes esta semana', number: stats.value.UserVisitors },
  { title: 'Visitantes este mes', number: stats.value.UserVisitors },
  { title: 'Total de Visitantes', number: stats.value.UserVisitors },
])

const visitorsAndProduct = computed(() => [
  { title: 'Total de Productos', number: stats.value.totalProducts },
  { title: 'Total de Organizaciones', number: stats.value.totalUsers },
  { title: 'Total de Visitantes', number: stats.value.totalVisitors },
]);

console.log("visitorsAndProduct Data:", visitorsAndProduct.value);


const tableheading = computed(() => {
  const baseColumns = [
    { key: "title", label: "Título", align: "center" },
    { key: "organization", label: "Organización", align: "center" },
    { key: "location", label: "Ubicación", align: "center" },
    { key: "stage", label: "Etapa", align: "center" },
  ];
  if (isAdminComputed.value) {
    baseColumns.push({ key: "action", label: "Acción", align: "center" });
  }
  return baseColumns;
});

const handleSort = (key: string) => {
  console.log(`Sorting by: ${key}`)
}


// Define activeFilter
const activeFilter = ref('all');

// **Open Delete Modal**
const openModal = (productId: number) => {
  selectedProductId.value = productId
  isModalOpen.value = true
}

// **Close Delete Modal**
const handleClose = () => {
  isModalOpen.value = false
  selectedProductId.value = null
}

// **Delete Product**
const deleteProduct = async () => {
  if (!selectedProductId.value) {
    toast.error("No product selected!")
    return
  }

  try {
    await productService.deleteProduct(selectedProductId.value)
    toast.success("Product deleted successfully!")
    handleClose() // Close modal after deleting
    fetchProducts() // Refresh after delete
  } catch (error) {
    console.error("Error deleting product:", error)
    toast.error("Failed to delete product")
  }
}

const handleDelete = (id: number) => {
  // Your delete logic here
  console.log("Deleting user with ID:", id);
};
const approveProduct = async (productId: number) => {
  console.log("Approving Product ID:", productId); // Debugging Log

  if (!productId || isNaN(productId)) {
    toast.error("Invalid product ID!");
    return;
  }

  try {
    await productService.updateProductStatus(productId, 'approved'); // Corrected API Call
    toast.success("Product approved successfully!");
    fetchProducts(); // Refresh Product List
  } catch (error) {
    toast.error("Failed to approve product.");
  }
}

// ** Reject Product Function **
const rejectProduct = async (productId: number) => {
  console.log("Rejecting Product ID:", productId); // Debugging Log

  if (!productId || isNaN(productId)) {
    toast.error("Invalid product ID!");
    return;
  }

  try {
    await productService.updateProductStatus(productId, 'rejected'); // Corrected API Call
    toast.success("Product rejected successfully!");
    fetchProducts(); // Refresh Product List
  } catch (error) {
    toast.error("Failed to reject product.");
  }
}

</script>


<template>
  <div class="tw-mt-8 tw-mb-8 tw-flex tw-flex-col tw-gap-6">
    <!-- 🎯 User Dashboard -->
    <template v-if="userRole === 'user'">
      <div class="tw-flex tw-bg-white tw-text-[#171725] tw-items-center md:tw-px-6 tw-px-4 tw-rounded-[20px] tw-py-4 md:tw-gap-8 tw-gap-4">


        <div class="tw-flex tw-w-full max-sm:tw-flex-wrap tw-justify-between tw-m-auto">
          <div v-for="(item, index) in items" :key="index" class="tw-w-1/4 md:tw-flex-1 tw-justify-between tw-flex tw-flex-col tw-items-center tw-px-4 tw-py-4">
            <div class="md:tw-text-base tw-text-[12px] tw-font-medium">{{ item.title }}</div>
            <div class="md:tw-text-[26px] tw-text-[14px] tw-font-semibold">{{ item.number }}</div>
          </div>

        </div>

      </div>

      <!-- Products Table (Only Show if User Has Products) -->
      <div v-if="hasProducts" class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
        <div class="tw-flex tw-justify-between tw-items-center">
          <div class="md:tw-text-xl tw-text-[16px] tw-font-medium">Tus Productos</div>
          <RouterLink to="/products" class="tw-text-base tw-font-medium hover:tw-underline tw-text-[#0171EA]">
            Ver todos
          </RouterLink>
        </div>
        <TableComp
          :columns="tableheading"
          :rowData="limitedProducts"
          link="/products"
          variant="action"
          :activeFilter="activeFilter"
          @sort="handleSort"
          @delete="openModal"
        />
      </div>

      <!-- No Products Message -->
      <div v-else class="tw-text-center tw-text-gray-500 tw-font-medium">
        Aún no has agregado ningún producto.
      </div>
    </template>

    <!-- Admin Dashboard -->
    <template v-else-if="userRole === 'admin'">
      <div class="tw-flex tw-bg-white tw-text-[#171725] tw-items-center tw-px-6 tw-rounded-[20px] tw-py-4 tw-gap-8">
        <div v-for="(item, index) in visitorsAndProduct" :key="index" class="tw-flex-1">
          <div class="md:tw-text-base tw-text-[13px] tw-font-medium">{{ item.title }}</div>
          <div class="md:tw-text-[26px] tw-text-[14px] tw-font-semibold">{{ item.number }}</div>
        </div>
        <RouterLink to="/organization-stats" class="tw-text-base tw-font-medium hover:tw-underline tw-text-[#0171EA]">
          Ver todos
        </RouterLink>
      </div>

      <!-- Product Approval Table -->
      <div class="tw-flex tw-flex-col tw-mb-8 tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
        <div class="tw-flex tw-justify-between tw-items-center">
          <div class="md:tw-text-xl tw-text-[16px] tw-font-medium">Aprobación de Productos</div>
          <RouterLink to="/product-approval" class="tw-text-base tw-font-medium hover:tw-underline tw-text-[#0171EA]">
            Ver todos
          </RouterLink>
        </div>
        <ApprovalTableComp
          :columns="tableheading"
          :rowData="limitedProducts"
          link="/products"
          variant="action"
          :activeFilter="activeFilter"
          @sort="handleSort"
          @delete="handleDelete"
        @approve="approveProduct"
        @reject="rejectProduct"
        />
      </div>

      <!-- Manage Users (Only for Admin) -->
      <div class="tw-flex tw-flex-col tw-mb-8 tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
        <div class="tw-flex tw-justify-between tw-items-center">
          <div class="md:tw-text-xl tw-text-[16px] tw-font-medium">Gestionar Usuarios</div>
          <RouterLink to="/manage-users" class="tw-text-base tw-font-medium hover:tw-underline tw-text-[#0171EA]">
            Ver todos
          </RouterLink>
        </div>
        <UserTableComp
          :columns="[
            { key: 'name', label: 'Nombre', align: 'left' },
            { key: 'email', label: 'Correo Electrónico', align: 'left' },
            { key: 'password', label: 'Contraseña', align: 'center' },
            { key: 'action' , label: 'Acción' , align: 'center'},
            { key: 'isDisabled', label: 'Estado', align: 'center' },
          ]"
          :rowData="limitedUsers"
          @sort="handleSort"
          link="/manage-users"
          variant="action"
        />
      </div>
    </template>

    <DeleteModel :isOpen="isModalOpen" @close="handleClose" @delete="deleteProduct" />
  </div>
</template>
