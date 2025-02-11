<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, computed } from 'vue'
import axios from 'axios'
import closeIcon from '@/assets/svg/cross-icon.svg'

// Define Props
const props = defineProps({
  isOpen: Boolean,
  mode: String, // "add" or "edit"
  userData: {
    type: Object,
    default: () => ({
      name: '',
      email: '',
      password: '',
      role: 'user', // Default role
    }),
  },
})

// Emit events
const emit = defineEmits(['close', 'userSaved'])

// ✅ Get logged-in user role from localStorage (reactive)
const UserRole = computed(() => localStorage.getItem('role') || 'superadmin')

// ✅ Reactive Form Data
const form = ref({
  name: '',
  email: '',
  password: '',
  role: 'user', // Default role
})

// ✅ Reset Form When Modal Opens
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      // ✅ Reset the form when opening
      form.value = { name: '', email: '', password: '', role: 'user' }

      // ✅ Load existing user data in edit mode
      if (props.mode === 'edit' && props.userData) {
        form.value = {
          ...props.userData,
          password: '',  // Do not pre-fill password
          role: props.userData.role || 'user', // ✅ Ensure role is set correctly
        }
      }
    }
  },
  { immediate: true }
)

// ✅ Handle Form Submission (Add / Edit User)
const handleSubmit = async () => {
  if (!form.value.name || !form.value.email || (props.mode === 'add' && !form.value.password)) {
    alert('Please fill all required fields.')
    return
  }

  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Unauthorized: No token found.')

    let requestBody = {
      name: form.value.name,
      email: form.value.email,
    }

    if (props.mode === 'add') {
      requestBody.password = form.value.password // Password only in Add Mode
    }

    // ✅ Ensure role is sent only for Superadmin
    if (UserRole.value === 'superadmin') {
      requestBody.role = form.value.role
    }

    let response
    if (props.mode === 'add') {
      // ✅ Create New User (POST request)
      response = await axios.post(
        'http://localhost:5001/api/admin/users',
        requestBody,
        { headers: { Authorization: `Bearer ${token}` } }
      )
    } else {
      // ✅ Update Existing User (PUT request)
      response = await axios.put(
        `http://localhost:5001/api/admin/users/${props.userData.id}`,
        requestBody,
        { headers: { Authorization: `Bearer ${token}` } }
      )
    }

    console.log('✅ User Saved:', response.data)
    emit('userSaved') // Notify parent to refresh user list
    handleClose()
  } catch (error) {
    console.error('❌ Error Saving User:', error)
    alert(error.response?.data?.message || 'An error occurred while saving the user.')
  }
}

// ✅ Close Modal
const handleClose = () => {
  emit('close') // Notify parent to close modal
}
</script>

---

### **📌 Updated Template**
```vue
<template>
  <div
    v-if="isOpen"
    class="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center md:tw-ml-[256px]"
  >
    <div class="tw-bg-white tw-gap-[24px] tw-flex tw-flex-col tw-p-[20px] tw-rounded-[16px] tw-w-[562px]">
      <!-- Modal Header -->
      <div class="tw-flex tw-justify-between tw-items-center">
        <h2 class="tw-text-xl tw-font-medium tw-text-[#171725]">
          {{ mode === 'add' ? 'Add User' : 'Edit User' }}
        </h2>
        <div @click="handleClose" class="tw-cursor-pointer">
          <closeIcon />
        </div>
      </div>

      <!-- Form Fields -->
      <form @submit.prevent="handleSubmit" class="tw-flex tw-flex-col tw-gap-5">
        <!-- Name -->
        <div class="tw-flex tw-flex-col tw-gap-2">
          <label class="tw-text-[14px] tw-font-400 tw-text-gray-600">Name</label>
          <input v-model="form.name" type="text" placeholder="Enter Name" required
                 class="tw-w-full border tw-border-gray-300 tw-rounded-md tw-p-2 focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-blue-400"/>
        </div>

        <!-- Email -->
        <div class="tw-flex tw-flex-col tw-gap-2">
          <label class="tw-text-[14px] tw-font-400 tw-text-gray-600">Email</label>
          <input v-model="form.email" type="email" placeholder="Enter Email" required
                 class="tw-w-full border tw-border-gray-300 tw-rounded-md tw-p-2 focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-blue-400"/>
        </div>

        <!-- Password (Only in Add Mode) -->
        <div class="tw-flex tw-flex-col tw-gap-2" v-if="mode === 'add'">
          <label class="tw-text-[14px] tw-font-400 tw-text-gray-600">Password</label>
          <input v-model="form.password" type="password" placeholder="Enter Password" required
                 class="tw-w-full border tw-border-gray-300 tw-rounded-md tw-p-2 focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-blue-400"/>
        </div>

        <!-- Role Selection (Only for Superadmin) -->
        <div class="tw-flex tw-flex-col tw-gap-2" v-if="UserRole === 'superadmin'">
          <label class="tw-text-[14px] tw-font-400 tw-text-gray-600">Role</label>
          <select v-model="form.role"
                  class="tw-w-full border tw-border-gray-300 tw-rounded-md tw-p-2 focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-blue-400">
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>
        </div>

        <!-- Submit Button -->
        <div class="tw-flex tw-justify-end">
          <button type="submit"
                  class="tw-bg-[#24B2E3] tw-text-[16px] tw-flex tw-justify-center tw-items-center text-white tw-px-[28px] tw-py-[12px] tw-rounded-[13px] tw-font-medium">
            {{ mode === 'add' ? '+ Create User' : 'Update' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
