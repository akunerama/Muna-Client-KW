<template>
  <main class="dashboard-page">
    <div class="chart-container">
      <h1>Line Chart</h1>
      <p>Jumlah Mahasiswa Mendaftar Skripsi</p>
      
      <div class="chart-wrapper">
        <Linechart />
      </div>
      
      <div class="chart-wrapper">
        <Barchart />
      </div>
      
      <div class="chart-wrapper">
        <Piechart />
      </div>
    </div>
  </main>
</template>


<script setup lang="ts">
import Linechart from '../charts/Linechart.vue';
import Barchart from '../charts/Barchart.vue';
import Piechart from '../charts/Piechart.vue';
import { cn } from '@/lib/utils';
</script>

<style scoped>
.dashboard-page {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.chart-container {
  max-width: 800px;
  width: 100%;
  text-align: center;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  .chart-wrapper {
    margin-bottom: 2rem;
  }
}
</style>