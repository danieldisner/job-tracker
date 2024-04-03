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
import { NotificationType } from '@/interfaces/INotification';

import useNotify from '@/hooks/notify';
import { EDIT_PROJECT, NEW_PROJECT } from '@/store/type-actions';

export default defineComponent({
    name: 'ProjectsForm',
    props: {
        id: {
            type: String
        }
    },
    mounted() {
        if (this.id) {
            const project = this.store.state.project.projects.find((proj: IProject) => proj.id === this.id);
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
            var action = 'updated';
            if (this.id) {
                this.store.dispatch(EDIT_PROJECT, {
                    id: this.id,
                    name: this.projectName,
                }).then(() => this.whenSuccess(action));
            } else {
                action = 'created';
                this.store.dispatch(NEW_PROJECT, this.projectName)
                    .then(() => this.whenSuccess(action));
            }
        },
        whenSuccess(action: string) {
            this.notify(NotificationType.Success, 'Success', 'Project ' + this.projectName + ' ' + action + ' successfully');
            this.projectName = '';
            this.$router.push('/projects');
        },
    },
    setup() {
        const store = useStore()
        const { notify } = useNotify()
        return {
            store,
            notify
        }
    }
})
</script>