<template>
    <TaskBox>
        <div class="columns selectable" @click="taskSelected">
            <div class="column is-4">
                {{ task.description || 'Task without description' }}
            </div>
            <div class="column is-3">
                {{ task.project?.name || 'N/D' }}
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
    emits: ['onSelectTask'],
    components: {
        TrackerStopwatch, TaskBox
    },
    props: {
        task: {
            type: Object as PropType<ITask>,
            required: true
        }
    },
    methods: {
        taskSelected(): void {
            this.$emit('onSelectTask', this.task)
        }
    }
});
</script>
