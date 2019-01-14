import Vue from 'vue'
import Vuex from 'vuex'
import { ipcRenderer as ipc } from 'electron'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    update_message: null,
    busy: false,
    setting: null,
    default_exam: null,
    current_exam: null,
    projects: [] // array of exams
  },
  getters: {
    getUpdateMessage: ({ update_message }) => update_message,
    isBusy: ({ busy }) => busy,
    getSetting: ({ setting }) => setting,
    getDefaultExam: ({ default_exam }) => default_exam,
    getCurrentExam: ({ current_exam }) => current_exam,
    getProjects: ({ projects }) => projects
  },
  mutations: {
    SET_UPDATE_MESSAGE: (state, msg) => (state.update_message = msg),
    SET_BUSY: (state, busy) => (state.busy = busy),
    SET_SETTING: (state, setting) => (state.setting = setting),
    SET_DEFAULT_EXAM: (state, exam) => (state.default_exam = exam),
    SET_CURRENT_EXAM: (state, exam) => (state.current_exam = exam),
    SET_PROJECTS: (state, projects) => (state.projects = projects),
    ADD_PROJECT: (state, exam) => {
      !state.projects.map(p => p.name).includes(exam.name) && state.projects.push(exam)
    }
  },
  actions: {
    async initApp({ dispatch }) {
      router.push({ name: 'home' })
      ipc.send('get-init-state')
      dispatch('setBusy', true)
      ipc.on('state-initiated', (e, { default_exam, setting, projects }) => {
        dispatch('setDefaultExam', default_exam)
        dispatch('setSetting', setting)
        dispatch('setProjects', projects || [])
        dispatch('setBusy', false)
      })
      ipc.on('exam-opened', (e, exam) => {
        dispatch('setCurrentExam', exam)
        dispatch('setBusy', false)
        router.push({ name: 'loading', params: { to: 'current', duration: 2000 } })
      })
      ipc.on('exam-saved', () => {
        dispatch('setBusy', false)
      })
      ipc.on('setting-saved', () => {
        dispatch('setBusy', false)
      })
      ipc.on('not-busy', () => {
        dispatch('setBusy', false)
      })
      ipc.on('default-saved', () => {
        dispatch('setBusy', false)
      })
      ipc.on('add-project', (e, project) => {
        dispatch('addProject', project)
      })
      ipc.on('update-message', (e, message) => {
        dispatch('setUpdateMessage', message)
      })
      ipc.on('update-available', (e, message) => {
        ipc.send('download-update', message)
      })
    },
    setUpdateMessage({ commit }, msg) {
      commit('SET_UPDATE_MESSAGE', msg)
    },
    setBusy({ commit }, busy) {
      commit('SET_BUSY', busy)
    },
    setSetting({ commit }, setting) {
      commit('SET_SETTING', setting)
    },
    setDefaultExam({ commit }, exam) {
      commit('SET_DEFAULT_EXAM', exam)
    },
    setCurrentExam({ commit }, exam) {
      commit('SET_CURRENT_EXAM', exam)
    },
    saveCurrentExam({ state, commit }) {
      const { current_exam, setting } = state
      const { exam, examPartials } = current_exam
      const exm = {
        name: 'current_exam',
        exam: { ...exam, settings: setting },
        examPartials
      }
      commit('SET_CURRENT_EXAM', exm)
      ipc.send('save-exam', exm)
    },
    addProject({ commit }, project) {
      commit('ADD_PROJECT', project)
    },
    setProjects({ commit }, projects) {
      commit('SET_PROJECTS', projects)
    },
    downloadExam({ state }) {
      const {
        current_exam: { exam, examPartials }
      } = state
      ipc.send('download-exam', exam, examPartials)
    },
    openExam() {
      router.push({ name: 'home' })
      ipc.send('open-exam')
    },
    saveSetting({ commit }, setting) {
      commit('SET_SETTING', setting)
      ipc.send('save-setting', setting)
    },
    saveAsDefaultExam({ commit, state }) {
      const { current_exam, setting } = state
      const { exam, examPartials } = current_exam
      const exm = {
        name: 'default_exam',
        exam: { ...exam, settings: setting },
        examPartials
      }
      commit('SET_DEFAULT_EXAM', exm)
      ipc.send('save-as-default', exm)
    },
    loadProject({}, filename) {
      router.push({ name: 'home' })
      ipc.send('load-project', filename)
    },
    downloadTemplateExam() {
      ipc.send('download-template-exam')
    },
    closeApp() {
      ipc.send('close-app')
    },
    updateApp() {
      ipc.send('update-app')
    }
  }
})
