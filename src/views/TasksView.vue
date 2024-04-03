<template>
    <main-form @onSaveTask="saveTask" />
    <div class="list">
        <job-task v-for="(task, index) in tasks" :key="index" :task="task" @onSelectTask="selectTask"></job-task>
        <TaskBox v-if="listIsEmpty"> You have no tasks :( </TaskBox>
        <div class="modal" :class="{ 'is-active': taskSelected }" v-if="taskSelected">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Edit Task</p>
                    <button @click="closeModal" class="delete" aria-label="close"></button>
                </header>
                <section class="modal-card-body">
                    <div class="field">
                        <label for="taskDescription" class="label">Task Description</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Description"
                                v-model="taskSelected.description">
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <div class="buttons">
                        <button @click="editTask" class="button is-success">Save changes</button>
                        <button @click="closeModal" class="button">Cancel</button>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import MainForm from '../components/MainForm.vue';
import JobTask from '../components/JobTask.vue';
import TaskBox from '../components/TaskBox.vue';
import { useStore } from '@/store';
import { GET_PROJECTS, GET_TASKS, NEW_TASK } from '@/store/type-actions';
import ITask from '@/interfaces/ITask';
import { EDIT_TASK } from '@/store/type-actions';

export default defineComponent({
    name: 'App',
    emits: ['onSelectTask'],
    components: {
        MainForm,
        JobTask,
        TaskBox
    },
    data() {
        return {
            taskSelected: null as ITask | null
        }
    },
    methods: {
        saveTask(task: ITask): void {
            this.store.dispatch(NEW_TASK, task)
        },
        selectTask(task: ITask): void {
            this.taskSelected = task
        },
        editTask() {
            this.store.dispatch(EDIT_TASK, this.taskSelected)
            this.closeModal()
        },
        closeModal(): void {
            this.taskSelected = null
        }
    },
    computed: {
        listIsEmpty(): boolean {
            return this.tasks.length === 0
        }
    },
    setup() {
        const store = useStore()
        store.dispatch(GET_TASKS)
        store.dispatch(GET_PROJECTS)
        return {
            tasks: computed(() => store.state.tasks),
            store
        }
    }
});
</script>