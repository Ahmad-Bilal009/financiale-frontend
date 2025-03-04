<template>
  <nav class="tw-mb-1">
    <ul class="tw-flex tw-font-bold tw-text-[#192854] tw-gap-2">
      <li v-for="(item, index) in items" :key="index">
        <router-link :to="item.path" class=" tw-underline">
          {{ item.label }}
        </router-link>
        <span v-if="index < items.length - 1"> / </span>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
defineProps<{
  items: { label: string; path: string }[];
}>();
</script>
