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
import { computed, defineComponent, ref } from 'vue';
import { GET_PROJECTS, REMOVE_PROJECT } from '@/store/type-actions';
import useNotify from '@/hooks/notify';
import IProject from '@/interfaces/IProject';
import { NotificationType } from '@/interfaces/INotification';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'ProjectsList',
    props: {
        id: {
            type: String
        }
    },
    setup(props) {
        const router = useRouter();
        const store = useStore()
        store.dispatch(GET_PROJECTS)
        const { notify } = useNotify();

        const projectName = ref('');

        if (props.id) {
            const project = store.state.project.projects.find((proj: IProject) => proj.id === props.id);
            projectName.value = project?.name || '';
        }

        const whenSuccess = (action: string) => {
            notify(NotificationType.Success, 'Success', 'Project ' + projectName.value + ' ' + action + ' successfully');
            projectName.value = '';
            router.push('/projects');
        }

        const deleteProject = (id: string) => {
            var action = 'delete';
            store.dispatch(REMOVE_PROJECT, id)
                .then(() => whenSuccess(action));
        }

        return {
            projects: computed(() => store.state.project.projects),
            store,
            deleteProject
        }
    }
})
</script>