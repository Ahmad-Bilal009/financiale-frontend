<script setup lang="ts">
import { ref, onMounted, computed, defineProps } from 'vue'
import TableComp from '@/components/UI/table/TableComp.vue'
import ApprovalTableComp from '@/components/UI/ApprovalTable/TableComp.vue'
import UserTableComp from '@/components/UI/ManageUser/UserComp.vue'
import userService from '@/services/userService'
import productService from '@/services/productServices'
import dashboardService from '@/services/dashboardService'
import { useToast } from "vue-toastification"

const toast = useToast();


const user = JSON.parse(localStorage.getItem('user') || '{}')
const userId = user?.id || null
const isAdmin = user?.role === 'admin'

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
}

// Update the stats object to use the new interface
const stats = ref<Stats>({
  totalProducts: 0,
  createdToday: 0,
  createdThisWeek: 0,
  createdThisMonth: 0,
  totalUsers: 0,
  totalVisitors: 0,
});

// Define the User interface
interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  isDisabled: boolean;
  // Add other relevant properties if needed
}

// Define the Product interface
interface Product {
  id: number;
  title: string;
  userId?: number;
  contactDetail?: { address: string };
  stageOfEntrepreneurship?: string;
  status: string;
  createdAt?: string;
  // Add other relevant properties as needed
}

const fetchProducts = async () => {
  try {
    let usersMap: Record<number, string> = {}; // Store userId → Organization Name

    // **Only fetch users if Admin (To get Organization names)**
    if (isAdminComputed) {
      const userResponse = await userService.getUsers();
      usersMap = userResponse.reduce((map: Record<number, string>, user: User) => {
        map[user.id] = user.name; // Map user ID to Organization Name
        return map;
      }, {} as Record<number, string>);
      console.log("Users Fetched:", usersMap);
    }

    // **Fetch Products**
    const response = await productService.getProducts();
    console.log("API Response (Products):", response);

    products.value = response
      .filter((product: Product) => isAdminComputed || String(product.userId) === String(userId)) 
      .map((product: Product) => ({
        id: product.id,
        title: product.title,
        organization: product.userId ? usersMap[product.userId] || (isAdminComputed ? "N/A" : user.name) : "N/A",
        location: product.contactDetail?.address || "N/A",
        stage: product.stageOfEntrepreneurship || "N/A",
        userId: product.userId || null,
        createdAt: product.createdAt || null,
      }));

    console.log("Filtered Products:", products.value);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
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

    const response = await dashboardService.getStats();
    stats.value = response || {
      totalProducts: 0,
      createdToday: 0,
      createdThisWeek: 0,
      createdThisMonth: 0,
      totalUsers: 0,
      totalVisitors: 0,
    };

    // If the user is NOT an admin, filter stats to only show their products
    if (!isAdminComputed) {
      const userProducts = products.value.filter((product: Product) => {
        return String(product.userId) === String(userId);
      });
      stats.value.createdToday = userProducts.filter((product: Product) => {
        if (!product.createdAt) return false;
        return new Date(product.createdAt).toDateString() === new Date().toDateString();
      }).length;

      stats.value.createdThisWeek = userProducts.filter((product: Product) => {
        if (!product.createdAt) return false;
        return getWeekNumber(new Date(product.createdAt)) === getWeekNumber(new Date());
      }).length;

      stats.value.createdThisMonth = userProducts.filter((product: Product) => {
        if (!product.createdAt) return false;
        const productDate = new Date(product.createdAt);
        const currentDate = new Date();
        return productDate.getMonth() === currentDate.getMonth() && productDate.getFullYear() === currentDate.getFullYear();
      }).length;
      stats.value.totalProducts = userProducts.length || 0;
    }
  } catch (error) {
    toast.error("Failed to load dashboard statistics");
  }
};

//Helper function to get the week number of a date
const getWeekNumber = (date: Date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDays = Math.floor((date.getTime() - firstDayOfYear.getTime()) / (24 * 60 * 60 * 1000));
  return Math.ceil((pastDays + firstDayOfYear.getDay() + 1) / 7);
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
])

const visitorsAndProduct = computed(() => [
  { title: 'Total de Productos', number: stats.value.totalProducts },
  { title: 'Total de Organizaciones', number: stats.value.totalUsers },
  { title: 'Total de Visitantes', number: stats.value.totalVisitors },

])

const tableheading = computed(() => {
  const baseColumns = [
    { key: "title", label: "Título", align: "center" },
    { key: "organization", label: "Organización", align: "center" },
    { key: "location", label: "Ubicación", align: "center" },
    { key: "stage", label: "Etapa", align: "center" },
  ];
  if (isAdminComputed) {
    baseColumns.push({ key: "action", label: "Acción", align: "center" });
  }
  return baseColumns;
});

const handleSort = (key: string) => {
  console.log(`Sorting by: ${key}`)
}

// Example function with typed parameters
const someFunction = (arg: string | string[]) => {
  const numberArg = Array.isArray(arg) ? parseInt(arg[0], 10) : parseInt(arg, 10);
  // Use numberArg
};

// Define activeFilter
const activeFilter = ref('all');

// Define handleDelete
const handleDelete = (productId: number) => {
  console.log(`Deleting product with ID: ${productId}`);
  // Implement delete logic here
};

// Define handleMoreInfo
const handleMoreInfo = (id: number) => {
  console.log(`More info for product ID: ${id}`);
};
</script>


<template>
  <div class="tw-mt-8 tw-mb-8 tw-flex tw-flex-col tw-gap-6">
    <!-- 🎯 User Dashboard -->
    <template v-if="userRole === 'user'">
      <div class="tw-flex tw-bg-white tw-text-[#171725] tw-items-center md:tw-px-6 tw-px-4 tw-rounded-[20px] tw-py-4 md:tw-gap-8 tw-gap-4">
        <div v-for="(item, index) in items" :key="index" class="tw-flex-1 tw-items-center">
          <div class="md:tw-text-base tw-text-[12px] tw-font-medium">{{ item.title }}</div>
          <div class="md:tw-text-[26px] tw-text-[16px] tw-font-semibold">{{ item.number }}</div>
        </div>
      </div>

      <!-- Products Table (Only Show if User Has Products) -->
      <div v-if="hasProducts" class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
        <div class="tw-flex tw-justify-between tw-items-center">
          <div class="tw-text-xl tw-font-medium">Tus Productos</div>
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
          @delete="handleDelete"
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
          <div class="tw-text-base tw-font-medium">{{ item.title }}</div>
          <div class="tw-text-[26px] tw-font-semibold">{{ item.number }}</div>
        </div>
      </div>

      <!-- Product Approval Table -->
      <div class="tw-flex tw-flex-col tw-mb-8 tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
        <div class="tw-flex tw-justify-between tw-items-center">
          <div class="tw-text-xl tw-font-medium">Aprobación de Productos</div>
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
        />
      </div>

      <!-- Manage Users (Only for Admin) -->
      <div class="tw-flex tw-flex-col tw-mb-8 tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
        <div class="tw-flex tw-justify-between tw-items-center">
          <div class="tw-text-xl tw-font-medium">Gestionar Usuarios</div>
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
  </div>
</template>
