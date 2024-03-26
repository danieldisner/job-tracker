<template>
    <header class="box has-text-centered">
        <h1>
            <img src="../assets/logo.png" alt="logo">
        </h1>
        <button class="button" @click="toggleDarkMode">Dark Mode</button>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'SideBar',
    data: () => ({
        darkMode: false,
        darkModeText: 'Dark Mode'
    }),
    methods: {
        toggleDarkMode() {
            this.darkMode = !this.darkMode;
            this.darkModeText = this.darkMode ? 'Light Mode' : 'Dark Mode';
            this.$emit('toggle-dark-mode', this.darkMode);
        }
    }
})
</script>

<style scoped>
header {
    padding: 1rem;
    width: 100%;
    height: 100vh;
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}
</style>
