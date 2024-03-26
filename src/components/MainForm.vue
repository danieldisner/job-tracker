<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Form for creating a new task">
                <input class="input" type="text" placeholder="What needs to be done?" v-model="description">
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
export default defineComponent({
    name: 'MainForm',
    emits: ['onSaveTask'],
    components: {
        TrackerTimer
    },
    data() {
        return {
            description: ''
        }
    },
    methods: {
        taskEnded(elapsedTime: number): void {
            this.$emit('onSaveTask', {
                timeInSeconds: elapsedTime,
                description: this.description
            })
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