<script setup lang="ts">
import { ref, defineEmits } from 'vue'

// **Emitir evento al padre**
const emit = defineEmits(['filterChange'])

// **Rastrear el filtro activo**
const activeFilter = ref('approved')

// **Función para alternar el filtro seleccionado**
const toggleFilter = (filter: string) => {
  activeFilter.value = filter
  emit('filterChange', filter) // Emitir cambio al padre
}
</script>

<template>
  <div class="tw-flex md:tw-gap-2 tw-gap-1 tw-justify-center tw-bg-white tw-rounded-[10px] tw-p-2">
    <!-- Botón Todos -->
    <button
      :class="[
        'tw-text-base tw-font-medium tw-rounded-[6px] tw-capitalize md:tw-px-8 tw-px-3 tw-py-1',
        activeFilter === 'approved' ? 'tw-bg-[#24B2E3] tw-text-white' : 'tw-bg-transparent tw-text-gray-400',
      ]"
      @click="toggleFilter('approved')"
    >
      Aprobados
    </button>

    <!-- Botón Aprobados -->
    <div class="tw-relative tw-inline-block">
      <button
        :class="[
          'tw-text-base tw-font-medium tw-rounded-[6px] tw-capitalize md:tw-px-8 tw-px-3 tw-py-1',
          activeFilter === 'all' ? 'tw-bg-[#24B2E3] tw-text-white' : 'tw-bg-transparent tw-text-gray-400',
        ]"
        @click="toggleFilter('all')"
      >
        Bandeja de entrada
      </button>
      <span
        class="tw-absolute tw-top-0 tw-right-4 tw-bg-red-500 tw-text-white tw-text-xs tw-font-bold tw-px-2 tw-py-0.5 tw-rounded-full tw--translate-y-1/2 tw-translate-x-1/2"
      >
      Nuevo
      </span>
    </div>


    <!-- Botón Rechazados -->
    <button
      :class="[
        'tw-text-base tw-font-medium tw-rounded-[6px] tw-capitalize md:tw-px-8 tw-px-3 tw-py-1',
        activeFilter === 'rejected' ? 'tw-bg-[#24B2E3] tw-text-white' : 'tw-bg-transparent tw-text-gray-400',
      ]"
      @click="toggleFilter('rejected')"
    >
      Rechazados
    </button>
  </div>
</template>
