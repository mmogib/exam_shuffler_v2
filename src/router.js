import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Exam from './views/Exam.vue'

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
      component: Exam
    }
  ]
})
