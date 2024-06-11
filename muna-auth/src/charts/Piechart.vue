<template>
  <div class="chart-container">
    <div class="filters">
      <label for="day">Day:</label>
      <select id="day" v-model="filters.day" @change="filterData">
        <!-- <option value="">All</option> -->
        <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
      </select>

      <label for="room">Room:</label>
      <select id="room" v-model="filters.room" @change="filterData">
        <option value="">All</option>
        <option v-for="room in rooms" :key="room" :value="room">{{ room }}</option>
      </select>
    </div>
    <button @click="downloadChart">Download Chart</button>
    <div ref="chartRef">
      <Pie :data="chartData" :options="options" />
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref, onMounted } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

// Filters for schedule
const filters = reactive({
  day: 'Senin',
  room: '', // Default to 'All'
});

// Available days and rooms for the filters
const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
const rooms = ['Munaqasyah 1', 'Munaqasyah 2', 'Munaqasyah 3']; 

// State to hold the raw data fetched from JSON
const scheduleData = reactive([]);

// Data for the pie chart
const data = reactive({
  labels: rooms,
  datasets: [
    {
      label: 'Room Usage (in hours)',
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
      data: [0, 0, 0] // Initialisasi dengan nol untuk masing-masing ruangan
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
    // title: {
    //   display: true,
    //   text: 'Room Usage in a Week',
    // },
    tooltip: {
      callbacks: {
        label: function (context) {
          const value = context.raw;
          return `${context.label}: ${value} hours`;
        }
      }
    }
  },
};

const chartRef = ref(null);

// Function to calculate hours between two times
const calculateHours = (start, end) => {
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);
  return (endHour + endMinute / 60) - (startHour + startMinute / 60);
};

// Fetch data from JSON file
const fetchData = async () => {
  try {
    const response = await fetch('/src/filedata/data-pie.json');
    const json = await response.json();
    scheduleData.push(...json.schedule);
    filterData(); // Call filterData after fetching data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Compute filtered data based on the filters
const chartData = computed(() => {
  const { day, room } = filters;
  const filtered = scheduleData.filter(item => {
    return (!day || item.day === day) &&
           (!room || item.room === room || !room);
  });

  // Count usage hours per room
  const roomUsage = rooms.map(r => 
    filtered.filter(item => item.room === r).reduce((total, item) => 
      total + calculateHours(item.start, item.end), 0)
  );

  return {
    labels: rooms,
    datasets: [{
      label: data.datasets[0].label,
      backgroundColor: data.datasets[0].backgroundColor,
      borderColor: data.datasets[0].borderColor,
      borderWidth: data.datasets[0].borderWidth,
      data: roomUsage
    }]
  };
});

const filterData = () => {
  // This function is called when filters change. The actual filtering happens in the computed property `chartData`.
};

// Method to download the chart as an image or PDF
const downloadChart = async () => {
  const canvas = await html2canvas(chartRef.value);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF();
  pdf.addImage(imgData, 'PNG', 10, 10);
  pdf.save('chart.pdf');
};

onMounted(() => {
  fetchData();
});
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

button {
  display: block;
  margin: 20px auto;
}
</style>
