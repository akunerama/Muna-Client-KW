<template>
  <div class="form-container">
    <h2>Data Peserta Munaqasah</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Judul</label>
        <input type="text" id="title" v-model="formData.title" required />
      </div>
      <div class="form-group">
        <label for="date">Tanggal</label>
        <input type="date" id="date" v-model="formData.date" required />
      </div>
      <div class="form-group">
        <label for="Prodi">Program Studi</label>
        <select id="Prodi" v-model="formData.Prodi" required>
          <option value="">Pilih Program Studi</option>
          <option value="Teknik Informatika">Teknik Informatika</option>
          <option value="Sistem Informasi">Sistem Informasi</option>
          <option value="Teknik Elektro">Teknik Elektro</option>
          <!-- Tambahkan opsi program studi lainnya sesuai kebutuhan -->
        </select>
      </div>     
      <div class="form-group">
        <label for="Status">Status</label>
        <select id="Status" v-model="formData.Status" required>
          <option value="">Pilih Status</option>
          <option value="Selesai">Selesai</option>
          <option value="On Progress">On Progress</option>
          <option value="Not Yet">Not Yet</option>
        </select>
      </div>
      <div class="form-group">
        <label for="content">Deskripsi</label>
        <textarea id="content" v-model="formData.content" required></textarea>
      </div>
      <button type="submit">Kirim</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';


const formData = reactive({
  title: '',
  date: '',
  Prodi: '',
  Status: '',
  content: '',
});

const emit = defineEmits(['generate-report']);

const submitForm = () => {
  emit('generate-report', { ...formData });
  formData.title = '';
  formData.date = '';
  formData.Prodi = '';
  formData.Status = '';
  formData.content = '';
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>