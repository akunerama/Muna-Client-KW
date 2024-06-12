<template>
    <div class="app-container">
      <div class="main-content">
        <DataTable />
      </div>
    </div>
  </template>
  
  <script>
  import DataTable from '../components/DataTable.vue';
  
  export default {
    components: {
      DataTable
    },
  };
  </script>
  
  <style>
  .app-container{
    display: flex;
    justify-content: space-between;
  }
  .main-content{
    flex: 3;
  }
  .menu.container{
    flex: 1;
    padding: 20px;
    border-left: lpx solid #ccc;
  }
  </style>