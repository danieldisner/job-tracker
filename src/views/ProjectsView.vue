<template>
    <div class="projects">
        <h1>Projects</h1>
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ProjectsView',
})
</script>
<style scoped>
.projects {
    padding: 1.25rem;
}
</style>