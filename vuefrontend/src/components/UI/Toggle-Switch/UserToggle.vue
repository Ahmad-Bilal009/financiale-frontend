<script setup lang="ts">
import { ref, defineEmits } from 'vue'

// **Emitir evento al padre**
const emit = defineEmits(['toggleStatus'])

// **Rastrear el estado activo**
const isApproved = ref(true)

// **Función para alternar el estado y emitir el evento**
const toggleApproval = (state: boolean) => {
  isApproved.value = state
  emit('toggleStatus', state) // Emitir evento con estado (true = Todos, false = Deshabilitados)
}
</script>

<template>
  <div class="tw-flex tw-gap-2 tw-bg-white tw-rounded-[10px] tw-p-2">
    <!-- Botón Todos -->
    <button
      :class="[
        'tw-text-base tw-font-medium tw-rounded-[6px] tw-capitalize tw-px-5 tw-py-1',
        isApproved ? 'tw-bg-[#24B2E3] tw-text-white' : 'tw-bg-transparent tw-text-gray-400',
      ]"
      @click="toggleApproval(true)"
    >
      Todos
    </button>

    <!-- Botón Deshabilitados -->
    <button
      :class="[
        'tw-text-base tw-font-medium tw-rounded-[6px] tw-capitalize tw-px-5 tw-py-1',
        !isApproved ? 'tw-bg-[#24B2E3] tw-text-white' : 'tw-bg-transparent tw-text-gray-400',
      ]"
      @click="toggleApproval(false)"
    >
      Deshabilitados
    </button>
  </div>
</template>
