import { INotification } from './../interfaces/INotification';
import IProject from "@/interfaces/IProject";
import ITask from "@/interfaces/ITask";
import { InjectionKey } from "vue";
import { createStore , Store, useStore as useVuexStore } from "vuex";
import { CREATE_PROJECT, DELETE_PROJECT, UPDATE_PROJECT, NOTIFY, DEFINE_PROJECTS } from "./type-mutations";
import { NEW_PROJECT, EDIT_PROJECT, REMOVE_PROJECT, GET_PROJECTS } from './type-actions';
import http from "@/http";
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
        [DEFINE_PROJECTS](state, projects: IProject[]) {
            state.projects = projects
        },
        [NOTIFY](state, notification: INotification) {
            notification.id = new Date().getTime();
            state.notifications.push(notification);
            setTimeout(() => {
                state.notifications = state.notifications.filter(notif => notif.id !== notification.id)
            },3000)
        }
    },
    actions: {
        [GET_PROJECTS]({ commit }) {
            http.get('projects')
            .then(response =>commit(DEFINE_PROJECTS, response.data))
        },
        [NEW_PROJECT](context, projectName: string) {
            http.post('projects', { name: projectName })
        },
        [EDIT_PROJECT](context, project : IProject) {
            http.put(`projects/${project.id}`, project)
        },
        [REMOVE_PROJECT]({ commit }, id: string) {
            http.delete(`projects/${id}`).then(() => commit(DELETE_PROJECT, id))
        }
    }
})

export function useStore(): Store<IState> {
    return useVuexStore(key)
}