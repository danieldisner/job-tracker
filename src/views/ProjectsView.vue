<template>
    <section class="projects">
        <h1 class="title">
            Projects
        </h1>
        <form @submit.prevent="save">
            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Project name" v-model="projectName">
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <button class="button" type="submit">Save</button>
                </div>
            </div>
        </form>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="project in projects" :key="project.id">
                    <td>{{ project.id }}</td>
                    <td>{{ project.name }}</td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { computed } from 'vue';

export default defineComponent({
    name: 'ProjectsView',
    data() {
        return {
            projectName: ''
        }
    },
    methods: {
        save() {
            this.store.commit('createProject', this.projectName)
            this.projectName = '';
        }
    },
    setup() {
        const store = useStore(key)
        return {
            store,
            projects: computed(() => store.state.projects)
        }
    }
})
</script>

<style scoped>
.projects {
    padding: 1.25rem;
}
</style>