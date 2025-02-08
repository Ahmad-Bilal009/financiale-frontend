<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import DeleteIcon from '@/assets/svg/trash.svg'

const { isOpen } = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close', 'delete'])

function handleDelete() {
  console.log('del')
  emit('delete')
}

function handleClose() {
  emit('close')
}
</script>

<template>
  <div
    v-if="isOpen"
    class="tw-fixed tw-inset-0 tw-bg-black tw-bg-opacity-50 tw-flex tw-items-center tw-justify-center md:tw-ml-[256px]"
  >
    <div
      class="tw-bg-white tw-p-4 sm:tw-p-9 tw-rounded-lg tw-w-[300px] tw-min-h-[290px] sm:tw-w-[428px]"
    >
      <div class="tw-flex tw-justify-center tw-items-center tw-mb-6">
        <DeleteIcon />
      </div>

      <div class="tw-flex tw-flex-col tw-gap-2 tw-items-center tw-mb-[25px]">
        <div class="tw-text-2xl tw-font-medium tw-text-[#070707]">Are you sure?</div>
        <div class="tw-text-xl tw-text-[#51515199] tw-font-normal">
          Product will be deleted permanently
        </div>
      </div>

      <div class="tw-flex tw-justify-center tw-gap-2">
        <button
          @click="handleClose"
          class="tw-bg-[#ECECEC] tw-text-[#515151] tw-text-sm tw-min-w-[124px] tw-py-2 tw-rounded-md"
        >
          Cancel
        </button>
        <button
          @click="handleDelete"
          class="tw-bg-[#ECECEC] tw-text-[#FF3B30] tw-text-sm tw-min-w-[124px] tw-py-2 tw-rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
