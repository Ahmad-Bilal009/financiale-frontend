<script setup lang="ts">
import SreachIcon from '@/assets/svg/Search-icon.svg'
const props = defineProps<{
  onSearch: (value: string) => void
  placeholder?: string
}>()

const emit = defineEmits(['update:search'])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:search', target.value)
  props.onSearch(target.value)
}
</script>

<template>
  <div class="tw-z-[-20]  tw-relative">
    <input
      type="text"
      @input="handleInput"
      :placeholder="placeholder"
      class="tw-border-[1px] tw-relative tw-bg-white tw-text-[#8D98AF] tw-text-base tw-rounded-[10px] tw-pl-14 tw-pr-20 md:tw-pr-4 tw-py-3 tw-border-[#EFF1F5]"
    />
    <SreachIcon class="tw-absolute tw-left-3 tw-top-1/2 tw--translate-y-1/2" />
  </div>
</template>
