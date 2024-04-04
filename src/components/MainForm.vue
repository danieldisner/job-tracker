<template>
    <div class="box">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Form for creating a new task">
                <input class="input" type="text" placeholder="What needs to be done?" v-model="description">
            </div>
            <div class="column is-3">
                <div class="select is-fullwidth">
                    <select v-model="projectId">
                        <option v-for="project in projects" :key="project.id" :value="project.id">
                            {{ project.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <TrackerTimer @onTimerFinished="taskEnded"></TrackerTimer>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import TrackerTimer from './TrackerTimer.vue';
import { useStore } from '@/store';
import { NotificationType } from '@/interfaces/INotification';
import { notificationMixin } from '@/mixins/notify';

export default defineComponent({
    name: 'MainForm',
    emits: ['onSaveTask'],
    components: {
        TrackerTimer
    },
    mixins: [notificationMixin],
    setup(props, { emit }) {
        const store = useStore()
        const projects = computed(() => store.state.project.projects)

        const description = ref('')
        const projectId = ref('')

        const taskEnded = (elapsedTime: number): void => {
            emit('onSaveTask', {
                timeInSeconds: elapsedTime,
                description: description.value,
                project: projects.value.find(proj => proj.id === projectId.value)
            })
            //notify(NotificationType.Success, 'Success', 'Task created successfully')
        }

        return {
            description,
            projectId,
            projects,
            taskEnded
        }
    }
});
</script>
<style scoped>
.box {
    padding: 1.25rem;
    border-radius: 8px;
    background-color: var(--bulma-scheme-main);
    color: var(--light-text);
}

[data-theme="dark"] .box {
    background-color: var(--bulma-scheme-main);
    color: var(--dark-text);
}
</style>