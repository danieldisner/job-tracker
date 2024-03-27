import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import TasksView from '../views/TasksView.vue';
import ProjectsView from '../views/ProjectsView.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tasks',
        component: TasksView,
    },
    {
        path: '/projects',
        name: 'Projects',
        component: ProjectsView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;
