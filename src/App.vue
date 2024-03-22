<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <side-bar></side-bar>
    </div>
    <div class="column is-three-quarter">
      <main-form></main-form>
    </div>

  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue';
import MainForm from './components/MainForm.vue';

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    MainForm
  }

});
</script>

<style></style>
