<template>
  <div class="app">
    <Sidebar v-if="!route.meta.hideSidebar" />
    <main class="main-content" :class="{ 'full-width': route.meta.hideSidebar }">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import Sidebar from './navigation/Sidebar.vue';

const route = useRoute();
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
  
}

.app {
  display: flex;

  .main-content {
    flex: 1;
    padding: 2rem;
    margin-left: var(--sidebar-width);
    transition: margin-left 0.2s ease-out;

    &.full-width {
      margin-left: 0;
    }

    @media (max-width: 768px) {
      margin-left: calc(2rem + 32px);
      padding: 1rem;

      &.full-width {
        margin-left: 0;
      }
    }
  }
}
</style>