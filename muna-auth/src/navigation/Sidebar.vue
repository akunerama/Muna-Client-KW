<template>
  <aside>
    <div class="logo">
      <img src="../assets/UINSA.png" alt="M" />
    </div>

    <h3>Menu</h3>
    <div class="menu">
      <router-link class="button" to="/home" exact>
        <span class="material-icons">home</span>
        <span class="text"> Home </span>
      </router-link>

      <router-link class="button" to="/dashboard">
        <span class="material-icons">dashboard</span>
        <span class="text"> Dashboard </span>
      </router-link>

      <router-link class="button" to="/schedule">
        <span class="material-icons">calendar_today</span>
        <span class="text"> Jadwal </span>
      </router-link>

      <router-link class="button" to="/dataschedule">
        <span class="material-icons">date_range</span>
        <span class="text"> Data Schedule </span>
      </router-link>

      <router-link class="button" to="/datamanager">
        <span class="material-icons">edit_note</span>
        <span class="text"> Data Manager </span>
      </router-link>

      <router-link class="button" to="/form">
        <span class="material-icons">feed</span>
        <span class="text"> Form </span>
      </router-link>

      <router-link class="button" to="/report">
        <span class="material-icons">summarize</span>
        <span class="text"> Report </span>
      </router-link>
    </div>

    <div class="flex"></div>
    <button class="button logout" @click="handleLogout">
      <span class="material-icons">logout</span>
      <span class="text">Logout</span>
    </button>
    <div class="menu">

    </div>

  </aside>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const handleLogout = () => {
    alert('You have been logged out');
    router.push({ name: 'login' }); // Arahkan kembali ke halaman login
  };
</script>

<style lang="scss" scoped>
:root {
  --sidebar-width: 300px;
}

aside {
  position: fixed;
  top: 0;
  left: 0;
  width: var(--sidebar-width);
  height: 100vh;
  background-color: var(--dark);
  color: var(--light);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  z-index: 100;

  .flex {
    flex: 1;
    align-items: left;
  }

  .logo {
    margin-bottom: 1rem;
    img {
      width: 2rem;
    }
  }

  h3 {
    color: var(--grey);
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 0.5rem 1rem 1rem;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
      }

      .text {
        color: var(--light);
      }

      &:hover, &.router-link-exact-active {
        background-color: var(--dark-alt);

        .material-icons, .text {
          color: #269d8b;
        }
      }

      &.router-link-exact-active {
        border-right: 5px solid #269d8b;
      }
    }
  }

  @media (max-width: 768px) {
    width: calc(2rem + 32px);

    h3, .button .text {
      display: none;
    }

    .button {
      justify-content: center;
    }
  }
}
</style>