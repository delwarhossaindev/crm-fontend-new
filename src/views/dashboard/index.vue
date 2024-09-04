<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { useDataStore } from "@/stores/data";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const dataStore = useDataStore();
const { isLoading } = storeToRefs(dataStore);

const topData = ref({
  totalSales: 0,
  totalPurchases: 0,
  totalSupplier: 0,
  totalProducts: 0,
});

onMounted(async () => {
  
});

const chartOptions = ref({
  xaxis: {
    title: {
      text: "Date",
    },
  },
  yaxis: {
    title: {
      text: "Sales",
    },
  },
  title: {
    text: "Monthly Sales",
  },
});

const series = ref([
  {
    data: [],
  },
]);
</script>

<template>
  <MainLayout>
    <a-skeleton active v-if="isLoading" />
    <div v-else>
      <div class="grid grid-cols-4 gap-3">
        <!-- Column  -->
       
        <!--/ Column  -->
      </div>
      <!-- Graph -->
      <!-- <div class="bg-white mt-3 p-3 rounded">
        <apexchart
          type="bar"
          height="380"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div> -->
    </div>
  </MainLayout>
</template>
