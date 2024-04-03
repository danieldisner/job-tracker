import { INotification } from './../interfaces/INotification';
import ITask from "@/interfaces/ITask";
import { InjectionKey } from "vue";
import { createStore , Store, useStore as useVuexStore } from "vuex";
import {  NOTIFY, DEFINE_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK, } from "./type-mutations";
import {  NEW_TASK, EDIT_TASK, REMOVE_TASK, GET_TASKS } from './type-actions';
import http from "@/http";
import { IProjectState, project } from './modules/project';
export interface IState {
    tasks: ITask[]
    notifications: INotification[],
    project: IProjectState
}

export const key: InjectionKey<Store<IState>> = Symbol()

export const store = createStore<IState>({
    state: {
        tasks: [],
        notifications: [],
        project: {
            projects: []
        }
    },
    mutations: {
        [CREATE_TASK](state, task : ITask) {
            state.tasks.push(task)
        },
        [UPDATE_TASK](state, task: ITask) {
            const index = state.tasks.findIndex(t => t.id === task.id)
            state.tasks[index] = task
        },
        [DELETE_TASK](state, taskId: number) {
            state.tasks = state.tasks.filter(task => task.id !== taskId)
        },
        [DEFINE_TASKS](state, tasks: ITask[]) {
            state.tasks = tasks
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
        [GET_TASKS]({ commit }) {
            http.get('tasks')
            .then(response =>commit(DEFINE_TASKS, response.data))
        },
        [NEW_TASK](context, task : ITask) {
            return http.post('tasks', task)
            .then(response => context.commit(CREATE_TASK, response.data))
        },
        [EDIT_TASK]({ commit }, task : ITask) {
            http.put(`tasks/${task.id}`, task).then(() => commit(UPDATE_TASK, task))
        },
        [REMOVE_TASK]({ commit }, id: string) {
            http.delete(`tasks/${id}`).then(() => commit(DELETE_TASK, id))
        }
    },
    modules: {
        project
    }
})

export function useStore(): Store<IState> {
    return useVuexStore(key)
}