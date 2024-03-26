<template>
    <main-form @onSaveTask="saveTask" />
    <div class="list">
        <job-task v-for="(task, index) in tasks" :key="index" :task="task"></job-task>
        <TaskBox v-if="listIsEmpty"> You have no tasks :( </TaskBox>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainForm from '../components/MainForm.vue';
import JobTask from '../components/JobTask.vue';
import ITask from '../interfaces/ITask';
import TaskBox from '../components/TaskBox.vue';

export default defineComponent({
    name: 'App',
    components: {
        MainForm,
        JobTask,
        TaskBox
    },
    data() {
        return {
            tasks: [] as ITask[]
        }
    },
    methods: {
        saveTask(task: ITask) {
            this.tasks.push(task)
        }
    },
    computed: {
        listIsEmpty(): boolean {
            return this.tasks.length === 0
        }
    }
});
</script>