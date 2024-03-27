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
                <TrackerTimer @timerFinished="taskEnded"></TrackerTimer>
            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TrackerTimer from './TrackerTimer.vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { computed } from 'vue';

export default defineComponent({
    name: 'MainForm',
    emits: ['onSaveTask'],
    components: {
        TrackerTimer
    },
    data() {
        return {
            description: '',
            projectId: ''
        }
    },
    methods: {
        taskEnded(elapsedTime: number): void {
            this.$emit('onSaveTask', {
                timeInSeconds: elapsedTime,
                description: this.description,
                project: this.projects.find(proj => proj.id === this.projectId)
            })
        }
    },
    setup() {
        const store = useStore(key)
        return {
            projects: computed(() => store.state.projects)
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