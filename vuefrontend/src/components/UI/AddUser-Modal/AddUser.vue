<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, computed } from 'vue'
import { useToast } from 'vue-toastification'
import userService from '@/services/userService'
import closeIcon from '@/assets/svg/cross-icon.svg'

const toast = useToast() // Initialize toast notifications

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
      role: 'user',
      image: null,
    }),
  },
})

// Emit events
const emit = defineEmits(['close', 'userSaved'])

// Get logged-in user role from localStorage (reactive)
const UserRole = computed(() => localStorage.getItem('role') || 'superadmin')

// Reactive Form Data
const form = ref({
  name: '',
  email: '',
  password: '',
  role: 'user',
  image: null,
})

// Reactive image preview
const imagePreview = ref<string | null>(null)

// Reset Form When Modal Opens
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      form.value = { name: '', email: '', password: '', role: 'user', image: null }
      imagePreview.value = null

      // Load existing user data in edit mode
      if (props.mode === 'edit' && props.userData) {
        form.value = {
          ...props.userData,
          password: '',
          role: props.userData.role || 'user',
          image: null,
        }
        if (props.userData.image) {
          imagePreview.value = `http://localhost:5001${props.userData.image}`
        }
      }
    }
  },
  { immediate: true }
)

// Handle Image Selection
const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    form.value.image = target.files[0] // Store the file
    imagePreview.value = URL.createObjectURL(target.files[0]) // Generate preview
  }
}

// Handle Form Submission (Add / Edit User)
const handleSubmit = async () => {
  if (!form.value.name || !form.value.email || (props.mode === 'add' && !form.value.password)) {
    toast.error('⚠️ Please fill all required fields.')
    return
  }

  try {
    const userData = {
      name: form.value.name,
      email: form.value.email,
      password: props.mode === 'add' ? form.value.password : undefined,
      role: UserRole.value === 'superadmin' ? form.value.role : props.userData.role, // Only superadmin can change role
      image: form.value.image,
    }

    if (props.mode === 'add') {
      await userService.saveUser(userData)
      toast.success(' User created successfully!')
    } else {
      await userService.saveUser(userData, props.userData.id)
      toast.success(' User updated successfully!')
    }

    emit('userSaved') // Notify parent to refresh user list
    handleClose()
  } catch (error) {
    console.error(' Error Saving User:', error)
    toast.error(' An error occurred while saving the user.')
  }
}

// Close Modal
const handleClose = () => {
  emit('close') // Notify parent to close modal
}
</script>

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
        <!-- Image Upload -->
        <div class="tw-flex tw-flex-col tw-gap-2">
          <label class="tw-text-[14px] tw-font-400 tw-text-gray-600">Company Image</label>
          <input type="file" @change="handleImageChange" accept="image/*"
                 class="tw-w-full border tw-border-gray-300 tw-rounded-md tw-p-2"/>
          <img v-if="imagePreview" :src="imagePreview" alt="Profile Preview"
               class="tw-w-24 tw-h-24 tw-rounded-md tw-mt-2"/>
        </div>

        <!-- Name -->
        <div class="tw-flex tw-flex-col tw-gap-2">
          <label class="tw-text-[14px] tw-font-400 tw-text-gray-600">Organization Name</label>
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
        <div class="tw-flex tw-flex-col tw-gap-2">
          <label class="tw-text-[14px] tw-font-400 tw-text-gray-600">Role</label>
          <select v-model="form.role"
                  class="tw-w-full border tw-border-gray-300 tw-rounded-md tw-p-2 focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-blue-400"
                  :disabled="UserRole !== 'superadmin'"> <!-- Lock role field for admins -->
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
