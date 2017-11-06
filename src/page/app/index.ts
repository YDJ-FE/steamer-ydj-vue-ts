import 'styles/app.scss'
import Vue from 'vue'
import { IState, createStore } from 'store'
import App from './App.vue'
import router from 'router'
import svgicon = require('vue-svgicon')
import Vuex from 'vuex'

// import all icons
import 'components/icons'

Vue.use(svgicon, {
  tagName: 'icon'
})

Vue.use(Vuex)

let store = createStore()

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
