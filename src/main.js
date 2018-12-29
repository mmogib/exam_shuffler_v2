import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import { ipcRenderer as ipc } from 'electron'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    ipc.send('get-init-state')
    ipc.on('state-init', (e, state) => {
      store.dispatch('setDefaultExam', state)
      store.dispatch('setBusy', false)
    })
  }
}).$mount('#app')
