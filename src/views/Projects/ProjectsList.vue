<template>
    <section>
        <div class="buttons">
            <router-link to="/projects/create" class="button is-primary">
                <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                </span>
                <span>New Project</span>
            </router-link>
        </div>
        <!--
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
        -->
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="project in projects" :key="project.id">
                    <td>{{ project.id }}</td>
                    <td>{{ project.name }}</td>
                    <td>
                        <router-link :to="`/projects/${project.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button is-danger" @click="deleteProject(project.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script lang="ts">
import { useStore } from '@/store';
import { computed, defineComponent } from 'vue';
import { GET_PROJECTS, REMOVE_PROJECT } from '@/store/type-actions';

export default defineComponent({
    name: 'ProjectsList',
    methods: {
        deleteProject(id: string) {
            this.store.dispatch(REMOVE_PROJECT, id);
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(GET_PROJECTS)
        return {
            projects: computed(() => store.state.project.projects),
            store
        }
    }
})
</script>