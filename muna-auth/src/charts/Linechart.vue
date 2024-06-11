<template>
  <div class="chart-container">
    <div class="filter-container mb-4">
      <label for="year-filter" class="block mb-2 text-sm font-medium text-gray-700">Filter Tahun</label>
      <select id="year-filter" v-model="selectedYear" @change="filterData" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        <option value="">Semua Tahun</option>
        <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
      </select>
    </div>
    <div v-if="selectedYear" class="filter-container mb-4">
      <label for="semester-filter" class="block mb-2 text-sm font-medium text-gray-700">Filter Semester</label>
      <select id="semester-filter" v-model="selectedSemester" @change="filterData" class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        <option value="ganjil">Semester Ganjil</option>
        <option value="genap">Semester Genap</option>
      </select>
    </div>
    <Line :data="chartData" :options="options" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
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
          label: 'Number of Students',
          backgroundColor: 'rgba(247, 121, 121, 0.2)',
          borderColor: 'rgba(247, 121, 121, 1)',
          borderWidth: 1,
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
      },
      scales: {
        y: {
          beginAtZero: true // Start y-axis from 0
        }
      }
    };

    const rawData = ref([]);
    const selectedYear = ref('');
    const selectedSemester = ref('ganjil');
    const availableYears = ref([]);

    const filterData = () => {
      let filteredData = rawData.value;

      if (selectedYear.value) {
        filteredData = filteredData.filter((item: any) => item.tahun === selectedYear.value);

        const isGanjil = selectedSemester.value === 'ganjil';
        filteredData = filteredData.filter((item: any) => (item.semester % 2 === 1) === isGanjil);

        chartData.value = {
          labels: filteredData.map((item: any) => `Gelombang ${item.gelombang}`),
          datasets: [
            {
              label: 'Number of Students',
              backgroundColor: 'rgba(247, 121, 121, 0.2)',
              borderColor: 'rgba(247, 121, 121, 1)',
              borderWidth: 1,
              data: filteredData.map((item: any) => item.jumlah_mahasiswa)
            }
          ]
        };
      } else {
        const yearData = availableYears.value.map((year: any) => {
          const yearFilteredData = rawData.value.filter((item: any) => item.tahun === year);
          const totalStudents = yearFilteredData.reduce((sum: number, item: any) => sum + item.jumlah_mahasiswa, 0);
          return { tahun: year, jumlah_mahasiswa: totalStudents };
        });

        chartData.value = {
          labels: yearData.map((item: any) => item.tahun),
          datasets: [
            {
              label: 'Number of Students',
              backgroundColor: 'rgba(247, 121, 121, 0.2)',
              borderColor: 'rgba(247, 121, 121, 1)',
              borderWidth: 1,
              data: yearData.map((item: any) => item.jumlah_mahasiswa)
            }
          ]
        };
      }
    };

    watch(selectedYear, (newYear) => {
      if (newYear) {
        selectedSemester.value = 'ganjil';
        filterData();
      }
    });

    onMounted(async () => {
      try {
        const response = await fetch('/src/filedata/data-line.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        rawData.value = data.LineData;
        availableYears.value = [...new Set(data.LineData.map((item: any) => item.tahun))];
        filterData();
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    });

    return {
      chartData,
      options,
      selectedYear,
      selectedSemester,
      availableYears,
      filterData
    };
  }
});
</script>