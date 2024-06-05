<template>
    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-4"></h1>
    
        <!-- Gelombang 1 -->
        <div class="mb-8">
          <h2 class="text-xl font-bold mb-4">Gelombang 1</h2>
          <table class="min-w-full bg-gray-100 border border-gray-200">
            <thead>
              <tr>
                <th class="py-2 px-4 border-b border-gray-200">NIM</th>
                <th class="py-2 px-4 border-b border-gray-200">Nama</th>
                <th class="py-2 px-4 border-b border-gray-200">Judul Skripsi</th>
                <th class="py-2 px-4 border-b border-gray-200">NIP Penguji</th>
                <th class="py-2 px-4 border-b border-gray-200">Nama Penguji</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="py-2 px-4 border-b border-gray-200 text-gray-500" colspan="5">Tidak ada jadwal</td>
              </tr>
            </tbody>
          </table>
        </div>
    
        <!-- Gelombang 2 -->
        <div class="mb-8">
          <h2 class="text-xl font-bold mb-4">Gelombang 2</h2>
          <table class="min-w-full bg-gray-100 border border-gray-200">
            <thead>
              <tr>
                <th class="py-2 px-4 border-b border-gray-200">NIM</th>
                <th class="py-2 px-4 border-b border-gray-200">Nama</th>
                <th class="py-2 px-4 border-b border-gray-200">Judul Skripsi</th>
                <th class="py-2 px-4 border-b border-gray-200">NIP Penguji</th>
                <th class="py-2 px-4 border-b border-gray-200">Nama Penguji</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="py-2 px-4 border-b border-gray-200 text-gray-500" colspan="5">Tidak ada jadwal</td>
              </tr>
            </tbody>
          </table>
        </div>
    
        <!-- Gelombang 3 -->
        <div class="mb-8">
          <h2 class="text-xl font-bold mb-4">Gelombang 3</h2>
          <table class="min-w-full bg-gray-100 border border-gray-200">
            <thead>
              <tr>
                <th class="py-2 px-4 border-b border-gray-200">NIM</th>
                <th class="py-2 px-4 border-b border-gray-200">Nama</th>
                <th class="py-2 px-4 border-b border-gray-200">Judul Skripsi</th>
                <th class="py-2 px-4 border-b border-gray-200">NIP Penguji</th>
                <th class="py-2 px-4 border-b border-gray-200">Nama Penguji</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="py-2 px-4 border-b border-gray-200 text-gray-500" colspan="5">Tidak ada jadwal</td>
              </tr>
            </tbody>
          </table>
        </div>
    
        <!-- Gelombang 4 -->
        <div class="mb-8">
          <h2 class="text-xl font-bold mb-4">Gelombang 4</h2>
          <table class="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th class="py-2 px-4 border-b border-gray-200">NIM</th>
                <th class="py-2 px-4 border-b border-gray-200">Nama</th>
                <th class="py-2 px-4 border-b border-gray-200">Judul Skripsi</th>
                <th class="py-2 px-4 border-b border-gray-200">NIP Penguji</th>
                <th class="py-2 px-4 border-b border-gray-200">Nama Penguji</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in events" :key="event.muna_id">
                <td class="py-2 px-4 border-b border-gray-200">{{ event.nim }}</td>
                <td class="py-2 px-4 border-b border-gray-200">{{ event.nama }}</td>
                <td class="py-2 px-4 border-b border-gray-200">{{ event.judul_skripsi }}</td>
                <td class="py-2 px-4 border-b border-gray-200">{{ event.penguji[0].nip }}</td>
                <td class="py-2 px-4 border-b border-gray-200">{{ event.penguji[0].nama }}</td>    
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  
  export default defineComponent({
    name: 'ScheduleTable',
    setup() {
      const events = ref([]);
  
      onMounted(async () => {
        try {
          const response = await fetch('http://10.1.15.208:8000/schedule/munaqasyah/', 
          {
            method: 'GET',
            headers:
            {
              "Content-type":"application/json",
            },
          }
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          events.value = data.data;
          console.log(data);
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      });
  
      return {
        events,
      };
    }
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid #ddd;
  }
  </style>