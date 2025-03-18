<script setup lang="ts">
import SearchBar from '@/components/UI/SearchBar/SearchBar.vue'
import TableComp from '@/components/UI/ManageUser/UserComp.vue'
import AddUserButton from '@/components/UI/Button/AddUserbutton.vue'
import UserToggle from '@/components/UI/Toggle-Switch/UserToggle.vue'
import AddUserModel from '@/components/UI/AddUser-Modal/AddUser.vue'
import UserDeleteModel from '@/components/UI/Delete-Model/UserDeleteModel.vue'
import { ref, onMounted, computed } from 'vue'
import userService from '@/services/userService'
import visitorService from '@/services/visitorServices' // Import visitor API service
import { useToast } from 'vue-toastification'

const isModalOpen = ref(false)
const modalMode = ref<'add' | 'edit' | 'view'>('add')
const selectedUser = ref<User | null>(null) // Allow selectedUser to be either User or null
const users = ref<User[]>([]) // Store fetched users with correct typing
const activeFilter = ref(true) // Default: Show all users
const toast = useToast()
const isDeleteModalOpen = ref(false) // Modal state for delete confirmation
const userIdToDelete = ref<number | null>(null) // Store user ID to delete

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isDisabled: boolean;
  role: string;
  totalVisitors: number; // Add totalVisitors field
}

// **Fetch Visitors Count for Each User**
const fetchVisitorsCount = async () => {
  try {
    const visitorPromises = users.value.map(async (user) => {
      const response = await visitorService.getUserVisitors(user.id);
      return { id: user.id, totalVisitors: response.data.totalVisitors || 0 }; // Ensure 0 if no visitors
    });

    const visitorsData = await Promise.all(visitorPromises);

    // Update users with visitor count
    users.value = users.value.map(user => {
      const visitorInfo = visitorsData.find(v => v.id === user.id);
      return {
        ...user,
        totalVisitors: visitorInfo ? visitorInfo.totalVisitors : 0, // Assign visitors count
      };
    });

    console.log("Updated Users with Visitors:", users.value);
  } catch (error) {
    toast.error("Failed to fetch visitors count");
  }
}

// **Fetch Users**
const fetchUsers = async () => {
  try {
    const data = await userService.getUsers();
    users.value = data.filter((user: User) => user.role === 'user').map((user: User) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      isDisabled: user.isDisabled,
      totalVisitors: user.totalVisitors, // Initialize visitors count
    }));

    await fetchVisitorsCount(); // Fetch visitors count after users are loaded
  } catch (error) {
    toast.error("Failed to fetch users");
  }
}

// **Filter users based on toggle state**
const filteredUsers = computed(() => {
  return activeFilter.value ? users.value : users.value.filter(user => user.isDisabled);
});

// **Handle toggle status from UserToggle**
const handleToggleStatus = (status: boolean) => {
  activeFilter.value = status;
  console.log("Toggle Change:", status ? "All Users" : "Disabled Users");
};

// **Open Add User Modal**
const openAddUserModal = () => {
  selectedUser.value = null;
  modalMode.value = 'add';
  isModalOpen.value = true;
};

// **Open Edit User Modal**
const openEditUserModal = (user: User) => {
  selectedUser.value = user;
  modalMode.value = 'edit';
  isModalOpen.value = true;
};

// **Open View User Modal**
const openViewUserModal = (user: User) => {
  selectedUser.value = user;
  modalMode.value = 'view';
  isModalOpen.value = true;
};

// **Close Modal**
const closeModal = () => (isModalOpen.value = false);

// **Handle User Save**
const handleUserSave = async (userData: User, userId: number) => {
  try {
    await userService.saveUser(userData, userId);
    toast.success('User saved successfully!');
    fetchUsers(); // Refresh users after action
  } catch (error) {
    toast.error("Failed to save user");
  }
};

// **Search functionality**
const search = (value: string) => {
  console.log('Searching:', value);
};

// **Sorting handler**
const handleSort = (key: string) => {
  console.log(`Sorting by: ${key}`);
};

// **Open Delete Confirmation Modal**
const openDeleteModal = (userId: number) => {
  userIdToDelete.value = userId
  isDeleteModalOpen.value = true
}

// **Close Delete Confirmation Modal**
const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
  userIdToDelete.value = null // Reset user ID
}

const confirmDeleteUser = async () => {
  console.log("Trying to delete user:", userIdToDelete.value); // Debugging log

  if (userIdToDelete.value) {
    try {
      console.log("Sending DELETE request...");
      await userService.deleteUser(userIdToDelete.value);
      console.log("API responded successfully!");

      toast.success('User deleted successfully!');
      fetchUsers(); // Refresh users after deletion
      closeDeleteModal();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error deleting user:", error.message);
        toast.error("Failed to delete user: " + error.message);
      } else {
        console.error("Error deleting user:", error);
        toast.error("Failed to delete user");
      }
    }
  } else {
    console.warn("⚠️ No user ID to delete!");
  }
};



onMounted(fetchUsers);
</script>

<template>
  <div class="tw-flex tw-flex-col tw-mb-12 tw-mt-12 tw-gap-12">
    <!-- Header -->
    <div class="md:tw-flex tw-justify-between md:tw-items-center">
      <div class="tw-text-[24px] md:tw-text-3xl tw-font-medium">Gestionar Usuarios</div>
      <div class="md:tw-flex tw-gap-5 tw-items-start md:tw-items-center">
        <SearchBar :onSearch="search" placeholder="Search here..." />
        <div class="md:tw-flex tw-mt-2 md:tw-mt-0 tw-gap-4 tw-items-center">
          <!-- Toggle for filtering users -->
          <UserToggle @toggleStatus="handleToggleStatus" />
          <AddUserButton text="+ Agregar Usuario" @click="openAddUserModal" />
        </div>
      </div>
    </div>

    <!-- User Table -->
    <div class="tw-flex tw-flex-col tw-gap-6 tw-p-5 tw-bg-white tw-rounded-[20px]">
      <TableComp
        :columns="[
          { key: 'name', label: 'Nombre', align: 'left' },
          { key: 'email', label: 'Correo Electrónico', align: 'left' },
          { key: 'password', label: 'Contraseña', align: 'center' },
          { key: 'totalVisitors', label: 'Total de Visitantes', align: 'center' },
          { key: 'action', label: 'Acciones', align: 'center' },
          { key: 'isDisabled', label: 'Estado', align: 'center' },
          { key: 'deleteProduct', label: 'Eliminar Productos', align: 'center' },
        ]"
        :rowData="filteredUsers"
        @sort="handleSort"
        @editUser="openEditUserModal"
        @viewUser="openViewUserModal"
        @delete="openDeleteModal"
        link="/manage-users"
        variant="action"
        :activeFilter="activeFilter"
      />
    </div>

    <!-- Add/Edit User Modal -->
    <AddUserModel
      :isOpen="isModalOpen"
      :mode="modalMode"
      :userData="selectedUser || {}"
      @close="closeModal"
      @saveUser="handleUserSave"
    />

    <!-- Delete Confirmation Modal -->
    <UserDeleteModel
      :isOpen="isDeleteModalOpen"
      @close="closeDeleteModal"
      @confirm="confirmDeleteUser"
    />

  </div>
</template>
