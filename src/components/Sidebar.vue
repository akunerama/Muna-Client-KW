<template>
  <aside :class="{ 'is-expanded': is_expanded }">
    <div class="logo">
      <img src="../assets/logo.png" alt="M" />
    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icons">
          keyboard_double_arrow_right
        </span>
      </button>
    </div>

    <h3>Menu</h3>
    <div class="menu">
      <router-link class="button" to="/" exact>
        <span class="material-icons">home</span>
        <span class="text"> Home </span>
      </router-link>
      <router-link class="button" to="/dashboard">
        <span class="material-icons">dashboard</span>
        <span class="text"> Dashboard </span>
      </router-link>
      <router-link class="button" to="/datamanager">
        <span class="material-icons">data_exploration</span>
        <span class="text"> Data Manager </span>
      </router-link>
      <router-link class="button" to="/report">
        <span class="material-icons">summarize</span>
        <span class="text"> Report </span>
      </router-link>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const is_expanded = ref(localStorage.getItem('is_expanded') === 'true');

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;
  localStorage.setItem('is_expanded', is_expanded.value.toString());
};
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  width: calc(2rem + 32px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;
  background-color: var(--dark);
  color: var(--light);
  transition: 0.2s ease-out;

  .logo {
    margin-bottom: 1rem;
    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    position: relative;
    top: 0;
    transition: 0.2s ease-out;

    .menu-toggle {
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
      }

      &:hover {
        .material-icons {
          color: #269d8b;
          transform: translateX(0.5rem);
        }
      }
    }
  }

  h3, .button .text {
    opacity: 0;
    transition: opacity 0.3s ease-out;
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
      transition: padding 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: color 0.2s ease-out;
      }

      .text {
        color: var(--light);
        transition: opacity 0.2s ease-out;
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

  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3, .button .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
}
</style>