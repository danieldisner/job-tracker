<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <side-bar></side-bar>
    </div>
    <div class="column is-three-quarter">
      <main-form @onSaveTask="saveTask" />
      <div class="list">
        <job-task v-for="(task, index) in tasks" :key="index" :task="task"></job-task>
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

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
    MainForm,
    JobTask
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
  }
});
</script>

<style>
.list {
  padding: 1.25rem;
}
</style>
