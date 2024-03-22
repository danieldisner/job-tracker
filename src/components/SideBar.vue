<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="logo">
        </h1>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'SideBar',
})
</script>
header
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