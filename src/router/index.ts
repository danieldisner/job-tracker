import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import TasksView from '../views/TasksView.vue';
import ProjectsView from '../views/ProjectsView.vue';
import ProjectsForm from '../views/Projects/ProjectsForm.vue';
import ProjectsList from '@/views/Projects/ProjectsList.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tasks',
        component: TasksView,
    },
    {
        path: '/projects',
        component: ProjectsView,
        children: [
            {
                path: '',
                name: 'Projects',
                component: ProjectsList
            },
            {
                path: 'create',
                name: 'Create Project',
                component: ProjectsForm
            },
            {
                path: ':id',
                name: 'Edit Project',
                component: ProjectsForm,
                props: true
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;
