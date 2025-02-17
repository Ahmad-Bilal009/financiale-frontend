<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  text: string
  variant?: 'blue' | 'darkBlue'
  width?: string
}>()

const emit = defineEmits(['click'])

const baseStyle = 'tw-text-base tw-font-medium tw-rounded-[13px] tw-capitalize'

const variantStyles = {
  blue: 'tw-bg-[#24B2E3] tw-text-white tw-px-3 md:tw-px-7 tw-py-3',
  darkBlue: 'tw-bg-primary tw-py-4 tw-px-2 tw-text-white',
}

const buttonVariant = computed(() => props.variant || 'blue')
const buttonWidth = computed(() =>
  props.width ? (props.width === 'full' ? 'tw-w-full' : `tw-${props.width}`) : 'tw-w-fit',
)
</script>
<template>
  <button :class="[baseStyle, variantStyles[buttonVariant], buttonWidth]" @click="emit('click')">
    {{ props.text }}
  </button>
</template>
