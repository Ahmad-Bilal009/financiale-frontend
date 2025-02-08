<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
import closeIcon from '@/assets/svg/cross-icon.svg'

// Define UserData interface
interface UserData {
  name: string
  email: string
  password: string
}

// Props to control modal visibility and type
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  mode: {
    type: String,
    required: true, // "add" or "edit"
  },
  userData: {
    type: Object as () => UserData,
    default: () => ({
      name: '',
      email: '',
      password: '',
    }),
  },
})

// Emit events for closing the modal and saving data
const emit = defineEmits(['close', 'saveUser'])

// Form data (reactive)
const form = ref({
  name: '',
  email: '',
  password: '',
})

// Watch for changes in `userData` when in edit mode
watch(
  () => props.userData,
  (newData) => {
    if (props.mode === 'edit' && newData) {
      form.value = { ...newData }
    }
  },
  { immediate: true },
)

// Handle form submission
const handleSubmit = () => {
  if (!form.value.name || !form.value.email || (!form.value.password && props.mode === 'add')) {
    alert('Please fill all fields.')
    return
  }

  // Emit saveUser event with form data
  emit('saveUser', form.value)
  handleClose()
}

// Handle modal close
const handleClose = () => {
  emit('close')
}
</script>

<template>
  <div
    v-if="isOpen"
    class="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center md:tw-ml-[256px]"
  >
    <div
      class="tw-bg-white tw-gap-[24px] tw-flex tw-flex-col tw-p-[20px] tw-rounded-[16px] tw-w-[562px]"
    >
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
        <!-- Name Field -->
        <div class="tw-flex tw-flex-col tw-gap-2">
          <label for="name" class="tw-text-[14px] tw-font-400 tw-text-gray-600">Name</label>
          <input
            v-model="form.name"
            type="text"
            id="name"
            placeholder="Enter Name"
            class="tw-w-full border tw-border-gray-300 tw-rounded-md tw-p-2 focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-blue-400"
          />
        </div>

        <!-- Email Field -->
        <div class="tw-flex tw-flex-col tw-gap-2">
          <label for="email" class="tw-text-[14px] tw-font-400 tw-text-gray-600">Email</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            placeholder="Enter Email"
            class="tw-w-full border tw-border-gray-300 tw-rounded-md tw-p-2 focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-blue-400"
          />
        </div>

        <!-- Password Field -->
        <div class="tw-flex tw-flex-col tw-gap-2" >
          <label for="password" class="tw-text-[14px] tw-font-400 tw-text-gray-600">Password</label>
          <input
            v-model="form.password"
            type="text"
            id="password"
            placeholder="Enter Password"
            class="tw-w-full border tw-border-gray-300 tw-rounded-md tw-p-2 focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-blue-400"
          />
        </div>

        <!-- Submit Button -->
        <div class="tw-flex tw-justify-end">
          <button
            type="submit"
            class="tw-bg-[#24B2E3] tw-text-[16px] tw-flex tw-justify-center tw-items-center text-white tw-px-[28px] tw-py-[12px] tw-rounded-[13px] tw-font-medium"
          >
            {{ mode === 'add' ? '+ Create User' : 'Update' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
