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
import { defineComponent, ref } from 'vue';
import { useStore } from "@/store";
import { NotificationType } from '@/interfaces/INotification';

import useNotify from '@/hooks/notify';
import { EDIT_PROJECT, NEW_PROJECT } from '@/store/type-actions';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'ProjectsForm',
    props: {
        id: {
            type: String
        }
    },
    setup(props) {
        const router = useRouter();
        const store = useStore()
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

        const save = () => {
            var action = 'updated';
            if (props.id) {
                store.dispatch(EDIT_PROJECT, {
                    id: props.id,
                    name: projectName.value,
                }).then(() => whenSuccess(action));
            } else {
                action = 'created';
                store.dispatch(NEW_PROJECT, projectName.value)
                    .then(() => whenSuccess(action));
            }
        }

        return {
            projectName,
            save
        }
    }
})
</script>