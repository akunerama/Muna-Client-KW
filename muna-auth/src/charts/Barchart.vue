<template>
  <div class="chart-container">
    <div class="filters">
      <label for="semester">Semester:</label>
      <select id="semester" v-model="filters.semester" @change="filterData">
        <option value="">All</option>
        <option v-for="semester in availableSemesters" :key="semester" :value="semester">{{ semester }}</option>
      </select>

      <label for="wave">Wave:</label>
      <select id="wave" v-model="filters.wave" @change="filterData">
        <option value="">All</option>
        <option v-for="wave in availableWaves" :key="wave" :value="wave">{{ wave }}</option>
      </select>
    </div>
    <Bar :data="filteredData" :options="options" />
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Filters for semester and wave
const filters = reactive({
  semester: null,
  wave: null,
});

// Available semesters and waves for the filters
const availableSemesters = reactive(new Set());
const availableWaves = [1, 2, 3, 4];

// Raw data for bar chart
const rawData = reactive([]); // Empty initially, will be filled by fetch

// Data for the bar chart
const data = reactive({
  labels: ['Wave 1', 'Wave 2', 'Wave 3', 'Wave 4'], // Initial labels for waves
  datasets: [
    {
      label: 'Number of Students',
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      data: [0, 0, 0, 0] // Initialize with zero for each wave
    },
  ],
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Number of Students per Wave',
    },
  },
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
      ticks: {
        // Menampilkan bilangan bulat tanpa koma
        callback: function(value) {
          if (Number.isInteger(value)) {
            return value;
          }
        }
      }
    }
  }
};

// Fetch data from JSON file on component mount
onMounted(async () => {
  try {
    const response = await fetch('/src/filedata/data.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const dataFromJSON = await response.json();
    console.log('Data fetched:', dataFromJSON); // Debugging log
    if (dataFromJSON && dataFromJSON['bar-event']) {
      rawData.value = dataFromJSON['bar-event'];
      rawData.value.forEach(item => availableSemesters.add(item.semester));
      filterData(); // Initial filter application
    } else {
      console.error('Invalid JSON structure');
    }
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
});

// Compute filtered data based on the filters
const filteredData = computed(() => {
  if (!rawData.value || rawData.value.length === 0) {
    return {
      labels: data.labels,
      datasets: [{
        label: data.datasets[0].label,
        backgroundColor: data.datasets[0].backgroundColor,
        borderColor: data.datasets[0].borderColor,
        borderWidth: data.datasets[0].borderWidth,
        data: [0, 0, 0, 0] // Initialize with zero if no data
      }]
    };
  }

  const { semester, wave } = filters;

  // Initialize counts for each wave
  const waveCounts = [0, 0, 0, 0];

  // Filter rawData based on the selected semester and wave
  rawData.value.forEach(item => {
    if ((!semester || item.semester === semester) &&
        (!wave || item.wave === wave)) {
      // Increment the count for the corresponding wave
      waveCounts[item.wave - 1] += item.students.length;
    }
  });

  return {
    labels: data.labels,
    datasets: [{
      label: data.datasets[0].label,
      backgroundColor: data.datasets[0].backgroundColor,
      borderColor: data.datasets[0].borderColor,
      borderWidth: data.datasets[0].borderWidth,
      data: waveCounts // Set the data to the counts of each wave
    }]
  };
});

// Method to filter data
const filterData = () => {
  // This method is called whenever filter inputs change
  // It will trigger the computed property to recalculate the data
};
</script>

<style scoped>
.chart-container {
  position: relative;
  margin: auto;
  height: 40vh;
  width: 80vw;
}

.filters {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

label {
  margin-right: 10px;
}

select {
  margin-right: 20px;
}
</style>
