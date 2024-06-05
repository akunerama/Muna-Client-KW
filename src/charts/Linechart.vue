<template>
  <div class="chart-container">
    <div class="filter-container mb-4">
      <label for="year-filter" class="block mb-2 text-sm font-medium text-gray-700">Filter Tahun</label>
      <select id="year-filter" v-model="selectedYear" @change="filterData" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        <option value="">Semua Tahun</option>
        <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>
    <Line :data="chartData" :options="options" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default defineComponent({
  name: 'LineChart',
  components: {
    Line
  },
  setup() {
    const chartData = ref({
      labels: [],
      datasets: [
        {
          backgroundColor: '#f87979',
          data: []
        }
      ]
    });

    const options = {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false // Hides the label
        }
      }
    };

    const rawData = ref([]);
    const selectedYear = ref('');
    const availableYears = ref([]);

    const filterData = () => {
      const filteredData = selectedYear.value
        ? rawData.value.filter((item: any) => item.tahun === selectedYear.value)
        : rawData.value;

      chartData.value = {
        labels: filteredData.map((item: any) => item.tahun),
        datasets: [
          {
            backgroundColor: '#f87979',
            data: filteredData.map((item: any) => item.jumlah_mahasiswa)
          }
        ]
      };
    };

    onMounted(async () => {
      try {
        const response = await fetch('/src/filedata/data.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        rawData.value = data.ChartData;
        availableYears.value = [...new Set(data.ChartData.map((item: any) => item.tahun))];
        filterData();
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    });

    return {
      chartData,
      options,
      selectedYear,
      availableYears,
      filterData
    };
  }
});
</script>

<style scoped>
.chart-container {
  position: relative;
  margin: auto;
  height: 40vh;
  width: 80vw;
}
.filter-container {
  margin-bottom: 1rem;
}
</style>
