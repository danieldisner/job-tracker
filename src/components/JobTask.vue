<template>
    <TaskBox>
        <div class="columns">
            <div class="column is-7">
                {{ task.description || 'Task without description' }}
            </div>
            <div class="column">
                <tracker-stopwatch :timeInSeconds="task.timeInSeconds" />
            </div>
        </div>
    </TaskBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import TrackerStopwatch from './TrackerStopwatch.vue';
import ITask from '../interfaces/ITask';
import TaskBox from './TaskBox.vue';

export default defineComponent({
    name: 'JobTask',
    components: {
        TrackerStopwatch, TaskBox
    },
    props: {
        task: {
            type: Object as PropType<ITask>,
            required: true
        }
    }
});
</script>
