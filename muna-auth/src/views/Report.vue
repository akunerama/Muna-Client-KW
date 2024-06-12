<template>
  <div class="report-view" id="report-content">
    <h2>{{ reportData.title }}</h2>
    <p><strong>Tanggal:</strong> {{ reportData.date }}</p>
    <p><strong>Program Studi:</strong> {{ reportData.Prodi }}</p>
    <p><strong>Status:</strong> {{ reportData.Status }}</p>
    <p><strong>Deskripsi:</strong> {{ reportData.content }}</p>
    <Piechart />
    <Linechart />
    <Barchart />
    <DownloadReport />
  </div>
</template>

<script setup>
import Piechart from '@/charts/Piechart.vue';
import Linechart from '@/charts/Linechart.vue';
import Barchart from '@/charts/Barchart.vue';
import DownloadReport from '@/components/DownloadReport.vue';

defineProps({
  reportData: Object,
});
</script>

<style scoped>
.report-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.report-view h2 {
  text-align: center;
}

.report-view p {
  margin: 10px 0;
}
</style>