import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    busy: true,
    default_exam: null,
    current_exam: null,
    projects: [] // array of exams
  },
  getters: {
    isBusy: ({ busy }) => busy,
    getDefaultExam: ({ default_exam }) => default_exam,
    getCurrentExam: ({ current_exam }) => current_exam,
    getProjects: ({ projects }) => projects
  },
  mutations: {
    SET_BUSY: (state, busy) => (state.busy = busy),
    SET_DEFAULT_EXAM: (state, exam) => (state.default_exam = exam),
    SET_CURRENT_EXAM: (state, exam) => (state.current_exam = exam),
    ADD_PROJECT: (state, exam) => state.projects.push(exam)
  },
  actions: {
    setBusy({ commit }, busy) {
      commit('SET_BUSY', busy)
    },
    setDefaultExam({ commit }, exam) {
      commit('SET_DEFAULT_EXAM', exam)
    },
    setCurrentExam({ commit }, exam) {
      commit('SET_CURRENT_EXAM', exam)
    },
    addProject({ commit }, exam) {
      commit('ADD_PROJECT', exam)
    }
  }
})
