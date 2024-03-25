<template>
    <header>
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
    methods: {
        toggleDarkMode() {
            this.$emit('toggle-dark-mode');
            alert('Dark mode toggled');
        }
    }
})
</script>

<style scoped>
header {
    padding: 1rem;
    background: #294057;
    width: 100%;
    height: 100vh;
    padding: 32px
}

@media only screen and (max-width: 768px) {
    header {
        padding: 2.5rem;
        height: auto;
    }
}
</style>
