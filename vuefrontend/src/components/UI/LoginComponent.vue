<script setup lang="ts">
import { loginSchema } from '@/schemas'
import type { LoginFormTypes } from '@/types'
import { useForm, useField } from 'vee-validate'
import { useRouter } from 'vue-router'
// import { watch } from 'vue'

const router = useRouter()

// Use the form with the schema
const { handleSubmit, resetForm, validate } = useForm<LoginFormTypes>({
  validationSchema: loginSchema,
})

// Use fields for individual validation
const { value: email, errorMessage: emailError } = useField<string>('email')
const { value: password, errorMessage: passwordError } = useField<string>('password')

const onSubmit = async (values: LoginFormTypes) => {
  const { valid } = await validate()
  if (!valid) {
    console.error('Form is invalid')
    return
  }

  console.log(' Form Submitted Successfully!', values)

  // Redirect to dashboard
  router.push('/dashboard')

  // Reset the form
  resetForm()
}

</script>

<template>
  <div class="tw-flex tw-px-2 tw-flex-col tw-items-center tw-justify-center tw-h-[100vh]">
    <div class="tw-p-4 sm:tw-p-6 tw-bg-white tw-rounded-3xl">
      <div class="tw-flex tw-flex-col tw-gap-2 tw-mb-5">
        <div class="tw-text-primary tw-text-4xl tw-font-medium">Welcome back</div>
        <div class="tw-text-base tw-text-gray">Welcome back! Please enter your details.</div>
      </div>
      <!-- Attach handleSubmit to onSubmit -->
      <form
        @submit.prevent="
          () => {
            handleSubmit(onSubmit)()
          }
        "
        class="tw-flex tw-flex-col tw-gap-6"
      >
        <div class="tw-flex tw-flex-col tw-gap-4">
          <div class="tw-flex tw-flex-col tw-gap-[10px]">
            <label for="email" class="tw-text-base tw-text-dark-gray">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="tw-w-full tw-min-w-full sm:tw-min-w-[361px] tw-px-3 tw-py-[9px] tw-bg-transparent tw-placeholder:text-[#D2D2D2] tw-border-[#D2D2D2] tw-rounded-[10px] tw-border-[1px]"
              placeholder="Enter your email"
            />
            <span class="tw-text-red-500">{{ emailError }}</span>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[10px]">
            <label for="password" class="tw-text-base tw-text-dark-gray">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              class="tw-w-full tw-min-w-full sm:tw-min-w-[361px] tw-px-3 tw-py-[9px] tw-bg-transparent tw-placeholder:text-[#D2D2D2] tw-border-[#D2D2D2] tw-rounded-[10px] tw-border-[1px]"
            />
            <span class="tw-text-red-500">{{ passwordError }}</span>
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="tw-bg-primary tw-w-full text-white tw-py-4 tw-text-base tw-font-medium tw-rounded-[10px]"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
