<template>
  <div>
    <h2>Jadwal Munaqasah</h2>
    <ag-grid-vue
      style="width: 100%; height: 400px;"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :pagination="true"
      :paginationPageSize="18"
      :defaultColDef="defaultColDef"
      @cellValueChanged="onCellValueChanged"
    ></ag-grid-vue>
  </div>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue3';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default {
  components: {
    AgGridVue,
  },
  data() {
    return {
      columnDefs: [
        { headerName: 'NIM', field: 'nim', sortable: true, filter: true },
        { headerName: 'Nama', field: 'nama', sortable: true, filter: true },
        { headerName: 'Prodi', field: 'prodi', sortable: true, filter: true },
        { headerName: 'Judul Skripsi', field: 'judul_skripsi', sortable: true, filter: true },
        { headerName: 'Dosen Pembimbing', field: 'dosenPembimbing', sortable: true, filter: true },
        {
          headerName: 'Dosen Penguji 2',
          field: 'dosenPenguji2',
          sortable: true,
          filter: true,
          editable: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: [], // Akan diisi secara dinamis
          },
        },
        {
          headerName: 'Dosen Penguji 3',
          field: 'dosenPenguji3',
          sortable: true,
          filter: true,
          editable: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: [], // Akan diisi secara dinamis
          },
        },
        {
          headerName: 'Dosen Penguji 4',
          field: 'dosenPenguji4',
          sortable: true,
          filter: true,
          editable: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: [], // Akan diisi secara dinamis dengan lecture_id antara 86 dan 98
          },
        },
        { headerName: 'Jam', field: 'jam', sortable: true, filter: true },
        { headerName: 'Hari', field: 'hari', sortable: true, filter: true },
        { headerName: 'Tanggal', field: 'tanggal', sortable: true, filter: true },
        { headerName: 'Ruangan', field: 'ruangan', sortable: true, filter: true },
      ],
      rowData: [],
      defaultColDef: {
        sortable: true,
        filter: true,
      },
      dosenOptions: [], // Untuk menyimpan semua opsi dosen
      dosenPenguji4Options: [], // Untuk menyimpan opsi dosen dengan lecture_id antara 86 dan 98
    };
  },
  async created() {
    await this.fetchDosenOptions();
    await this.fetchMunaqasyahData();
  },
  methods: {
    async fetchDosenOptions() {
      try {
        const response = await fetch('http://10.1.15.208:8000/schedule/lecture/', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log('API Response:', result); // Log data respon API untuk debugging

        if (result && Array.isArray(result.data)) {
          this.dosenOptions = result.data.map(dosen => dosen.nama); // Ekstrak nama untuk dropdown
          this.dosenPenguji4Options = result.data
            .filter(dosen => dosen.lecture_id >= 86 && dosen.lecture_id <= 98)
            .map(dosen => dosen.nama); // Filter dosen dengan lecture_id antara 86 dan 98
          this.updateColumnDefs();
        } else {
          console.error('Error: Expected an array but got', result);
        }
      } catch (error) {
        console.error('Error fetching dosen options:', error);
      }
    },
    async fetchMunaqasyahData() {
      try {
        const response = await fetch('http://10.1.15.208:8000/schedule/munaqasyah/', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log('Munaqasyah Data:', result); // Log data respon API untuk debugging

        if (result && Array.isArray(result.data)) {
          this.processData(result.data);
        } else {
          console.error('Error: Expected an array but got', result);
        }
      } catch (error) {
        console.error('Error fetching munaqasyah data:', error);
      }
    },
    updateColumnDefs() {
      // Perbarui cellEditorParams untuk kolom 'dosenPenguji2', 'dosenPenguji3', dan 'dosenPenguji4'
      const updatedColumnDefs = this.columnDefs.map(col => {
        if (col.field === 'dosenPenguji2' || col.field === 'dosenPenguji3') {
          col.cellEditorParams.values = this.dosenOptions;
        }
        if (col.field === 'dosenPenguji4') {
          col.cellEditorParams.values = this.dosenPenguji4Options;
        }
        return col;
      });
      this.columnDefs = [...updatedColumnDefs]; // Trigger reactivity
    },
    processData(data) {
      // Map data agar sesuai dengan format yang diharapkan
      const processedData = data.map(item => ({
        nim: item.nim,
        nama: item.nama,
        prodi: item.prodi,
        judul_skripsi: item.judul_skripsi,
        dosenPembimbing: item.penguji.length > 0 ? item.penguji[0].nama : '', // Set dosenPembimbing to the first penguji's name
        dosenPenguji2: item.penguji.length > 1 ? item.penguji[1].nama : '',
        dosenPenguji3: item.penguji.length > 2 ? item.penguji[2].nama : '',
        dosenPenguji4: item.penguji.length > 3 ? item.penguji[3].nama : '',
        jam: item.jam.start && item.jam.end ? `${item.jam.start} - ${item.jam.end}` : '',
        hari: item.hari,
        tanggal: item.tanggal_uji,
        ruangan: item.ruangan,
      }));
      console.log('Processed Data:', processedData); // Log data yang telah diproses untuk debugging
      this.rowData = processedData;
    },
    onCellValueChanged(params) {
      const selectedDosenPembimbing = params.data.dosenPembimbing;
      const selectedDosenPenguji2 = params.data.dosenPenguji2;
      const selectedDosenPenguji3 = params.data.dosenPenguji3;
      const selectedDosenPenguji4 = params.data.dosenPenguji4;

      if (params.colDef.field === 'dosenPenguji2' && selectedDosenPenguji2 === selectedDosenPembimbing) {
        alert('Dosen Penguji 2 tidak boleh sama dengan Dosen Pembimbing. Silakan pilih dosen yang lain.');
        params.node.setDataValue('dosenPenguji2', '');
      } else if (params.colDef.field === 'dosenPenguji3' && (selectedDosenPenguji3 === selectedDosenPembimbing || selectedDosenPenguji3 === selectedDosenPenguji2)) {
        alert('Dosen Penguji 3 tidak boleh sama dengan Dosen Pembimbing atau Dosen Penguji 2. Silakan pilih dosen yang lain.');
        params.node.setDataValue('dosenPenguji3', '');
      } else if (params.colDef.field === 'dosenPenguji4' && (selectedDosenPenguji4 === selectedDosenPembimbing || selectedDosenPenguji4 === selectedDosenPenguji2 || selectedDosenPenguji4 === selectedDosenPenguji3)) {
        alert('Dosen Penguji 4 tidak boleh sama dengan Dosen Pembimbing, Dosen Penguji 2, atau Dosen Penguji 3. Silakan pilih dosen yang lain.');
        params.node.setDataValue('dosenPenguji4', '');
      }
    },
  },
};
</script>

<style>
.ag-theme-alpine {
  height: 400px;
  width: 100%;
}
</style>
 