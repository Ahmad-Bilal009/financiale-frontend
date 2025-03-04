<script setup lang="ts">
import { defineProps, defineEmits, ref, watch, computed } from 'vue'
import { useToast } from 'vue-toastification'
import userService from '@/services/userService'
import closeIcon from '@/assets/svg/cross-icon.svg'
import defaultUserImage from '@/assets/img/no-user-image.png' // Placeholder image

const toast = useToast()

// **Define Props**
const props = defineProps({
  isOpen: Boolean,
  mode: String, // "add", "edit", or "view"
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

// **Emit Events**
const emit = defineEmits(['close', 'userSaved'])

// **Get User Role from Local Storage**
const UserRole = computed(() => localStorage.getItem('role') || 'superadmin')

// **Reactive Form Data**
const form = ref({
  name: '',
  email: '',
  password: '',
  role: 'user',
  image: null as File | null,
})

// **Reactive Image Preview**
const imagePreview = ref<string | null>(null)

// **Watch for Modal Open/Close & Load Data**
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      form.value = { name: '', email: '', password: '', role: 'user', image: null }
      imagePreview.value = defaultUserImage // Default placeholder

      if ((props.mode === 'edit' || props.mode === 'view') && props.userData) {
        form.value = {
          name: props.userData.name || '',
          email: props.userData.email || '',
          password: '',
          role: props.userData.role || 'user',
          image: null,
        }
        imagePreview.value = props.userData.image && props.userData.image !== 'null'
        ? `https://1ed1-39-63-31-174.ngrok-free.app${props.userData.image}`
        : defaultUserImage

      }
    }
  },
  { immediate: true }
)

// **Handle Image Change (Only in Add/Edit Mode)**
const handleImageChange = (event: Event) => {
  if (props.mode === 'view') return
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    form.value.image = target.files[0] // Store the file
    imagePreview.value = URL.createObjectURL(target.files[0]) // Generate preview
  }
}

// **Handle Form Submission (Add/Edit User)**
const handleSubmit = async () => {
  if (props.mode === 'view') {
    handleClose()
    return
  }

  if (!form.value.name || !form.value.email || (props.mode === 'add' && !form.value.password)) {
    toast.error('⚠️ Please fill all required fields.')
    return
  }

  try {
    const userData = {
      name: form.value.name,
      email: form.value.email,
      password: props.mode === 'add' ? form.value.password : undefined,
      role: UserRole.value === 'superadmin' ? form.value.role : props.userData.role,
      image: form.value.image,
    }

    if (props.mode === 'add') {
      await userService.saveUser(userData)
      toast.success('User created successfully!')
    } else {
      await userService.saveUser(userData, props.userData.id)
      toast.success('User updated successfully!')
    }

    emit('userSaved')
    handleClose()
  } catch (error) {
    console.error('Error Saving User:', error)
    toast.error('An error occurred while saving the user.')
  }
}

// **Close Modal**
const handleClose = () => {
  emit('close')
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
          {{ mode === 'add' ? 'Add User' : mode === 'view' ? 'View User' : 'Edit User' }}
        </h2>
        <div @click="handleClose" class="tw-cursor-pointer">
          <closeIcon />
        </div>
      </div>

      <!-- User Image Display (Top Center) -->
      <div class="tw-flex tw-justify-center tw-items-center tw-mb-4">
        <img :src="imagePreview || defaultUserImage" alt="User Image"
             class="tw-w-32 tw-h-32 tw-rounded-full tw-border tw-border-gray-300"/>
      </div>

      <!-- Form Fields -->
      <form @submit.prevent="handleSubmit" class="tw-flex tw-flex-col tw-gap-5">

        <!-- Image Upload (ONLY in Add/Edit Mode) -->
        <div class="tw-flex tw-flex-col tw-gap-2" v-if="mode !== 'view'">
          <label class="tw-text-[14px] tw-font-400 tw-text-gray-600">Upload Image</label>
          <input type="file" @change="handleImageChange" accept="image/*"
                 class="tw-w-full border tw-border-gray-300 tw-rounded-[8px]"/>
        </div>

        <!-- Name -->
        <div class="tw-flex tw-flex-col tw-gap-2">
          <label class="tw-text-[14px] tw-font-400 tw-text-gray-600">Organization Name</label>
          <input v-model="form.name" type="text" placeholder="Enter Name" required
                 class="tw-w-full border tw-border-gray-300 tw-rounded-md tw-p-2"
                 :disabled="mode === 'view'"/>
        </div>

        <!-- Email -->
        <div class="tw-flex tw-flex-col tw-gap-2">
          <label class="tw-text-[14px] tw-font-400 tw-text-gray-600">Email</label>
          <input v-model="form.email" type="email" placeholder="Enter Email" required
                 class="tw-w-full border tw-border-gray-300 tw-rounded-md tw-p-2"
                 :disabled="mode === 'view'"/>
        </div>

        <!-- Password (Only in Add Mode) -->
        <div class="tw-flex tw-flex-col tw-gap-2" >
          <label class="tw-text-[14px] tw-font-400 tw-text-gray-600">Password</label>
          <input v-model="form.password" type="password" placeholder="Enter Password" required
                 class="tw-w-full border tw-border-gray-300 tw-rounded-md tw-p-2" :disabled="mode === 'view'"/>
        </div>

        <!-- Role Selection (Only for Superadmin) -->
        <div class="tw-flex tw-flex-col tw-gap-2">
          <label class="tw-text-[14px] tw-font-400 tw-text-gray-600">Role</label>
          <select v-model="form.role"
                  class="tw-w-full border tw-border-gray-300 tw-rounded-md tw-p-2"
                  :disabled="mode === 'view' || UserRole !== 'superadmin'">
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Superadmin</option>
          </select>
        </div>

        <!-- Submit Button -->
        <div class="tw-flex tw-justify-end">
          <button v-if="mode !== 'view'" type="submit"
                  class="tw-bg-[#24B2E3] tw-text-[16px] text-white tw-px-[28px] tw-py-[12px] tw-rounded-[13px] tw-font-medium">
            {{ mode === 'add' ? '+ Create User' : 'Update' }}
          </button>
          <button v-else @click="handleClose"
                  class="tw-bg-[#24B2E3] tw-text-[16px] tw-text-white tw-px-[28px] tw-py-[12px] tw-rounded-[13px] tw-font-medium">
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
