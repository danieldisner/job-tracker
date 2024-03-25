<template>
    <div class="box">
        <div class="columns">
            <div class="column is-7">
                {{ task.description || 'Task without description' }}
            </div>
            <div class="column">
                <tracker-stopwatch :timeInSeconds="task.timeInSeconds" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import TrackerStopwatch from './TrackerStopwatch.vue';
import ITask from '../interfaces/ITask';

export default defineComponent({
    name: 'JobTask',
    components: {
        TrackerStopwatch
    },
    props: {
        task: {
            type: Object as PropType<ITask>,
            required: true
        }
    }
});
</script>

<style scoped>
.box {
    background-color: #294057;
    padding: 1.25rem;
    border-radius: 8px;
}
</style>