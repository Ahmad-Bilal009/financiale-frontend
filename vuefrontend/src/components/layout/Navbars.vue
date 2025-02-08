<script lang="ts">
import { defineComponent } from 'vue'
import logo from '../assets/img/logo.png';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'NavbarsComponent',
  setup() {
    const route = useRoute();

    // Function to check if the link is active
    const isActiveLink = (path: string) => {
      return route.path === path;
    };

    return {
      logo,
      isActiveLink
    }
  }
})
</script>

<template>
  <nav class="tw-bg-green-700 tw-border-b tw-border-green-500">
    <div class="tw-mx-auto tw-max-w-7xl tw-px-2 sm:tw-px-6 lg:tw-px-8">
      <div class="tw-flex tw-h-20 tw-items-center tw-justify-between">
        <div class="tw-flex tw-flex-1 tw-items-center tw-justify-center md:tw-items-stretch md:tw-justify-start">
          <!-- logo -->
          <RouterLink class="tw-flex tw-flex-shrink-0 tw-items-center tw-mr-4" to="/">
            <img class="tw-h-10 tw-w-auto" :src="logo" alt="Vue Jobs" />
            <span class="tw-hidden md:tw-block tw-text-white tw-text-2xl tw-font-bold tw-ml-2">Vue Jobs</span>
          </RouterLink>
          <div class="md:tw-ml-auto">
            <div class="tw-flex tw-space-x-2">
              <RouterLink
                to="/home"
                :class="[
                  isActiveLink('/') ? 'tw-bg-green-900' : 'hover:tw-bg-gray-900 hover:tw-text-white',
                  'tw-text-white',
                  'tw-px-3',
                  'tw-py-2',
                  'tw-rounded-md',
                ]"
              >
                Home
              </RouterLink>
              <RouterLink
                to="/jobs"
                :class="[
                  isActiveLink('/jobs') ? 'tw-bg-green-900' : 'hover:tw-bg-gray-900 hover:tw-text-white',
                  'tw-text-white',
                  'tw-px-3',
                  'tw-py-2',
                  'tw-rounded-md',
                ]"
              >
                Jobs
              </RouterLink>
              <RouterLink
                to="/jobs/add"
                :class="[
                  isActiveLink('/jobs/add') ? 'tw-bg-green-900' : 'hover:tw-bg-gray-900 hover:tw-text-white',
                  'tw-text-white',
                  'tw-px-3',
                  'tw-py-2',
                  'tw-rounded-md',
                ]"
              >
                Add Job
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
