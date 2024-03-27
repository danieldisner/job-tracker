<template>
    <header class="box has-text-centered">
        <h1>
            <img src="../assets/logo.png" alt="logo">
        </h1>
        <button class="button" @click="toggleDarkMode">{{ darkModeText }}</button>
        <nav class="panel is-primary mt-5">
            <p class="panel-heading has-text-centered">
                Menu
            </p>
            <ul class="panel-blocks-item">
                <li>
                    <router-link to="/" class="link is-block is-fullwidth is-primary">
                        <i class="fas fa-tasks"></i>
                        <span>Tasks</span>
                    </router-link>
                </li>
            </ul>
            <ul class="panel-blocks-item">
                <li>
                    <router-link to="/projects" class="link is-block is-fullwidth is-primary">
                        <i class="fas fa-project-diagram"></i>
                        <span>Projects</span>
                    </router-link>
                </li>
            </ul>
        </nav>
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
