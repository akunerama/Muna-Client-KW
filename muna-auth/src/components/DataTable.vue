<template>
  <div class="fullscreen-container">
    <h2>Jadwal Munaqasah</h2>
    <ag-grid-vue
      class="ag-theme-alpine grid-container"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :pagination="true"
      :paginationPageSize="18"
      :paginationPageSizeSelector= "[18, 200]"
      :defaultColDef="defaultColDef"
      @cellValueChanged="onCellValueChanged"
    ></ag-grid-vue>
    <button @click="submitData" class="submit-button">Submit Data</button>
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
        // { headerName: 'Prodi', field: 'prodi', sortable: true, filter: true },
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
            values: [],
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
            values: [],
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
            values: [],
          },
        },
        {
          headerName: 'Jam',
          field: 'jam',
          sortable: true,
          filter: true,
          editable: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: [
              '08:00 - 09:30',
              '09:30 - 11:00',
              '11:00 - 12:30',
              '13:00 - 14:30',
              '14:30 - 16:00',
            ],
          },
        },
        {
          headerName: 'Hari',
          field: 'hari',
          sortable: true,
          filter: true,
          editable: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
          },
        },
        {
          headerName: 'Tanggal',
          field: 'tanggal',
          sortable: true,
          filter: true,
          editable: true,
        },
        {
          headerName: 'Ruangan',
          field: 'ruangan',
          sortable: true,
          filter: true,
          editable: true,
          cellEditor: 'agSelectCellEditor',
          cellEditorParams: {
            values: ['Ruang 1', 'Ruang 2', 'Ruang 3'],
          },
        },
      ],
      rowData: [],
      defaultColDef: {
        sortable: true,
        filter: true,
      },
      dosenOptions: [],
      dosenPenguji4Options: [],
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
        console.log('API Response:', result);

        if (result && Array.isArray(result.data)) {
          this.dosenOptions = result.data.map(dosen => ({ name: dosen.nama, uuid: dosen.lecture_uuid }));
          this.dosenPenguji4Options = result.data
            .filter(dosen => dosen.lecture_id >= 86 && dosen.lecture_id <= 98)
            .map(dosen => ({ name: dosen.nama, uuid: dosen.lecture_uuid }));
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
        console.log('Munaqasyah Data:', result);

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
      const updatedColumnDefs = this.columnDefs.map(col => {
        if (col.field === 'dosenPenguji2' || col.field === 'dosenPenguji3') {
          col.cellEditorParams.values = this.dosenOptions.map(d => d.name);
        }
        if (col.field === 'dosenPenguji4') {
          col.cellEditorParams.values = this.dosenPenguji4Options.map(d => d.name);
        }
        return col;
      });
      this.columnDefs = [...updatedColumnDefs];
    },
    processData(data) {
      const processedData = data.map(item => ({
        muna_id: item.muna_id,
        nim: item.nim,
        nama: item.nama,
        // prodi: item.prodi,
        judul_skripsi: item.judul_skripsi,
        dosenPembimbing: item.penguji.length > 0 ? item.penguji[0].nama : '',
        dosenPenguji2: item.penguji.length > 1 ? item.penguji[1].nama : '',
        dosenPenguji3: item.penguji.length > 2 ? item.penguji[2].nama : '',
        dosenPenguji4: item.penguji.length > 3 ? item.penguji[3].nama : '',
        jam: item.jam.start && item.jam.end ? `${item.jam.start} - ${item.jam.end}` : '',
        hari: item.hari,
        tanggal: item.tanggal_uji,
        ruangan: item.ruangan,
      }));
      console.log('Processed Data:', processedData);
      this.rowData = processedData;
    },
    async submitData() {
      const formattedData = this.rowData.map(item => ({
        muna_id: item.muna_id,
        tahun: "2024",
        tanggal_uji:item.tanggal || null,
        hari: item.hari || null,
        ruangan: item.ruangan || null,
        penguji_1: {
          examiner_id: 1,
          lecture_uuid: this.getLectureUUID(item.dosenPembimbing),
        },
        penguji_2: {
          examiner_id: null,
          lecture_uuid: this.getLectureUUID(item.dosenPenguji2),
        },
        penguji_3: {
          examiner_id: null,
          lecture_uuid: this.getLectureUUID(item.dosenPenguji3),
        },
        penguji_4: {
          examiner_id: null,
          lecture_uuid: this.getLectureUUID(item.dosenPenguji4),
        },
        start_time: item.jam ? item.jam.split('-')[0] : null,
        end_time: item.jam ? item.jam.split('-')[1] : null,
      }));console.log(JSON.stringify(formattedData))
      
      try {
        const response = await fetch('http://10.1.15.208:8000/schedule/munaqasyah/', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log('Submit Response:', result);
        alert('Data submitted successfully');
      } catch (error) {
        console.error('Error submitting data:', error);
        alert('Failed to submit data');
      }
    },
    getLectureUUID(name) {
      const dosen = this.dosenOptions.find(d => d.name === name) || this.dosenPenguji4Options.find(d => d.name === name);
      return dosen ? dosen.uuid : '';
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
.fullscreen-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.ag-theme-alpine {
  width: 100%;
  /* max-width: 1200px; */
  height: 100%;
  /* max-height: max-content; */
  flex-grow: 1;
}
.submit-button {
  margin-top: 20px;
  background-color: gray;
  color: white;
  border-radius: 5px;
  padding: 0.5rem;
}
</style>
