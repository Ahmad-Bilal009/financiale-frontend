<script setup lang="ts">
import { ref } from 'vue'

// Form Data
const formData = ref({
  title: 'Sample Product Title',
  description: 'Sample description about the product.',
  productInfo: 'Detailed information about the product goes here.',
  productType: 'Credit',
  creditGuarantees: ['Trust', 'Mortgage'],
  entrepreneurshipStage: 'Startup',
  creditObjective: 'Working Capital',
  benefits: 'Provides financial support to MSMEs.',
  geographicCoverage: ['USA', 'Canada'],
  requirements: 'Sample requirements for the product.',
  contactName: 'John Doe',
  phone: '+123456789',
  email: 'john.doe@example.com',
  address: '123 Business Street, City, Country',
})
</script>

<template>
  <div class="tw-flex tw-flex-col tw-items-start tw-mt-8 tw-h-[calc(100vh-100px)] tw-p-8">
    <h1 class="tw-text-2xl tw-font-bold tw-mb-10">Product Details</h1>

    <div class="tw-mb-[40px] tw-flex tw-flex-row tw-gap-[20px] tw-justify-center">
      <div class="tw-w-[65%] tw-flex tw-flex-col tw-gap-[20px]">
        <div
          class="tw-bg-white tw-shadow-md tw-border-[1.5px] tw-rounded-[24px] tw-gap-[13px] tw-p-[24px]"
        >
          <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">Tittle</h4>
          <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]">
            Créditos Grupales e Individuales
          </p>
        </div>

        <div
          class="tw-bg-white tw-shadow-md tw-border-[1.5px] tw-rounded-[24px] tw-gap-[13px] tw-p-[24px]"
        >
          <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">Description</h4>
          <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]">
            La Cooperativa tiene la finalidad de apoyar a los asociados que se dedican al comercio,
            agricultura, agropecuaria, actividades industriales, artesanías, servicio, entre otras
            actividades, lo anterior para el desarrollo de las economías familiares y por ende el
            desarrollo de las comunidades.
          </p>
        </div>

        <div
          class="tw-bg-white tw-shadow-md tw-border-[1.5px] tw-rounded-[24px] tw-gap-[13px] tw-p-[24px]"
        >
          <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">Information</h4>
          <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]">
            HRD's experienced team understands that providing trade finance in today's volatile
            global markets demands creativity and flexibility. As such, HRD utilizes a variety of
            trade and export finance instruments to mitigate unnecessary credit risks. We provide
            specialized financial services, tailored to the specific characteristics of each client.
            <br />
            <br />
            Financial services include: <br /><br />
            Documentary Letters of Credit (DLC) <br />
            Standby Letters of Credit (SBLC) <br />
            Bank Guarantees (BG) <br />
            SWIFT Messaging <br />
            Pre-Notices/RWA <br />
            Proof of Funds (POF)
          </p>
        </div>

        <div
          class="tw-bg-white tw-flex tw-flex-col tw-shadow-md tw-border-[1.5px] tw-rounded-[24px] tw-gap-[13px] tw-p-[24px]"
        >
          <div class="tw-flex tw-flex-col tw-gap-[13px]">
            <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">Product Type</h4>
            <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]">
              {{ formData.productType }}
            </p>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[13px]">
            <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">Credit Guarantees</h4>
            <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]">
              {{ formData.creditGuarantees.join(', ') }}
            </p>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[13px]">
            <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">
              Stage of entrepreneurship
            </h4>
            <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]">Growth</p>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[13px]">
            <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">Objective of credit</h4>
            <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]">
              Objective of credit
            </p>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[13px]">
            <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">
              Benefits for Entrepreneurs and MSMEs
            </h4>
            <p class="tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]">
              Benefits for Entrepreneurs and MSMEs
            </p>
          </div>

          <div class="tw-flex tw-flex-col tw-gap-[13px]">
            <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">Geographic Coverage</h4>
            <div class="tw-flex tw-flex-row tw-gap-[7px]">
              <span
                class="tw-text-[12px] tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]"
              >
                Chimaltenango
              </span>
              <span
                class="tw-text-[12px] tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]"
              >
                Quiche
              </span>
              <span
                class="tw-text-[12px] tw-bg-gray-200 tw-text-gray-700 tw-px-[14px] tw-py-[12px] tw-rounded-[124px]"
              >
                Solola
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="tw-w-[35%] tw-flex tw-flex-col tw-gap-[20px]">
        <div
          class="tw-border-[1.5px] tw-rounded-[24px] tw-gap-[13px] tw-p-[24px] tw-bg-white tw-shadow-md"
        >
          <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500] mb-[16px]">Contact Details</h4>

          <div class="tw-flex tw-flex-col tw-gap-[32px] tw-mt-[24px]">
            <!-- Contact Name -->
            <div class="tw-flex tw-items-start tw-gap-[10px] mb-[16px]">
              <div
                class="tw-flex tw-items-center tw-justify-center tw-w-[51px] tw-h-[51px] tw-rounded-full tw-bg-gray-100"
              >
                <img class="tw-bg-gray-100" src="../../../public/profile.png" alt="" />
              </div>
              <div>
                <p class="tw-font-semibold tw-text-gray-800">Contact Name:</p>
                <p class="tw-text-gray-600">Juan Doe</p>
              </div>
            </div>

            <!-- Phone -->
            <div class="tw-flex tw-items-start tw-gap-[10px] mb-[16px]">
              <div
                class="tw-flex tw-items-center tw-justify-center tw-w-[51px] tw-h-[51px] tw-rounded-full tw-bg-gray-100"
              >
                <img class="tw-bg-gray-100" src="../../../public/call.png" alt="" />
              </div>
              <div>
                <p class="tw-font-semibold tw-text-gray-800">Phone:</p>
                <p class="tw-text-gray-600">454681003434</p>
              </div>
            </div>

            <!-- Email -->
            <div class="tw-flex tw-items-start tw-gap-[10px] mb-[16px]">
              <div
                class="tw-flex tw-items-center tw-justify-center tw-w-[51px] tw-h-[51px] tw-rounded-full tw-bg-gray-100"
              >
                <img class="tw-bg-gray-100" src="../../../public/sms.png" alt="" />
              </div>
              <div>
                <p class="tw-font-semibold tw-text-gray-800">Email:</p>
                <p class="tw-text-gray-600">Rossell@gmail.com</p>
              </div>
            </div>

            <!-- Address -->
            <div class="tw-flex tw-items-start tw-gap-[10px]">
              <div
                class="tw-flex tw-items-center tw-justify-center tw-w-[51px] tw-h-[51px] tw-rounded-full tw-bg-gray-100"
              >
                <img class="tw-bg-gray-100" src="../../../public/location.png" alt="" />
              </div>

              <div>
                <p class="tw-font-semibold tw-text-gray-00">Address:</p>
                <p class="tw-text-gray-600">10842 W Blue Mound Rd</p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="tw-bg-white tw-shadow-md tw-border-[1.5px] tw-rounded-[24px] tw-gap-[13px] tw-p-[24px]"
        >
          <h4 class="tw-text-[20px] tw-text-[#070707] tw-font-[500]">Requirements</h4>
          <ul
            class="tw-list-disc tw-pl-5 tw-mt-2 tw-text-[16px] tw-leading-[32px] tw-text-[#515151] tw-font-[350]"
          >
            <li>Information Authorization Letter</li>
            <li>Customer profile</li>
            <li>Sworn declaration</li>
            <li>Shareholders Form</li>
            <li>Copy of recent utility bill (water, electricity or telephone)</li>
            <li>Bank account statement (last 3 months)</li>
            <li>
              Financial statements for the last 3 periods with integrations of asset accounts,
              liabilities, administrative expenses and sales expenses
            </li>
            <li>Submit Contracts you submit with a company</li>
            <li>
              Projected monthly cash flow for the first 12 months, including an explanation of the
              premises or bases used for its preparation; signed by the legal representative and
              certified public accountant
            </li>
            <li>
              Projected annual cash flow for the remainder of the requested term, signed by the
              legal representative and certified public accountant
            </li>
          </ul>
          <div class="tw-flex tw-justify-end tw-mt-[24px] tw-flex-row tw-gap-[10px]">
            <button
              class="tw-bg-[#FA3D34] tw-text-white tw-px-7 tw-py-3 tw-rounded-[13px] tw-capitalize"
            >
              Reject
            </button>
            <button
              class="tw-bg-[#24B2E3] tw-text-white tw-px-7 tw-py-3 tw-rounded-[13px] tw-capitalize"
            >
              Approve
            </button>
          </div>
        </div>


      </div>
    </div>
  </div>
</template>
