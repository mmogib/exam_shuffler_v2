import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/Home.vue'
import Exam from './views/Exam.vue'
import Setting from './views/Setting.vue'
import Loading from '@/views/Loading.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/exam',
      name: 'exam',
      component: Exam,
      beforeEnter(to, from, next) {
        const exam = store.getters.getDefaultExam
        store.dispatch('setCurrentExam', exam)
        next()
      }
    },
    {
      path: '/current',
      name: 'current',
      component: Exam
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    },
    {
      path: '/loading/:to/:duration',
      name: 'loading',
      component: Loading,
      props: true
    }
  ]
})
