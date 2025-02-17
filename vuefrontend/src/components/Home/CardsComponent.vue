<script lang="ts">


export default {
  name: 'CardsComponent',
  methods: {
    handleMoreInfo() {
      // Implement desired action when button is clicked
      alert('More information clicked!');
    },
  },
};
</script>


<template>
  <div class="tw-flex tw-justify-center tw-flex-wrap tw-gap-[20px] tw-mb-[40px]">
      <div class="tw-border tw-justify-between tw-flex tw-flex-col tw-p-4 tw-gap-[13px] tw-rounded-[24px] tw-border-[1.5px] tw-w-[400px]  tw-border-gray-200 hover:tw-border-[#1570EF] tw-shadow tw-bg-white tw-overflow-hidden">
        <!-- Header with logo/title and upper-right label -->

          <div class="tw-flex tw-items-center tw-justify-between">
            <div class="tw-border-[1.5px] tw-border-gray-200 tw-rounded-[12px]">
              <img class="tw-w-[80px] tw-h-[80px] tw-rounded-[12px] tw-object-contain"
                src="../../../public/Rectangle 1.png"
                alt="INV Bank Logo"

              />
            </div>
            <btn class=" tw-bg-[#24B2E3] tw-text-[12px]  tw-text-white tw-text-xs tw-font-medium tw-py-[12px] tw-px-[16px] tw-rounded-[124px]">
              Bank Guarantee
            </btn>
          </div>

        <!-- Body with bank name, credit title, and description -->
        <div class="p-4">
          <h4 class="tw-text-gray-500 tw-text-sm tw-  mb-1">INV Bank, S.A.</h4>
          <h2 class="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-3">Working Capital Credit</h2>
          <p class=" tw-text-[14px] tw-h-[144px] tw-text-[#515151] tw-font-[350] tw-mb-4">
            The purpose of the Cooperative is to support members who are engaged in
            commerce, agriculture, farming, industrial activities, crafts, service,
            among other activities, the above for the development of family
            economies and therefore the development of communities.
          </p>

          <!-- Tag section -->
          <div class="tw-py-[12px] tw-flex-wrap tw-gap-[7px] tw-border-t tw-border-[#F4F4F4] tw-border-b tw-flex">
            <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
              Awareness and Ideation
            </span>

            <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
              Growth
            </span>
            <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">

              Formulation
            </span>
              <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
              Launch
            </span>
          </div>

        </div>

        <!-- Footer with "More information" button -->
        <div class=" tw-border-gray-200 tw-p-4 tw-text-center">
          <router-link to="/cardInfo">
            <button
              class="tw-bg-white border tw-border-[#24B2E3] hover:tw-bg-blue-[#24B2E3] tw-text-[#24B2E3] tw-text-sm tw-font-medium tw-py-2 tw-px-4 tw-rounded-md"

            >
              More informaton

            </button>
          </router-link>
        </div>
      </div>


      <!-- 2nd card -->

      <div class="tw-border tw-justify-between tw-flex tw-flex-col tw-p-4 tw-gap-[13px] tw-rounded-[24px] tw-border-[1.5px] tw-w-[400px]  tw-border-gray-200 hover:tw-border-[#1570EF] tw-shadow tw-bg-white tw-overflow-hidden">
        <!-- Header with logo/title and upper-right label -->



          <div class="tw-flex tw-items-center tw-justify-between">
            <div class="tw-border-[1.5px] tw-border-gray-200 tw-rounded-[12px]">
            <img class="tw-w-[80px] tw-h-[80px] tw-rounded-[12px] tw-object-contain"
              src="../../../public/High-Rize.png"
              alt="INV Bank Logo"

            />
            </div>
            <btn class=" tw-bg-[#24B2E3] tw-text-[12px]  tw-text-white tw-text-xs tw-font-medium tw-py-[12px] tw-px-[16px] tw-rounded-[124px]">
              Fintech
            </btn>
          </div>

        <!-- Body with bank name, credit title, and description -->
        <div class="p-4">
          <h4 class="tw-text-gray-500 tw-text-sm tw-  mb-1">INV Bank, S.A.</h4>
          <h2 class="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-3">Billetera Electrónica Tigo Money</h2>
          <p class=" tw-text-[14px] tw-h-[144px] tw-text-[#515151] tw-font-[350] tw-mb-4">
            We provide a comprehensive approach to structuring complex commercial transactions for a variety of stakeholders including importers, exporters and trading companies.
          </p>

          <!-- Tag section -->
          <div class="tw-py-[12px] tw-flex-wrap tw-gap-[7px] tw-border-t tw-border-[#F4F4F4] tw-border-b tw-flex">


            <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
              Growth
            </span>
              <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
              Launch
            </span>
          </div>

        </div>

        <!-- Footer with "More information" button -->
        <div class=" tw-border-gray-200 tw-p-4 tw-text-center">
          <router-link to="/cardInfo">
            <button
              class="tw-bg-[#DBF0FA] hover:tw-bg-blue-700 tw-text-[#24B2E3] tw-text-sm tw-font-medium tw-py-2 tw-px-4 tw-rounded-md"

            >
              More information

            </button>
          </router-link>
        </div>
      </div>

      <!-- 3rd card -->

      <div class="tw-border tw-justify-between tw-flex tw-flex-col tw-p-4 tw-gap-[13px] tw-rounded-[24px] tw-border-[1.5px] tw-w-[400px]  tw-border-gray-200 hover:tw-border-[#1570EF] tw-shadow tw-bg-white tw-overflow-hidden">
        <!-- Header with logo/title and upper-right label -->

          <div class="tw-flex tw-items-center tw-justify-between">
            <div class="tw-border-[1.5px] tw-border-gray-200 tw-rounded-[12px]">
              <img class="tw-w-[80px] tw-h-[80px] tw-rounded-[12px] tw-border-[1px] tw-object-contain"
                src="../../../public/bicomoney.png"
                alt="INV Bank Logo"

              />
            </div>
            <btn class=" tw-bg-[#24B2E3] tw-text-[12px]  tw-text-white tw-text-xs tw-font-medium tw-py-[12px] tw-px-[16px] tw-rounded-[124px]">
              Bank Guarantee
            </btn>
          </div>

        <!-- Body with bank name, credit title, and description -->
        <div class="p-4">
          <h4 class="tw-text-gray-500 tw-text-sm tw-  mb-1">INV Bank, S.A.</h4>
          <h2 class="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-3">Tigo Money Electronic Wallet</h2>
          <p class=" tw-text-[14px] tw-h-[144px] tw-text-[#515151] tw-font-[350] tw-mb-4">
            An electronic wallet, available to all Guatemalans from any cell phone.
          </p>

          <!-- Tag section -->
          <div class="tw-py-[12px] tw-flex-wrap tw-gap-[7px] tw-border-t tw-border-[#F4F4F4] tw-border-b tw-flex">

            <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
              Growth
            </span>

          </div>

        </div>

        <!-- Footer with "More information" button -->
        <div class=" tw-border-gray-200 tw-p-4 tw-text-center">
          <router-link to="/cardInfo">
            <button
              class="tw-bg-[#DBF0FA] hover:tw-bg-blue-700 tw-text-[#24B2E3] tw-text-sm tw-font-medium tw-py-2 tw-px-4 tw-rounded-md"

            >
              More information

            </button>
          </router-link>
        </div>
      </div>

      <!-- 4th card -->

      <div class="tw-border tw-justify-between tw-flex tw-flex-col tw-p-4 tw-gap-[13px] tw-rounded-[24px] tw-border-[1.5px] tw-w-[400px]  tw-border-gray-200 hover:tw-border-[#1570EF] tw-shadow tw-bg-white tw-overflow-hidden">
        <!-- Header with logo/title and upper-right label -->

          <div class="tw-flex tw-items-center tw-justify-between">
            <div class="tw-border-[1.5px] tw-border-gray-200 tw-rounded-[12px]">
              <img class="tw-w-[80px] tw-h-[80px] tw-rounded-[12px] tw-border-[1px] tw-object-contain"
                src="../../../public/conoce.png"
                alt="INV Bank Logo"

              />
            </div>
            <btn class=" tw-bg-[#24B2E3] tw-text-[12px]  tw-text-white tw-text-xs tw-font-medium tw-py-[12px] tw-px-[16px] tw-rounded-[124px]">
              Bank Guarantee
            </btn>
          </div>

        <!-- Body with bank name, credit title, and description -->
        <div class="p-4">
          <h4 class="tw-text-gray-500 tw-text-sm tw-  mb-1">INV Bank, S.A.</h4>
          <h2 class="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-3">Working Capital Credit</h2>
          <p class=" tw-text-[14px] tw-h-[144px] tw-text-[#515151] tw-font-[350] tw-mb-4">
            The purpose of the Cooperative is to support members who are engaged in
            commerce, agriculture, farming, industrial activities, crafts, service,
            among other activities, the above for the development of family
            economies and therefore the development of communities.
          </p>

          <!-- Tag section -->
          <div class="tw-py-[12px] tw-flex-wrap tw-gap-[7px] tw-border-t tw-border-[#F4F4F4] tw-border-b tw-flex">
            <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
              Awareness and Ideation
            </span>

            <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
              Growth
            </span>
            <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">

              Formulation
            </span>
              <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
              Launch
            </span>
          </div>

        </div>

        <!-- Footer with "More information" button -->
        <div class=" tw-border-gray-200 tw-p-4 tw-text-center">
          <button
            class="tw-bg-[#DBF0FA] hover:tw-bg-blue-700 tw-text-[#24B2E3] tw-text-sm tw-font-medium tw-py-2 tw-px-4 tw-rounded-md"
            @click="handleMoreInfo"
          >
            More information

          </button>
        </div>
      </div>

      <!-- 5th card -->

      <div class="tw-border tw-justify-between tw-flex tw-flex-col tw-p-4 tw-gap-[13px] tw-rounded-[24px] tw-border-[1.5px] tw-w-[400px]  tw-border-gray-200 hover:tw-border-[#1570EF] tw-shadow tw-bg-white tw-overflow-hidden">
        <!-- Header with logo/title and upper-right label -->

          <div class="tw-flex tw-items-center tw-justify-between">
            <div class="tw-border-[1.5px] tw-border-gray-200 tw-rounded-[12px]">
              <img class="tw-w-[80px] tw-h-[80px] tw-rounded-[12px] tw-border-[1px] tw-object-contain"
                src="../../../public/bi-vertical.png"
                alt="INV Bank Logo"

              />
            </div>
            <btn class=" tw-bg-[#24B2E3] tw-text-[12px]  tw-text-white tw-text-xs tw-font-medium tw-py-[12px] tw-px-[16px] tw-rounded-[124px]">
              Fintech
            </btn>
          </div>


        <!-- Body with bank name, credit title, and description -->
        <div class="p-4">
          <h4 class="tw-text-gray-500 tw-text-sm tw-  mb-1">INV Bank, S.A.</h4>
          <h2 class="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-3">Billetera Electrónica Tigo Money</h2>
          <p class=" tw-text-[14px] tw-h-[144px] tw-text-[#515151] tw-font-[350] tw-mb-4">
            We provide a comprehensive approach to structuring complex commercial transactions for a variety of stakeholders including importers, exporters and trading companies.
          </p>

          <!-- Tag section -->
          <div class="tw-py-[12px] tw-flex-wrap tw-gap-[7px] tw-border-t tw-border-[#F4F4F4] tw-border-b tw-flex">
            <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
              Growth
            </span>
              <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
              Launch
            </span>
          </div>

        </div>

        <!-- Footer with "More information" button -->
        <div class=" tw-border-gray-200 tw-p-4 tw-text-center">
          <button
            class="tw-bg-[#DBF0FA] hover:tw-bg-blue-700 tw-text-[#24B2E3] tw-text-sm tw-font-medium tw-py-2 tw-px-4 tw-rounded-md"
            @click="handleMoreInfo"
          >
            More information

          </button>
        </div>
      </div>

      <!-- 6th card -->

      <div class="tw-border tw-justify-between tw-flex tw-flex-col tw-p-4 tw-gap-[13px] tw-rounded-[24px] tw-border-[1.5px] tw-w-[400px]  tw-border-gray-200 hover:tw-border-[#1570EF] tw-shadow tw-bg-white tw-overflow-hidden">
        <!-- Header with logo/title and upper-right label -->

          <div class="tw-flex tw-items-center tw-justify-between">
            <div class="tw-border-[1.5px] tw-border-gray-200 tw-rounded-[12px]">
              <img class="tw-w-[80px] tw-h-[80px] tw-rounded-[12px] tw-border-[1px] tw-object-contain"
                src="../../../public/bicomoney.png"
                alt="INV Bank Logo"

              />
            </div>
            <btn class=" tw-bg-[#24B2E3] tw-text-[12px]  tw-text-white tw-text-xs tw-font-medium tw-py-[12px] tw-px-[16px] tw-rounded-[124px]">
              Bank Guarantee
            </btn>
          </div>

        <!-- Body with bank name, credit title, and description -->
        <div class="p-4">
          <h4 class="tw-text-gray-500 tw-text-sm tw-  mb-1">INV Bank, S.A.</h4>
          <h2 class="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-3">Tigo Money Electronic Wallet</h2>
          <p class=" tw-text-[14px] tw-h-[144px] tw-text-[#515151] tw-font-[350] tw-mb-4">
            An electronic wallet, available to all Guatemalans from any cell phone.
          </p>

          <!-- Tag section -->
          <div class="tw-py-[12px] tw-flex-wrap tw-gap-[7px] tw-border-t tw-border-[#F4F4F4] tw-border-b tw-flex">
            <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
              Growth
            </span>
          </div>

        </div>

        <!-- Footer with "More information" button -->
        <div class=" tw-border-gray-200 tw-p-4 tw-text-center">
          <button
            class="tw-bg-[#DBF0FA] hover:tw-bg-blue-700 tw-text-[#24B2E3] tw-text-sm tw-font-medium tw-py-2 tw-px-4 tw-rounded-md"
            @click="handleMoreInfo"
          >
            More information

          </button>
        </div>
      </div>

      <!-- 7th card -->

      <div class="tw-border tw-justify-between tw-flex tw-flex-col tw-p-4 tw-gap-[13px] tw-rounded-[24px] tw-border-[1.5px] tw-w-[400px]  tw-border-gray-200 hover:tw-border-[#1570EF] tw-shadow tw-bg-white tw-overflow-hidden">
        <!-- Header with logo/title and upper-right label -->

          <div class="tw-flex tw-items-center tw-justify-between">
            <div class="tw-border-[1.5px] tw-border-gray-200 tw-rounded-[12px]">
              <img class="tw-w-[80px] tw-h-[80px] tw-rounded-[12px] tw-border-[1px] tw-object-contain"
                src="https://s3-alpha-sig.figma.com/img/caed/713c/f979bf1b534c60897e975375a72912b7?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=P4BZM-KkDznwU95ft-I4jGSYJ4mERW1rt~DsYdqjVb2AMKFs5gUq1ksnkGx81Qd074zSzOwtp-Ai6~1P9RAXei2SxWuGNUVoMtCEJ6WP-kYXCvwRWa4Sw0yBC6lRca2G4~3GSb9EyoVTvqL9aYe-G-5NY7slod4Tepx9i05ffFUNO5IhvFZJK8aoloh1t~gud9Fdj4dCY0RBHKGZ~ucljKVpSpHnanUzXaX0zX-lzl~y~0AkU~rTmKzmi4KDcdYmhydyPfioR4-EHPQ896q5kOqkSFohpl~qjyQoDrsh7Q3kzROz3RDTxJXnCTnbEoLb3jjwuDtrJA9BeEAG~u8ODw__"
                alt="INV Bank Logo"

              />
            </div>
            <btn class=" tw-bg-[#24B2E3] tw-text-[12px]  tw-text-white tw-text-xs tw-font-medium tw-py-[12px] tw-px-[16px] tw-rounded-[124px]">
              Bank Guarantee
            </btn>
          </div>

        <!-- Body with bank name, credit title, and description -->
        <div class="p-4">
          <h4 class="tw-text-gray-500 tw-text-sm tw-  mb-1">INV Bank, S.A.</h4>
          <h2 class="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-3">Working Capital Credit</h2>
          <p class=" tw-text-[14px] tw-h-[144px] tw-text-[#515151] tw-font-[350] tw-mb-4">
            The purpose of the Cooperative is to support members who are engaged in
            commerce, agriculture, farming, industrial activities, crafts, service,
            among other activities, the above for the development of family
            economies and therefore the development of communities.
          </p>

          <!-- Tag section -->
          <div class="tw-py-[12px] tw-flex-wrap tw-gap-[7px] tw-border-t tw-border-[#F4F4F4] tw-border-b tw-flex">
            <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
              Awareness and Ideation
            </span>

            <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
              Growth
            </span>
            <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">

              Formulation
            </span>
              <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
              Launch
            </span>
          </div>

        </div>

        <!-- Footer with "More information" button -->
        <div class=" tw-border-gray-200 tw-p-4 tw-text-center">
          <button
            class="tw-bg-[#DBF0FA] hover:tw-bg-blue-700 tw-text-[#24B2E3] tw-text-sm tw-font-medium tw-py-2 tw-px-4 tw-rounded-md"
            @click="handleMoreInfo"
          >
            More information

          </button>
        </div>
      </div>

      <!-- 8th card -->

      <div class="tw-border tw-justify-between tw-flex tw-flex-col tw-p-4 tw-gap-[13px] tw-rounded-[24px] tw-border-[1.5px] tw-w-[400px]  tw-border-gray-200 hover:tw-border-[#1570EF] tw-shadow tw-bg-white tw-overflow-hidden">
        <!-- Header with logo/title and upper-right label -->

          <div class="tw-flex tw-items-center tw-justify-between">
            <div class="tw-border-[1.5px] tw-border-gray-200 tw-rounded-[12px]">
              <img class="tw-w-[80px] tw-h-[80px] tw-rounded-[12px] tw-border-[1px] tw-object-contain"
                src="https://s3-alpha-sig.figma.com/img/b75b/eeb1/c0eb6a28a842cc0e7ece8ac4460b1fcc?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MZVG2jMP8m615Dx4BvTH7rWeMpd0FXx59-ms2VH8ZIhZDleEf5OdjJBulGP5JY~bgGYopOWc4~YdSgTozPA88S82yw2D6jSWziwMYdH8XzVBDy~68YlJRcjfmxtvjFKRUGERWmNSqwBf~IU607Z3ePEntADO~Xlf-Gl8HELmHVlX4-mylcJIh1ZXa404Xiql3rYXbBnrU-U2bbF9OaWRFD~DLW01-4dPpIGmIJl5EA2wCpZ2ebOTzZWo2TVV5sUkhgGjelEb16SVM0i~BQGWV5yTPsZ0wHmyp8Aiu-YDjDQirsYx1rSj7~IGmJ6IZxs0H-sBmgHBsGDigN8yZM7kmQ__"
                alt="INV Bank Logo"

              />
            </div>
            <btn class=" tw-bg-[#24B2E3] tw-text-[12px]  tw-text-white tw-text-xs tw-font-medium tw-py-[12px] tw-px-[16px] tw-rounded-[124px]">
              Fintech
            </btn>
          </div>


        <!-- Body with bank name, credit title, and description -->
        <div class="p-4">
          <h4 class="tw-text-gray-500 tw-text-sm tw-  mb-1">INV Bank, S.A.</h4>
          <h2 class="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-3">Billetera Electrónica Tigo Money</h2>
          <p class=" tw-text-[14px] tw-h-[144px] tw-text-[#515151] tw-font-[350] tw-mb-4">
            We provide a comprehensive approach to structuring complex commercial transactions for a variety of stakeholders including importers, exporters and trading companies.
          </p>

          <!-- Tag section -->
          <div class="tw-py-[12px] tw-flex-wrap tw-gap-[7px] tw-border-t tw-border-[#F4F4F4] tw-border-b tw-flex">
            <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
              Growth
            </span>
              <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
              Launch
            </span>
          </div>

        </div>

        <!-- Footer with "More information" button -->
        <div class=" tw-border-gray-200 tw-p-4 tw-text-center">
          <button
            class="tw-bg-[#DBF0FA] hover:tw-bg-blue-700 tw-text-[#24B2E3] tw-text-sm tw-font-medium tw-py-2 tw-px-4 tw-rounded-md"
            @click="handleMoreInfo"
          >
            More information

          </button>
        </div>
      </div>

      <!-- 9th card -->

      <div class="tw-border tw-justify-between tw-flex tw-flex-col tw-p-4 tw-gap-[13px] tw-rounded-[24px] tw-border-[1.5px] tw-w-[400px]  tw-border-gray-200 hover:tw-border-[#1570EF] tw-shadow tw-bg-white tw-overflow-hidden">
        <!-- Header with logo/title and upper-right label -->

          <div class="tw-flex tw-items-center tw-justify-between">
            <div class="tw-border-[1.5px] tw-border-gray-200 tw-rounded-[12px]">
              <img class="tw-w-[80px] tw-h-[80px] tw-rounded-[12px] tw-border-[1px] tw-object-contain"
                src="https://s3-alpha-sig.figma.com/img/bafc/dfcd/ef64270eecf16889f719fdb22bb32fb8?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=F-U74PFKywcNkk4j1iVKBiDJbWu1iIRxFa7d~prHLJaIYcGsiHnwiQP6120P4mIoDtu4p2wqxWYn4P0GLe7Cq6Npkwge4vcpZVUqo93u4Bcr8sf-TDM-bISIcsIq71x6ZucC6esvjB2O1F-4JibgfSN9x0FggnlHG~Nyx8J4imiZtpPTn2NVIprm74T5dKOMxFEFS5OfWVOPgyhtt-KB1ESDCqxibF2CXRhnXGfxyAUhxyhk7ut9rn8~sYOckIBZ8Nb3KQNuT~fdjPLNzZ7b7ahoLO-Fk2koXBrW7z4-LmX6L6gldy5oQ7AW3OYTVRFzKMvU2tI-v-mncR6WflBkyg__"
                alt="INV Bank Logo"

              />
            </div>
            <btn class=" tw-bg-[#24B2E3] tw-text-[12px]  tw-text-white tw-text-xs tw-font-medium tw-py-[12px] tw-px-[16px] tw-rounded-[124px]">
              Bank Guarantee
            </btn>
          </div>

        <!-- Body with bank name, credit title, and description -->
        <div class="p-4">
          <h4 class="tw-text-gray-500 tw-text-sm tw-  mb-1">INV Bank, S.A.</h4>
          <h2 class="tw-text-lg tw-font-semibold tw-text-gray-900 tw-mb-3">Tigo Money Electronic Wallet</h2>
          <p class=" tw-text-[14px] tw-h-[144px] tw-text-[#515151] tw-font-[350] tw-mb-4">
            An electronic wallet, available to all Guatemalans from any cell phone.
          </p>

          <!-- Tag section -->
          <div class="tw-py-[12px] tw-flex-wrap tw-gap-[7px] tw-border-t tw-border-[#F4F4F4] tw-border-b tw-flex">
            <span class=" tw-text-[12px]  tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]">
              Growth
            </span>
          </div>

        </div>

        <!-- Footer with "More information" button -->
        <div class=" tw-border-gray-200 tw-p-4 tw-text-center">
          <button
            class="tw-bg-[#DBF0FA] hover:tw-bg-blue-700 tw-text-[#24B2E3] tw-text-sm tw-font-medium tw-py-2 tw-px-4 tw-rounded-md"
            @click="handleMoreInfo"
          >
            More information

          </button>
        </div>
      </div>

  </div>
</template>


