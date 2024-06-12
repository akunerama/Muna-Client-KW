<template>
  <div id="app" class="p-4">
    <h2 class="text-xl font-bold mb-4">Unggah File HTML untuk Web Scraping</h2>
    <input type="file" id="fileInput" accept=".html" @change="handleFileChange" class="mb-4">
    <div class="flex space-x-2">
      <button @click="readFile" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Baca File</button>
      <button @click="sendData" class="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">Kirim Data ke API</button>
    </div>
    <div id="scrapedTableContainer" v-html="tableHTML" class="mt-4"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'UploadFileComponent',
  setup() {
    const fileContent = ref<string>('');
    const scrapedData = ref<any[]>([]);
    const tableHTML = ref<string>('');

    const handleFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const file = input.files[0];
        if (file.type === 'text/html') {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target && typeof e.target.result === 'string') {
              fileContent.value = e.target.result;
              parseHTML(fileContent.value);
            }
          };
          reader.readAsText(file);
        } else {
          alert('Tolong unggah file dengan ekstensi .html');
        }
      }
    };

    const parseHTML = (content: string) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const tabel = doc.querySelectorAll('tbody')[0];
      const baris = tabel.querySelectorAll('tr');
      let hasil: any[] = [];
      baris.forEach((row, rowIndex) => {
        if (rowIndex !== 0) {
          const cells = row.querySelectorAll('td');
          const data = {
            NIP: cells[0].textContent?.trim(),
            Nama: cells[1].textContent?.trim(),
            'Unit Kerja': cells[2].textContent?.trim(),
            'Konsorsium Ilmu': cells[3].textContent?.trim(),
          };
          hasil.push(data);
        }
      });
      scrapedData.value = hasil;
      tableHTML.value = createTableHTML(hasil);
    };

    const createTableHTML = (data: any[]) => {
      let tableHTML = '<table class="table-auto w-full border-collapse">';
      tableHTML += '<thead>';
      tableHTML += '<tr class="bg-gray-200">';
      tableHTML += '<th class="border px-4 py-2">NIP</th>';
      tableHTML += '<th class="border px-4 py-2">Nama</th>';
      tableHTML += '<th class="border px-4 py-2">Unit Kerja</th>';
      tableHTML += '<th class="border px-4 py-2">Konsorsium Ilmu</th>';
      tableHTML += '</tr>';
      tableHTML += '</thead>';
      tableHTML += '<tbody>';
      data.forEach((row) => {
        tableHTML += '<tr class="hover:bg-gray-100">';
        tableHTML += `<td class="border px-4 py-2">${row.NIP}</td>`;
        tableHTML += `<td class="border px-4 py-2">${row.Nama}</td>`;
        tableHTML += `<td class="border px-4 py-2">${row['Unit Kerja']}</td>`;
        tableHTML += `<td class="border px-4 py-2">${row['Konsorsium Ilmu']}</td>`;
        tableHTML += '</tr>';
      });
      tableHTML += '</tbody>';
      tableHTML += '</table>';
      return tableHTML;
    };

    const sendData = () => {
      const jsonData = JSON.stringify(scrapedData.value);
      fetch('http://10.1.15.208:8000/scraped/lecture/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    };

    return {
      fileContent,
      tableHTML,
      handleFileChange,
      readFile: handleFileChange,
      sendData,
    };
  },
});
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}
pre {
  background-color: #f4f4f4;
  padding: 10px;
  border: 1px solid #ddd;
  max-height: 300px;
  overflow-y: auto;
}
button {
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
