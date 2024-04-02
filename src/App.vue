<template>
  <main class="columns is-gapless is-multiline main-container" :data-theme="darkMode ? 'dark' : 'light'">

    <div class="column is-one-quarter">
      <side-bar @toggle-dark-mode="toggleDarkMode"></side-bar>
    </div>
    <div class="column is-three-quarter content">
      <app-notifications></app-notifications>
      <router-view></router-view>
      <!-- View rendered here -->
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue';
import AppNotifications from './components/AppNotifications.vue';
export default defineComponent({
  name: 'App',
  components: {
    SideBar, AppNotifications
  },
  data() {
    return {
      darkMode: false
    }
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      if (this.darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
  }
});
</script>