<template>
    <main class="dashboard-page">
        <div class="chart-container">
            <h1>Line Chart</h1>
            <p>Jumlah Siswa Daftar Munaqosah</p>
            <!-- <Linechart /> -->
          </div>
    </main>
  </template>
  
  <script setup lang="ts">
  // import Linechart from '../charts/Linechart.vue';
  </script>
  
  <style scoped>
.dashboard-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.chart-container {
  max-width: 800px;
  width: 100%;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  padding: 1rem;

  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }
}
</style>