<template>
    <main class="home-page">
      <h1 class="text-3xl font-bold mb-4">Jadwal Munaqosah</h1>
      <ScheduleTable/>
      <!-- <Calendar /> -->
    </main>
  </template>
  
  <script setup lang="ts">
  import ScheduleTable from '@/components/ScheduleTable.vue';
//   import Calendar from './../components/Calendar.vue'
  </script>
  
  <style scoped>
  .home-page {
    padding: 2rem;
  
    @media (max-width: 768px) {
      padding: 1rem;
    }
  }
  </style>