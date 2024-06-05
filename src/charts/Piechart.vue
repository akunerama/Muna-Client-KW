<template>
    <div class="chart-container">
      <div class="filters">
        <label for="day">Day:</label>
        <select id="day" v-model="filters.day" @change="filterData">
          <option value="">All</option>
          <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
        </select>
  
        <label for="month">Month:</label>
        <select id="month" v-model="filters.month" @change="filterData">
          <option value="">All</option>
          <option v-for="month in months" :key="month.value" :value="month.value">{{ month.name }}</option>
        </select>
  
        <label for="year">Year:</label>
        <select id="year" v-model="filters.year" @change="filterData">
          <option value="">All</option>
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
      <button @click="downloadChart">Download Chart</button>
      <div ref="chartRef">
        <Pie :data="filteredData" :options="options" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { reactive, computed, ref } from 'vue';
  import { Pie } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
  import html2canvas from 'html2canvas';
  import jsPDF from 'jspdf';
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement);
  
  // Filters for date
  const filters = reactive({
    day: null,
    month: null,
    year: null,
  });
  
  // Available days, months, and years for the filters
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
  ];
  const years = [2022, 2023, 2024]; // Adjust the years as needed
  
  // Raw data for pie chart with dates and sales categories
  const rawData = reactive([
    { date: new Date(2024, 4, 21), sales: { electronics: 200, clothing: 100, groceries: 150, books: 50, toys: 80, furniture: 60 } },
    { date: new Date(2023, 4, 22), sales: { electronics: 150, clothing: 120, groceries: 130, books: 70, toys: 90, furniture: 50 } },
    { date: new Date(2022, 5, 21), sales: { electronics: 220, clothing: 110, groceries: 140, books: 60, toys: 100, furniture: 70 } },
    // Tambahkan lebih banyak data dummy sesuai kebutuhan
  ]);
  
  // Data for the pie chart
  const data = reactive({
    labels: ['Electronics', 'Clothing', 'Groceries', 'Books', 'Toys', 'Furniture'],
    datasets: [
      {
        label: 'Sales',
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        data: [0, 0, 0, 0, 0, 0] // Inisialisasi dengan nol
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
        text: 'Sales Data',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${context.label}: ${percentage}% (${value})`;
          }
        }
      }
    },
  };
  
  const chartRef = ref(null);
  
  // Compute filtered data based on the filters
  const filteredData = computed(() => {
    const { day, month, year } = filters;
    const filtered = rawData.filter(item => {
      const itemDate = item.date;
      return (!day || itemDate.getDate() === day) &&
             (!month || itemDate.getMonth() + 1 === month) &&
             (!year || itemDate.getFullYear() === year);
    });
  
    if (filtered.length > 0) {
      const totalSales = Object.values(filtered[0].sales).reduce((a, b) => a + b, 0);
      return {
        labels: data.labels,
        datasets: [{
          label: data.datasets[0].label,
          backgroundColor: data.datasets[0].backgroundColor,
          borderColor: data.datasets[0].borderColor,
          borderWidth: data.datasets[0].borderWidth,
          data: Object.values(filtered[0].sales).map(sale => ((sale / totalSales) * 100).toFixed(2))
        }]
      };
    } else {
      return data;
    }
  });
  
  // Method to filter data
  const filterData = () => {
    // This method is called whenever filter inputs change
  };
  
  // Method to download the chart as an image or PDF
  const downloadChart = async () => {
    const canvas = await html2canvas(chartRef.value);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10);
    pdf.save('chart.pdf');
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
  
  button {
    display: block;
    margin: 20px auto;
  }
  </style>