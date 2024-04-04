import { INotification } from './../interfaces/INotification';
import { InjectionKey } from "vue";
import { createStore , Store, useStore as useVuexStore } from "vuex";
import {  NOTIFY, } from "./type-mutations";
import { IProjectState, project } from './modules/project';
import {  ITaskState, task } from './modules/task';

export interface IState {
    task: ITaskState,
    notifications: INotification[],
    project: IProjectState
}

export const key: InjectionKey<Store<IState>> = Symbol()

export const store = createStore<IState>({
    state: {
        task: {
            tasks: []
        },
        notifications: [],
        project: {
            projects: []
        }
    },
    mutations: {
        [NOTIFY](state, notification: INotification) {
            notification.id = new Date().getTime();
            state.notifications.push(notification);
            setTimeout(() => {
                state.notifications = state.notifications.filter(notif => notif.id !== notification.id)
            },3000)
        }
    },
    modules: {
        project,
        task
    }
})

export function useStore(): Store<IState> {
    return useVuexStore(key)
}