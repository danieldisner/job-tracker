<template>
    <main-form @onSaveTask="saveTask" />
    <div class="list">

        <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Search for tasks" v-model="searchTask" />
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <job-task v-for="(task, index) in tasks" :key="index" :task="task" @onSelectTask="selectTask"></job-task>
        <TaskBox v-if="listIsEmpty"> You have no tasks :( </TaskBox>
        <ModalCard :showModal="!!taskSelected" v-if="taskSelected">
            <template v-slot:modal-header>
                <p class="modal-card-title">Edit Task</p>
                <button @click="closeModal" class="delete" aria-label="close"></button>
            </template>
            <template v-slot:modal-body>
                <div class="field">
                    <label for="taskDescription" class="label">Task Description</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Description" v-model="taskSelected.description">
                    </div>
                </div>
            </template>
            <template v-slot:modal-footer>
                <div class="buttons">
                    <button @click="editTask" class="button is-success">Save changes</button>
                    <button @click="closeModal" class="button">Cancel</button>
                </div>
            </template>
        </ModalCard>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import MainForm from '../components/MainForm.vue';
import JobTask from '../components/JobTask.vue';
import TaskBox from '../components/TaskBox.vue';
import { useStore } from '@/store';
import { GET_PROJECTS, GET_TASKS, NEW_TASK } from '@/store/type-actions';
import ITask from '@/interfaces/ITask';
import { EDIT_TASK } from '@/store/type-actions';
import ModalCard from '@/components/ModalCard.vue';

export default defineComponent({
    name: 'App',
    emits: ['onSelectTask'],
    components: {
        MainForm,
        JobTask,
        TaskBox,
        ModalCard
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

        const searchTask = ref('')
        //const tasks = computed(() => store.state.task.tasks.filter(t => !searchTask.value || t.description.includes(searchTask.value)))

        watchEffect(() => {
            store.dispatch(GET_TASKS, searchTask.value)
        })

        return {
            tasks: computed(() => store.state.task.tasks),
            store,
            searchTask
        }
    }
});
</script>