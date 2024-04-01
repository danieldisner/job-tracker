<template>
    <section>
        <form @submit.prevent="save">
            <div class="field">
                <label for="projectName" class="label">Name</label>
                <div class="control">
                    <input class="input" type="text" placeholder="Project name" id="projectName" v-model="projectName">
                </div>
            </div>
            <div class="field">
                <div class="control">
                    <button class="button" type="submit">Save</button>
                </div>
            </div>
        </form>
    </section>
</template>
<script lang="ts">
import IProject from '@/interfaces/IProject';
import { defineComponent } from 'vue';
import { useStore } from "@/store";
import { CREATE_PROJECT, UPDATE_PROJECT } from "@/store/type-mutations";


export default defineComponent({
    name: 'ProjectsForm',
    props: {
        id: {
            type: String
        }
    },
    mounted() {
        if (this.id) {
            const project = this.store.state.projects.find((proj: IProject) => proj.id === this.id);
            this.projectName = project?.name || '';
        }
    },
    data() {
        return {
            projectName: ''
        }
    },
    methods: {
        save() {
            if (this.id) {
                this.store.commit(UPDATE_PROJECT, {
                    id: this.id,
                    name: this.projectName
                })
            }
            this.store.commit(CREATE_PROJECT, this.projectName)
            this.projectName = '';
            this.$router.push('/projects');
        }
    },
    setup() {
        const store = useStore()
        return {
            store
        }
    }
})
</script>