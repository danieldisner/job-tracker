<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <side-bar @toggle-dark-mode="toggleDarkMode"></side-bar>
    </div>
    <div class="column is-three-quarter" :class="{ 'theme-dark': false }">
      <main-form @onSaveTask="saveTask" />
      <div class="list">
        <job-task v-for="(task, index) in tasks" :key="index" :task="task"></job-task>
        <TaskBox v-if="listIsEmpty"> You have no tasks :( </TaskBox>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from './components/SideBar.vue';
import MainForm from './components/MainForm.vue';
import JobTask from './components/JobTask.vue';
import ITask from './interfaces/ITask';
import TaskBox from './components/TaskBox.vue';

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    MainForm,
    JobTask,
    TaskBox
  },
  data() {
    return {
      tasks: [] as ITask[],
      darkMode: false
    }
  },
  computed: {
    listIsEmpty(): boolean {
      return this.tasks.length === 0
    }
  },
  methods: {
    saveTask(task: ITask) {
      this.tasks.push(task)
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode
      if (this.darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    }
  }
});
</script>

<style>
.list {
  padding: 1.25rem;
}
</style>
