<template>
  <div class="container mx-auto py-8">
    <!-- <h1 class="text-2xl font-bold mb-4">Jadwal Munaqasyah</h1> -->

    <!-- Gelombang 1 -->
    <div class="mb-8">
      <h2 class="text-xl font-bold mb-4">Gelombang 1</h2>
      <Table class="min-w-full bg-white border border-gray-200">
        <!-- <TableCaption>Jadwal untuk Gelombang 1</TableCaption> -->
        <TableHeader>
          <TableRow class="border-b border-gray-200">
            <TableHead class="py-2 px-4 border-b border-gray-200 w-[100px]">NIM</TableHead>
            <TableHead class="py-2 px-4 border-b border-gray-200">Nama</TableHead>
            <TableHead class="py-2 px-4 border-b border-gray-200">Judul Skripsi</TableHead>
            <TableHead class="py-2 px-4 border-b border-gray-200">NIP Penguji</TableHead>
            <TableHead class="py-2 px-4 border-b border-gray-200">Nama Penguji</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell class="py-2 px-4 border-b border-gray-200 text-gray-500" colspan="5">Tidak ada jadwal</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Gelombang 2 -->
    <div class="mb-8">
      <h2 class="text-xl font-bold mb-4">Gelombang 2</h2>
      <Table class="min-w-full bg-white border border-gray-200">
        <!-- <TableCaption>Jadwal untuk Gelombang 2</TableCaption> -->
        <TableHeader>
          <TableRow class="border-b border-gray-200">
            <TableHead class="py-2 px-4 border-b border-gray-200 w-[100px]">NIM</TableHead>
            <TableHead class="py-2 px-4 border-b border-gray-200">Nama</TableHead>
            <TableHead class="py-2 px-4 border-b border-gray-200">Judul Skripsi</TableHead>
            <TableHead class="py-2 px-4 border-b border-gray-200">NIP Penguji</TableHead>
            <TableHead class="py-2 px-4 border-b border-gray-200">Nama Penguji</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell class="py-2 px-4 border-b border-gray-200 text-gray-500" colspan="5">Tidak ada jadwal</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Gelombang 3 -->
    <div class="mb-8">
      <h2 class="text-xl font-bold mb-4">Gelombang 3</h2>
      <Table class="min-w-full bg-white border border-gray-200">
        <!-- <TableCaption>Jadwal untuk Gelombang 3</TableCaption> -->
        <TableHeader>
          <TableRow class="border-b border-gray-200">
            <TableHead class="py-2 px-4 border-b border-gray-200 w-[100px]">NIM</TableHead>
            <TableHead class="py-2 px-4 border-b border-gray-200">Nama</TableHead>
            <TableHead class="py-2 px-4 border-b border-gray-200">Judul Skripsi</TableHead>
            <TableHead class="py-2 px-4 border-b border-gray-200">NIP Penguji</TableHead>
            <TableHead class="py-2 px-4 border-b border-gray-200">Nama Penguji</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell class="py-2 px-4 border-b border-gray-200 text-gray-500" colspan="5">Tidak ada jadwal</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Gelombang 4 -->
    <div class="mb-8">
      <h2 class="text-xl font-bold mb-4">Gelombang 4</h2>
      <Table class="min-w-full bg-white border border-gray-200">
        <!-- <TableCaption>Jadwal untuk Gelombang 4</TableCaption> -->
        <TableHeader>
          <TableRow class="border-b border-gray-200">
            <TableHead class="py-2 px-4 border-b border-gray-200 w-[100px]">NIM</TableHead>
            <TableHead class="py-2 px-4 border-b border-gray-200">Nama</TableHead>
            <TableHead class="py-2 px-4 border-b border-gray-200">Judul Skripsi</TableHead>
            <TableHead class="py-2 px-4 border-b border-gray-200">NIP Penguji</TableHead>
            <TableHead class="py-2 px-4 border-b border-gray-200">Nama Penguji</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="event in events" :key="event.muna_id">
            <TableCell class="py-2 px-4 border-b border-gray-200">{{ event.nim }}</TableCell>
            <TableCell class="py-2 px-4 border-b border-gray-200">{{ event.nama }}</TableCell>
            <TableCell class="py-2 px-4 border-b border-gray-200">{{ event.judul_skripsi }}</TableCell>
            <TableCell class="py-2 px-4 border-b border-gray-200">{{ event.penguji[0].nip }}</TableCell>
            <TableCell class="py-2 px-4 border-b border-gray-200">{{ event.penguji[0].nama }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default defineComponent({
  name: 'ScheduleTable',
  components: {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  },
  setup() {
    const events = ref([]);

    onMounted(async () => {
      try {
        const response = await fetch('http://10.1.15.208:8000/schedule/munaqasyah/', {
          method: 'GET',
          headers: {
            "Content-type": "application/json",
          },
        });
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
  },
});
</script>

<style scoped>
.container {
  max-width: 100%;
}
</style>
