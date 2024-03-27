import IProject from "@/interfaces/IProject";
import ITask from "@/interfaces/ITask";
import { InjectionKey } from "vue";
import { createStore , Store, useStore as useVuexStore } from "vuex";
interface IState {
    tasks: ITask[]
    projects: IProject[]
}

export const key: InjectionKey<Store<IState>> = Symbol()

export const store = createStore<IState>({
    state: {
        tasks: [],
        projects: []
    },
    mutations: {
        createTask(state, tasks: ITask[]) {
            state.tasks = tasks
        },
        createProject(state, projectName : string) {
            const project = {
                id: new Date().toISOString(),
                name: projectName
            } as IProject
            state.projects.push(project)
        }
    }
})

export function useStore(): Store<IState> {
    return useVuexStore(key)
}