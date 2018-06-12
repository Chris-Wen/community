// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import router from './router'
import store from './store/index/index'

Vue.config.productionTip = false

import fastclick from 'fastclick'
import 'lib-flexible'

Vue.use(Vuex)

// import './common/js/reset.js'

import './common/css/self-icons.css'
import './common/css/reset.css'
import './common/css/global.css'
fastclick.attach(document.body)

Vue.prototype.preSrc = 'http://221.123.178.232/smallgamesdk/Public/Uploads/'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
