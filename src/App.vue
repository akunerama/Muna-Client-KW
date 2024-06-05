<template>
  <div class="app">
    <Sidebar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './navigation/Sidebar.vue';
</script>

<style lang="scss">
:root {
  --primary: #004218;
  --primary-alt: #0e5f2b;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #ffffff;
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira Sans', sans-serif;
}

body {
  background: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;

  .main-content {
    flex: 1;
    padding: 2rem;
    margin-left: var(--sidebar-width);
    transition: margin-left 0.2s ease-out;

    @media (max-width: 768px) {
      margin-left: calc(2rem + 32px);
      padding: 1rem;
    }
  }
}
</style>
