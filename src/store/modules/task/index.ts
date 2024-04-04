import http from "@/http";
import ITask from "@/interfaces/ITask";
import { IState } from "@/store";
import { EDIT_TASK, GET_TASKS, NEW_TASK, REMOVE_TASK } from "@/store/type-actions";
import { CREATE_TASK, DEFINE_TASKS, DELETE_TASK, UPDATE_TASK } from "@/store/type-mutations";
import { Module } from "vuex";

export interface ITaskState {
    tasks: ITask[]
}

export const task: Module<ITaskState, IState> = {
    state: {
        tasks: []
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
    },
    actions: {
        [GET_TASKS]({ commit },filter: string) {
            let url = 'tasks'
            if (filter) {
                url += '?description=' + filter
            }
            http.get(url)
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
    }
}