import { INotification } from './../interfaces/INotification';
import IProject from "@/interfaces/IProject";
import ITask from "@/interfaces/ITask";
import { InjectionKey } from "vue";
import { createStore , Store, useStore as useVuexStore } from "vuex";
import { CREATE_PROJECT, DELETE_PROJECT, UPDATE_PROJECT, NOTIFY } from "./type-mutations";
interface IState {
    tasks: ITask[]
    projects: IProject[]
    notifications: INotification[]
}

export const key: InjectionKey<Store<IState>> = Symbol()

export const store = createStore<IState>({
    state: {
        tasks: [],
        projects: [],
        notifications: []
    },
    mutations: {
        createTask(state, tasks: ITask[]) {
            state.tasks = tasks
        },
        [CREATE_PROJECT](state, projectName : string) {
            const project = {
                id: new Date().toISOString(),
                name: projectName
            } as IProject
            state.projects.push(project)
        },
        [UPDATE_PROJECT](state, project: IProject) {
            const index = state.projects.findIndex(proj => proj.id === project.id)
            state.projects[index] = project
        },
        [DELETE_PROJECT](state, projectId: string) {
            state.projects = state.projects.filter(project => project.id !== projectId)
        },
        [NOTIFY](state, notification: INotification) {
            notification.id = new Date().getTime();
            state.notifications.push(notification);
            setTimeout(() => {
                state.notifications = state.notifications.filter(notif => notif.id !== notification.id)
            },3000)
        }
    }
})

export function useStore(): Store<IState> {
    return useVuexStore(key)
}