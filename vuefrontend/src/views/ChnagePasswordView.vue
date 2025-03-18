<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "vue-toastification"; // Import toast
import authService from "@/services/authService"; // Import API service

const toast = useToast(); // Initialize toast

const currentScreen = ref("resetPassword"); // resetPassword, enterCode, createPassword, passwordReset
const email = ref("");
const confirmationCode = ref(["", "", "", ""]);
const newPassword = ref("");
const confirmPassword = ref("");
const isLoading = ref(false);

/**
 * Send OTP Code to User Email
 */
 const sendCode = async () => {
  if (!email.value.trim()) {
    toast.error("Please enter your email address.");
    return;
  }

  try {
    isLoading.value = true;
    await authService.forgotPassword(email.value);
    toast.success("A 4-digit code has been sent to your email.");
    currentScreen.value = "enterCode"; // Transition to code verification
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An error occurred.";
    toast.error(errorMessage);
  } finally {
    isLoading.value = false;
  }
};

/**
 * Handle OTP Input and Auto-Focus Next Field
 */
const handleCodeInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement;
  confirmationCode.value[index] = target.value;

  if (target.value.length === 1 && index < 3) {
    const nextInput = document.querySelector(`#code-${index + 1}`) as HTMLInputElement;
    nextInput?.focus();
  }
};

/**
 * Verify OTP Code
 */
const verifyCode = async () => {
  const otp = confirmationCode.value.join("");

  if (otp.length !== 4) {
    toast.warning("Please enter the complete 4-digit code.");
    return;
  }

  try {
    isLoading.value = true;
    await authService.verifyOtp(email.value, otp);
    toast.success("Code verified successfully.");
    currentScreen.value = "createPassword"; // Move to password reset screen
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Invalid code, please try again.";
    toast.error(errorMessage);
  } finally {
    isLoading.value = false;
  }
};

/**
 * Reset Password
 */
const resetPassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    toast.error("Passwords do not match.");
    return;
  }

  if (newPassword.value.length < 8) {
    toast.warning("Password must be at least 8 characters.");
    return;
  }

  try {
    isLoading.value = true;
    await authService.resetPassword(email.value, confirmationCode.value.join(""), newPassword.value);
    toast.success("Password reset successfully.");
    currentScreen.value = "passwordReset"; // Transition to success screen
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Password reset failed.";
    toast.error(errorMessage);
  } finally {
    isLoading.value = false;
  }
};


/**
 * Redirect to Login Page
 */
const handleContinue = () => {
  window.location.href = "/login"; // Redirect user to login page
};
</script>



<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-min-h-screen tw-bg-gray-50 tw-p-8">

    <!-- Reset Password Screen -->
    <div v-if="currentScreen === 'resetPassword'" class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-max-w-md tw-mx-auto tw-my-auto">
      <!-- Icon -->
      <div class="tw-mb-6">
        <div class="tw-flex tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-rounded tw-bg-blue-100">
          <img src="../../public/lockscreen.png" class="tw-w-6 tw-h-6" alt="">
        </div>
      </div>

      <!-- Title -->
      <h2 class="tw-text-xl tw-font-bold tw-text-[#192854] tw-mb-2">Restablecer tu contraseña</h2>

      <!-- Subtitle -->
      <p class="tw-text-gray-500 tw-text-[16px] tw-mb-6">
        ¿Olvidaste tu contraseña? Por favor, ingresa tu <br /> correo electrónico y te enviaremos un código de 4 dígitos.
      </p>


      <!-- Email Input -->
      <div class="tw-w-full tw-mb-4">
        <label for="email" class="tw-block tw-text-left tw-font-medium tw-text-gray-700 tw-text-[16px] tw-mb-2">Correo Electrónico</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Ingresa tu correo electrónico"
          class="tw-w-full tw-px-4 tw-py-2 tw-bg-white border border-gray-300 tw-rounded-lg tw-outline-none tw-focus:ring-2 tw-focus:ring-blue-200"
        />
      </div>

      <!-- Button -->
      <button
        @click="sendCode"
        class="tw-bg-[#192854] tw-text-white tw-font-semibold tw-py-3 tw-w-full tw-rounded-lg tw-shadow-md hover:tw-bg-[#1b2964]"
      >
      Obtener código de 4 dígitos
      </button>
    </div>

    <!-- Enter Confirmation Code Screen -->
    <div v-if="currentScreen === 'enterCode'" class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-max-w-md tw-mx-auto tw-my-auto">
      <!-- Icon -->
      <div class="tw-mb-6">
        <div class="tw-flex tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-rounded-full tw-bg-blue-100">

          <img src="../../public/password-check.png" class="tw-w-6 tw-h-6" alt="">
        </div>
      </div>

      <!-- Title -->
      <h2 class="tw-text-xl tw-font-bold tw-mb-2">Ingresar código de confirmación</h2>

      <!-- Subtitle -->
      <p class="tw-text-gray-500 tw-mb-6">
        We sent a code to <span class="tw-font-medium">{{ email }}</span>
      </p>

      <!-- Code Input -->
      <div class="tw-flex tw-gap-4 tw-mb-4">
        <input
          v-for="(code, index) in confirmationCode"
          :key="index"
          :id="`code-${index}`"
          v-model="confirmationCode[index]"
          type="text"
          maxlength="1"
          class="tw-w-12 tw-h-12 tw-text-center tw-text-lg border tw-border-[#24B2E3] tw-bg-white tw-rounded-lg  tw-focus:ring-2 tw-focus:ring-blue-200"
          @input="handleCodeInput(index, $event)"
        />
      </div>

      <!-- Continue Button -->
      <button
        @click="verifyCode"
        class="tw-bg-[#192854] tw-text-white tw-font-semibold tw-py-3 tw-w-full tw-rounded-lg tw-shadow-md hover:tw-bg-[#1b2964]"
      >
        Continue
      </button>

      <div class="tw-flex tw-mt-4 tw-flex-col tw-items-center tw-justify-center tw-w-full tw-max-w-md tw-mx-auto tw-my-auto">
        <p class="tw-text-gray-500 tw-text-[16px] tw-mb-6">
          Didn't receive the code? <span class="tw-font-medium tw-text-[#24B2E3]">resend</span>
        </p>
      </div>
    </div>

    <!-- Create New Password Screen -->
    <div v-if="currentScreen === 'createPassword'" class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-max-w-md tw-mx-auto tw-my-auto">
      <!-- Icon -->
      <div class="tw-mb-6">
        <div class="tw-flex tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-rounded-lg tw-bg-blue-100">
          <img src="../../public/lock.png" alt="Lock Icon" class="tw-w-6 tw-h-6" />
        </div>
      </div>

      <!-- Title -->
      <h2 class="tw-text-xl tw-font-bold tw-mb-2">Create a new password</h2>

      <!-- Subtitle -->
      <p class="tw-text-gray-500 tw-mb-6">
        Please choose a password that hasn’t been <br /> used before. Must be at least 8 characters.
      </p>

      <!-- Password Inputs -->
      <div class="tw-w-full tw-mb-4">
        <label for="new-password" class="tw-block tw-text-left tw-font-medium tw-text-gray-700 tw-mb-2">Set new password</label>
        <input
          id="new-password"
          v-model="newPassword"
          type="password"
          placeholder="Enter password"
          class="tw-w-full tw-px-4 tw-py-2 tw-bg-white border border-gray-300 tw-rounded-lg tw-outline-none tw-focus:ring-2 tw-focus:ring-blue-200"
        />
      </div>
      <div class="tw-w-full tw-mb-4">
        <label for="confirm-password" class="tw-block tw-text-left tw-font-medium tw-text-gray-700 tw-mb-2">Confirm new password</label>
        <input
          id="confirm-password"
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm password"
          class="tw-w-full tw-px-4 tw-py-2 tw-bg-white border border-gray-300 tw-rounded-lg tw-outline-none tw-focus:ring-2 tw-focus:ring-blue-200"
        />
      </div>

      <!-- Reset Password Button -->
      <button
        @click="resetPassword"
        class="tw-bg-[#192854] tw-text-white tw-font-semibold tw-py-3 tw-w-full tw-rounded-lg tw-shadow-md hover:tw-bg-[#1b2964]"
      >
        Reset Password
      </button>
    </div>

    <!-- Password Reset Success Screen -->
    <div v-if="currentScreen === 'passwordReset'" class="tw-flex tw-flex-col tw-items-center tw-justify-center tw-w-full tw-max-w-md tw-mx-auto tw-my-auto">
      <!-- Icon -->
      <div class="tw-mb-6">
        <div class="tw-flex tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-rounded-lg tw-bg-blue-100">
          <img src="../../public/tick-circle.png" alt="Success Icon" class="tw-w-6 tw-h-6" />
        </div>
      </div>

      <!-- Title -->
      <h2 class="tw-text-xl tw-font-bold tw-text-[#192854] tw-mb-2">Password reset!</h2>

      <!-- Subtitle -->
      <p class="tw-text-gray-500 tw-text-center tw-mb-6">
        Your password has been successfully reset. <br /> Click below to log in magically.
      </p>

      <!-- Continue Button -->
      <button
        @click="handleContinue"
        class="tw-bg-[#192854] tw-text-white tw-font-semibold tw-py-3 tw-w-full tw-rounded-lg tw-shadow-md hover:tw-bg-[#1b2964]"
      >
        Continue
      </button>
    </div>
  </div>
</template>
