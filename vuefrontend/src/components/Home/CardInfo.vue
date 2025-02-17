<script setup lang="ts">
import { ref } from 'vue'
import ConnectModal from '../UI/Connect-Model/ConnectModel.vue';

// Modal State
const isModalOpen = ref(false)

// Open Modal on Click
const handleMoreInfo = () => {
  isModalOpen.value = true
}
</script>

<template>
  <div class="tw-mt-12 tw-mb-12 tw-flex tw-flex-col tw-gap-6">
    <!-- Header Section -->
    <div class="tw-flex tw-flex-col tw-items-center tw-text-center tw-gap-5">
      <!-- Bank Logo -->
      <div class="tw-border-[1.5px] tw-border-gray-200 tw-rounded-[21px] ">
        <img class="tw-w-[120px] sm:tw-w-[140px] tw-h-[140px] tw-rounded-[21px] tw-object-contain"
          src="../../../public/bicomoney.png"
          alt="INV Bank Logo"
        />
      </div>

      <!-- Title & Description -->
      <div class="tw-flex tw-flex-col tw-text-center">
        <span class="tw-text-[#070707] tw-text-[16px]">INV Bank, S.A.</span>
        <h1 class="tw-text-[#192854] tw-text-[32px] sm:tw-text-[40px] tw-font-bold">
          Real Estate Assets Credit
        </h1>
      </div>

      <p class="tw-text-[#515151] tw-text-[14px] sm:tw-text-[16px] tw-max-w-[800px]">
        Long-term financing to acquire an office, commercial premises, warehouse or industrial building as an
        investment or for use by the company that acquires it, with the asset as a mortgage guarantee.
      </p>

      <!-- Button -->
      <div class="tw-w-full tw-flex tw-justify-center">
        <button
          class="tw-bg-[#24B2E3] tw-flex tw-items-center tw-justify-center tw-text-[#FFFFFF] tw-gap-[12px] tw-text-sm tw-font-medium tw-py-3 tw-px-6 tw-rounded-full"
          @click="handleMoreInfo"
        >
          <span>Connect</span>
          <div class="tw-flex tw-items-center tw-justify-center tw-w-8 tw-h-8 tw-bg-white tw-text-[#24B2E3] tw-rounded-full">
            <img class="tw-w-[20px] tw-h-[20px] " src="../../../public/Group 21.png" alt="arrow-right">
          </div>
        </button>
      </div>
    </div>

    <!-- Responsive Layout -->
    <div class="tw-mt-10 tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-6">
      <!-- Left Column (Full Width on Mobile, 2/3 Width on Larger Screens) -->
      <div class="md:tw-col-span-2 tw-flex tw-flex-col tw-gap-6">
        <div class="tw-bg-white tw-shadow-md tw-border-[1.5px] tw-rounded-[24px] tw-gap-[13px] tw-p-[24px]">
          <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500] ">Information</h4>
          <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350] ">HRD’s experienced team understands that providing trade finance in today’s volatile global markets demands creativity and flexibility. As such, HRD utilizes a variety of trade and export finance instruments to mitigate unnecessary credit risks. We provide specialized financial services, tailored to the specific characteristics of each client. <br> <br> Financial services include: <br><br> Documentary Letters of Credit (DLC) <br> Standby Letters of Credit (SBLC) <br> Bank Guarantees (BG) <br> SWIFT Messaging <br> Pre-Notices/RWA <br> Proof of Funds (POF)</p>

        </div>

        <div class=" tw-flex tw-flex-col tw-bg-white tw-shadow-md tw-border-[1.5px] tw-rounded-[24px] tw-gap-[13px] tw-p-[24px]">

          <div class="tw-flex tw-flex-col tw-gap-[13px]">
            <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500] ">Product Type</h4>
            <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350] ">Credit</p>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[13px]">
            <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500] ">Credit Guarantees</h4>
            <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350] ">Trust, Mortgage, Combined, Other</p>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[13px]">
            <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500] ">Stage of entrepreneurship</h4>
            <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350] ">Growth</p>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[13px]">
            <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500] ">Objective of credit</h4>
            <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350] ">Objective of credit</p>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[13px]">
            <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500] ">Benefits for Entrepreneurs and MSMEs</h4>
            <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350] ">Benefits for Entrepreneurs and MSMEs</p>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[13px]">
            <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500] ">Geographic Coverage</h4>
            <div class="tw-flex tw-flex-row tw-gap-[7px]">
              <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
                Chimaltenango
              </span>
              <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
                Quiche
              </span>
              <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
                Solola
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column (1/3 Width on Larger Screens) -->
      <div class="tw-flex tw-flex-col tw-gap-6">
        <div class="tw-border tw-rounded-[24px] tw-p-6 tw-bg-white tw-shadow-md">
          <h4 class="tw-text-[20px] tw-font-medium mb-4">Contact Details</h4>

          <div class="tw-flex tw-flex-col tw-gap-4">
            <div class="tw-flex tw-items-start tw-gap-4">
              <img class="tw-w-[40px] tw-h-[40px]" src="../../../public/profile.png" alt="">
              <div>
                <p class="tw-font-semibold">Contact Name:</p>
                <p>Juan Doe</p>
              </div>
            </div>

            <div class="tw-flex tw-items-start tw-gap-4">
              <img class="tw-w-[40px] tw-h-[40px]" src="../../../public/call.png" alt="">
              <div>
                <p class="tw-font-semibold">Phone:</p>
                <p>454681003434</p>
              </div>
            </div>

            <div class="tw-flex tw-items-start tw-gap-4">
              <img class="tw-w-[40px] tw-h-[40px]" src="../../../public/sms.png" alt="">
              <div>
                <p class="tw-font-semibold">Email:</p>
                <p>Rossell@gmail.com</p>
              </div>
            </div>

            <div class="tw-flex tw-items-start tw-gap-4">
              <img class="tw-w-[40px] tw-h-[40px]" src="../../../public/location.png" alt="">
              <div>
                <p class="tw-font-semibold">Address:</p>
                <p>10842 W Blue Mound Rd</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Requirements -->
        <div class="tw-bg-white tw-shadow-md tw-border tw-rounded-[24px] tw-p-6">
          <h4 class="tw-text-[20px] tw-font-medium">Requirements</h4>
          <ul class="tw-list-disc tw-pl-5 tw-mt-2 tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350] ">
            <li>Information Authorization Letter</li>
            <li>Customer profile</li>
            <li>Sworn declaration</li>
            <li>Shareholders Form</li>
            <li>Copy of recent utility bill (water, electricity or telephone)</li>
            <li>Bank account statement (last 3 months)</li>
            <li>Financial statements for the last 3 periods with integrations of asset accounts, liabilities, administrative expenses and sales expenses</li>
            <li>Submit Contracts you submit with a company</li>
            <li>Projected monthly cash flow for the first 12 months, including an explanation of the premises or bases used for its preparation; signed by the legal representative and certified public accountant</li>
            <li>Projected annual cash flow for the remainder of the requested term, signed by the legal representative and certified public accountant</li>
          </ul>
        </div>
      </div>
    </div>
    <ConnectModal :isOpen="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>
