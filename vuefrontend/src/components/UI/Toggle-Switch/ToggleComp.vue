<script setup lang="ts">
import { ref, defineEmits } from 'vue'

// **Emitir evento al padre**
const emit = defineEmits(['filterChange'])

// **Rastrear el filtro activo**
const activeFilter = ref('all')

// **Función para alternar el filtro seleccionado**
const toggleFilter = (filter: string) => {
  activeFilter.value = filter
  emit('filterChange', filter) // ✅ Emitir cambio al padre
}
</script>

<template>
  <div class="tw-flex tw-gap-2 tw-justify-center tw-bg-white tw-rounded-[10px] tw-p-2">
    <!-- Botón Todos -->
    <button
      :class="[
        'tw-text-base tw-font-medium tw-rounded-[6px] tw-capitalize tw-px-8 md:tw-px-5 tw-py-1',
        activeFilter === 'all' ? 'tw-bg-[#24B2E3] tw-text-white' : 'tw-bg-transparent tw-text-gray-400',
      ]"
      @click="toggleFilter('all')"
    >
      Todos
    </button>

    <!-- Botón Aprobados -->
    <button
      :class="[
        'tw-text-base tw-font-medium tw-rounded-[6px] tw-capitalize tw-px-8 md:tw-px-5 tw-py-1',
        activeFilter === 'approved' ? 'tw-bg-[#24B2E3] tw-text-white' : 'tw-bg-transparent tw-text-gray-400',
      ]"
      @click="toggleFilter('approved')"
    >
      Aprobados
    </button>

    <!-- Botón Rechazados -->
    <button
      :class="[
        'tw-text-base tw-font-medium tw-rounded-[6px] tw-capitalize tw-px-8 md:tw-px-5 tw-py-1',
        activeFilter === 'rejected' ? 'tw-bg-[#24B2E3] tw-text-white' : 'tw-bg-transparent tw-text-gray-400',
      ]"
      @click="toggleFilter('rejected')"
    >
      Rechazados
    </button>
  </div>
</template>
