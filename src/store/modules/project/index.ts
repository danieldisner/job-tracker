import http from "@/http";
import IProject from "@/interfaces/IProject";
import { IState } from "@/store";
import { EDIT_PROJECT, GET_PROJECTS, NEW_PROJECT, REMOVE_PROJECT } from "@/store/type-actions";
import { CREATE_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, DEFINE_PROJECTS } from "@/store/type-mutations";
import { Module } from "vuex";

export interface IProjectState {
    projects: IProject[]
}

export const project: Module<IProjectState, IState> = {
    state: {
        projects: []
    },
    mutations: {
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
        },
    }
}