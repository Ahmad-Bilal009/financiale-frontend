<script setup lang="ts">
import DashboardComp from '@/components/UI/table/DashboardCompstats.vue'
import productService from '@/services/productServices'
import visitorService from '@/services/visitorServices'
import { ref, onMounted, watch } from 'vue';
import { useToast } from 'vue-toastification'

const toast = useToast()

//  State Management
const products = ref<any[]>([])
const isLoading = ref(true)

//  Visitor Data
const visitorData = ref<Record<number, { today: number; week: number; month: number }>>({})
const totalVisitors = ref<number>(0)
const todayVisitors = ref<number>(0)
const weekVisitors = ref<number>(0)
const monthVisitors = ref<number>(0)

interface Visitor {
  id: number;
  visitorCount?: number;
}

//  Fetch Total Visitors from API
const fetchTotalVisitors = async () => {
  try {
    const response = await visitorService.getTotalVisitors();

    if (!response || !response.data) {
      throw new Error("Invalid response from total visitors API");
    }

    totalVisitors.value = response.data.totalVisitors || 0;
    todayVisitors.value = response.data.todayVisitors || 0;
    weekVisitors.value = response.data.weekVisitors || 0;
    monthVisitors.value = response.data.monthVisitors || 0;

  } catch (error) {
    console.error("Error fetching total visitors:", error);
    toast.error(`Error fetching total visitors: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

//  Fetch Visitors Per Product
const fetchVisitors = async () => {
  try {
    const [todayResponse, weekResponse, monthResponse] = await Promise.all([
      visitorService.getSortedVisitors("today"),
      visitorService.getSortedVisitors("thisWeek"),
      visitorService.getSortedVisitors("thisMonth")
    ]);

    console.log("Fetched Visitor Data:", todayResponse, weekResponse, monthResponse);

    const todayData: Visitor[] = todayResponse.data.visitors || [];
    const weekData: Visitor[] = weekResponse.data.visitors || [];
    const monthData: Visitor[] = monthResponse.data.visitors || [];

    visitorData.value = {}; // Reset data before populating

    todayData.forEach(visitor => {
      visitorData.value[visitor.id] = { today: visitor.visitorCount || 0, week: 0, month: 0 };
    });

    weekData.forEach(visitor => {
      if (visitorData.value[visitor.id]) {
        visitorData.value[visitor.id].week = visitor.visitorCount || 0;
      } else {
        visitorData.value[visitor.id] = { today: 0, week: visitor.visitorCount || 0, month: 0 };
      }
    });

    monthData.forEach(visitor => {
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

//  Fetch Products and Attach Visitor Data
const fetchProducts = async () => {
  try {
    const response = await productService.getProducts();
    console.log("Raw Product Response:", response);

    if (!response || !Array.isArray(response)) {
      throw new Error(`Invalid product response: ${JSON.stringify(response)}`);
    }

    // Get current date, start of the week, and start of the month
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of the week (Sunday)

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime(); // Start of the month

    products.value = response.map((product: any) => {
      const visitorData = product.visitorCount || {}; // Assuming visitorCount stores timestamps

      // Convert visitorData keys (timestamps) to numbers and filter based on date range
      const todayVisitors = Object.entries(visitorData).filter(([date]) => {
        const time = new Date(date).getTime();
        return time >= todayStart;
      }).reduce((acc, [, count]) => acc + (Number(count) || 0), 0);

      const weekVisitors = Object.entries(visitorData).filter(([date]) => {
        const time = new Date(date).getTime();
        return time >= weekStart.getTime();
      }).reduce((acc, [, count]) => acc + (Number(count) || 0), 0);

      const monthVisitors = Object.entries(visitorData).filter(([date]) => {
        const time = new Date(date).getTime();
        return time >= monthStart;
      }).reduce((acc, [, count]) => acc + (Number(count) || 0), 0);

      return {
        id: product.id,
        organization: product.User?.name || "N/A",
        visitorToday: todayVisitors,
        visitorWeek: weekVisitors,
        visitorMonth: monthVisitors,
        visitorCount: Object.values(visitorData).reduce(
          (acc: number, count: any) => acc + (count || 0),
          0
        ), // Total visitors
      };
    });

    console.log("Processed Products with Visitors:", products.value);
  } catch (error) {
    toast.error(`Error fetching products: ${error instanceof Error ? error.message : "Unknown error"}`);
  } finally {
    isLoading.value = false;
  }
};


//  Run in Sequence
onMounted(async () => {
  await fetchTotalVisitors();
  await fetchVisitors();
  await fetchProducts();
});

//  Update `products` when `visitorData` updates
watch(visitorData, () => {
  products.value = products.value.map(product => ({
    ...product,
    visitorToday: visitorData.value[product.id]?.today || 0,
    visitorWeek: visitorData.value[product.id]?.week || 0,
    visitorMonth: visitorData.value[product.id]?.month || 0,
  }));
}, { deep: true });

//  Table Headings
const tableheading = ref([
  { key: 'organization', label: 'Organización', align: 'center' },
  { key: 'visitorToday', label: 'Hoy', align: 'center' },
  { key: 'visitorWeek', label: 'Esta Semana', align: 'center' },
  { key: 'visitorMonth', label: 'Este Mes', align: 'center' },
  { key: 'visitorCount', label: 'Total de Visitantes', align: 'center' },
])

//  Stats Heading (Total Website Visitors)
const statsheading = ref([
  { key: 'visitorToday', label: 'Hoy', align: 'center' },
  { key: 'weekVisitors', label: 'Esta Semana', align: 'center' },
  { key: 'monthVisitors', label: 'Este Mes', align: 'center' },
  { key: 'visitorCount', label: 'Total de Visitantes', align: 'center' },
])

//  Sorting Function
const handleSort = (key: string) => {
  console.log(`Sorting by: ${key}`)
}
</script>

<template>
  <div class="tw-flex tw-flex-col tw-mb-12 tw-mt-12 tw-gap-12">
    <!--  Website Visitors -->
    <div class="tw-text-[24px] md:tw-text-3xl tw-font-medium">Visitantes del Sitio Web</div>
    <DashboardComp
      :columns="statsheading"
      :rowData="[ { visitorToday: todayVisitors, weekVisitors: weekVisitors, monthVisitors: monthVisitors, visitorCount: totalVisitors } ]"
      @sort="handleSort"
      link="/products"
    />

    <!--  Organization Visitors -->
    <div>
      <div class="tw-text-[24px] md:tw-text-3xl tw-font-medium">Visitantes de la Organización</div>
      <DashboardComp
        :columns="tableheading"
        :rowData="products"
        @sort="handleSort"
        link="/products"
      />
    </div>
  </div>
</template>
