import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import TasksView from '../views/TasksView.vue';

const routes: RouteRecordRaw[] = [{
    path: '/',
    name: 'Tasks',
    component: TasksView,
}];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;
