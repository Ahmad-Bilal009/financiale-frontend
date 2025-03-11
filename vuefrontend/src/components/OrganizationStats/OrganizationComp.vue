<script setup lang="ts">
import DashboardComp from '@/components/UI/table/DashboardCompstats.vue'
import productService from '@/services/productServices'
import visitorService from '@/services/visitorServices'
import { ref, onMounted, watch } from 'vue';
import { useToast } from 'vue-toastification'

const toast = useToast()

// State Management
const products = ref<any[]>([])
const isLoading = ref(true)  // <-- Added missing declaration

// Visitor Data (Mapped by Product ID)
const visitorData = ref<Record<number, { today: number; week: number; month: number }>>({})

interface Visitor {
  id: number;
  visitorCount?: number;
}

const fetchVisitors = async () => {
  try {
    const todayResponse = await visitorService.getSortedVisitors("today");
    const weekResponse = await visitorService.getSortedVisitors("thisWeek");
    const monthResponse = await visitorService.getSortedVisitors("thisMonth");

    console.log("Fetched Visitor Data:", todayResponse, weekResponse, monthResponse);

    const todayVisitors: Visitor[] = todayResponse.data.visitors || [];
    const weekVisitors: Visitor[] = weekResponse.data.visitors || [];
    const monthVisitors: Visitor[] = monthResponse.data.visitors || [];

    visitorData.value = {};

    todayVisitors.forEach((visitor: Visitor) => {
      visitorData.value[visitor.id] = { today: visitor.visitorCount || 0, week: 0, month: 0 };
    });

    weekVisitors.forEach((visitor: Visitor) => {
      if (visitorData.value[visitor.id]) {
        visitorData.value[visitor.id].week = visitor.visitorCount || 0;
      } else {
        visitorData.value[visitor.id] = { today: 0, week: visitor.visitorCount || 0, month: 0 };
      }
    });

    monthVisitors.forEach((visitor: Visitor) => {
      if (visitorData.value[visitor.id]) {
        visitorData.value[visitor.id].month = visitor.visitorCount || 0;
      } else {
        visitorData.value[visitor.id] = { today: 0, week: 0, month: visitor.visitorCount || 0 };
      }
    });
  } catch (error) {
    console.error("Error fetching visitors:", error);
    toast.error(`Error fetching visitors: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};


// Fetch Products and Attach Visitor Data
const fetchProducts = async () => {
  try {
    const response = await productService.getProducts();
    console.log("Raw Product Response:", response);

    if (!response || !Array.isArray(response)) {
      throw new Error(`Invalid product response: ${JSON.stringify(response)}`);
    }

    // Populate the `products` list
    products.value = response.map((product: any) => ({
      id: product.id,
      organization: product.User?.name || "N/A",
      visitorToday: visitorData.value[product.id]?.today || 0,
      visitorWeek: visitorData.value[product.id]?.week || 0,
      visitorMonth: visitorData.value[product.id]?.month || 0,
      visitorCount: product.visitorCount || 0,
    }));

    console.log("Processed Products with Visitors:", products.value);
  } catch (error) {
    toast.error(`Error fetching products: ${error instanceof Error ? error.message : "Unknown error"}`);
  } finally {
    isLoading.value = false;
  }
};

// Run in Sequence
onMounted(async () => {
  await fetchVisitors();
  await fetchProducts();
});

// Recalculate `products` when `visitorData` updates
watch(visitorData, () => {
  products.value = products.value.map(product => ({
    ...product,
    visitorToday: visitorData.value[product.id]?.today || 0,
    visitorWeek: visitorData.value[product.id]?.week || 0,
    visitorMonth: visitorData.value[product.id]?.month || 0,
  }));
}, { deep: true });  // Ensure reactivity on nested objects

// Table Headings
const tableheading = ref([
  { key: 'organization', label: 'Organization', align: 'center' },
  { key: 'visitorToday', label: 'Today', align: 'center' },
  { key: 'visitorWeek', label: 'This Week', align: 'center' },
  { key: 'visitorMonth', label: 'This Month', align: 'center' },
  { key: 'visitorCount', label: 'Total Visitors', align: 'center' },

])
const statsheading = ref([
  { key: 'visitorToday', label: 'Today', align: 'center' },
  { key: 'visitorWeek', label: 'This Week', align: 'center' },
  { key: 'visitorMonth', label: 'This Month', align: 'center' },
  { key: 'visitorCount', label: 'Total Visitors', align: 'center' },

])

// Sorting Function (Optional)
const handleSort = (key: string) => {
  console.log(`Sorting by: ${key}`)
}

</script>

<template>
  <div class="tw-flex tw-flex-col tw-mb-12 tw-mt-12 tw-gap-12">


    <div class="tw-text-[24px] md:tw-text-3xl tw-font-medium">Website Visitors</div>
    <DashboardComp :columns="statsheading" :rowData="products" @sort="handleSort" link="/products" />

    <div >
      <div class="tw-text-[24px] md:tw-text-3xl tw-font-medium">Organización visitors</div>



    <DashboardComp :columns="tableheading" :rowData="products" @sort="handleSort" link="/products" />
  </div>
  </div>
</template>
