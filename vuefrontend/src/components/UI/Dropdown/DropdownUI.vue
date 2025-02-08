<template>
  <div class="tw-relative tw-inline-block">
    <!-- Dropdown Button -->
    <button
      @click="toggleDropdown"
      class="tw-w-full tw-px-4 tw-py-2 tw-bg-white tw-border tw-rounded-lg tw-shadow-sm tw-text-left tw-flex tw-items-center tw-justify-between"
    >
      {{ selectedOption || placeholder }}
      <ArrowDownIcon class="tw-w-4 tw-h-4 tw-text-gray-500" />
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      class="tw-absolute tw-bg-white tw-border tw-rounded-lg tw-shadow-lg tw-w-full tw-mt-2"
    >
      <ul>
        <li
          v-for="option in options"
          :key="option.key"
          @click="selectOption(option)"
          class="tw-px-4 tw-py-2 hover:tw-bg-gray-100 tw-cursor-pointer"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ArrowDownIcon from '@/assets/svg/arrow-down.svg'

// Props
const props = defineProps<{
  options: { key: string; label: string }[]
  placeholder?: string
  onSelect?: (option: { key: string; label: string }) => void
}>()

// Reactive State
const isOpen = ref(false)
const selectedOption = ref<string | null>(null)

// Methods
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: { key: string; label: string }) => {
  selectedOption.value = option.label
  isOpen.value = false
  props.onSelect?.(option) // Emit selected option
}
</script>
